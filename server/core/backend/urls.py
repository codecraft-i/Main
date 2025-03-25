from django.urls import path, include

# Django Rest Framework
from rest_framework.routers import DefaultRouter

# Local modules
from .views import *

router = DefaultRouter()
router.register(r'universities', UniversityViewSet)
router.register(r'why-choose', WhyChooseViewSet)
router.register(r'extra-paragraphs', ExtraParagraphViewSet)
router.register(r'short-info', ShortInfoViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]