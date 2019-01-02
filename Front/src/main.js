import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue2Storage from 'vue2-storage'

Vue.config.productionTip = false;

Vue.use(Vue2Storage);

window.Vue = Vue;
window.app = new Vue({
    router,
    store,
    data() {
        return {
            eventsData: [],
            username: '',
            meanhoursData: [
                {
                    number: 8
                },
                {
                    number: 9
                },
                {
                    number: 10
                },
                {
                    number: 11
                },
                {
                    number: 12
                },
                {
                    number: 1
                },
                {
                    number: 2
                },
                {
                    number: 3
                },
                {
                    number: 4
                },
                {
                    number: 5,
                    nohalfhour: true
                },
            ],
            server: 'http://' + location.hostname + ':3000/'
        };
    },
    methods: {
        requestUpdateUserData() {
            let promise = fetch(this.$root.server + 'update', {
                method: 'GET',
                headers: {
                    username: this.$root.username,
                    calendardata: JSON.stringify(this.eventsData)
                }
            });
    
            promise
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    if (response.success) {
                        window.app.$emit('success-update');
                        console.log('updated!');
                    }
                });
            
            window.app.$emit('eventsDataChanged');
        }
    },
    render: h => h(App)
}).$mount('#app');
