# pylint: skip-file
# Imports the Google Cloud client library
from django.http import JsonResponse, HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from google.cloud import vision
from google.cloud.vision import types
import shortuuid
import rest_framework.status as status
import json
from dataset.preprocess import PillDataset

from pill.models import Pill
from .models import Image
from .vision_api import call_ocr_api

def _get_file_id():
    return shortuuid.uuid()

# TODO erase csrf_exempt below
@csrf_exempt
def image(request):
    """REST API handler for image model
    POST: recieve image from frontend. Send it to google vision API and return result"""
    if request.method == 'POST':
        file = request.FILES['filepond']

        image_instance = Image(filename=_get_file_id(), content=file, user=None, pill=None)
        print(request.user)
        print(request)
        if request.user.is_authenticated:
            image_instance.user = request.user
        image_instance.save()

        product = call_ocr_api(file)

        if product is not None:
            # fetched product successfully
            pill = Pill.objects.get(id=product["pk"])
            if request.user.is_authenticated:
                Image.objects.filter(user=request.user, pill=pill).delete()
                image_instance.filename = f'{request.user.name}_{pill.product_name}'
            else:
                image_instance.filename = f'[Anonymous]_{pill.product_name}'
            image_instance.pill = pill
            image_instance.save()

        return JsonResponse({
            "product": product["fields"] if isinstance(product, dict) else None,
            "file": image_instance.content.url,  # url of image file saved in Image DB
            "image_id": image_instance.id,
        }, status=status.HTTP_200_OK)

    if request.method == 'PUT':
        if request.user.is_authenticated:
            try:
                req_data = json.loads(request.body.decode())
                req_id = req_data['image_id']
            except (KeyError, ValueError):
                return HttpResponseBadRequest()

            image_instance = Image.objects.get(id=req_id)
            image_instance.user = request.user
            print(len('[Anonymous]_'))
            print(image_instance.filename[len('[Anonymous]_')+1:])
            print(f'{request.user.name}_{image_instance.filename[len("[Anonymous]_")+1:]}')
            image_instance.filename = image_instance.filename = f'{request.user.name}_{image_instance.filename[len("[Anonymous]_")+1:]}'
            image_instance.save()
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)

    if request.method == 'DELETE':
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

    return HttpResponseNotAllowed(['POST', 'PUT', 'DELETE'])
