# pylint: skip-file
from django.test import TestCase, Client
from django.core import management
from rest_framework import status

import json

from .models import Notification, NotificationTime, TelegramUser, NotificationInterval
from user.models import User
from pill.models import Pill
from notisetting.models import NotiSetting

def time_to_datetime(time):
    datetime = time[0:2]+time[3:5]
    return datetime

class WebNotiTest(TestCase):
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
        new_tel_user = TelegramUser.objects.create(
            user=new_user,
            telegram_username="jinsun",
            telegram_first_name="JinSun",
            telegram_last_name="Yoo",
        )
        new_tel_user.save()

    def test_webnoti_get(self):
        response = self.client.get('/api/webnoti/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertJSONEqual(
            str(response.content, encoding='utf8'),
            [{'id':1, 'pill-name': '마이더블유피아이에이치쉐이크', 'pill-id': 1, 'activated': True, 'time': ['0900']}]
        )

    def test_webnoti_pill(self):
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

        """Test that we can add pill with 4+ times/day"""
        new_pill = Pill.objects.get(pk=1042)
        new_user.pills.add(new_pill) 
     
    def test_webnoti_unallowed(self):
        """Method not allowed"""
        response = self.client.delete('/api/webnoti/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        response = self.client.delete('/api/webnoti/1/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        """Bad Request"""
        response = self.client.put('/api/webnoti/1/',
            json.dumps({'activated': False}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        """Unauthorized"""
        self.client.logout()
        response = self.client.get('/api/webnoti/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        response = self.client.put('/api/webnoti/1/',
            json.dumps({'activated': False, 'time': ['1000']}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class CrudTest(TestCase):
    def setUp(self):
        self.client = Client()
        new_user = User.objects.create_user(email="test1@test.com", password="test1", name="test1")
        self.client.login(email="test1@test.com", password="test1")

    def test_test_crud(self):
        response = self.client.post('/api/registerdevice/', 
            json.dumps({ 'fcmtoken': "asdf" }), 
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
        response = self.client.delete('/api/registerdevice/', 
            json.dumps({ 'fcmtoken': "asdf" }), 
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_crud_unallowed(self):
        """Method Not allowed"""
        response = self.client.get('/api/registerdevice/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        """Bad Request"""
        response = self.client.post('/api/registerdevice/',
            json.dumps({'activated': False, 'time': ['1000']}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.delete('/api/registerdevice/',
            json.dumps({'activated': False, 'time': ['1000']}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        """Unauthorized"""
        self.client.logout()
        response = self.client.post('/api/registerdevice/',
            json.dumps({'activated': False, 'time': ['1000']}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response = self.client.delete('/api/registerdevice/',
            json.dumps({'activated': False, 'time': ['1000']}),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class IntervalTest(TestCase):
    def setUp(self):
        self.client = Client()
        new_user = User.objects.create_user(email="test1@test.com", password="test1", name="test1")
        self.client.login(email="test1@test.com", password="test1")
 
    def test_interval_test(self):
        response = self.client.post('/api/notification-interval/',
            json.dumps({'start_time': '10:00', 'end_time': '13:00'}),
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
        """Unallowed operation"""
        response = self.client.post('/api/notification-interval/', 
            json.dumps({'name': 'JinSun'}),
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
        self.client.logout()
        response = self.client.post('/api/notification-interval/',
            json.dumps({'start_time': '10:00', 'end_time': '13:00'}),
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TelegramTest(TestCase):
    def setUp(self):
        management.call_command('loaddata', 'dataset/fixtures/pill_data.json')
        self.client = Client()
        new_user = User.objects.create_user(email="test1@test.com", password="test1", name="test1")
        self.client.login(email="test1@test.com", password="test1")
        new_tel_user = TelegramUser.objects.create(
            user=new_user,
            telegram_username="jinsun",
            telegram_first_name="JinSun",
            telegram_last_name="Yoo",
        )
        new_tel_user.save()

    def test_telegram_get_post(self):
        response = self.client.get('/api/telegram/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {
                "telegram_username": "jinsun",
                "telegram_first_name": "JinSun",
                "telegram_last_name": "Yoo"
            }
        )
        """
        response = self.client.post('/api/telegram/',
            json.dumps({'message': {
                'chat': {'first_name': 'JinSun', 'id': 1},
                'text': 'Hello, World!',
                'username': 'jinsun'
            }}),
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        """
        response = self.client.post('/api/register-telegram/',
            json.dumps(
            {
                "telegram_username": "jinsun",
                "telegram_first_name": "JinSun",
                "telegram_last_name": "Yoo"
            }),
            content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_telegram_unallowed(self):
        response = self.client.put('/api/telegram/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        response = self.client.put('/api/register-telegram/')
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        
        response = self.client.post('/api/register-telegram/',
            json.dumps(
            {
                "name": "jinsun",
            }),
            content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.client.logout()
        response = self.client.post('/api/register-telegram/',
            json.dumps(
            {
                "telegram_username": "jinsun",
                "telegram_first_name": "JinSun",
                "telegram_last_name": "Yoo"
            }),
            content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response = self.client.get('/api/telegram/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        """
        response = self.client.post('/api/telegram/',
            json.dumps({'message': {
                'chat': {'first_name': 'JinSun', 'id': 1},
                'text': 'Hello, World!',
                'username': 'jinsun'
            }}),
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        """
        new_user = User.objects.create_user(email="test2@test.com", password="test1", name="test1")
        self.client.login(email="test2@test.com", password="test1")
        
        response = self.client.get('/api/telegram/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)