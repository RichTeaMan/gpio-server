FROM python:3-buster

WORKDIR /app

RUN python -m pip install --upgrade pip
RUN pip3 install RPi.GPIO gpiozero

COPY gpio.py gpio.py

ENTRYPOINT python3 gpio.py
