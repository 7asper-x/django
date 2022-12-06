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

    }

    update() {

    }

    show() {
        this.$playground.show();
        this.root.$ac_game.append(this.$playground);
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        this.players = [];
        this.players.push(new Player(
            this,
            this.width / 2,
            this.height / 2,
            this.height * 0.05,
            "red",
            this.height * 0.15,
            true
        ));

        for (let i = 0; i < 14; i ++) {
            this.players.push(new Player(
                this,
                this.width / 2,
                this.height / 2,
                this.height * 0.05,
                this.get_random_color(),
                this.height * 0.15,
                false,
            ));
        }
    }

    hide() {
        this.$playground.hide();
    }
}