# Generated by Django 2.2.6 on 2019-11-15 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
        ('pill', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('password', models.CharField(blank=True, max_length=100, verbose_name='password')),
                ('name', models.CharField(blank=True, max_length=100, verbose_name='name')),
                ('telegram_first_name', models.CharField(blank=True, max_length=100, verbose_name='telegram_first_name')),
                ('telegram_last_name', models.CharField(blank=True, max_length=100, verbose_name='telegram_last_name')),
                ('telegram_username', models.CharField(blank=True, max_length=100, verbose_name='telegram_username')),
                ('register_date', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('last_login_date', models.DateTimeField(auto_now_add=True, verbose_name='last logged-in')),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('pills', models.ManyToManyField(related_name='pills', to='pill.Pill')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
