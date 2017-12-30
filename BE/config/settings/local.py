from .base import *


DEBUG = env.bool('DJANGO_DEBUG', default=True)

TEMPLATES[0]['OPTIONS']['debug'] = DEBUG

SECRET_KEY = env('DJANGO_SECRET_KEY', default='kx6e3pnc$wlel6@(u0x0x!858*ay@#vxaqegrzreh9n_qy-dm_')

ALLOWED_HOSTS = ['0.0.0.0', '127.0.0.1']

INSTALLED_APPS += [
    'debug_toolbar',
]

MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

INTERNAL_IPS += [
    '127.0.0.1',
]

if os.getenv('DOCKER_CONTAINER'):
    CACHES = {
        'default': {
            'BACKEND': 'django_redis.cache.RedisCache',
            'LOCATION': 'redis://redis:6379/0',
            'OPTIONS': {
                'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            }
        }
    }
else:
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
            'LOCATION': str(ROOT_DIR.path('temp', 'cache')),
            'TIMEOUT': None,
        }
    }
