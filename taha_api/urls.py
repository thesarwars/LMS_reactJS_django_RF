from . import views
from django.urls import path, include


urlpatterns = [
    path('teacher/', views.TeacherList.as_view()),
    path('apiup/<int:pk>/', views.TeacherUpdate.as_view()),
    
]