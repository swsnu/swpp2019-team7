# Generated by Django 2.2.6 on 2019-10-29 05:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='user',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('password', models.CharField(blank=True, max_length=100, verbose_name='password')),
                ('name', models.CharField(blank=True, max_length=100, verbose_name='name')),
                ('register_date', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('last_login_date', models.DateTimeField(auto_now_add=True, verbose_name='last logged-in')),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Pill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('take_method', models.TextField(default='', null=True)),
                ('product_name', models.TextField(default='', null=True)),
                ('expiration_date', models.TextField(default='', null=True)),
                ('functions', models.TextField(default='', null=True)),
                ('store_method', models.TextField(default='', null=True)),
                ('company_name', models.TextField(default='', null=True)),
                ('standards', models.TextField(default='', null=True)),
                ('precautions', models.TextField(default='', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.ImageField(upload_to='')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='pills',
            field=models.ManyToManyField(related_name='pills', to='user.Pill'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
    ]
