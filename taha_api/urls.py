from . import views
from django.urls import path, include


urlpatterns = [
    # teacher
    path('teacher/', views.TeacherList.as_view()),
    path('teacher/<int:pk>/', views.TeacherUpdate.as_view()),
    path('teacher-login', views.teacher_login),
    
    # category
    path('category/', views.CategoryList.as_view()),
    # course
    path('course/', views.CourseList.as_view()),
    # Teacher course
    path('teacher-course/<int:teacher_id>', views.TeacherCourseList.as_view()),
]