# Generated by Django 3.2.7 on 2022-06-06 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('REST', '0002_auto_20220605_1145'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='credentials',
            name='id',
        ),
        migrations.AddField(
            model_name='credentials',
            name='id_cred',
            field=models.AutoField(default=None, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]
