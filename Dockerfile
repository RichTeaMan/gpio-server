FROM python:3-buster

ENV GPIOZERO_PIN_FACTORY=pigpio

RUN echo 'deb http://raspbian.raspberrypi.org/raspbian/ buster main contrib non-free rpi' > /etc/apt/sources.list.d/raspi.list
RUN wget http://archive.raspbian.org/raspbian.public.key -O - | apt-key add -
RUN apt-get update && apt-get install -y python3-pigpio

WORKDIR /app

RUN python -m pip install --upgrade pip
RUN pip3 install RPi.GPIO gpiozero flask-restful pigpio

COPY . .

ENTRYPOINT pigpiod && python3 api.py
