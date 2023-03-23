# Generated by Django 4.1.7 on 2023-03-23 18:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("taha_api", "0003_course_featured_img_course_techs"),
    ]

    operations = [
        migrations.CreateModel(
            name="Chapter",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=150)),
                ("description", models.TextField()),
                ("video", models.FileField(null=True, upload_to="chapter_videos/")),
                ("remarks", models.TextField(null=True)),
                (
                    "course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="taha_api.course",
                    ),
                ),
            ],
        ),
    ]
