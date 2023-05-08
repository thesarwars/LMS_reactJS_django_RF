from django.shortcuts import render
from .serializers import TeacherSerializer, CategorySerializer, CourseSerializer, ChapterSerializer, StudentSerializer, EnrollCourseSerializer, CourseRatingSerializer, TeacherDashboardSerializer, AddToFavSerializer, StudentAssignmentSerializer, StudentDashboardSerializer, NotificationSerializer, QuizSerializer, QuestionSerializer

from .models import *
from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.db.models import Q
# Create your views here.

class TeacherList(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
    
    # def get_queryset(self):
    #     teacher_name = self.kwargs('full_name')
    #     teacher = Teacher.objects.get(pk=teacher_name)
    #     return Teacher.objects.filter(teacher=teacher)


class TeacherUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]
    # lookup_field = ['pk']
    
    # def get_queryset(self):
    #     teacher_id = self.kwargs['teacher_id']
    #     teacher = Teacher.objects.get(pk=teacher_id)
    #     return Course.objects.filter(teacher=teacher)
        
        
class TeacherDashboardView(generics.RetrieveAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherDashboardSerializer
    

@csrf_exempt    
def teacher_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        teacherData = Teacher.objects.get(email=email, password=password)
    except Teacher.DoesNotExist:
        teacherData = None
    
    if teacherData:
        return JsonResponse({'bool': True, 'teacher_id': teacherData.id})
    else:
        return JsonResponse({'bool': False})

# class TeacherList(APIView):
#     def get(self, request, format=None):
#         teacher = Teacher.objects.all()
#         serializer = TeacherSerializer(teacher, many=True)
#         return Response(serializer.data)
    
#     def post(self, request, format=None):
#             serializer = TeacherSerializer(data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryList(generics.ListCreateAPIView):
    queryset = CourseCategory.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [permissions.IsAuthenticated]

# Course
class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        qs = super().get_queryset()
        
        if 'result' in self.request.GET:
            qs = Course.objects.all().order_by('-id')[:4]
            
        if 'category' in self.request.GET:
            category = self.request.GET['category']
            qs = Course.objects.filter(techs__icontains = category)
        
        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name = self.request.GET['skill_name']
            teacher = self.request.GET['teacher']
            teacher = Teacher.objects.filter(id=teacher).first()
            qs = Course.objects.filter(techs__icontains = skill_name, teacher=teacher)
        
        
        #  recommended course function   
        
        elif 'studentId' in self.kwargs:
            student_id = self.kwargs['studentId']
            student = Student.objects.get(pk=student_id)
            queries = [Q(techs__iendswith=value) for value in student.intereseted_cat]
            query = queries.pop()
            for item in queries:
                query |= item
            qs = Course.objects.filter(query)
            return qs
        
        #  recommended course function end
        
        return qs

# Specific course detail
class CourseListDetail(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    # permission_classes = [permissions.IsAuthenticated]


class ChapterList(generics.ListCreateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    # permission_classes = [permissions.IsAuthenticated]


# Specific chapter details
class ChapterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    # permission_classes = [permissions.IsAuthenticated]


# Specific Teacher Course
class TeacherCourseList(generics.ListAPIView):
    serializer_class = CourseSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = Teacher.objects.get(pk=teacher_id)
        return Course.objects.filter(teacher=teacher)

@csrf_exempt
def teacher_change_pass(request, teacher_id):
    password = request.POST['password']
    try:
        teacherData = Teacher.objects.get(id=teacher_id)
    except Teacher.DoesNotExist:
        teacherData = None
    if teacherData:
        Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool':False})


# Specific Course chapter list
class CourseChapterList(generics.ListAPIView):
    serializer_class = ChapterSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = Course.objects.get(pk=course_id)
        return Chapter.objects.filter(course=course)
    

# Student section

class StudentList(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
class StudentUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

@csrf_exempt    
def student_login(request):
    email = request.POST['email']
    password = request.POST['password']
    try:
        studentData = Student.objects.get(email=email, password=password)
    except Student.DoesNotExist:
        studentData = None
    
    if studentData:
        return JsonResponse({'bool': True, 'student_id': studentData.id})
        # print(studentData)
    else:
        return JsonResponse({'bool': False})
    
    
class StudentDashboardView(generics.RetrieveAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentDashboardSerializer
    

@csrf_exempt
def student_change_pass(request, student_id):
    password = request.POST['password']
    try:
        studentData = Student.objects.get(id=student_id)
    except Student.DoesNotExist:
        studentData = None
    if studentData:
        Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool':False})
    

# Student enroll in course
class EnrollStudentList(generics.ListCreateAPIView):
    queryset = EnrollCourseStudent.objects.all()
    serializer_class = EnrollCourseSerializer
    
    
def enroll_status(request, student_id, course_id):
    student = Student.objects.filter(id=student_id).first()
    course = Course.objects.filter(id=course_id).first()
    enrollStatus = EnrollCourseStudent.objects.filter(course=course, student=student).count()
    
    if enrollStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})
    
    
class EnrolledStudentsView(generics.ListAPIView):
    queryset = EnrollCourseStudent.objects.all()
    serializer_class = EnrollCourseSerializer
    
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = Course.objects.get(pk=course_id)
            return EnrollCourseStudent.objects.filter(course=course).distinct()
        
        # fetcing student enrolled (all) in course in teacher account
        elif 'teacher_id' in self.kwargs:
            teacher_id = self.kwargs['teacher_id']
            teacher = Teacher.objects.get(pk=teacher_id)
            return EnrollCourseStudent.objects.filter(course__teacher=teacher).distinct()
        # end
        
        # fetcing student enrolled in course in student account
        elif 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id']
            student = Student.objects.get(pk=student_id)
            return EnrollCourseStudent.objects.filter(student=student).distinct()
        # end
    
    
# Course rating by student
class RatingCourseView(generics.ListCreateAPIView):
    queryset = CourseRating.objects.all()
    serializer_class = CourseRatingSerializer
    
    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = Course.objects.get(pk=course_id)
        return CourseRating.objects.filter(course=course)
    
    
def rating_status(request, student_id, course_id):
    student = Student.objects.filter(id=student_id).first()
    course = Course.objects.filter(id=course_id).first()
    enrollStatus = CourseRating.objects.filter(course=course, student=student).count()
    
    if enrollStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})
    
# End

# Student add course to favourite list
# class AddToFavView(generics.ListCreateAPIView):
#     queryset = AddToFav.objects.all()
#     serializer_class = AddToFavSerializer


class AddToFavView(generics.ListCreateAPIView):
    queryset = AddToFav.objects.all()
    serializer_class = AddToFavSerializer
    
    def get_queryset(self):
        if 'student_id' in self.kwargs:
            student_id = self.kwargs['student_id']
            student = Student.objects.get(pk=student_id)
            return AddToFav.objects.filter(student=student).distinct()
        elif 'course_id' in self.kwargs:
            course_id = self.kwargs['course_id']
            course = Course.objects.get(pk=course_id)
            return AddToFav.objects.filter(course=course).distinct()
    
    
def favourite_status(request, student_id, course_id):
    student = Student.objects.filter(id=student_id).first()
    course = Course.objects.filter(id=course_id).first()
    favouriteStatus = AddToFav.objects.filter(course=course, student=student).first()
    
    if favouriteStatus and favouriteStatus.status == True:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})
    
    
