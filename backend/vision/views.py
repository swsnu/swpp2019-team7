from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .vision_api import call_ocr_api
import shortuuid


def _get_file_id():
    return shortuuid.uuid()


@csrf_exempt
def image(request):
    if request.method == 'POST':
        file = request.FILES['filepond']
        text_list = call_ocr_api(file)

        # TODO add image file to Image Model!!!
        text_json = [text.description for text in text_list]
        return JsonResponse({"data": text_json}, status=200)


