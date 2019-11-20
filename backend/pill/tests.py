# pylint: skip-file
from django.test import TestCase, Client
from django.core import management

from pill.models import Pill
from user.models import User
from notisetting.models import NotiSetting
from notification.models import Notification


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

    def temp_test(self):
        self.assertEqual(1, 1)
