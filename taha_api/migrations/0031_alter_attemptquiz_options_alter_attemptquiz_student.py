# Generated by Django 4.1.7 on 2023-05-26 19:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("taha_api", "0030_rename_attemtedquiz_attemptquiz_and_more"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="attemptquiz",
            options={"verbose_name_plural": "Attempted Quiz"},
        ),
        migrations.AlterField(
            model_name="attemptquiz",
            name="student",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="taha_api.student"
            ),
        ),
    ]
