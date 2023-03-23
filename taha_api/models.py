from django.db import models

# Create your models here.
# Teacher models here.
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=50)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=50)
    phone_no = models.CharField(max_length=50)
    skills = models.TextField()
    
    def __str__(self) -> str:
        return self.full_name
    
    
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
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    description = models.TextField()
    featured_img = models.ImageField(upload_to='featured_img/', null=True)
    techs = models.TextField(null=True)
    
    
    def __str__(self):
        return self.title


class Chapter(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    description = models.TextField()
    video = models.FileField(upload_to='chapter_videos/', null=True)
    remarks = models.TextField(null=True)
    
    
    def __str__(self):
        return self.title

    
# Student models here.
class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=50)
    password = models.CharField(max_length=100)
    qualification = models.CharField(max_length=50)
    phone_no = models.CharField(max_length=50)
    address = models.TextField()
    intereseted_cat = models.TextField()