FROM python:3.6
ENV PYTHONUNBUFFERED 1

ADD BE/requirements BE/app/requirements/
RUN pip install -r BE/app/requirements/production.txt

ADD BE /app
WORKDIR /app

ENV DOCKER_CONTAINER=1

COPY ./compose/production/django/start.sh /start.sh
RUN chmod +x /start.sh



