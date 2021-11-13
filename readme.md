# GPIO Server

A rest server for access GPIO.

```bash
sudo docker build -t gpio-server . && sudo docker run -it --privileged --device /dev/gpiomem -p 5000:5000 gpio-server
```

## GPIO Zero

See the [docs](https://gpiozero.readthedocs.io/en/stable/index.html) for how GPIO Zero works.
