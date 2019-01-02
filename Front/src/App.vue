<template>
    <div id="app">
        <div id="nav" v-if="authenticated">
            <div id="logout">
                <router-link to="/login" v-on:click.native="logout()" replace>Logout</router-link>
            </div>
        </div>
        <router-view @authenticated="setAuthenticated"/>
    </div>
</template>

<script>
    import Calendar from "./views/calendar";

    export default {
        name: 'App',
        components: {
            Calendar
        },
        data() {
            return {
                authenticated: false
            }
        },
        mounted() {
            if (!this.authenticated) {
                this.$router.replace({name: "login"});
            }

            this.$storage.setOptions({
                prefix: location.hostname,
                driver: 'local',
                ttl: 60 * 60 * 24 * 1000 * 10 // 24 часа
            })
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
                this.authenticated = false;
                this.$root.eventsData = {};
            }
        }
    }
</script>

<style lang="less">
    * {
        margin: unset;
        padding: unset;
        border: unset;
        font-family: 'Google Sans', arial, sans-serif;
        font-size: 16px;
    }

    body {
        background-color: white;
    }

    h1 {
        padding: 0;
        margin-top: 0;
    }

    #app {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
    }

    #nav {
        width: 100%;
        height: 2em;
        background: aquamarine;
        border-bottom: 0.1em solid #b9b9b9;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    #logout {
        font-weight: 600;
        display: flex;
        height: 100%;
        width: 100%;
        text-align: center;
        background: #e2ecf5;
        a {
            width: 100%;
            height: 2em;
            line-height: 2em;
            display: block;
            color: gray;
            text-decoration: none;
            transition: color 0.2s;
            margin: auto;

            &:hover {
                color: black;
            }
        }
    }
</style>
