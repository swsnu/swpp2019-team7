from django.http import HttpResponseNotAllowed, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .googleapi import getImage


@csrf_exempt
def image(request):
    if request.method == 'POST':
        body = json.loads(request.body.decode())
        text_list = getImage(body['url'])
        text_json = [text.description for text in text_list]
        return JsonResponse({"data": text_json}, status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])
