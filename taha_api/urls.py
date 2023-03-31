from . import views
from django.urls import path, include


urlpatterns = [
    # teacher
    path('teacher/', views.TeacherList.as_view()),
    path('teacher/<int:teacher_id>/', views.TeacherUpdate.as_view()),
    path('teacher-login', views.teacher_login),
    
    # category
    path('category/', views.CategoryList.as_view()),
    # course
    path('course/', views.CourseList.as_view()),
    # chapter
    path('chapter/', views.ChapterList.as_view()),
    # specific chapter
    path('chapter/<int:pk>/', views.ChapterDetailView.as_view()),
    # Course Chapters
    path('course-chapter/<int:course_id>', views.CourseChapterList.as_view()),
    # Teacher course
    path('teacher-course/<int:teacher_id>', views.TeacherCourseList.as_view()),
    # Specific course 
    # path('course-details/<int:pk>', views.CourseListDetail.as_view()),
]