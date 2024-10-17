
from .models import Currency
from .serializers import CurrencySerializer
from rest_framework.viewsets import ModelViewSet
from .serializers import TransactionSerializer
from .models import Transaction

class TransactionsViewSet(ModelViewSet):
    """
    A viewset that provides the standard actions for managing transactions.
    
    This viewset supports the following actions:
    - list: Retrieve all transactions.
    - create: Create a new transaction.
    - retrieve: Retrieve a single transaction by ID.
    - update: Update an existing transaction.
    - partial_update: Partially update an existing transaction.
    - destroy: Delete a transaction.
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class CurrencyViewSet(ModelViewSet):
    """
    A viewset that provides the standard actions for managing currencies.
    
    This viewset supports the following actions:
    - list: Retrieve all currencies.
    - create: Create a new currency.
    - retrieve: Retrieve a single currency by ID.
    - update: Update an existing currency.
    - partial_update: Partially update an existing currency.
    - destroy: Delete a currency.
    """
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer

