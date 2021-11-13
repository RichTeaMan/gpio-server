console.log('?');
console.log(document.getElementsByClassName('led_button'));

Array.from(document.getElementsByClassName('led_button')).forEach(function(element) {
    element.addEventListener('click', () => {
        httpGetAsync('/led/4');
    });
});

console.log(document.getElementsByClassName('servo_value'));
Array.from(document.getElementsByClassName('servo_value')).forEach(function(element) {
    element.addEventListener('input', () => {
        console.log('server value changed.');
        const servoValue = element.value;
        httpGetAsync(`/servo/17/${servoValue}`);
    });
});

Array.from(document.getElementsByClassName('servo_min')).forEach(function(element) {
    element.addEventListener('click', () => {
        console.log('server min changed.');
        httpGetAsync(`/servo/17/min`);
    });
});

Array.from(document.getElementsByClassName('servo_max')).forEach(function(element) {
    element.addEventListener('click', () => {
        console.log('server max changed.');
        httpGetAsync(`/servo/17/max`);
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