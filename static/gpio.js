const devices = [
    {
        "pin": 4,
        "deviceType": "led"
    },
    {
        "pin": 17,
        "deviceType": "servo"
    },
    {
        "pin": 27,
        "deviceType": "servo"
    },
    {
        "pin": 22,
        "deviceType": "servo"
    },
    {
        "pin": 5,
        "deviceType": "servo"
    },
    {
        "pin": 6,
        "deviceType": "servo"
    },
    {
        "pin": 13,
        "deviceType": "servo"
    }
];

devices.forEach((device) =>{

    if (device.deviceType == "led") {
        const ledPane = document.getElementById("led_pane");
        const ledControl = `
        <div class="led_device">
            <h3>LED ${device.pin}</h3>
            <button class="led_button" data-pin="${device.pin}" type="button">Toggle</button>
        </div>`;
        ledPane.insertAdjacentHTML('beforeend', ledControl);
    }
    else if(device.deviceType == "servo") {
        const servoPane = document.getElementById("servo_pane");
        const servoControl = `
        <div class="servo_device">
            <h3>Servo ${device.pin}</h3>
            <input class="servo_value" data-pin="${device.pin}" type="range" min="-1" max="1" step="0.01">
            <button class="servo_min" data-pin="${device.pin}" type="button">Min</button>
            <button class="servo_max" data-pin="${device.pin}" type="button">Max</button>
        </div>`;
        servoPane.insertAdjacentHTML('beforeend', servoControl);
    }
});


console.log('?');
console.log(document.getElementsByClassName('led_button'));

Array.from(document.getElementsByClassName('led_button')).forEach(function(element) {
    element.addEventListener('click', () => {
        const pin = element.dataset.pin;
        httpGetAsync(`/led/${pin}`);
    });
});

console.log(document.getElementsByClassName('servo_value'));
Array.from(document.getElementsByClassName('servo_value')).forEach(function(element) {
    element.addEventListener('input', () => {
        console.log('server value changed.');
        const pin = element.dataset.pin;
        const servoValue = element.value;
        httpGetAsync(`/servo/${pin}/${servoValue}`);
    });
});

Array.from(document.getElementsByClassName('servo_min')).forEach(function(element) {
    element.addEventListener('click', () => {
        console.log('server min changed.');
        const pin = element.dataset.pin;
        httpGetAsync(`/servo/${pin}/min`);
    });
});

Array.from(document.getElementsByClassName('servo_max')).forEach(function(element) {
    element.addEventListener('click', () => {
        console.log('server max changed.');
        const pin = element.dataset.pin;
        httpGetAsync(`/servo/${pin}/max`);
    });
});

function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    if (callback) {
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                callback(xmlHttp.responseText);
            }
        }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}
