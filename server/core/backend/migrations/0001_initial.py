# Generated by Django 5.1.7 on 2025-03-25 22:07

import colorfield.fields
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='University',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('image', models.ImageField(upload_to='universities/')),
                ('yt_video_link', models.URLField(blank=True, null=True)),
                ('country', models.CharField(max_length=100)),
                ('ranking', models.PositiveIntegerField()),
                ('description', models.TextField()),
                ('details_url', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='ShortInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('color', colorfield.fields.ColorField(default='#3498db', image_field=None, max_length=25, samples=None)),
                ('priority', models.PositiveIntegerField(default=10)),
                ('university', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='short_info', to='backend.university')),
            ],
            options={
                'ordering': ['priority'],
            },
        ),
        migrations.CreateModel(
            name='ExtraParagraph',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('university', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='extra_paragraphs', to='backend.university')),
            ],
        ),
        migrations.CreateModel(
            name='WhyChoose',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('university', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='why_choose', to='backend.university')),
            ],
        ),
    ]
