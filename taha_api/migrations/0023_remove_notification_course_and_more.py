# Generated by Django 4.1.7 on 2023-05-04 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("taha_api", "0022_notification"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="notification",
            name="course",
        ),
        migrations.AlterField(
            model_name="notification",
            name="is_read",
            field=models.BooleanField(default=False, verbose_name="Read Status"),
        ),
    ]
