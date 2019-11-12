# pylint: skip-file
from django.test import TestCase, Client
from rest_framework import status

import json

from .models import NotiSetting
from user.models import User


class TempTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        new_user=User.objects.create_user(email="test1@test.com", password="test1", name="test1")
        new_notisetting = NotiSetting(user=new_user)
        new_notisetting.save()
        self.client.login(email="test1@test.com", password="test1")

    def test_get(self):
        response = self.client.get('/api/user/noti-setting/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_put(self):
        response = self.client.put('/api/user/noti-setting/',
                                    json.dumps({'enable_noti': False, 'enable_segregate': True, 'enable_kakao': False}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        new_notisetting = NotiSetting.objects.get(user = 
                            User.objects.get(email="test1@test.com"))
        print(new_notisetting)
        
        self.assertEqual(new_notisetting.enable_noti, False)
        self.assertEqual(new_notisetting.enable_segregate, True)
        self.assertEqual(new_notisetting.enable_kakao, False)

        response = self.client.put('/api/user/noti-setting/',
                                    json.dumps({'enable_segregate': True, 'enable_kakao': False}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_unauth(self):
        self.client.logout()
        response = self.client.get('/api/user/noti-setting/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response = self.client.put('/api/user/noti-setting/',
                                    json.dumps({'enable_noti': False, 'enable_segregate': True, 'enable_kakao': False}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_notallow(self):
        response = self.client.delete('/api/user/noti-setting/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

# Create your tests here.
