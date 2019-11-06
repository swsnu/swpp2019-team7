from rest_framework import serializers
from .models import Pill


class PillItemsSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    take_method = serializers.CharField()
    product_name = serializers.CharField()
    expiration_date = serializers.CharField()
    functions = serializers.CharField()
    store_method = serializers.CharField()
    company_name = serializers.CharField()
    standards = serializers.CharField()
    precautions = serializers.CharField()
