# pylint: skip-file
from django.test import TestCase

from .models import Pill

class TempTestCase(TestCase):
    def setUp(self):
        Pill.objects.create()

    def temp_test(self):
        self.assertEqual(1,1)
# Create your tests here.
