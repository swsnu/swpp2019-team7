from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import shortuuid

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

        text_list = call_ocr_api(file)
        text_json = [text.description for text in text_list]

        return JsonResponse({
            "data": text_json,
            "file": image_instance.content.url
        }, status=200)


