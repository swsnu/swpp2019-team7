# Generated by Django 2.2.5 on 2019-11-14 09:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('notification', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pill', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='telegramuser',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='notificationtime',
            name='notification',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='notification.Notification'),
        ),
        migrations.AddField(
            model_name='notification',
            name='pill',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pill.Pill'),
        ),
        migrations.AddField(
            model_name='notification',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]