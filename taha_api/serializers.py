from rest_framework import serializers
from .models import *

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id', 
                  'full_name', 
                  'bio', 
                  'email', 
                  'password', 
                  'qualification', 
                  'profile_img', 
                  'skills', 
                  'teacher_courses', 
                  'teach_skills',
                  ]
        
    def __init__(self, *args, **kwargs):
        super(TeacherSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1
                

class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['total_teacher_courses', 'total_teacher_chapters', 'total_teacher_students']
        

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = ['id', 'title', 'description']



class CourseSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Course
        fields = ['id', 
                  'category', 
                  'teacher', 
                  'title', 
                  'description', 
                  'featured_img', 
                  'techs', 
                  'course_chapters', 
                  'related_course', 
                  'tech_list', 
                  'total_enrolled',
                  'course_rating'
                  ]
        
    def __init__(self, *args, **kwargs):
        super(CourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1



class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id', 'course', 'title', 'description', 'video', 'remarks']
        
        
# Student 
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'full_name', 'email', 'username', 'password', 'interested_cat', 'profile_img']
        
    def __init__(self, *args, **kwargs):
        super(StudentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1
        
        
class EnrollCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnrollCourseStudent
        fields = ['id', 'course', 'student', 'enrolled_time']
        
    def __init__(self, *args, **kwargs):
        super(EnrollCourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2



class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRating
        fields = ['id', 'course', 'student', 'rating', 'reviews', 'rating_time']
        
    def __init__(self, *args, **kwargs):
        super(CourseRatingSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1
                

# Student add course to favourite list                
# class AddToFavSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AddToFav
#         fields = ['id', 'course', 'student', 'status']
        
#     def __init__(self, *args, **kwargs):
#         super(AddToFavSerializer, self).__init__(*args, **kwargs)
#         request = self.context.get('request')
#         self.Meta.depth = 0
#         if request and request.method == 'GET':
#             self.Meta.depth = 2


class AddToFavSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddToFav
        fields = ['id', 'course', 'student', 'status']
        
    def __init__(self, *args, **kwargs):
        super(AddToFavSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2


class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAssignment
        fields = ['id', 'teacher', 'student', 'course', 'title', 'details', 'assignment_status', 'created_at']
        
    def __init__(self, *args, **kwargs):
        super(StudentAssignmentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2
            
            
class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['enrolled_courses', 'favourite_courses', 'complete_assignment', 'pending_assignment']
        
        
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'student', 'teacher', 'notif_sub', 'notif_to', 'is_read', 'created_at']
        
    def __init__(self, *args, **kwargs):
        super(NotificationSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2
            

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'teacher', 'detail', 'add_time']
        
    def __init__(self, *args, **kwargs):
        super(QuizSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizQuestions
        fields = ['id', 
                  'quiz', 
                  'question_title', 
                  'option1', 
                  'option2', 
                  'option3', 
                  'option4', 
                  'correct_ans']
        
    def __init__(self, *args, **kwargs):
        super(QuestionSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2