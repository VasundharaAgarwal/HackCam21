import requests
import json
import numpy as np
import pandas as pd
from sklearn.neighbors import KernelDensity
from matplotlib import path
import random
import matplotlib.pyplot as plt
import matplotlib as mpl
from mpl_toolkits.axes_grid1 import make_axes_locatable
from matplotlib.colors import LinearSegmentedColormap
import http
import base64
import os

server_url = "https://api.imgbb.com/1/upload"
api_key = '02aba836ffedb97e75dd607f512d0887'
database_url = 'https://farmer-api-cam.herokuapp.com/api/v1/img_search/'

class Image_Pipeline():
    def __init__(self,server_url,api_key,database_url,crops_url,history_search,user_search):
        self.server_url = server_url
        self.api_key = api_key
        self.database_url = database_url
        self.crops_url = crops_url
        self.history_search = history_search
        self.user_search = user_search
        self.previous_id = len(requests.get(self.user_search).json())-1
        
    def create_user_density_map(self,latitude,longitude,purpose = 'Tomato',bandwidth = 0.01):
        # purpose = create density map of overall user distribution, potatoes, tomatoes, etc
        
        """Generates user density maps and saves them to the current directory"""
        data = np.transpose(np.vstack([latitude,longitude]))
        min_lat,max_lat,min_lon,max_lon = 51.9995,52.395,-0.3049,0.645
#         bandwidth = (0.5*(latitude.max() - latitude.min()) + 0.5*(longitude.max() - longitude.min()))/400
        print(bandwidth)
        
        model = KernelDensity(kernel='gaussian', bandwidth = bandwidth,metric='haversine').fit(data)
        extent = [min_lon,max_lon,min_lat,max_lat]
        x = np.arange(min_lat, max_lat, (max_lat-min_lat)/100)
        y = np.arange(min_lon, max_lon, (max_lon-min_lon)/100)
        X, Y = np.meshgrid(x, y)
        numel = len(X) * len(X[0, :])
        Z = np.zeros(X.shape)
        unraveled_x = X.reshape([numel, 1])
        unraveled_y = Y.reshape([numel, 1])
        data_to_eval = np.hstack([unraveled_x, unraveled_y])

        density = np.exp(model.score_samples(data_to_eval))
        color_min = 0
        color_max = density.max()
        density = density.reshape(X.shape)

        fig,ax1 = plt.subplots(nrows=1, ncols=1,figsize=(30,30))
        ncolors = 20

        alpha_max = 1

        base_color = [0.35294117647058826, 0.6313725490196078, 0.1568627450980392]
        #damping = 1.1

        color_array = np.linspace(base_color + [0], base_color + [alpha_max], ncolors) #np.array([base_color]*ncolors)
        # change alpha values
        #color_array[:,-1] = np.linspace(0.0, alpha_max ** (1/damping), ncolors) ** (damping)

        new_cmp = mpl.colors.ListedColormap(list(color_array), 'new_cmap', N=ncolors)


        img = plt.imread('map2.png')
        img_names = plt.imread('map_names.png')
        img_roads = plt.imread('map_roads.png')

        #img1 = plt.imread('colorbar.png')
        # set a margin around the data
        ax1.set_xmargin(0.05)
        ax1.set_ymargin(0.10)
        ax1.imshow(img, origin='upper', extent = [-0.3049,0.6345,51.9995,52.3890], zorder = -2)

        ax1.contourf(Y, X, density/density.max(), levels = np.linspace(0, 1, 8), cmap=new_cmp, zorder = 0)
        ax1.contour(Y, X, density/density.max(), levels = 10, colors='black', linewidths=2.3, alpha=0.25, zorder = 0.5)

        ax1.imshow(img_names, origin='upper', extent = [-0.3049,0.6345,51.9995,52.3890], zorder = 1)
        ax1.imshow(img_roads, origin='upper', extent = [-0.3049,0.6345,51.9995,52.3890], zorder = 2)

        ax1.axis('off')
        ax1.set_xlim([-0.3049,0.6345])
        ax1.set_ylim([51.9995,52.3890])

        ax1.set_aspect(aspect=1.56)
        plt.savefig(purpose+'.png')
        plt.show()
        
        return purpose + '.png'
    
    def acquire_relevant_coords(self,purpose):
        latitudes = []
        longitudes = []
        history_search = requests.get(self.history_search).json()
        crops_data = requests.get(self.crops_url).json()
        user_data = requests.get(self.user_search).json()
        seen_users = set()
        if purpose != 'All':
            for items in history_search:
                if items['item'] == purpose:
                    user = items['user']
                    latitudes.append(user_data[user-1]['location']['coordinates'][0])
                    longitudes.append(user_data[user-1]['location']['coordinates'][1])
