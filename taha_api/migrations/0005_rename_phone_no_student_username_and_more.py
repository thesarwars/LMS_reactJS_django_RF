# Generated by Django 4.1.7 on 2023-04-07 18:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("taha_api", "0004_chapter"),
    ]

    operations = [
        migrations.RenameField(
            model_name="student",
            old_name="phone_no",
            new_name="username",
        ),
        migrations.RemoveField(
            model_name="student",
            name="address",
        ),
        migrations.RemoveField(
            model_name="student",
            name="qualification",
        ),
        migrations.AlterField(
            model_name="chapter",
            name="course",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="course_chapters",
                to="taha_api.course",
            ),
        ),
        migrations.AlterField(
            model_name="course",
            name="teacher",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="teacher_courses",
                to="taha_api.teacher",
            ),
        ),
    ]
