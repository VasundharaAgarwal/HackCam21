"""farmer_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from farmers import views

router = routers.DefaultRouter()
router.register(r'crop_search', views.InventoryView, 'inventory')
router.register(r'seller_search', views.SellerView, 'seller')
router.register(r'user_search', views.UserView, 'user')
router.register(r'cart_search', views.CartView, 'cart')
router.register(r'history_search', views.OrderHistoryView, 'history')
router.register(r'img_search', views.ImageView, 'img')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls))
]