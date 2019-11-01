# pylint: skip-file
from django.test import TestCase

from .models import User
class TempTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(email="test@test.com", password="test", name="test")

    def temp_test(self):
        self.assertEqual(1,1)
# Create your tests here.
