# pylint: skip-file
from django.test import TestCase, Client
from django.core import management
from rest_framework import status

from user.models import User

from unittest.mock import MagicMock, patch
#from .vision_api import call_ocr_api

#call_ocr_api = MagicMock(return_value=1) 
from .views import call_ocr_api

class VisionTestCase(TestCase):
    def setUp(self):
        management.call_command('loaddata', 'dataset/fixtures/pill_data.json')
        self.client = Client()
        User.objects.create_user(email="test1@test.com", password="test1", name="test1")
        self.client.login(email="test1@test.com", password="test1")

    @patch('vision.views.call_ocr_api')
    def test_vision_api(self, mockarg):
        mockarg.return_value = {
        "pk": 1,
        "model": "pill.pill",
        "fields": {
            "id": 1,
            "take_method": "1일 1회, 1회 3스푼(35g)을 쉐이크 통에 넣고 물 또는 우유, 두유를 넣어 잘 흔들어서  1일 1회, 1회 1포(35g)를 쉐이크 통에 넣고 물 또는 우유, 두유를 넣어 잘 흔들어서 섭취하십시오.  \r\n기호에 따라 물 또는 우유, 두유의 양을 조절하셔도 좋습니다.",
            "product_name": "마이더블유피아이에이치쉐이크",
            "expiration_date": "제조일로부터 2년.",
            "functions": "[단백질]①근육, 결합조직 등 신체조직의 구성성분②효소, 호르몬, 항체의 구성에 필요③체내 필수 영양성분이나 활성물질의 운반과 저장에 필요④체액, 산-염기의 균형 유지에 필요⑤에너지, 포도당, 지질의 합성에 필요",
            "store_method": "수분, 열에 의해 품질에 영향을 받을 수 있으므로 직사광선을 피해 서늘한 곳에 보관하십시오.\r\n어린이 손에 닿지 않는 곳에 보관하십시오.",
            "company_name": "코스맥스바이오(주)",
            "standards": "① 성상 : 고유의 색택과 향미를 가지고 이미, 이취가 없어야 한다.\r\n② 조단백질 : 표시량(25g/35g)의 80%~120%\r\n③ 대장균군 : 음성",
            "precautions": "[단백질]특정 단백질에 알레르기를 나타내는 경우에는 섭취 주의\r\n섭취 시 위장장애, 소화불량의 증상이 있을 경우 섭취를 중단하십시오. \r\n개인의 신체 상태에 따라 이상 증상이 생길 경우 섭취를 중단하십시오. \r\n섭취 전 제품에 이상이 있는 경우 섭취를 금하십시오.\r\n특정 원료 성분에 알레르기 체질은 원료 성분을 확인 후 섭취하십시오.",
            "take_method_preprocessed": "1일 1회"
            }
        }

        with open('./test_media/image/default_pill_image.jpg', 'rb') as f:
            response = self.client.post('/api/vision/',
                                        {'filepond': f})
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            response = self.client.put('/api/vision/',
                                        {'image_id': 3})
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


            response = self.client.delete('/api/vision/')
            self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
