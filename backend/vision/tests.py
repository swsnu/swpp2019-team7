# pylint: skip-file
from django.test import TestCase, Client
from django.core import management
from rest_framework import status

from user.models import User


class VisionTestCase(TestCase):
    def setUp(self):
        management.call_command('loaddata', 'dataset/fixtures/pill_data.json')
        self.client = Client()
        User.objects.create_user(email="test1@test.com", password="test1", name="test1")
        self.client.login(email="test1@test.com", password="test1")

    def test_vision_api(self):
        with open('./test_media/image/default_pill_image.jpg', 'rb') as f:
            response = self.client.post('/api/vision/',
                                        {'filepond': f})
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            response = self.client.delete('/api/vision/')
            self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
