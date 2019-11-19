"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 2.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '9x3!!chcz)_*2uq*71p7i6_v385x7ou!j93uzq_y=cvjz&pakp'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    '.ngrok.io',
    'localhost',
]

AUTH_USER_MODEL = 'user.User'

# Application definition

INSTALLED_APPS = [
    'pill.apps.PillConfig',
    'vision.apps.VisionConfig',
    'user.apps.UserConfig',
    'notification.apps.NotificationConfig',
    'notisetting.apps.NotisettingConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'fcm_django',
    'django_crontab',
    'rest_framework',
    'corsheaders',
]

CRONTAB_COMMAND_SUFFIX = '2>&1'

CRONJOBS = [
    ('*/1 * * * *', 'notification.cron.send_notification', '>> ~/debug.log'),
]

FCM_DJANGO_SETTINGS = {
    "APP_VERBOSE_NAME": "noti",
    # default: _('FCM Django')
    "FCM_SERVER_KEY": "AAAA002_gGs:APA91bHwpz-XSj3T-6_7uPJu1kkqAQKHArF0oDECGNADoqPN4rsfpWJB3wXGWzd0ouyAKgDpYHQmCU1GWzqxtEqKX6Z9kNjYegBcY40vNnq1RwvKV8NITFDi5Usat5W_B_pE_NzxBVT-",
    # true if you want to have only one active device per registered user at a time
    # default: False
    "ONE_DEVICE_PER_USER": False,
    # devices to which notifications cannot be sent,
    # are deleted upon receiving error response from FCM
    # default: False
    "DELETE_INACTIVE_DEVICES": True,
}

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'pillbox',
        'USER': 'jay',
        'PASSWORD': 'pillbox1!',
        'HOST': 'localhost',  # TODO change this to real DB
        'POST': '',
        'OPTIONS': {'charset': 'utf8mb4'},
	'TEST_CHARSET': 'UTF8MB4',
        'TEST_NAME': 'test_pillbox',
        'TEST': {
            'NAME': 'test_pillbox',
            'CHARSET': 'UTF8MB4',
        }
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# CORS Setting
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True