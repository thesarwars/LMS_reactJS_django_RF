from rest_framework import serializers
from .models import *

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id', 'full_name', 'details', 'email', 'password', 'qualification', 'phone_no', 'skills', 'teacher_courses', 'teach_skills']
        
        def __init__(self, *args, **kwargs):
            super(TeacherSerializer, self).__init__(*args, **kwargs)
            request = self.context.get('request')
            self.Meta.depth = 0
            if request and request.method == 'GET':
                self.Meta.depth = 1
        

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = ['id', 'title', 'description']



class CourseSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Course
        fields = ['id', 'category', 'teacher', 'title', 'description', 'featured_img', 'techs', 'course_chapters', 'related_course', 'tech_list', 'total_enrolled']
        
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
        fields = ['id', 'full_name', 'email', 'username', 'password', 'intereseted_cat']
        
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
                self.Meta.depth = 1



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
                
                

