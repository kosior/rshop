import os
import sys

from django.core.wsgi import get_wsgi_application


app_path = os.path.dirname(os.path.abspath(__file__)).replace('/config', '')
sys.path.append(os.path.join(app_path, 'shop'))

os.environ.setdefault('DJANGO_READ_DOT_ENV_FILE', 'True')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')

application = get_wsgi_application()
