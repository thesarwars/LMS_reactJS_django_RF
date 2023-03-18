from . import views
from django.urls import path, include


urlpatterns = [
    path('teacher/', views.TeacherList.as_view()),
    path('teacher/<int:pk>/', views.TeacherUpdate.as_view()),
    path('teacher-login', views.teacher_login),
    
]