# Rest Framework
from rest_framework import serializers

# Local modules
from backend.models import *

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name']

class WhyChooseSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyChoose
        fields = ['title', 'text']

class ExtraParagraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtraParagraph
        fields = ['text']

class ShortInfoSerializer(serializers.ModelSerializer):
    color = serializers.CharField()

    class Meta:
        model = ShortInfo
        fields = '__all__'

class UniversitySerializer(serializers.ModelSerializer):
    why_choose = WhyChooseSerializer(many=True, read_only=True)
    extra_paragraphs = ExtraParagraphSerializer(many=True, read_only=True)
    short_info = ShortInfoSerializer(many=True, read_only=True)

    country = CountrySerializer()

    class Meta:
        model = University
        fields = ['id', 'name', 'image', 'yt_video_link', 'country', 'ranking', 'description', 'details_url', 'why_choose', 'extra_paragraphs', 'short_info']