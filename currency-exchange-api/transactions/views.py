# transactions/views.py
from .models import Currency
from .serializers import CurrencySerializer
from rest_framework.viewsets import ModelViewSet
from .serializers import TransactionSerializer
from .models import Transaction

class TransactionsViewSet(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class CurrencyViewSet(ModelViewSet):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer

