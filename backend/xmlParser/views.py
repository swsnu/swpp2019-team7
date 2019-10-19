from django.http import HttpResponseBadRequest, HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Pill

@csrf_exempt
def pill_list(request):
    if request.method == 'GET':
        pill_all_list = [pill for pill in Pill.objects.all().values()]
        return JsonResponse(pill_all_list, safe=False)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])
