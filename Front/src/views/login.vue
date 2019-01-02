<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" required>
        <input type="password" name="password" v-model="input.password" placeholder="Password" required>
        <button type="button" v-on:click="login()">Login</button>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        mounted() {
            // this.checkCookie();
        },
        methods: {
            setCookie(cookie) {
                console.log('setCookie');
                this.$storage.set('cookie', cookie);
            },

            checkCookie() {
                let cookie = this.$storage.get('cookie', false);

                if (cookie) {
                    this.requestCookie(cookie);
                }
            },

            login(isLogged) {
                if (isLogged) {
                    this.emitLogin();
                } else if (this.input.username !== "" && this.input.password !== "") {
                    this.requestLogin();
                } else {
                    console.log("A username and password must be present");
                }
            },

            requestLogin() {
                let promise = fetch(this.$root.server + 'login', {
                    method: 'GET',
                    headers: {
                        username: this.input.username,
                        password: this.input.password
                    }
                });

                promise
                    .then((response) => {
                        return response.json();
                    })
                    .then((response) => {
                        if (response.userData) {
                            if (!response.userData.incorrectPassword) {
                                this.emitLogin(response.userData.calendarData);
                                // this.setCookie(response.userData.cookie);
                            } else {
                                // TODO: Обработка некорректного пароля
                            }
                        } else {
                            // this.requestRegister();
                        }
                    });
            },

            requestRegister() {
                let promise = fetch(this.$root.server + 'register', {
                    method: 'POST',
                    headers: {
                        username: this.input.username,
                        password: this.input.password,
                        calendarData: {}
                    }
                });

                promise
                    .then((response) => {
                        return response.json();
                    })
                    .then((response) => {
                        if (response.userData) {
                            this.emitLogin(response.userData.calendarData);
                        }
                    });
            },

            requestCookie(cookie) {
                let promise = fetch(this.$root.server + 'cookie', {
                    method: 'POST',
                    headers: {cookie: cookie}
                });

                promise
                    .then((response) => {
                        return response.json();
                    })
                    .then((response) => {
                        if (response.userData) {
                            this.emitLogin(response.userData.calendarData);
                        }
                    });
            },

            emitLogin(calendarData) {
                this.$emit("authenticated", true);
                this.$router.replace({name: "calendar"});
                this.$root.eventsData = calendarData;
                this.$root.username = this.input.username;
            }
        }
    }
</script>

<style scoped lang="less">
    * {
        margin: unset;
        padding: unset;
        border: unset;
    }

    #login {
        width: 250px;
        height: 250px;
        top: calc(50% - 125px);
        left: calc(50% - 125px);
        border: 2px solid #CCCCCC;
        background-color: #FFFFFF;
        padding: 10px;
        position: absolute;
        font-family: 'Google Sans', arial, sans-serif;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;

        &:after {
            content: 'MockUsers: {admin: admin}, {user: user} Register unavailable.';
            position: absolute;
            bottom: -40px;
            color: gray;
            font-size: 13px;
            left: 0;
            text-align: center;
        }
    }

    h1 {
        text-align: center;
        font-size: 25px;
    }

    input, button {
        width: 200px;
        height: 50px;
        margin: 2px 5px;
        padding: 5px;
        border-radius: 10px;
        border: none;
        font-size: 20px;
        text-align: center;
    }

    input {
        background-color: #03A9F4 !important;
    }

    button {
        width: 210px;
        margin-top: 20px;

        background-color: #03A9F4 !important;
    }
</style>
