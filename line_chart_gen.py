import matplotlib.pyplot as plt
import numpy as np

import datetime as dt




#days_before = 

# get data


labels = ['tomato', 'potato', 'cabbage']

dates = ['01-01-21', '02-01-21', '03-01-21', '04-01-21']
product1_data = [1,2,1,5]
product2_data = [2,3,4,1]
product3_data = [3,3,3,10]




datas = [product1_data, product2_data, product3_data]



plt.style.use('Solarize_Light2')

fig, ax = plt.subplots()


for i in range(len(datas)):
    data = datas[i]
    line, = ax.plot(dates, data)
    line.set_label(labels[i])

ax.set_xlabel('date')
ax.set_ylabel('volume sold')
ax.legend()

fig.show()

