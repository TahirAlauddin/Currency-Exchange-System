# transactions/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('transactions', views.TransactionsViewSet, basename='transactions')
router.register('currencies', views.CurrencyViewSet, basename='currencies')

urlpatterns = [
    
]


urlpatterns += router.get_urls()
