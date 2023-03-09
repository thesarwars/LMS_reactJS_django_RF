from django.db import models

# Create your models here.
# Teacher models here.
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=50)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=50)
    phone_no = models.CharField(max_length=50)
    address = models.TextField()
    
    
# Course Category models here.
class CourseCategory(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    
    class Meta:
        verbose_name_plural = 'Course Categories'
        
        
# Course models here.
class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    description = models.TextField()

    
# Student models here.
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=50)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=50)
    phone_no = models.CharField(max_length=50)
    address = models.TextField()
    intereseted_cat = models.TextField()