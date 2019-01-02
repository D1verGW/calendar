<template>
    <div class="event" :style=" eventData.style ">
        <p class="eventTitle">{{ eventData.title }}</p>
        <div class="delEventBtn" v-on:click="deleteEvent()"></div>
    </div>
</template>

<script>
    export default {
        name: "event",
        props: ['eventData'],
        mounted () {

        },
        methods: {
            deleteEvent() {
                this.$root.eventsData.splice(this.$props.eventData.id, 1);
                this.$root.requestUpdateUserData();
            }
        },
        data() {
            return {}
        }
    }
</script>

<style scoped lang="less">
    .event {
        background: #E2ECF5;
        border-left: 2px solid #6E9ECF;
        box-sizing: border-box;
        width: initial;
        position: relative;

        .eventTitle {
            font-family: 'Open Sans', sans-serif;
            font-size: 14px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            padding: 2px;
            height: -webkit-fill-available;
        }

        .delEventBtn {
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
        }
    }
</style>
