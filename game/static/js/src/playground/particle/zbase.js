class Particle extends AcGameObject {
    constructor(playground, x, y, radius, vx, vy, color, speed, range) {
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.speed = speed;
        this.friction = 0.9;
        this.eps = 0.1;
        this.range = range;
    }

    start() {

    }

    update() {
        if (this.range < this.eps || this.speed < this.eps || this.radius < 0) {
            this.destroy();
        }

        let moved = Math.min(this.range, this.speed * this.timedelta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.range -= moved;
        this.speed *= this.friction;
        this.render();
    }

    render() {
        let scale = this.playground.scale;
        this.ctx.beginPath();
        this.ctx.arc(this.x * scale, this.y * scale, this.radius * scale, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}