#             for i in range(len(user_data)):
#                 if user_data[i]['crops'] == purpose:
#                     latitudes.append(user_data[i]['location']['coordinates'][0])
#                     longitudes.append(user_data[i]['location']['coordinates'][1])
        else:
            for i in range(len(user_data)):
                latitudes.append(user_data[i]['location']['coordinates'][0])
                longitudes.append(user_data[i]['location']['coordinates'][1])
        print(latitudes,longitudes)
        return np.array(latitudes),np.array(longitudes)

        
    def post_density_map_to_server(self,api_key,filepath,server_url):
        """ Uploads a given density map to the public image server"""
        with open(filepath, "rb") as file:
            payload = {
                "key": api_key,
                "image": base64.b64encode(file.read()),
                "name": os.path.basename(filepath),
            }
            img_url = requests.post(server_url, payload).json()['data']['url']
        return img_url
    
    def share_density_map_links(self,database_url,img_url,img_id):
        """Shares the link to the public server where the images are held
           with the Heroku application server"""
        payload = {'id': img_id,'url':img_url}
        res = requests.post(database_url,payload)
        return
    
    def table_updated(self,user_search):
        """Checks if the Heroku database table is updated or not """
        try:
            new_req = requests.get(url=user_search + '?id='+str(self.previous_id+1),timeout=1)
            self.previous_id += 1
        except:
            return False
        return True

server_url = "https://api.imgbb.com/1/upload"
api_key = '02aba836ffedb97e75dd607f512d0887'
database_url = 'https://farmer-api-cam.herokuapp.com/api/v1/img_search/'
crops_url = 'https://farmer-api-cam.herokuapp.com/api/v1/crop_search'
history_url = 'https://farmer-api-cam.herokuapp.com/api/v1/history_search'
user_url = 'https://farmer-api-cam.herokuapp.com/api/v1/user_search'
category = 'All'
pipeline = Image_Pipeline(server_url,api_key,database_url,crops_url,history_url,user_url)
if pipeline.table_updated(user_url):
    plat,plon = pipeline.acquire_relevant_coords(category)
    filepath = pipeline.create_user_density_map(plat,plon,category)
    img_url = pipeline.post_density_map_to_server(pipeline.api_key,filepath,pipeline.server_url)
    pipeline.share_density_map_links(database_url,img_url,category)
else:
    print("Table not updated")




# latitude = np.array([52.2053+(np.random.random([100,]) - .5)*0.4])
# longitude = np.array([0.1218+(np.random.random([100,]) - .5)*0.6])
# create_user_density_map(latitude,longitude)

# # Density maps for specific vegetable types
# latitude = np.array([52.2053+(np.random.random([100,]) - .5)*0.3])
# longitude = np.array([0.1218+(np.random.random([100,]) - .5)*0.5])
# create_user_density_map(latitude,longitude)

# # Density maps for specific vegetable types
# latitude = np.array([52.2053+(np.random.random([100,]) - .5)*0.4])
# longitude = np.array([0.1218+(np.random.random([100,]) - .5)*0.6])
# create_user_density_map(latitude,longitude)

# # Density maps for specific vegetable types
# latitude = np.array([52.2053+(np.random.random([100,]) - .5)*0.4])
# longitude = np.array([0.1218+(np.random.random([100,]) - .5)*0.6])
# create_user_density_map(latitude,longitude)

# while True:
#     if table_updated(database_url):
#         pipeline = Image_Pipeline(server_url,api_key,database_url,crops_url,history_url,user_url)
#         plat,plon = pipeline.acquire_relevant_coords(category)
#         filepath = pipeline.create_user_density_map(plat,plon,category)
#         img_url = pipeline.post_density_map_to_server(pipeline.api_key,filepath,pipeline.server_url)
#         pipeline.share_density_map_links(database_url,img_url,category)
#     else:
#         # sleep for 10 seconds
#         continue


    

