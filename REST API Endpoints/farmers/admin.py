from django.contrib import admin
from .models import SellerProfile, Inventory, UserProfile, Cart, OrderHistory, Image


# Register your models here.
class SellerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'shop_name', 'address','location')


class InventoryAdmin(admin.ModelAdmin):
    list_display = ('seller', 'crops', 'price', 'quantity')


class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'address', 'location')


class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'seller', 'item', 'price', 'quantity')

class OrderHistoryAdmin(admin.ModelAdmin):
    list_display = ('when', 'user', 'seller', 'item', 'price', 'quantity', 'status')

class ImageAdmin(admin.ModelAdmin):
    list_display = ('url','keyword')

admin.site.register(SellerProfile, SellerAdmin)
admin.site.register(Inventory, InventoryAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(UserProfile, UserAdmin)
admin.site.register(OrderHistory, OrderHistoryAdmin)
admin.site.register(Image, ImageAdmin)