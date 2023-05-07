# Generated by Django 4.1.7 on 2023-05-04 18:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("taha_api", "0021_rename_intereseted_cat_student_interested_cat"),
    ]

    operations = [
        migrations.CreateModel(
            name="Notification",
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
                ("is_read", models.BooleanField(default=False)),
                (
                    "notif_sub",
                    models.CharField(
                        max_length=200, verbose_name="Notification Subject"
                    ),
                ),
                (
                    "notif_to",
                    models.CharField(max_length=100, verbose_name="Notification to"),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="taha_api.course",
                    ),
                ),
                (
                    "student",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="taha_api.student",
                    ),
                ),
                (
                    "teacher",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="taha_api.teacher",
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Notification",
            },
        ),
    ]