def del_favourite_status(request, student_id, course_id):
    student = Student.objects.filter(id=student_id).first()
    course = Course.objects.filter(id=course_id).first()
    favouriteStatus = AddToFav.objects.filter(course=course, student=student).delete()
    
    if favouriteStatus:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})
    
    

class StudentAssignmentView(generics.ListCreateAPIView):
    queryset = StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    
    def get_queryset(self):
        student_id = self.kwargs['student_id']
        teacher_id = self.kwargs['teacher_id']
        course_id = self.kwargs['course_id']
        student = Student.objects.get(pk=student_id)
        teacher = Teacher.objects.get(pk=teacher_id)
        course = Course.objects.get(pk=course_id)
        return StudentAssignment.objects.filter(student=student, teacher=teacher, course=course)
    
    
class MyAssignmentView(generics.ListCreateAPIView):
    queryset = StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    
    
    def get_queryset(self):
        student_id = self.kwargs['student_id']
        student = Student.objects.get(pk=student_id)
        # Update Notification
        Notification.objects.filter(student=student, notif_to='students', notif_sub='assignment').update(is_read=True)
        return StudentAssignment.objects.filter(student=student)
    
    
class UpdateAssignment(generics.RetrieveUpdateDestroyAPIView):
    queryset = StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    
    
class NotificationList(generics.ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    
    
    def get_queryset(self):
        student_id = self.kwargs['student_id']
        student = Student.objects.get(pk=student_id)
        return Notification.objects.filter(student=student, notif_to='students', notif_sub='assignment', is_read=False)
    

# Quiz Section    
class QuizList(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    

class TeacherQuizList(generics.ListAPIView):
    serializer_class = QuizSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        teacher_id = self.kwargs['teacher_id']
        teacher = Teacher.objects.get(pk=teacher_id)
        return Quiz.objects.filter(teacher=teacher)
    
# Specific quiz detail
class QuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    # permission_classes = [permissions.IsAuthenticated]


# Specific Quiz Questions
class QuizQuestionView(generics.ListCreateAPIView):
    queryset = QuizQuestions.objects.all()
    serializer_class = QuestionSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
    
class QuizQuestionList(generics.ListAPIView):
    serializer_class = QuestionSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        quiz_id = self.kwargs['quiz_id']
        quiz = Quiz.objects.get(pk=quiz_id)
        return QuizQuestions.objects.filter(quiz=quiz)


class QuizQuestionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = QuizQuestions.objects.all()
    serializer_class = QuestionSerializer
    # permission_classes = [permissions.IsAuthenticated]