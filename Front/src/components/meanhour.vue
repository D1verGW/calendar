<template>
    <div :style="mhstyle" class="meanhour">
        <span class="hour">{{ meanhourdata.number + '.00' }}</span>
        <span v-if="!meanhourdata.nohalfhour" class="halfhour">{{ meanhourdata.number + '.30'}}</span>
    </div>
</template>

<script>
    export default {
        name: "meanhour",
        props: ['mhdata', 'index'],
        computed: {
            meanhourdata: function () {
                return this.$props['mhdata'];
            },
            mhstyle: function () {
                let ind = this.$props['index'];

                return {
                    gridRowStart: ind * 60 + 1,
                    gridRowEnd: (ind + 1) * 60 + 1,
                }
            }
        },
        data: function () {
            return {};
        }
    }
</script>

<style scoped lang="less">
    .meanhour {
        position: absolute;
        left: -50px;
        width: 250px;
        height: 120px;
        border-top: 2px solid #EEEEEE;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
        font-size: 16px;
        font-weight: 200;
        color: #7D7D7D;
        display: flex;
        flex-direction: column;
        z-index: -1;
        span {
            height: 50%;
            text-align: right;
            width: 40px;
            font-size: 16px;
            &.halfhour {
                font-size: 12px;
            }
        }
    }
</style>
