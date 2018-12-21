<template>
    <div class="event" v-bind:style="eventStyle">
        <p class="eventTitle">{{ eventTitle }}</p>
    </div>
</template>

<script>
    export default {
        name: "event",
        props: ['eventData'],
        computed: {
            eventStyle: function () {
                return this.$props['eventData'];
            },
            eventTitle: function () {
                return this.$props['eventData'].title;
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
        border-left: 0.1em solid #6E9ECF;
        box-sizing: border-box;
        width: inherit;

        .eventTitle {
            font-family: 'Open Sans', sans-serif;
            font-size: 14px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
</style>
