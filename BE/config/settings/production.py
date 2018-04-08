from .base import *


SECRET_KEY = env('DJANGO_SECRET_KEY')

INSTALLED_APPS += ['gunicorn', ]

ALLOWED_HOSTS = env.list('DJANGO_ALLOWED_HOSTS')


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('POSTGRES_DB'),
        'USER': env('POSTGRES_USER'),
        'PASSWORD': env('POSTGRES_PASSWORD'),
        'HOST': env('POSTGRES_HOST'),
        'PORT': env('POSTGRES_PORT'),
        'ATOMIC_REQUESTS': True,
    }
}

CACHES = {
        'default': {
            'BACKEND': 'django_redis.cache.RedisCache',
            'LOCATION': env('REDIS_LOCATION'),
            'OPTIONS': {
                'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            },
            'TIMEOUT': None,
        }
    }

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True

FORCE_SCRIPT_NAME = '/api'

MEDIA_URL = '/api/media/'
STATIC_URL = '/api/static/'
