from django.shortcuts import render
from .serializers import TeacherSerializer
from .models import *
from rest_framework import generics
# Create your views here.

class ApiList(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    


class ApiUpdate(generics.RetrieveDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer