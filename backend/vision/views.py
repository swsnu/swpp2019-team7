# pylint: skip-file
# Imports the Google Cloud client library
from django.http import JsonResponse, HttpResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from google.cloud import vision
from google.cloud.vision import types
import shortuuid
import rest_framework.status as status

from dataset.preprocess import PillDataset

from pill.models import Pill
from .models import Image


def _get_file_id():
    return shortuuid.uuid()


def call_ocr_api(file):
    """ Call ocr"""
    with file.open('rb') as img:
        content = img.read()

    image_image = types.Image(content=content)

    # Performs label detection on the vision file
    client = vision.ImageAnnotatorClient()
    response = client.text_detection(image=image_image)
    text_list = response.text_annotations

    if len(text_list) > 0:
        text_list = text_list[0].description.split("\n")

    return PillDataset.get_instance().match_product(text_list)


# TODO erase csrf_exempt below
@csrf_exempt
def image(request):
    """REST API handler for image model
    POST: recieve image from frontend. Send it to google vision API and return result"""
    if request.method == 'POST':
        file = request.FILES['filepond']

        image_instance = Image(filename=_get_file_id(), content=file, user=request.user, pill=None)
        image_instance.save()

        product = call_ocr_api(file)

        if product is not None:
            # fetched product successfully
            pill = Pill.objects.get(id=product["pk"])
            Image.objects.filter(user=request.user, pill=pill).delete()
            image_instance.pill = pill
            image_instance.filename = f'{request.user.name}_{pill.product_name}'
            image_instance.save()

        return JsonResponse({
            "product": product["fields"] if isinstance(product, dict) else None,
            "file": image_instance.content.url,  # url of image file saved in Image DB
        }, status=status.HTTP_200_OK)

    if request.method == 'DELETE':
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

    return HttpResponseNotAllowed(['POST', 'DELETE'])
