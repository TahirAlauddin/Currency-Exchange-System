from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Transaction, Currency


class TransactionAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.currency = Currency.objects.create(
            name="US Dollar", symbol="USD", exchange_rate=1.00
        )
        self.transaction_data = {
            "transaction_type": "buy",
            "amount": 100.00,
            "currency": self.currency.id,
        }
        self.transaction_url = reverse("transactions-list")

    def test_create_transaction(self):
        """Test creating a new transaction"""
        response = self.client.post(self.transaction_url, self.transaction_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Transaction.objects.count(), 1)

    def test_get_transactions(self):
        """Test retrieving a list of transactions"""
        self.transaction_data["currency"] = Currency.objects.get(
            pk=self.transaction_data["currency"]
        )
        Transaction.objects.create(**self.transaction_data)
        response = self.client.get(self.transaction_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class CurrencyAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.currency_data = {
            "name": "Euro",
            "symbol": "EUR",
            "exchange_rate": 1.10,
        }
        self.currency_url = reverse("currencies-list")

    def test_create_currency(self):
        """Test creating a new currency"""
        response = self.client.post(self.currency_url, self.currency_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Currency.objects.count(), 1)
        self.assertEqual(Currency.objects.get().name, "Euro")

    def test_get_currencies(self):
        """Test retrieving a list of currencies"""
        Currency.objects.create(**self.currency_data)
        response = self.client.get(self.currency_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Euro")


class TransactionCurrencyIntegrationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Create a currency
        self.currency = Currency.objects.create(
            name="Japanese Yen", symbol="JPY", exchange_rate=0.0091
        )
        self.transaction_data = {
            "transaction_type": "sell",
            "amount": 500.00,
            "currency": self.currency.id,
        }
        self.currency_url = reverse("currencies-list")
        self.transaction_url = reverse("transactions-list")

    def test_currency_and_transaction_creation(self):
        """Test creating a currency and then creating a transaction using it"""
        # Ensure the currency exists
        response_currency = self.client.get(self.currency_url)
        self.assertEqual(response_currency.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response_currency.data), 1)
        self.assertEqual(response_currency.data[0]["symbol"], "JPY")

        # Create a transaction using the created currency
        response_transaction = self.client.post(
            self.transaction_url, self.transaction_data
        )
        self.assertEqual(response_transaction.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Transaction.objects.count(), 1)
        self.assertEqual(Transaction.objects.get().currency.symbol, "JPY")

    def test_get_transactions_with_currency(self):
        """Test retrieving transactions along with their associated currency"""
        # Create a transaction
        self.transaction_data["currency"] = Currency.objects.get(
            pk=self.transaction_data["currency"]
        )
        Transaction.objects.create(**self.transaction_data)

        response = self.client.get(self.transaction_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["currency"], self.currency.id)
