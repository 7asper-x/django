class AcGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`
            <div class="ac-game-playground"></div>
        `);
        this.hide();

        this.start();
    }

    get_random_color() {
        let colors = ["#E27D60", "#85DCBE", "#E8A87C", "#C38D9E", "#41B3A3"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    start() {
        let outer = this;
        $(window).resize(function() {
            outer.resize();
        });
    }

    update() {

    }

    resize() {
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        let unit = Math.min(this.height / 9, this.width / 16);
        this.width = unit * 16;
        this.height = unit * 9;
        this.scale = this.height;

        if (this.game_map) this.game_map.resize();
    }

    show() {
        this.$playground.show();
        this.root.$ac_game.append(this.$playground);
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        this.players = [];
        this.resize();
        this.players.push(new Player(
            this,
            this.width / 2 / this.scale,
            0.5,
            0.05,
            "red",
            0.15,
            true
        ));

        for (let i = 0; i < 14; i ++) {
            this.players.push(new Player(
                this,
                this.width / 2 / this.scale,
                0.5,
                0.05,
                this.get_random_color(),
                0.15,
                false,
            ));
        }
    }

    hide() {
        this.$playground.hide();
    }
}