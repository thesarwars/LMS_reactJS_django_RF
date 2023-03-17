from django.shortcuts import render
from .serializers import TeacherSerializer
from .models import *
from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
# Create your views here.

# class TeacherList(generics.ListCreateAPIView):
#     queryset = Teacher.objects.all()
#     serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]
    


# class TeacherUpdate(generics.RetrieveDestroyAPIView):
#     queryset = Teacher.objects.all()
#     serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]

class TeacherList(APIView):
    def get(self, request, format=None):
        teacher = Teacher.objects.all()
        serializer = TeacherSerializer(teacher, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
            serializer = TeacherSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)