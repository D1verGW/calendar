<template>
    <div id="calendar">
        <addeventform></addeventform>
        <div class="container">
            <div class="events" :style="eventsStyle">
                <meanhour v-for="(mh, index) in meanhoursData" :mhdata="mh" :index="index"></meanhour>
                <event v-for="event in eventsData" :eventData="event"></event>
            </div>
        </div>
        <export-event-form></export-event-form>
    </div>
</template>

<!--suppress SpellCheckingInspection -->
<script>
    import event from '../components/event.vue';
    import meanhour from '../components/meanhour.vue';
    import addeventform from '../components/addEventForm.vue';
    import store from "../store";
    import ExportEventForm from "../components/exportEventForm";

    export default {
        name: "calendar",
        components: {
            ExportEventForm,
            event,
            meanhour,
            addeventform
        },
        mounted: function () {

        },
        methods: {
            isEmptyColumn (array, number) {
                let retval = true;
                for (let i = 0; i < array.length; i++) {
                    if (typeof array[i][number] === 'number') {
                        retval = false;
                        break;
                    }
                }
                return retval;
            },
            setEventsId () {
                let eventId = 0;
                this.events = [];

                this.rootData.forEach((event) => { event['id'] = eventId; this.events[eventId++] = event; });
                return this.events;
            },
            calcEventPosition() {
                let events = this.events,
                    storeObj = this.storeObj = [];

                for (let i = 0; i < 540; i++) {
                    storeObj[i] = [];
                }

                let resetColumnCount = () => {
                    storeObj.map(elem => { elem.length = this.columnCount; });
                };

                events.map(evt => {
                    evt.startColumn = 0;

                    window.app.$set(evt, 'style', {gridRowStart: 0, gridRowEnd: 0, gridColumnStart: 0, gridColumnEnd: 0});
                    window.app.$set(evt.style, 'gridRowStart', evt.start + 1);
                    window.app.$set(evt.style, 'gridRowEnd', evt.start + 1 + evt.duration);

                    let recurve = () => {
                        if (this.isEmptyColumn(storeObj.slice(evt.start, evt.start + evt.duration), evt.startColumn)) {
                            for (let i = evt.start; i < evt.start + evt.duration; i++) {
                                storeObj[i][evt.startColumn] = evt.id;
                            }
                        } else {
                            evt.startColumn++;
                            this.columnCount = this.columnCount > evt.startColumn + 1 ? this.columnCount : evt.startColumn + 1;
                            resetColumnCount();
                            recurve();
                        }
                    };

                    recurve();

                    window.app.$set(evt.style, 'gridColumnStart', evt.startColumn + 1);
                });
            },
            setEventFullWidth() {
                this.events.map(evt => {
                    let isDontHaveCollision = true;

                    let arrForStoreObj = this.storeObj.slice(evt.start, evt.start + evt.duration);

                    for (let i = 0; i < this.columnCount; i++) {
                        if (i === evt.startColumn) {
                            continue;
                        }

                        if (!this.isEmptyColumn(arrForStoreObj, i)) {
                            isDontHaveCollision = false;
                        }
                    }
                    window.app.$set(evt.style,
                        'gridColumnEnd', isDontHaveCollision ? this.columnCount + 1 : evt.style.gridColumnStart + 1);
                });
            }
        },
        computed: {
            rootData: function () {
                return this.$root.eventsData;
            },
            eventsData: function () {
                this.setEventsId();
                this.calcEventPosition();
                this.setEventFullWidth();

                this.eventsStyle.gridTemplateColumns = `repeat(${this.columnCount}, ${200 / this.columnCount}px)`;

                window.app.$emit('need-repaint-events');
                return this.events;
            },
            meanhoursData: function () {
                return this.$root.meanhoursData;
            }
        },
        data() {
            return {
                eventsStyle: {
                    gridTemplateColumns: ''
                },
                columnCount: 1,
                events: [],
                storeObj: []
            };
        }
    }
</script>

<style scoped lang="less">
    * {
        margin: unset;
        padding: unset;
        border: unset;
    }

    #calendar {
        width: 100%;
        padding-top: 50px;
    }

    .container {
        width: 200px;
        margin: auto;
        position: relative;
        display: flex;
        flex-direction: column;
        height: max-content;
    }
    .events {
        width: 200px;
        height: 1080px;
        position: relative;
        top: 0;
        left: 25px;
        display: grid;
        grid-template-rows: repeat(540, 1fr);
        grid-auto-columns: 1fr;
    }
</style>
