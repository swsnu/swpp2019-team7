# pylint: skip-file
from django.test import TestCase, Client
from django.core import management
from rest_framework import status

import json

from pill.models import Pill
from user.models import User
from notisetting.models import NotiSetting
from notification.models import Notification
from vision.models import Image

class TempTestCase(TestCase):
    def setUp(self):
        management.call_command('loaddata', 'dataset/fixtures/pill_data.json')
        self.client = Client()
        new_user = User.objects.create_user(
            email="test1@test.com", password="test1", name="test1")
        new_notisetting = NotiSetting(user=new_user)
        new_notisetting.save()
        self.client.login(email="test1@test.com", password="test1")
        # get pill object from Pill model by id
        new_pill = Pill.objects.get(pk=1)
        # add retrieved pill object to current user's pills field
        new_user.pills.add(new_pill)
        new_notification = Notification.create(new_user, new_pill)
        new_image = Image.objects.create(filename="file", user=new_user, pill=new_pill)
        new_image.save()
        print(f'setup all images view{Image.objects.all()}')
        self.maxDiff = None

    def test_operation(self):
        response = self.client.post('/api/pill/2/')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {
                "id": 2,
                "take_method": "1일 1회, 1회 1캡슐(500mg)을 물, 음료 등과 같이 섭취한다.",
                "product_name": "마이락토 씨 플러스(MYLACTO C PLUS)",
                "expiration_date": "제조일로부터 18개월까지",
                "functions": "①유산균 증식 및 유해균 억제에 도움을 줄 수 있음 ②배변활동 원활에 도움을 줄 수 있음 \n\n①정상적인 면역기능에 필요②정상적인 세포분열에 필요",
                "store_method": None,
                "company_name": "주식회사 락토메이슨",
                "standards": "성상 : 이미 이취가 없고 고유의 향미가 있는 미백색의 분말을 함유한 투명한 경질캡슐\n대장균군 : 음성\n프로바이오틱스수 : 10,000,000,000 CFU/500mg 이상\n아연 : 2.6mg/500mg (표시량의 80 ~ 150%)\n붕해시험 : 20분이내",
                "precautions": "1) 임산부, 수유부, 질병치료(의약품 복용) 중이신 분은 의사, 약사 등 전문가와 상담 후 섭취하시기 바랍니다.\n2) 특정성분에 알레르기가 있는 분은 과민반응이 나타날 수 있으니 섭취 전에 반드시 원료(성분)를 확인하시기 바랍니다.\n3) 어린이가 함부로 섭취하지 않도록 일일섭취량을 확인하시기 바랍니다.\n4) 이상사례 발생 시 섭취를 중단하고 의사, 약사 등 전문가와 상담하시기 바랍니다.",
                "take_method_preprocessed": "1일 1회",
                "file": '',
            }
        )

        response = self.client.get('/api/pill/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {
                'id': 1,
                'take_method': "1일 1회, 1회 3스푼(35g)을 쉐이크 통에 넣고 물 또는 우유, 두유를 넣어 잘 흔들어서  1일 1회, 1회 1포(35g)를 쉐이크 통에 넣고 물 또는 우유, 두유를 넣어 잘 흔들어서 섭취하십시오.  \r\n기호에 따라 물 또는 우유, 두유의 양을 조절하셔도 좋습니다.",
                "product_name": "마이더블유피아이에이치쉐이크",
                "expiration_date": "제조일로부터 2년.",
                "functions": "[단백질]①근육, 결합조직 등 신체조직의 구성성분②효소, 호르몬, 항체의 구성에 필요③체내 필수 영양성분이나 활성물질의 운반과 저장에 필요④체액, 산-염기의 균형 유지에 필요⑤에너지, 포도당, 지질의 합성에 필요",
                "store_method": "수분, 열에 의해 품질에 영향을 받을 수 있으므로 직사광선을 피해 서늘한 곳에 보관하십시오.\r\n어린이 손에 닿지 않는 곳에 보관하십시오.",
                "company_name": "코스맥스바이오(주)",
                "standards": "① 성상 : 고유의 색택과 향미를 가지고 이미, 이취가 없어야 한다.\r\n② 조단백질 : 표시량(25g/35g)의 80%~120%\r\n③ 대장균군 : 음성",
                "precautions": "[단백질]특정 단백질에 알레르기를 나타내는 경우에는 섭취 주의\r\n섭취 시 위장장애, 소화불량의 증상이 있을 경우 섭취를 중단하십시오. \r\n개인의 신체 상태에 따라 이상 증상이 생길 경우 섭취를 중단하십시오. \r\n섭취 전 제품에 이상이 있는 경우 섭취를 금하십시오.\r\n특정 원료 성분에 알레르기 체질은 원료 성분을 확인 후 섭취하십시오.",
                "take_method_preprocessed": "1일 1회",
                "file": '',
            }
        )
    
        response = self.client.delete('/api/pill/1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


        response = self.client.post('/api/custompill/',
                json.dumps({
                    "take_method": "1일 1회, 1회 1캡슐(500mg)을 물, 음료 등과 같이 섭취한다.",
                    "product_name": "마이f락토 씨 플러스(MYLACTO C PLUS)",
                    "expiration_date": "제조일로부터 18개월까지",
                    "functions": "①유산균 증식 및 유해균 억제에 도움을 줄 수 있음 ②배변활동 원활에 도움을 줄 수 있음 \n\n①정상적인 면역기능에 필요②정상적인 세포분열에 필요",
                    "store_method": None,
                    "company_name": "주식회사 락토메이슨",
                    "standards": "성상 : 이미 이취가 없고 고유의 향미가 있는 미백색의 분말을 함유한 투명한 경질캡슐\n대장균군 : 음성\n프로바이오틱스수 : 10,000,000,000 CFU/500mg 이상\n아연 : 2.6mg/500mg (표시량의 80 ~ 150%)\n붕해시험 : 20분이내",
                    "precautions": "1) 임산부, 수유부, 질병치료(의약품 복용) 중이신 분은 의사, 약사 등 전문가와 상담 후 섭취하시기 바랍니다.\n2) 특정성분에 알레르기가 있는 분은 과민반응이 나타날 수 있으니 섭취 전에 반드시 원료(성분)를 확인하시기 바랍니다.\n3) 어린이가 함부로 섭취하지 않도록 일일섭취량을 확인하시기 바랍니다.\n4) 이상사례 발생 시 섭취를 중단하고 의사, 약사 등 전문가와 상담하시기 바랍니다.",
                    "take_method_preprocessed": "1일 1회",
                    "image_id": 2,
                }),
                content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {
                "id": 26515,
                "take_method": "1일 1회, 1회 1캡슐(500mg)을 물, 음료 등과 같이 섭취한다.",
                "product_name": "마이f락토 씨 플러스(MYLACTO C PLUS)",
                "expiration_date": "제조일로부터 18개월까지",
                "functions": "①유산균 증식 및 유해균 억제에 도움을 줄 수 있음 ②배변활동 원활에 도움을 줄 수 있음 \n\n①정상적인 면역기능에 필요②정상적인 세포분열에 필요",
                "store_method": None,
                "company_name": "주식회사 락토메이슨",
                "standards": "성상 : 이미 이취가 없고 고유의 향미가 있는 미백색의 분말을 함유한 투명한 경질캡슐\n대장균군 : 음성\n프로바이오틱스수 : 10,000,000,000 CFU/500mg 이상\n아연 : 2.6mg/500mg (표시량의 80 ~ 150%)\n붕해시험 : 20분이내",
                "precautions": "1) 임산부, 수유부, 질병치료(의약품 복용) 중이신 분은 의사, 약사 등 전문가와 상담 후 섭취하시기 바랍니다.\n2) 특정성분에 알레르기가 있는 분은 과민반응이 나타날 수 있으니 섭취 전에 반드시 원료(성분)를 확인하시기 바랍니다.\n3) 어린이가 함부로 섭취하지 않도록 일일섭취량을 확인하시기 바랍니다.\n4) 이상사례 발생 시 섭취를 중단하고 의사, 약사 등 전문가와 상담하시기 바랍니다.",
                "take_method_preprocessed": "1일 1회",
                "file": '',
            }
        )


        response = self.client.post('/api/custompill/',
                json.dumps({
                    "take_method": "1일 1회, 1회 1캡슐(500mg)을 물, 음료 등과 같이 섭취한다.",
                    "product_name": "마이f락토 씨 플러스(MYLACTO C PLUS)",
                    "expiration_date": "제조일로부터 18개월까지",
                    "functions": "①유산균 증식 및 유해균 억제에 도움을 줄 수 있음 ②배변활동 원활에 도움을 줄 수 있음 \n\n①정상적인 면역기능에 필요②정상적인 세포분열에 필요",
                    "store_method": None,
                    "company_name": "주식회사 락토메이슨",
                    "standards": "성상 : 이미 이취가 없고 고유의 향미가 있는 미백색의 분말을 함유한 투명한 경질캡슐\n대장균군 : 음성\n프로바이오틱스수 : 10,000,000,000 CFU/500mg 이상\n아연 : 2.6mg/500mg (표시량의 80 ~ 150%)\n붕해시험 : 20분이내",
                    "precautions": "1) 임산부, 수유부, 질병치료(의약품 복용) 중이신 분은 의사, 약사 등 전문가와 상담 후 섭취하시기 바랍니다.\n2) 특정성분에 알레르기가 있는 분은 과민반응이 나타날 수 있으니 섭취 전에 반드시 원료(성분)를 확인하시기 바랍니다.\n3) 어린이가 함부로 섭취하지 않도록 일일섭취량을 확인하시기 바랍니다.\n4) 이상사례 발생 시 섭취를 중단하고 의사, 약사 등 전문가와 상담하시기 바랍니다.",
                    "take_method_preprocessed": "1일 1회",
                    "image_id": 2,
                }),
                content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
        response = self.client.post('/api/custompill/',
                json.dumps({
                    "take_method": "1일 1회, 1회 1캡슐(500mg)을 물, 음료 등과 같이 섭취한다.",
                    "product_name": "마이f락토 씨 플러스(MYLACTO C PLUS)",
                    "expiration_date": "제조일로부터 18개월까지",
                    "functions": "①유산균 증식 및 유해균 억제에 도움을 줄 수 있음 ②배변활동 원활에 도움을 줄 수 있음 \n\n①정상적인 면역기능에 필요②정상적인 세포분열에 필요",
                    "store_method": None,
                    "company_name": "주식회사 락토메이슨",
                    "standards": "성상 : 이미 이취가 없고 고유의 향미가 있는 미백색의 분말을 함유한 투명한 경질캡슐\n대장균군 : 음성\n프로바이오틱스수 : 10,000,000,000 CFU/500mg 이상\n아연 : 2.6mg/500mg (표시량의 80 ~ 150%)\n붕해시험 : 20분이내",
                }),
                content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
        #response = self.client.get('/api/pill/')
        #self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_bad_and_unauthorized(self):
        response = self.client.delete('/api/pill/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.post('/api/pill/1/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        response = self.client.delete('/api/pill/3/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        response = self.client.get('/api/pill/3/')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.client.logout()
        response = self.client.post('/api/pill/3/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        response = self.client.delete('/api/pill/1/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        response = self.client.get('/api/pill/1/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        response = self.client.get('/api/pill/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        response = self.client.post('/api/custompill/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
