from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import shortuuid
import rest_framework.status as status

from .models import Image
from .vision_api import call_ocr_api


def _get_file_id():
    return shortuuid.uuid()


@csrf_exempt
def image(request):
    if request.method == 'POST':
        file = request.FILES['filepond']

        filename = _get_file_id()

        image_instance = Image(filename=filename, content=file, user=None, pill=None)
        image_instance.save()

        # text_list = call_ocr_api(file)
        # text_json = [text.description for text in text_list]

        product = call_ocr_api(file)

        return JsonResponse({
            "product": product["fields"] if isinstance(product, dict) else None,
            "file": image_instance.content.url,  # url of image file saved in Image DB
        }, status=status.HTTP_200_OK)

    if request.method == 'DELETE':
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


