# pylint: skip-file
from django.test import TestCase, Client
from rest_framework import status

import json

from .models import User
from notisetting.models import NotiSetting


class TempTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        new_user=User.objects.create_user(email="test1@test.com", password="test1", name="test1")
        new_notisetting = NotiSetting(user=new_user)
        new_notisetting.save()
        self.client.login(email="test1@test.com", password="test1")

    def test_signup(self):
        response = self.client.post('/api/user/signup/',
                                    json.dumps({'email': 'test@test.com', 'password': 'test', 'name': 'test'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.post('/api/user/signup/',
                                    json.dumps({'email': 'test@test.com'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_signin(self):
        response = self.client.post('/api/user/signin/',
                                    json.dumps({'email': 'test1@test.com', 'password': 'test1'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.post('/api/user/signin/',
                                    json.dumps({'email': 'test1@test.com', 'password': 'test'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_info(self):
        response = self.client.get('/api/user/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)




# Create your tests here.
