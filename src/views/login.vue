<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username"/>
        <input type="password" name="password" v-model="input.password" placeholder="Password"/>
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
        methods: {
            login() {
                if (this.input.username !== "" && this.input.password !== "") {
                    if (this.input.username === this.$parent.mock.Account.username && this.input.password === this.$parent.mock.Account.password) {
                        this.$emit("authenticated", true);
                        this.$router.replace({name: "calendar"});
                    } else {
                        console.log("The username and / or password is incorrect");
                    }
                } else {
                    console.log("A username and password must be present");
                }
            }
        }
    }
</script>

<style scoped>
    * {
        margin: unset;
        padding: unset;
        border: unset;
    }
    #login {
        width: 50%;
        border: 0.1em solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto -25%;
        top: 25%;
        left: 50%;
        padding: 1em;
        position: absolute;
        min-width: 250px;

        font-family: 'Google Sans',arial,sans-serif;
        box-sizing: border-box;
        border-radius: 2.5%;
    }
    h1 {
        text-align: center;
    }
    input, button {
        width: 50%;
        margin: 2% 25%;
        padding: 2.5%;
        border-radius: 2.5%;
        border: none;
    }
    button {
        width: 55%;
    }
</style>
