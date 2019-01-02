<template>
    <form class="form" title="Add event form" v-on:submit.prevent="exportEvents()">
        <input name="eventInputSubmit" title="Event export" type="submit" value="Export events">
        <div class="exportDataText">
            <p v-if="eventsData.length">// `start` & `duration` are measured in minutes</p>
            <p v-if="eventsData.length">// `start: 0` is 8.00a</p>
            <p v-if="eventsData.length">[</p>
            <span v-for="event in eventsData">{{ event }}</span>
            <p v-if="eventsData.length">]</p>
        </div>
    </form>
</template>

<script>
    export default {
        name: "exportEventForm",
        methods: {
            exportEvents: function () {
                this.$root.eventsData.map((event) => {
                    this.eventsData.push(`{start: ${event.start}, duration: ${event.duration}, title: "${event.title}"},`);
                });

                return false;
            }
        },
        data: function () {
            return {
                eventsData: []
            }
        }
    }
</script>

<style scoped lang="less">
    .form {
        width: 250px;
        height: max-content;
        display: flex;
        flex-direction: column;
        position: relative;
        margin: 25px auto;
        bottom: -50px;
        top: unset;
        user-select: all;

        &:after {
            content: '';
            position: absolute;
            bottom: -15px;
            color: gray;
            font-size: 15px;
            left: 15px;
        }

        .exportDataText {
            width: 250px;
            display: flex;
            flex-direction: column;

            span {
                font-size: 10px;
                padding: 0 10px;
            }
        }

        p {
            font-size: 10px;
            padding: 0;
        }

        input {
            outline-color: transparent;
            border: 1px solid #6e9ecf;
            box-sizing: border-box;
            background: #E2ECF5;
            margin-bottom: 5px;
            height: 40px;
        }
        input[type='submit'], input[type='button'] {
            width: 250px;
            padding: 10px;
        }
    }
</style>
