import shortuuid

from django.http import JsonResponse, HttpResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from .vision_api import call_ocr_api

def _get_file_id():
    return shortuuid.uuid()


@csrf_exempt
def image(request):
    """REST API handler for image model
    POST: recieve image from frontend. Send it to google vision API and return result"""
    if request.method == 'POST':
        file = request.FILES['filepond']
        text_list = call_ocr_api(file)

        # TODO add image file to Image Model!!!
        text_json = [text.description for text in text_list]
        return JsonResponse({"data": text_json}, status=200)
    return HttpResponseNotAllowed(['POST'])
        