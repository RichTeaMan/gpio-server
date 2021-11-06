# GPIO Server

A rest server for access GPIO.

```bash
sudo docker build -t gpio-server . && sudo docker run -it --device /dev/gpiomem -p 5000:5000 gpio-server
```
