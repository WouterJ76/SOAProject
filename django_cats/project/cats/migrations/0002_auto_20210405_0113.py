# Generated by Django 3.1.7 on 2021-04-04 23:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cats', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cat',
            old_name='breed',
            new_name='characteristics',
        ),
    ]
