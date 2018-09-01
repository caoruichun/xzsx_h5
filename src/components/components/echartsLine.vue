<template>
 <div>
   <!-- <h2>30日新增用户曲线图</h2> -->
        <div>
            <div style="width:100%;height:100%">
               
            </div>
        </div>
 </div>
</template>
<script>
export default {
  name: "echartsLine",
  data() {
    return {
      Line_x: [],
      user: [],
      service: []
    };
  },
  components: {
    // CommonIcon
  },
  props: {},
  computed: {},
  mounted() {
    this.echartsLine();
  },
  methods: {
    echartsLine() {
      let myChart = this.$echarts.init(document.getElementById("echartsNEW"));
      // 指定图表的配置项和数据
     var option = {
        baseOption: {
          title: {
            text: "奶牛数字化养殖报表",
            subtext: "西部电子数据采集"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["每日饲喂量", "产奶量"]
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: {
                show: true,
                type: ["line", "bar", "stack", "tiled"]
              },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "每日饲喂量",
              type: "line",
              smooth: true,
              itemStyle: { normal: { areaStyle: { type: "default" } } },
              data: [100, 200, 150, 130, 260, 830, 710]
            },
            {
              name: "产奶量",
              type: "line",
              smooth: true,
              itemStyle: { normal: { areaStyle: { type: "default" } } },
              data: [30, 182, 216, 156, 390, 300, 356]
            }
          ]
        },
        media: [
          //media开始
          {
            query: {},
            option: {
              title: {
                text: "奶牛数字化养殖报表",
                subtext: "西部电子数据采集"
              },
              tooltip: {
                trigger: "axis"
              },
              legend: {
                data: ["每日饲喂量", "产奶量"]
              },
              toolbox: {
                show: true,
                feature: {
                  mark: { show: true },
                  dataView: { show: true, readOnly: false },
                  magicType: {
                    show: true,
                    type: ["line", "bar", "stack", "tiled"]
                  },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              calculable: true,
              xAxis: [
                {
                  type: "category",
                  boundaryGap: false,
                  data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                }
              ],
              yAxis: [
                {
                  type: "value"
                }
              ],
              series: [
                {
                  name: "每日饲喂量",
                  type: "line",
                  smooth: true,
                  itemStyle: { normal: { areaStyle: { type: "default" } } },
                  data: [100, 200, 150, 130, 260, 830, 710]
                },
                {
                  name: "产奶量",
                  type: "line",
                  smooth: true,
                  itemStyle: { normal: { areaStyle: { type: "default" } } },
                  data: [30, 182, 216, 156, 390, 300, 356]
                }
              ]
            }
          },
          {
            query: { maxWidth: 400, ismobile: true },
            option: {
              title: {
                text: "奶牛数字化养殖报表",
                subtext: "西部电子数据采集"
              },
              tooltip: {
                trigger: "line"
              },
              legend: {
                data: ["每日饲喂量", "产奶量"],
                right: "center",
                bottom: 0,
                orient: "horizontal"
              },
              toolbox: {
                show: true,
                orient: "vertical",
                feature: {
                  mark: { show: true },
                  dataView: { show: true, readOnly: false },
                  magicType: {
                    show: true,
                    type: ["line", "bar", "stack", "tiled"]
                  },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              calculable: true,
              xAxis: [
                {
                  type: "category",
                  boundaryGap: false,
                  data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
                }
              ],
              yAxis: [
                {
                  type: "value"
                }
              ],
              series: [
                {
                  name: "每日饲喂量",
                  type: "line",
                  smooth: true,
                  itemStyle: { normal: { areaStyle: { type: "default" } } },
                  data: [100, 200, 150, 130, 260, 830, 710]
                },
                {
                  name: "产奶量",
                  type: "line",
                  smooth: true,
                  itemStyle: { normal: { areaStyle: { type: "default" } } },
                  data: [30, 182, 216, 156, 390, 300, 356]
                }
              ]
            }
          }

          //media结束
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      myChart.resize();
    }
  }
};
</script>
<style scoped>
h2 {
  margin: 20px 0;
}
</style>
