<template>
    <form class="addEventForm" title="Add event form" v-on:submit.prevent="newEvent()">
        <input name="eventInputTitle"
               title="Event title"
               type="text"
               placeholder="Event title..."
               v-model="eventFormData.title"
               required>
        <input name="eventInputTimeStart"
               title="Start event time"
               type="time"
               min="08:00" max="16:59"
               pattern="[0-9]{2}:[0-9]{2}"
               v-model="eventFormData.start"
               required>
        <input name="eventInputDuration"
               title="Duration event time"
               type="time"
               pattern="[0-9]{2}:[0-9]{2}"
               min="00:01" max="09:00"
               v-model="eventFormData.duration"
               required>
        <input name="eventInputSubmit" title="Event submit" type="submit" value="Add event">
    </form>
</template>

<script>
    export default {
        name: "addEventForm",
        methods: {
            normalizeTimeString: (stringTime, isStartTime) => {
                let hours = Number(stringTime.split(':')[0]) - (isStartTime ? 8 : 0),
                    minutes = Number(stringTime.split(':')[1]);

                return hours * 60 + minutes;
            },
            newEvent: function () {
                let event = {
                    title: this.eventFormData.title,
                    start: this.normalizeTimeString(this.eventFormData.start, true),
                    duration: this.normalizeTimeString(this.eventFormData.duration),
                };

                this.$root.eventsData.push(event);

                this.eventFormData =  {
                    title: null,
                    start: null,
                    duration: null
                };

                this.$root.requestUpdateUserData();
                return false;
            }
        },
        data: function () {
            return {
                eventFormData: {
                    title: null,
                    start: null,
                    duration: null
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .addEventForm {
        width: 250px;
        display: flex;
        flex-direction: row;
        position: relative;
        margin: 25px auto;
        flex-wrap: wrap;

        &:after{
            content: 'To delete an event, just click on it.';
            position: absolute;
            bottom: -15px;
            color: gray;
            font-size: 15px;
            left: 15px;
        }

        input {
            outline-color: transparent;
            border: 1px solid #6e9ecf;
            box-sizing: border-box;
            background: #E2ECF5;
            margin-bottom: 5px;
            height: 40px;
        }
        input[type='time']{
            width: 125px;
            padding: 5px;
            position: relative;
            border-radius: 10px;
        }
        input[type='text'] {
            width: 250px;
            padding: 5px;
        }
        input[type='submit'], input[type='button'] {
            width: 250px;
            padding: 10px;
        }

        input[name='eventInputTimeStart'] {
            &:before{
                content: 'Start event:';
                position: absolute;
                top: 0;
                color: gray;
                font-size: 10px;
            }
        }

        input[name='eventInputDuration'] {
            &:before{
                content: 'Event duration:';
                position: absolute;
                top: 0;
                color: gray;
                font-size: 10px;
            }
        }

        input:invalid {
            &:after {
                content: '✖';
                padding-left: 5px;
            }

        }

        input:valid {
            &:after {
                content: '✓';
                padding-left: 5px;
            }
        }
    }
</style>
