# Generated by Django 4.1.7 on 2023-05-05 17:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("taha_api", "0023_remove_notification_course_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Quiz",
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
                ("title", models.CharField(max_length=200)),
                ("detail", models.TextField()),
                ("add_time", models.DateTimeField(auto_now_add=True)),
                (
                    "teacher",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="taha_api.teacher",
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Quiz",
            },
        ),
        migrations.CreateModel(
            name="QuizQuestions",
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
                (
                    "question_title",
                    models.CharField(max_length=200, verbose_name="Question Title"),
                ),
                ("option1", models.CharField(max_length=200)),
                ("option2", models.CharField(max_length=200)),
                ("option3", models.CharField(max_length=200)),
                ("option4", models.CharField(max_length=200)),
                ("correct_ans", models.CharField(max_length=200)),
                ("add_time", models.DateTimeField(auto_now_add=True)),
                (
                    "quiz",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="taha_api.quiz"
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Quiz Questions",
            },
        ),
        migrations.CreateModel(
            name="CourseQuiz",
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
                ("add_time", models.DateTimeField(auto_now_add=True)),
                (
                    "quiz",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="taha_api.quiz"
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
                "verbose_name_plural": "Quiz Course",
            },
        ),
    ]
