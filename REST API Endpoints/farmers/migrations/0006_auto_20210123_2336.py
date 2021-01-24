# Generated by Django 3.1.5 on 2021-01-23 23:36

import django.contrib.gis.db.models.fields
import django.contrib.gis.geos.point
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('farmers', '0005_auto_20210123_2228'),
    ]

    operations = [
        migrations.AddField(
            model_name='inventory',
            name='location',
            field=django.contrib.gis.db.models.fields.PointField(default=django.contrib.gis.geos.point.Point(0.0, 0.0), geography=True, srid=4326),
        ),
        migrations.AddField(
            model_name='inventory',
            name='ratings',
            field=models.FloatField(default=3, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)]),
        ),
    ]
