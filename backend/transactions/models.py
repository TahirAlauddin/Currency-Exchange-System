# transactions/models.py
from django.db import models

class Transaction(models.Model):
    """
    Transaction Model

    Represents a currency transaction in the system. 
    Includes transaction type (buy/sell), amount, currency, and timestamp of the transaction.
    """
    TRANSACTION_TYPES = [
        ('buy', 'Buy'),
        ('sell', 'Sell'),
    ]
    
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.ForeignKey('Currency', on_delete=models.CASCADE, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type} - {self.amount} {self.currency}"

class Currency(models.Model):
    """
    Currency Model

    Represents a currency in the system. 
    Includes the currency name, symbol, and its exchange rate.
    """
    name = models.CharField(max_length=50, unique=True)
    symbol = models.CharField(max_length=10, unique=True)
    exchange_rate = models.DecimalField(max_digits=10, decimal_places=4)

    def __str__(self):
        return f"{self.name} ({self.symbol})"
