let AC_GAME_OBJECTS = [];

class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);
        this.started = false;
        this.timedelta = 0;
        this.uuid = this.create_uuid();

    }

    create_uuid() {
        let res = "";
        for (let i = 0; i < 8; i ++) {
            let x = parseInt(Math.floor(Math.random() * 10));  // return value from [0, 1)
            res += x;
        }
        return res;
    }

    start() {

    }

    update() {

    }

    on_destroy() {
    }

    destroy() {
        this.on_destroy();

        for (let i = 0; i < AC_GAME_OBJECTS.length; i ++) {
            if (AC_GAME_OBJECTS[i] === this) {
                AC_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp;
let AC_GAME_ANIMATION = function (timestamp) {

    for (let i = 0; i < AC_GAME_OBJECTS.length; i ++) {
        let obj = AC_GAME_OBJECTS[i];
        if (!obj.started) {
            obj.start();
            obj.started = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;

    requestAnimationFrame(AC_GAME_ANIMATION);
}

requestAnimationFrame(AC_GAME_ANIMATION);