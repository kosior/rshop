#!/bin/sh

python /app/manage.py collectstatic --noinput
./manage.py migrate
/usr/local/bin/gunicorn config.wsgi -b 0.0.0.0:8000 --workers=3 --chdir=/app
