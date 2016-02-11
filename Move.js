function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle(name);
    } else {
        return getComputedStyle(obj, false)[name];
    };
};

function Move(obj, json, end) {
    clearInterval(obj.time);
    var cur = 0;
    var speed = 0;
    obj.time = setInterval(function () {
        var bStop = true;
        for (var name in json) {
            if (name == 'opacity') {
                cur = Math.round(parseFloat(getStyle(obj, name) * 100));
            } else {
                cur = parseInt(getStyle(obj, name));
            };

            speed = (json[name] - cur) / 6;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (cur != json[name]) {
                bStop = false;
            };

            if (bStop == false) {
                if (name == 'opacity') {
                    obj.style.opacity = (cur + speed) /100;
                    obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                } else {
                    obj.style[name] = cur + speed + 'px';
                };
            };

        };

        if (bStop) {
//                        alert('abc');
            clearInterval(obj.time);
            end();
        };

    }, 30);
};