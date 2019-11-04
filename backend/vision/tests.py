from django.test import TestCase, Client
from rest_framework import status

import json


class VisionTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_vision_api(self):
        with open('./media/image/default_pill_image.jpg', 'rb') as f:
            response = self.client.post('/api/vision/',
                                        {'filepond': f})
            self.assertEqual(response.status_code, status.HTTP_200_OK)

            response = self.client.delete('/api/vision/')
            self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

