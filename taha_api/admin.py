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
