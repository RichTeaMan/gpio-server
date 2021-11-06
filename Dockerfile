FROM python:3-buster

WORKDIR /app

RUN python -m pip install --upgrade pip
RUN pip3 install RPi.GPIO gpiozero flask-restful

COPY gpio.py gpio.py
COPY api.py api.py

ENTRYPOINT python3 api.py
