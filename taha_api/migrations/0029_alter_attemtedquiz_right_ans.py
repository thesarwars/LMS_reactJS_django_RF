# Generated by Django 4.1.7 on 2023-05-26 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("taha_api", "0028_attemtedquiz_right_ans"),
    ]

    operations = [
        migrations.AlterField(
            model_name="attemtedquiz",
            name="right_ans",
            field=models.CharField(max_length=50, null=True),
        ),
    ]