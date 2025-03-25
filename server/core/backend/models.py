from django.db import models

# Extra modules
from colorfield.fields import ColorField

# Create your models here.

from django.db import models

class University(models.Model):
    name = models.CharField(max_length=255, unique=True)
    image = models.ImageField(upload_to='media/universities/')
    yt_video_link = models.URLField(blank=True, null=True)
    country = models.CharField(max_length=100)
    ranking = models.PositiveIntegerField(db_index=True)
    description = models.TextField()
    details_url = models.URLField(unique=True)

    def __str__(self):
        return self.name

class WhyChoose(models.Model):
    university = models.ForeignKey(University, on_delete=models.CASCADE, related_name='why_choose')
    text = models.TextField()

    def __str__(self):
        return f"{self.university.name} - Why Choose"

class ExtraParagraph(models.Model):
    university = models.ForeignKey(University, on_delete=models.CASCADE, related_name='extra_paragraphs')
    text = models.TextField()

    def __str__(self):
        return f"{self.university.name} - Extra Paragraph"

class ShortInfo(models.Model):
    university = models.ForeignKey(University, on_delete=models.CASCADE, related_name='short_info')
    name = models.CharField(max_length=50)
    color = ColorField(default="#3498db")
    priority = models.PositiveIntegerField(default=10)

    class Meta:
        ordering = ['priority']

    def __str__(self):
        return f"{self.university.name} - {self.name}"