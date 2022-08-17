<template>
        <div ref="echart"></div>
</template>
<script>
    import * as echarts from 'echarts'
    export default {
        props:{
            // 设置两个参数
            // 第一个，这个是AxiesChart吗？ 默认是的
            isAxisChart:{
                type: Boolean,
                default: true
            },
            //  第二个，表格参数是什么？ 默认空
            chartData:{
                type: Object,
                default(){
                    return{
                        xData:[],
                        series:[]
                    }
                }
            }
        },
        watch:{
            chartData:{
                handler: function() {
                    this.initChart()
                },
                deep: true
            }
        },
        methods:{
            // 定义两个方法
            // 第一个，初始化图表，传递数据之后生成图表
            initChart(){
                this.initChartData()
                if(this.echart) {
                    this.echart.setOption(this.options)
                }
                else{
                    this.echart = echarts.init(this.$refs.echart)
                    this.echart.setOption(this.options)
                }
            },
            // 第二个，传递图表数据，根据图表类型传递不同数据
            initChartData() {
                if (this.isAxisChart) {
                    this.axisOption.xAxis.data = this.chartData.xData
                    this.axisOption.series = this.chartData.series
                }
                else{
                    this.normalOption.series = this.chartData.series
                }
            }
        },
        data(){
            return {
                // 两种数据模板，等待传参
                axisOption: {
                    legend: {
                    // 图例文字颜色
                    textStyle: {
                        color: "#333",
                    },
                    },
                    grid: {
                    left: "20%",
                    },
                    // 提示框
                    tooltip: {
                    trigger: "axis",
                    },
                    xAxis: {
                    type: "category", // 类目轴
                    data: [],
                    axisLine: {
                        lineStyle: {
                        color: "#17b3a3",
                        },
                    },
                    axisLabel: {
                        interval: 0,
                        color: "#333",
                    },
                    },
                    yAxis: [
                    {
                        type: "value",
                        axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                        },
                    },
                    ],
                    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                    series: [],
                },
                normalOption:{
                    tooltip: {
                                trigger: "item",
                            },
                    color: [
                        "#0f78f4",
                        "#dd536b",
                        "#9462e5",
                        "#a6a6a6",
                        "#e1bb22",
                        "#39c362",
                        "#3ed1cf",
                    ],
                    series: []
                },
                echart: null
            }
        },
        computed: {
            // 根据是否是Axis图表，选择对应的Option
            options() {
                return this.isAxisChart? this.axisOption : this.normalOption
            }
        }
    }
</script>