from . import views
from django.urls import path


urlpatterns = [
    path('apiview/', views.ApiList.as_view()),
    path('apiup/<int:pk>/', views.ApiUpdate.as_view()),
]