from flask import Flask, send_from_directory
from flask_restful import Resource, Api
from gpiozero import LED

leds = {}

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

class Gpio(Resource):
    def get(self, gpio_id):
        print(gpio_id)
        print(type(gpio_id))
        if (gpio_id not in leds):
            leds[gpio_id] = LED(gpio_id)   
        leds[gpio_id].toggle()        
        return {gpio_id: leds[gpio_id].is_active}

api.add_resource(HelloWorld, '/')
api.add_resource(PinTest, '/pin')
api.add_resource(Gpio, '/gpio/<int:gpio_id>/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)