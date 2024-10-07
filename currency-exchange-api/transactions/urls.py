# transactions/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('transactions/', views.transaction_list, name='transaction_list'),
    path('transactions/<int:pk>/', views.transaction_detail, name='transaction_detail'),
    path('currencies/', views.currency_list, name='currency_list'),
    path('currencies/<int:pk>/', views.currency_detail, name='currency_detail'),
]
