# transactions/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Transaction
import json

@csrf_exempt
def transaction_list(request):
    if request.method == 'GET':
        transactions = list(Transaction.objects.values())
        return JsonResponse(transactions, safe=False)

    if request.method == 'POST':
        data = json.loads(request.body)
        transaction = Transaction.objects.create(**data)
        return JsonResponse({'message': 'Transaction created'}, status=201)
