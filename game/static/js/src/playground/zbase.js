class AcGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div>薛涵清小傻逼</div>`);
        this.hide();
        this.root.$ac_game.append(this.$playground);

        this.start();
    }

    start() {

    }

    update() {

    }

    show() {
        this.$playground.show();
    }

    hide() {
        this.$playground.hide();
    }
}