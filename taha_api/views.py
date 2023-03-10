from django.shortcuts import render
from .serializers import TeacherSerializer
from .models import *
from rest_framework import generics
from rest_framework import permissions
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.views import APIView
# Create your views here.

class ApiList(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [permissions.IsAuthenticated]
    


class ApiUpdate(generics.RetrieveDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [permissions.IsAuthenticated]

# class ApiList(APIView):
#     def post(self, request, format=None):
#             serializer = TeacherSerializer(data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)