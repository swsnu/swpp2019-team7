# pylint: skip-file
from django.test import TestCase, Client
from django.core import management
from rest_framework import status

import json

from .models import Notification, NotificationTime
from user.models import User
from pill.models import Pill
from notisetting.models import NotiSetting

def time_to_datetime(time):
    datetime = time[0:2]+time[3:5]
    return datetime


class TempTestCase(TestCase):
    def setUp(self):
        management.call_command('loaddata', 'dataset/fixtures/pill_data.json')
        self.client = Client()
        new_user = User.objects.create_user(email="test1@test.com", password="test1", name="test1")
        new_notisetting = NotiSetting(user=new_user)
        new_notisetting.save()
        self.client.login(email="test1@test.com", password="test1")
        new_pill = Pill.objects.get(pk=1)  # get pill object from Pill model by id
        new_user.pills.add(new_pill)  # add retrieved pill object to current user's pills field
        new_notification = Notification.create(new_user, new_pill)
        new_notitime = NotificationTime.objects.get(notification=new_notification)
        time_string = time_to_datetime(new_notitime.get_4_digit_time())

    def test_get(self):
        response = self.client.get('/api/webnoti/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            [{'id':1, 'pill-name': '마이더블유피아이에이치쉐이크', 'pill-id': 1, 'activated': True, 'time': ['0900']}]
        )

    def test_put(self):
        response = self.client.put('/api/webnoti/1/',
            json.dumps({'activated': False, 'time': ['1000']}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        new_user = User.objects.get(email="test1@test.com")
        new_pill = Pill.objects.get(pk=1)
        new_webnoti = Notification.objects.get(user = new_user, pill = new_pill)
        self.assertEqual(new_webnoti.activated, False)
        response = self.client.get('/api/webnoti/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            [{'id':2, 'pill-name': '마이더블유피아이에이치쉐이크', 'pill-id': 1, 'activated': False, 'time': ['1000']}]
        )

        response = self.client.put('/api/webnoti/1/',
            json.dumps({'activated': False, 'time': ['1000', '1100']}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(new_webnoti.activated, False)
        notitime_list = NotificationTime.objects.filter(notification=new_webnoti)
        time_list=[]
        for noti in notitime_list:
            time_list.append((noti.get_4_digit_time()))
        self.assertEqual(time_list, ['1000', '1100'])
        
        response = self.client.put('/api/webnoti/1/',
            json.dumps({'activated': False, 'time': ['0900']}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(new_webnoti.activated, False)
        notitime_list = NotificationTime.objects.filter(notification=new_webnoti)
        time_list=[]
        for noti in notitime_list:
            time_list.append((noti.get_4_digit_time()))
        self.assertEqual(time_list, ['0900'])
    
    #def test_unallowed
        response = self.client.delete('/api/webnoti/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        response = self.client.delete('/api/webnoti/1/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        response = self.client.put('/api/webnoti/1/',
            json.dumps({'activated': False}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.client.logout()
        response = self.client.get('/api/webnoti/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        response = self.client.put('/api/webnoti/1/',
            json.dumps({'activated': False, 'time': ['1000']}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
# Create your tests here.