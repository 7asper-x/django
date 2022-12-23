class Player extends AcGameObject {
    constructor(playground, x, y, radius, color, speed, character, username, photo) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.dx = 0;
        this.dy = 0;
        this.ds = 0;
        this.move_length = 0;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.character = character;
        this.eps = 0.01;
        this.friction = 0.9;
        this.spend_time = 0;
        this.username = username;
        this.photo = photo;

        this.cur_skill = null;

        if (this.character !== "robot") {
            this.img = new Image();
            this.img.src = this.photo;
        }
    }

    wonder() {
        let tx = Math.random() * this.playground.width / this.playground.scale;
        let ty = Math.random() * this.playground.height / this.playground.scale;
        this.move_to(tx, ty);
    }

    start() {
        if (this.character === "me") {
            this.add_listening_events();
        } else if (this.character === "robot") {
            this.wonder();
        }
    }

    add_listening_events() {
        let outer = this;
        this.playground.game_map.$canvas.on("contextmenu", function () {
            return false;
        });
        let scale = this.playground.scale;
        this.playground.game_map.$canvas.mousedown(function (e) {
            const rect = outer.ctx.canvas.getBoundingClientRect();
            if (e.which === 3) {
                outer.move_to((e.clientX - rect.left) / scale, (e.clientY - rect.top) / scale);
            } else if (e.which === 1) {
                if (outer.cur_skill === "fireball") {
                    outer.shoot_fireball((e.clientX - rect.left) / scale, (e.clientY - rect.top) / scale);
                }

                outer.cur_skill = null;
            }
        });

        $(window).keydown(function (e) {
            if (e.which === 81) { // q
                outer.cur_skill = "fireball";
                return false;
            }
        })
    }

    shoot_fireball(tx, ty) {
        let x = this.x, y = this.y;
        let radius = 0.01;
        let angle = Math.atan2(ty - this.y, tx - this.x);
        let vx = Math.cos(angle), vy = Math.sin(angle);
        let color = this.character === "me" ? "orange" : "red";
        let speed = 0.3;
        let move_length = 1;
        new FireBall(this.playground, this, x, y, radius, vx, vy, color, speed, move_length, 0.01);
    }

    get_dist(x1, y1, x2, y2) {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    move_to(tx, ty) {
        this.move_length = this.get_dist(this.x, this.y, tx, ty);
        let angle = Math.atan2(ty - this.y, tx - this.x);
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }

    on_destroy() {
        if (this.character !== "robot") this.playground.game_map.$canvas.off();
        for (let i = 0; i < this.playground.players.length; i++) {
            if (this.playground.players[i] === this) {
                this.playground.players.splice(i, 1);
            }
        }
    }

    is_attacked(angle, damage) {
        for (let i = 0; i < 20 + Math.random() * 5; i++) {
            let x = this.x, y = this.y;
            let radius = this.radius * Math.random() * 0.1;
            let angle = Math.PI * 2 * Math.random();
            let vx = Math.cos(angle), vy = Math.sin(angle);
            let color = this.color;
            let speed = this.speed * 5;
            let range = this.radius * Math.random() * 5;
            if (radius < 0) radius = 1;
            new Particle(this.playground, x, y, radius, vx, vy, color, speed, range);
        }

        this.radius -= damage;
        if (this.radius < this.eps) {
            this.destroy();
            return false;
        }

        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);
        this.ds = damage * 100;
        this.speed *= 1.2;
    }

    update() {
        this.update_move();
        this.render();
    }

    update_move() {
        this.spend_time += this.timedelta / 1000;
        if (this.spend_time > 5 && this.character === "robot" && Math.random() < 1 / 300.0) {
            let player = this.playground.players[0];
            let tx = player.x + player.speed * this.vx * this.timedelta / 1000 * 0.3;
            let ty = player.y + player.speed * this.vy * this.timedelta / 1000 * 0.3;
            this.shoot_fireball(tx, ty);
        }
        if (this.ds > this.eps) {
            this.vx = this.vy = 0;
            this.move_length = 0;
            this.x += this.dx * this.ds * this.timedelta / 1000;
            this.y += this.dy * this.ds * this.timedelta / 1000;
            this.ds *= this.friction;
        } else {
            if (this.move_length < this.eps) {
                this.move_length = 0;
                this.vx = this.vy = 0;
                if (this.character === "robot") {
                    this.wonder();
                }
            } else {
                let moved = Math.min(this.speed * this.timedelta / 1000, this.move_length);
                this.move_length -= moved;
                this.x += this.vx * moved;
                this.y += this.vy * moved;
            }
        }
    }

    render() {
        let scale = this.playground.scale;
        if (this.character !== "robot") {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.x * scale, this.y * scale, this.radius * scale, 0, Math.PI * 2, false);
            this.ctx.stroke();
            this.ctx.clip();
            this.ctx.drawImage(this.img, (this.x - this.radius) * scale, (this.y - this.radius) * scale, this.radius * 2 * scale, this.radius * 2 * scale);
            this.ctx.restore();
        } else {
            this.ctx.beginPath();
            this.ctx.arc(this.x * scale, this.y * scale, this.radius * scale, 0, Math.PI * 2, false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }

    }
}