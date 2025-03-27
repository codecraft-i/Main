from django.shortcuts import render

# Create your views here.

# Other Rest liblaries
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

# Own Models
from .models import *

# Local API Path
from .API.serializers import *

class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class UniversityViewSet(viewsets.ModelViewSet):
    queryset = University.objects.all().order_by('-ranking')
    serializer_class = UniversitySerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['country']
    ordering_fields = ['ranking']

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({"count": queryset.count(), "data": serializer.data})

class WhyChooseViewSet(viewsets.ModelViewSet):
    queryset = WhyChoose.objects.all()
    serializer_class = WhyChooseSerializer

class ExtraParagraphViewSet(viewsets.ModelViewSet):
    queryset = ExtraParagraph.objects.all()
    serializer_class = ExtraParagraphSerializer

class ShortInfoViewSet(viewsets.ModelViewSet):
    queryset = ShortInfo.objects.all()
    serializer_class = ShortInfoSerializer