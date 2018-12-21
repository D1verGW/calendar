<template>
    <div eventsData="eventsData" id="calendar">
        <div class="hours">
            <div class="meanhour">
                <span class="hour">8.00</span>
                <span class="halfhour">8.30</span>
            </div>
            <div class="meanhour">
                <span class="hour">9.00</span>
                <span class="halfhour">9.30</span>
            </div>
            <div class="meanhour">
                <span class="hour">10.00</span>
                <span class="halfhour">10.30</span>
            </div>
            <div class="meanhour">
                <span class="hour">11.00</span>
                <span class="halfhour">11.30</span>
            </div>
            <div class="meanhour">
                <span class="hour">12.00</span>
                <span class="halfhour">12.30</span>
            </div>
            <div class="meanhour">
                <span class="hour">13.00</span>
                <span class="halfhour">13.30</span>
            </div>
            <div class="meanhour">
                <span class="hour">14.00</span>
                <span class="halfhour">14.30</span>
            </div>
            <div class="meanhour">
                <span class="hour">15.00</span>
                <span class="halfhour">15.30</span>
            </div>
            <div class="meanhour">
                <span class="hour">16.00</span>
                <span class="halfhour">16.30</span>
            </div>
            <div class="meanhour">
                <span class="hour">17.00</span>
            </div>
            <div class="events">
                <event v-for="event in eventsData" :eventData="event"></event>
            </div>
        </div>
    </div>
</template>

<!--suppress SpellCheckingInspection -->
<script>
    import event from '../components/event.vue';
    export default {
        name: "calendar",
        components: {
            event
        },
        computed: {
            eventsInitData: function () {
                let events = this.$root.eventsData;
                let retVal = [];

                let eventId = 0;

                events.forEach((event) => {
                    retVal[eventId] = {};
                    retVal[eventId].gridRowStart = event.start + 1;
                    retVal[eventId].gridRowEnd = event.start + 1 + event.duration;
                    retVal[eventId].title = event.title;
                    eventId++;
                });

                return retVal;
            },

            columnCount: function () {
                let events = this.eventsInitData;

                for (let i = 0; i < events.length; i++){
                    let pairedEvt = events[i];
                    for (let j = 0; j < events.length; j++){
                        if (i !== j) {
                            let evt = events[j];
                            evt.pairEvents = evt.pairEvents ? evt.pairEvents : [];
                            // Если начало другого эвента находится в пределах нашего ивента
                            // Если конец другого эвента находится в пределах нашего ивента
                            if (pairedEvt.gridRowStart >= evt.gridRowStart && pairedEvt.gridRowStart < evt.gridRowEnd ||
                                pairedEvt.gridRowEnd <= evt.gridRowEnd && pairedEvt.gridRowEnd > evt.gridRowStart) {
                                if (evt.pairEvents.indexOf(i) === -1) {
                                    evt.pairEvents.push(i);
                                }
                            }
                        }
                    }
                }

                let columnCount = 1;
                events.map((evt) => {
                    if (evt.pairEvents.length) {
                        if (evt.pairEvents.length > columnCount) {
                            columnCount = evt.pairEvents.length + 1;
                        }
                    }
                });

                if (columnCount % 2) {
                    columnCount *= 2;
                }

                events.map((evt) => {
                    // if (evt.pairEvents.length) {
                    //     // Доделать эту ебаную хуйню (определение в какой колонке находится эта мразь
                    //     let columnsForThisPair = columnCount / (evt.pairEvents.length + 1);
                    //     let evtsRowStart = [];
                    //     let evtsRowEnd = [];
                    //
                    //     for (let i = 0; i < evt.pairEvents.length; i++) {
                    //         evtsRowStart.push(events[evt.pairEvents[i]].gridRowStart);
                    //         evtsRowEnd.push(events[evt.pairEvents[i]].gridRowEnd);
                    //     }
                    //
                    //     if (evt.gridRowStart > Math.max.apply(null, evtsRowStart)) {
                    //         // evt.gridColumnEnd = columnCount;
                    //     }
                    // } else {
                    //     evt.gridColumnStart = 1;
                    //     evt.gridColumnEnd = columnCount;
                    // }
                });

                return columnCount;
            },

            eventsData: function () {
                let events = this.eventsInitData,
                    columnCount = this.columnCount;

                document.body.style.setProperty('--grid-template-columns', String(columnCount));

                return events;
            }
        },
        data() {
            return {};
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

    .hours, .meanhour {
        display: flex;
        flex-direction: column;
    }

    .hours {
        width: fit-content;
        margin: auto;
        position: relative;
    }

    .meanhour {
        width: 250px;
        height: 120px;
        border-top: 0.1em solid #EEEEEE;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
        font-size: 16px;
        font-weight: 200;
        color: #7D7D7D;
        span {
            height: 50%;
            text-align: right;
            width: 40px;
            &.halfhour {
                font-size: 12px;
            }
        }
    }
    .events {
        width: 200px;
        height: 1080px;
        position: absolute;
        top: 0;
        left: 50px;
        display: grid;
        grid-template-rows: repeat(540, 1fr);
        grid-template-columns: repeat(var(--grid-template-columns), 1fr);
    }
</style>
