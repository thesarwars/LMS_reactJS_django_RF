# Generated by Django 4.1.7 on 2023-05-26 19:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("taha_api", "0029_alter_attemtedquiz_right_ans"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="AttemtedQuiz",
            new_name="AttemptQuiz",
        ),
        migrations.RenameField(
            model_name="attemptquiz",
            old_name="attemted_time",
            new_name="attempted_time",
        ),
    ]