from . import views
from django.urls import path, include


urlpatterns = [
    # teacher
    path('teacher/', views.TeacherList.as_view()),
    path('teacher/<int:pk>/', views.TeacherUpdate.as_view()),
    path('teacher/dashboard/<int:pk>/', views.TeacherDashboardView.as_view()),
    path('teacher/change-pass/<int:teacher_id>/', views.teacher_change_pass),
    path('teacher-login', views.teacher_login),
    
    # category
    path('category/', views.CategoryList.as_view()),
    # course
    path('course/', views.CourseList.as_view()),
    path('popular-courses/', views.RatingCourseView.as_view()),
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
    path('student/<int:pk>/', views.StudentUpdate.as_view()),
    path('user/student-dashboard/<int:pk>/', views.StudentDashboardView.as_view()),
    path('user/change-pass/<int:student_id>/', views.student_change_pass),
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
    path('student/view-notification/<int:student_id>/', views.NotificationList.as_view()),
    path('save-notification/', views.NotificationList.as_view()),
    
    # quiz section
    path('quiz/', views.QuizList.as_view()),
    path('teacher-quiz/<int:teacher_id>/', views.TeacherQuizList.as_view()),
    # Teacher Quiz edit, delete url
    path('quiz/<int:pk>', views.QuizDetail.as_view()),
    # Quiz Question section
    path('quiz-question/', views.QuizQuestionView.as_view()),
    path('teacher-quiz-question/<int:quiz_id>/', views.QuizQuestionList.as_view()),
    path('quiz-question/<int:quiz_id>/<int:limit>/', views.QuizQuestionList.as_view()),
    path('quiz-question/<int:pk>', views.QuizQuestionDetail.as_view()),
    # assign quiz
    path('assign-quiz/', views.AssignCourseQuiz.as_view()),
    path('quiz-assign-status/<int:quiz_id>/<int:course_id>/', views.quiz_assign_status),
    path('view-assigned-quiz/<int:course_id>', views.AssignCourseQuiz.as_view()),
    path('attempted-quiz/', views.AttemptedQuizView.as_view()),
    path('quiz-question/<int:quiz_id>/next-question/<int:question_id>', views.QuizQuestionList.as_view()),
    path('quiz-attempt-status/<int:quiz_id>/<int:student_id>/', views.quiz_attempt_status),
    
]