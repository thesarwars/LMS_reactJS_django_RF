from . import views
from django.urls import path, include


urlpatterns = [
    # teacher
    path('teacher/', views.TeacherList.as_view()),
    path('teacher/<int:pk>/', views.TeacherUpdate.as_view()),
    path('teacher/dashboard/<int:pk>/', views.TeacherDashboardView.as_view()),
    path('user/student-dashboard/<int:pk>/', views.StudentDashboardView.as_view()),
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
    path('course/<int:pk>', views.CourseListDetail.as_view()),
    
    #student
    path('student/', views.StudentList.as_view()),
    path('student-login', views.student_login),
    path('enroll-student/', views.EnrollStudentList.as_view()),
    path('enroll-status/<int:student_id>/<int:course_id>/', views.enroll_status),
    path('view-enrolled-students/<int:course_id>/', views.EnrolledStudentsView.as_view()),
    path('view-enrolled-courses/<int:student_id>/', views.EnrolledStudentsView.as_view()),
    path('all-enrolled-students/<int:teacher_id>/', views.EnrolledStudentsView.as_view()),
    path('recommended-course/<int:studentId>/', views.CourseList.as_view()),
    path('course-rating/<int:course_id>', views.RatingCourseView.as_view()),
    path('rating-status/<int:student_id>/<int:course_id>/', views.rating_status),
    path('fav-status/<int:student_id>/<int:course_id>/', views.favourite_status),
    path('addtofav/', views.AddToFavView.as_view()),
    path('removefav/<int:student_id>/<int:course_id>/', views.del_favourite_status),
    path('fav-courses/<int:student_id>/', views.AddToFavView.as_view()),
    path('student-assignment/<int:student_id>/<int:teacher_id>/<int:course_id>/', views.StudentAssignmentView.as_view()),
    # path('show-courses/<int:student_id>/<int:teacher_id>/<int:course_id>/', views.EnrolledStudentsView.as_view()),
    path('my-assignment/<int:student_id>/', views.MyAssignmentView.as_view()),
    path('update-assignment/<int:pk>', views.UpdateAssignment.as_view()),
]