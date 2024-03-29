# Generated by Django 4.1.7 on 2023-04-15 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("taha_api", "0007_courserating"),
    ]

    operations = [
        migrations.RenameField(
            model_name="teacher",
            old_name="details",
            new_name="bio",
        ),
        migrations.RemoveField(
            model_name="teacher",
            name="phone_no",
        ),
        migrations.AddField(
            model_name="teacher",
            name="profile_img",
            field=models.ImageField(null=True, upload_to="profile_img/"),
        ),
        migrations.AlterField(
            model_name="teacher",
            name="password",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
