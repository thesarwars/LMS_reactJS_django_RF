from django.db import models;
from django.core import serializers as core_serializers

# Create your models here.
# Teacher models here.
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    details = models.TextField()
    email = models.EmailField(max_length=50)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=50)
    phone_no = models.CharField(max_length=50)
    skills = models.TextField()
    
    def __str__(self) -> str:
        return self.full_name
    
    def teach_skills(self):
        teacher_skill = self.skills.split(',')
        return teacher_skill
    
# Course Category models here.
class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    
    class Meta:
        verbose_name_plural = 'Course Categories'
        
    
    def __str__(self):
        return self.title
        
        
# Course models here.
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='teacher_courses')
    title = models.CharField(max_length=150)
    description = models.TextField()
    featured_img = models.ImageField(upload_to='featured_img/', null=True)
    techs = models.TextField(null=True)
    
    
    class Meta:
        verbose_name_plural = 'Courses'
    
    def __str__(self):
        return self.title
    
    def related_course(self):
        related_videos = Course.objects.filter(techs__icontains = self.techs)
        return core_serializers.serialize('json',related_videos)

    def tech_list(self):
        tech_list = self.techs.split(',')
        return tech_list
    
    def total_enrolled(self):
        total_enrolled_students = EnrollCourseStudent.objects.filter(course = self).count()
        return total_enrolled_students
    

class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='course_chapters')
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to='chapter_videos/', null=True)
    remarks = models.TextField(null=True)
    
    
    class Meta:
        verbose_name_plural = 'Chapters'
    
    def __str__(self):
        return self.title

    
# Student models here.
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=50)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=100)
    intereseted_cat = models.TextField()
    
    class Meta:
        verbose_name_plural = 'Students'
    
    def __str__(self):
        return self.full_name
    

# Enrollment of Students
class EnrollCourseStudent(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="enrolled_courses")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrolled_students')
    enrolled_time = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.course)
    
    class Meta:
        verbose_name_plural = 'Enrolled Courses'


# Rating and Review of Course
class CourseRating(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    rating = models.PositiveBigIntegerField(default=0)
    reviews = models.TextField(null= True)
    rating_time = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.rating)
    
    class Meta:
        verbose_name_plural = 'Course Rating'