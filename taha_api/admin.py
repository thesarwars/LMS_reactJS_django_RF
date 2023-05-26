from django.contrib import admin
from .models import *
# Register your models here.

class ShowEnrollStudent(admin.ModelAdmin):
    list_display = ('course', 'student', 'enrolled_time')


admin.site.register(Teacher)
admin.site.register(CourseCategory)
admin.site.register(Course)
admin.site.register(Chapter)
admin.site.register(Student)
admin.site.register(EnrollCourseStudent, ShowEnrollStudent)

class RatingCourseAdmin(admin.ModelAdmin):
    list_display = ('course', 'student', 'rating', 'rating_time')
    
admin.site.register(CourseRating, RatingCourseAdmin)

class AddToFavAdmin(admin.ModelAdmin):
    list_display = ('course', 'student', 'status')
    
admin.site.register(AddToFav, AddToFavAdmin)
admin.site.register(StudentAssignment)

class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'notif_sub', 'notif_to', 'created_at', 'is_read')
admin.site.register(Notification, NotificationAdmin)

class QuizAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'teacher', 'detail')
admin.site.register(Quiz, QuizAdmin)

class QuizQuestionsAdmin(admin.ModelAdmin):
    list_display = ('id', 'question_title', 'correct_ans', 'quiz')
admin.site.register(QuizQuestions, QuizQuestionsAdmin)

class CourseQuizAdmin(admin.ModelAdmin):
    list_display = ('id', 'quiz', 'teacher', 'course', 'add_time')
admin.site.register(CourseQuizs, CourseQuizAdmin)
admin.site.register(AttemptQuiz)
