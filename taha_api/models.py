from django.db import models;
from django.core import serializers as core_serializers

# Create your models here.
# Teacher models here.
class Teacher(models.Model):
    full_name = models.CharField(max_length=100)
    bio = models.TextField()
    email = models.EmailField(max_length=50)
    password = models.CharField(max_length=100, null = True, blank = True)
    qualification = models.CharField(max_length=50)
    profile_img = models.ImageField(upload_to='profile_img/', null=True)
    skills = models.TextField()
    
    def __str__(self) -> str:
        return self.full_name
    
    def teach_skills(self):
        teacher_skill = self.skills.split(',')
        return teacher_skill
    
    def total_teacher_courses(self):
        teacher_course = Course.objects.filter(teacher = self).count()
        return teacher_course
    
    def total_teacher_chapters(self):
        teacher_chapter = Chapter.objects.filter(course__teacher = self).count()
        return teacher_chapter
    
    def total_teacher_students(self):
        teacher_students = EnrollCourseStudent.objects.filter(course__teacher = self).count()
        return teacher_students
    
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
    
    # related_course function start
    
    def related_course(self):           
        related_videos = Course.objects.filter(techs__icontains = self.techs)
        return core_serializers.serialize('json',related_videos)

    def tech_list(self):
        tech_list = self.techs.split(',')
        return tech_list
    
    # related course end             
    
    def total_enrolled(self):
        total_enrolled_students = EnrollCourseStudent.objects.filter(course = self).count()
        return total_enrolled_students
    
    def course_rating(self):
        course_rating = CourseRating.objects.filter(course = self).aggregate(avg_rating=models.Avg('rating'))
        return course_rating['avg_rating']
    

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
    
    def enrolled_courses(self):
        enrolled_courses = EnrollCourseStudent.objects.filter(student = self).count()
        return enrolled_courses
    
    def favourite_courses(self):
        favourite_courses = AddToFav.objects.filter(student = self).count()
        return favourite_courses
    
    def complete_assignment(self):
        complete_assignment = StudentAssignment.objects.filter(student = self, assignment_status=True).count()
        return complete_assignment
    
    def pending_assignment(self):
        pending_assignment = StudentAssignment.objects.filter(student = self, assignment_status=False).count()
        return pending_assignment
    

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
    # status = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.rating)
    
    class Meta:
        verbose_name_plural = 'Course Rating'
        

# Course add to favourite by student       
class AddToFav(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.status)
    
    class Meta:
        verbose_name_plural = 'Add to Favourite'
        
        
class StudentAssignment(models.Model):
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    details = models.TextField()
    assignment_status = models.BooleanField(default=False, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    
    class Meta:
        verbose_name_plural = ("Student Assignments")

    def __str__(self):
        return self.title