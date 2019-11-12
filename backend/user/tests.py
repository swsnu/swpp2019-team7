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
                                    json.dumps({'password': 'test1'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

       
        
    def test_signout(self):
        response = self.client.get('/api/user/signout/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        
       
    def test_user_info(self):
        response = self.client.get('/api/user/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.put('/api/user/',
                                    json.dumps({'name': 'John Doe', 'password': 'test11'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        new_user = User.objects.get(email="test1@test.com")
        self.assertEqual(new_user.name, 'John Doe')

    def test_unauth(self):
        self.client.logout()
        response = self.client.get('/api/user/signout/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


        response = self.client.post('/api/user/signin/',
                                    json.dumps({'email': 'test2@test.com', 'password': 'test'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response = self.client.get('/api/user/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response = self.client.put('/api/user/',
                                    json.dumps({'name': 'John Doe', 'password': 'test11'}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


        response = self.client.put('/api/user/',
                                    json.dumps({}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_notallow(self):
        response = self.client.get('/api/user/signin/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.delete('/api/user/signup/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        
        response = self.client.delete('/api/user/signout/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.delete('/api/user/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.delete('/api/token/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.get('/api/token/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

# Create your tests here.
