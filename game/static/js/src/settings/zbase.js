class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "WEB";
        if (this.root.AcWingOS) this.platform = "ACAPP";
        this.username = "";
        this.photo = "";

        this.$settings = $(`
            <div class="ac-game-settings">
                <div class="ac-game-settings-login">
                    <div class="ac-game-settings-title">Login</div>
                    <div class="ac-game-settings-username">
                        <div class="ac-game-settings-item">
                            <input type="text" placeholder="username"/>
                        </div>
                    </div>
                    <div class="ac-game-settings-password">
                        <div class="ac-game-settings-item">
                            <input type="password" placeholder="password"/>
                        </div>
                    </div>
                    <div class="ac-game-settings-submit">
                        <div class="ac-game-settings-item">
                            <button>Login</button>
                        </div>
                    </div>
                    <div class="ac-game-settings-error-message"></div>
                    <div class="ac-game-settings-option">Register</div>
                    <br>
                    <div class="ac-game-settings-acwing">
                        <img width="40" src="https://app4109.acapp.acwing.com.cn/static/image/settings/acwing.png" alt="logo">
<!--                        <div class="ac-game-settings-login-with">login with acwing</div>-->
                    </div>
                </div>
                <div class="ac-game-settings-register">
                    <div class="ac-game-settings-title">Register</div>
                    <div class="ac-game-settings-username">
                        <div class="ac-game-settings-item">
                            <input type="text" placeholder="username"/>
                        </div>
                    </div>
                    <div class="ac-game-settings-password ac-game-settings-password-first">
                        <div class="ac-game-settings-item">
                            <input type="password" placeholder="password"/>
                        </div>
                    </div>
                    <div class="ac-game-settings-password ac-game-settings-password-second">
                        <div class="ac-game-settings-item">
                            <input type="password" placeholder="confirm password"/>
                        </div>
                    </div>
                    <div class="ac-game-settings-submit">
                        <div class="ac-game-settings-item">
                            <button>Register</button>
                        </div>
                    </div>
                    <div class="ac-game-settings-error-message"></div>
                    <div class="ac-game-settings-option">Login</div>
                </div>
            </div>
        `);
        this.$login = this.$settings.find(".ac-game-settings-login");
        this.$login_username = this.$login.find(".ac-game-settings-username input");
        this.$login_password = this.$login.find(".ac-game-settings-password input");
        this.$login_submit = this.$login.find(".ac-game-settings-submit button");
        this.$login_error_message = this.$login.find(".ac-game-settings-error-message");
        this.$login_register = this.$login.find(".ac-game-settings-option");

        this.$register = this.$settings.find(".ac-game-settings-register");
        this.$register_username = this.$register.find(".ac-game-settings-username input");
        this.$register_password = this.$register.find(".ac-game-settings-password-first input");
        this.$register_confirm_password = this.$register.find(".ac-game-settings-password-second input");
        this.$register_submit = this.$register.find(".ac-game-settings-submit button");
        this.$register_error_message = this.$register.find(".ac-game-settings-error-message");
        this.$register_login = this.$register.find(".ac-game-settings-option");

        this.$login.hide();
        this.$register.hide();

        this.$acwing_login = this.$settings.find('.ac-game-settings-acwing img');

        this.root.$ac_game.append(this.$settings);

        this.start();
    }

    start() {
        this.get_info();
        this.add_listening_events();
    }

    add_listening_events_login() {
        let outer = this;
        this.$login_register.click(function () {
            outer.register();
        });
        this.$login_submit.click(function () {
            outer.login_on_remote();
        })
    }

    add_listening_events_register() {
        let outer = this;
        this.$register_login.click(function () {
            outer.login();
        });
        this.$register_submit.click(function () {
            outer.register_on_remote();
        });
    }

    add_listening_events() {
        let outer = this;
        this.add_listening_events_login();
        this.add_listening_events_register();
        
        this.$acwing_login.click(function () {
            outer.acwing_login();
        })
    }

    acwing_login() {
        $.ajax({
            url: "https://app4109.acapp.acwing.com.cn/settings/acwing/web/apply_code/",
            type: "GET",
            success: function (resp) {
                console.log(resp);
                if (resp.result === "success") {
                    window.location.replace(resp.apply_code_url);
                }
            }
        })
    }

    login_on_remote() {
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_message.empty();

        $.ajax({
            url: "https://app4109.acapp.acwing.com.cn/settings/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function (resp) {
                console.log(resp);
                if (resp.result === "success") {
                    location.reload();
                } else {
                    outer.$login_error_message.html(resp.result);
                }
            }
        })
    }

    register_on_remote() {
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_confirm_password.val();
        this.$register_error_message.empty();

        $.ajax({
            url: "https://app4109.acapp.acwing.com.cn/settings/register/",
            type: "GET",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm
            },
            success: function (resp) {
                console.log(resp);
                if (resp.result === "success") {
                    location.reload();
                } else {
                    outer.$register_error_message.html(resp.result);
                }
            }
        })
    }

    logout_on_remote() {
        if (this.platform === "ACAPP") return false;
        $.ajax({
            url: "https://app4109.acapp.acwing.com.cn/settings/logout/",
            type: "GET",
            success: function (resp) {
                console.log(resp);
                if (resp.result === "success") {
                    location.reload();
                }
            }
        })
    }

    register() {  // register page
        this.$login.hide();
        this.$register.show();
    }

    login() {  // open login panel
        this.$register.hide();
        this.$login.show();
    }

    get_info_acapp() {
        let outer = this;

        $.ajax({

        })
    }

    get_info() {
        let outer = this;
        $.ajax({
            url: "https://app4109.acapp.acwing.com.cn/settings/get_info/",
            type: "GET",
            data: {
                platform: outer.platform,
            },
            success: function (resp) {
                console.log(resp);
                if (resp.result === "success") {
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    outer.hide();
                    outer.root.menu.show();
                } else {
                    outer.login();
                }
            }
        })
    }

    hide() {
        this.$settings.hide();
    }

    show() {
        this.$settings.show();
    }
}