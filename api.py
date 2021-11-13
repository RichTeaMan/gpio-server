from flask import Flask, send_from_directory
from flask_restful import Resource, Api
from gpiozero import LED, Servo

leds = {}
servos = {}

app = Flask(__name__, static_folder='static')
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return send_from_directory('static', 'index.html')

class PinTest(Resource):
    def get(self):
        if (4 not in leds):
            leds[4] = LED(4)        
        leds[4].toggle()
        return {'done': 'maybe'}

class LedHandler(Resource):
    def get(self, gpio_id):
        if (gpio_id not in leds):
            leds[gpio_id] = LED(gpio_id)   
        leds[gpio_id].toggle()        
        return {gpio_id: leds[gpio_id].is_active}

class ServoHandler(Resource):
    def get(self, gpio_id, servo_value):
        if (gpio_id not in servos):
            servos[gpio_id] = Servo(gpio_id)
        servos[gpio_id].value = servo_value
        return {gpio_id: servos[gpio_id].value}

class ServoMaxHandler(Resource):
    def get(self, gpio_id):
        if (gpio_id not in servos):
            servos[gpio_id] = Servo(gpio_id)
        servos[gpio_id].max()
        return {gpio_id: servos[gpio_id].value}

class ServoMinHandler(Resource):
    def get(self, gpio_id):
        if (gpio_id not in servos):
            servos[gpio_id] = Servo(gpio_id)
        servos[gpio_id].min()
        return {gpio_id: servos[gpio_id].value}

api.add_resource(HelloWorld, '/')
api.add_resource(PinTest, '/pin')
api.add_resource(LedHandler, '/led/<int:gpio_id>/')
api.add_resource(ServoHandler, '/servo/<int:gpio_id>/<float(signed=True):servo_value>')
api.add_resource(ServoMaxHandler, '/servo/<int:gpio_id>/max')
api.add_resource(ServoMinHandler, '/servo/<int:gpio_id>/min')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)