from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from django.core.validators import MaxValueValidator, MinValueValidator
from datetime import datetime


# Create your models here.

class SellerProfile(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.CharField(max_length=1000)
    shop_name = models.CharField(max_length=50)
    delivery_fee = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    location = models.PointField(geography=True, default=Point(0.0,0.0))
    def __str__(self):
        return self.shop_name


class Inventory(models.Model):
    seller = models.ForeignKey(SellerProfile, on_delete=models.CASCADE, default=1)
    crops = models.CharField(max_length=50)
    price = models.DecimalField(decimal_places=2, max_digits=6)
    quantity = models.DecimalField(decimal_places=3, max_digits=10)
    location = models.PointField(geography=True, default=Point(0.0, 0.0))
    ratings = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=3)

class UserProfile(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.CharField(max_length=1000)
    location = models.PointField(geography=True, default=Point(0.0, 0.0))

    def __str__(self):
        return self.first_name+' '+self.last_name

class Cart(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, default=1)
    seller = models.ForeignKey(SellerProfile, on_delete=models.CASCADE, default=1)
    item = models.CharField(max_length=50)
    price = models.DecimalField(decimal_places=2, max_digits=6)
    quantity = models.DecimalField(decimal_places=3, max_digits=10)

class OrderHistory(models.Model):
    when = models.DateTimeField(default=datetime.now)
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, default=1)
    seller = models.ForeignKey(SellerProfile, on_delete=models.CASCADE, default=1)
    item = models.CharField(max_length=50)
    price = models.DecimalField(decimal_places=2, max_digits=6)
    quantity = models.DecimalField(decimal_places=3, max_digits=10)
    status = models.BooleanField(default=True)

class Image(models.Model):
    keyword = models.CharField(max_length=20, default='')
    url = models.TextField(default='')

