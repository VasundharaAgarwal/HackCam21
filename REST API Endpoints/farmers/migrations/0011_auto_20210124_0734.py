# Generated by Django 3.1.5 on 2021-01-24 07:34

import django.contrib.gis.db.models.fields
import django.contrib.gis.geos.point
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('farmers', '0010_auto_20210124_0728'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inventory',
            name='latitude',
        ),
        migrations.RemoveField(
            model_name='inventory',
            name='longitude',
        ),
        migrations.AddField(
            model_name='inventory',
            name='location',
            field=django.contrib.gis.db.models.fields.PointField(default=django.contrib.gis.geos.point.Point(0, 0), geography=True, srid=4326),
        ),
    ]
