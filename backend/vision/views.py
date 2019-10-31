from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django_drf_filepond.api import store_upload, delete_stored_upload
from django_drf_filepond.models import TemporaryUpload, StoredUpload
import django_drf_filepond
from .googleapi import getImage
import shortuuid

import os, base64
import json

import ipdb


def _get_file_id():
    return shortuuid.uuid()

@csrf_exempt
def image(request):
    # if request.method == 'POST':
    #     print(request.body)
    #     body = json.loads(request.body.decode())
    #     text_list = getImage(body['url'])
    #     text_json = [text.description for text in text_list]
    #     return JsonResponse({"data": text_json}, status=200)
    # else:
    #     return HttpResponseNotAllowed(['GET', 'POST'])
    if request.method == 'POST':
        # ipdb.set_trace()
        data = request.POST
        # try:
        #     filepond_id_list = data.getlist('filepond')
        # except KeyError:
        #     return HttpResponseBadRequest('Missing Filepond key in form.')
        #
        # if not isinstance(filepond_id_list, list):
        #     return HttpResponseBadRequest('Unexpected data type of filepond id list.')

        # print(filepond_id_list)
        # stored_id_list = []
        # for upload_id in filepond_id_list:
        #     # temp_upload = TemporaryUpload.objects.get(upload_id=upload_id)
        #     store_upload(upload_id, os.path.join(upload_id, temp_upload.upload_name))
        #     stored_id_list.append(upload_id)
        file = request.FILES['filepond']
        # with file.open("rb") as img:
        #     encoded_img = base64.b64encode(img.read())
        text_list = getImage(file)

        text_json = [text.description for text in text_list]
        return JsonResponse({"data": text_json}, status=200)

        # upload_id = _get_file_id()
        # # TODO save this to Image Model
        # return HttpResponse(upload_id, status=200, content_type='text/plain')


