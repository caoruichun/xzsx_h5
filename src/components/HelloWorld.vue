<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
               <div class="echart_content">
                <!-- <h2>服务者与住户注册总数增长曲线图</h2> -->
                <div id="echartsNEW"></div>
                <div id="echartsNEW2"></div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="echart_content">
               
                <div id="server_sex"></div>
              </div>
            </div>
            <div class="swiper-slide">
               <div class="echart_content">
                <div id="server_industry"></div>
              </div>
              
            </div>
            <div class="swiper-slide">
              <div class="echart_content">
                <div id="date_number"></div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="echart_content">
              
                <div id="contentBar"></div>
              </div>
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <!-- <div class="swiper-pagination"></div> -->
        
        <!-- 如果需要导航按钮 -->
        <!-- <div class="swiper-button-prev"></div> -->
        <!-- <div class="swiper-button-next"></div> -->
        
        <!-- 如果需要滚动条 -->
        <!-- <div class="swiper-scrollbar"></div> -->
    </div>
</template>

<script>
import Swiper from "swiper";
// import yesterdayData from "./components/yesterday_data";
// import echartsLine from "./components/echartsLine";
import echarts from "echarts";
export default {
  name: "HelloWorld",
  data() {
    return {
      swiper: null,
      myChart: null,
      myChart1: null,
      server_sex: null,
      server_industry: null,
      date_number: null,
      contentBar: null,
      date_create:[]
    };
  },
  components: {
    // echartsLine
  },
  mounted() {
    this.swiper1();
    this.echartsLine();
    this.navigator();
    this.sex(); //性别占比图
    this.industry(); //行业占比图,
    //this.dateNumber(); //7天时间数据统计图
    this.content_bar(); //内容条形图
  },
  created() {},
  methods: {
    navigator() {
      var ismobile = false;
      var browser = {
        versions: (function() {
          var u = navigator.userAgent,
            app = navigator.appVersion;
          return {
            trident: u.indexOf("Trident") > -1, //IE内核
            presto: u.indexOf("Presto") > -1, //opera内核
            webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
            gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
            mobile:
              !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
            iPhone: u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf("iPad") > -1, //是否iPad
            webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
          };
        })(),
        language: (
          navigator.browserLanguage || navigator.language
        ).toLowerCase()
      };
      ismobile = browser.versions.mobile;
      let Enew = document.getElementById("echartsNEW");
      if (browser.versions.mobile) {
        Enew.style.height = "50vh";
        Enew.style.width = "100vw";
      } else {
        Enew.style.height = "50vh";
        Enew.style.width = "100vw";
      }
    },
    fGetChartFontSize() {
      const dpr = window.devicePixelRatio;
      let fontSize = 18;
      if (dpr == 2) {
        fontSize = 24;
      } else if (dpr == 3) {
        fontSize = 30;
      } else if (dpr > 3) {
        fontSize = 30;
      }
      return fontSize;
    },
    swiper1() {
      var swiper = new Swiper(".swiper-container", {
        speed: 1000,
        pagination: ".swiper-pagination",
        prevButton: ".swiper-button-prev",
        nextButton: ".swiper-button-next",
        onSlideChangeStart: swiper => {
          this.echartsLine();
        }
      });
    },
    echartsLine() {
      this.$http
        .get(this.HOSt + "/statistical/h5/userGrowth")
        .then(data => {
          let clientMap_date = [];
          let clientMap_count = [];
          let serviceMap_date = [];
          let serviceMap_count = [];
          if (data.status === 200) {
            let clientMap = data.data.data.clientMap;
            let serviceMap = data.data.data.serviceMap;
            if (clientMap.length > 0) {
              clientMap.forEach((val, index) => {
                let date1=val.date.substr(val.date.length-5)
                if(date1[0]==0){
                  date1=date1.substr(1);
                }
                clientMap_date.push(date1);
                clientMap_count.push(val.count);
              });
              serviceMap.forEach((val, index) => {
                 let date1=val.date.substr(val.date.length-5)
                if(date1[0]==0){
                  date1=date1.substr(1);
                }
                serviceMap_date.push(date1);
                serviceMap_count.push(val.count);
              });
            }
          }
          this.myChart = this.$echarts.init(
            document.getElementById("echartsNEW")
          );
          var baseOption = {
            // backgroundColor: "#2c343c",
            title: {
              text: "服务者注册总数增长曲线图",
              textStyle: {
                // color: "#FFF",
                fontSize: "100%"
              }
            },
            tooltip: {
              show: true,
              trigger: "axis",
              textStyle: {
                fontSize: "100%" //此处设置提示文字大小
              },
              padding: [5, 10]
            },
            legend: {
              data: ["服务者注册数量"],
              right: "10%", //"35%",
              itemGap: 30,
              textStyle: {
                // color: "#FFF",
                fontSize: "100%" //此处设置提示文字大小
              }
            },
            toolbox: {},
            calculable: true,
            xAxis: [
              {
                type: "category",
                boundaryGap: false,
                data: serviceMap_date,
                axisLabel: {
                  show: true,
                  textStyle: {
                    // color: "#DDD",
                    fontSize: "100%" //此处设置X轴文字大小
                  }
                },
                axisLine: {
                  lineStyle: {
                    // color: "#FFF",
                    width: 1
                  }
                }
              }
            ],
            yAxis: [
              {
                type: "value",
                axisLabel: {
                  show: true,
                  textStyle: {
                    // color: "#DDD",
                    fontSize: "100%" //此处设置Y轴文字大小
                  }
                },
                axisLine: {
                  lineStyle: {
                    // color: "#FFF",
                    width: 1
                  }
                }
              }
            ],
            series: [
              {
                name: "服务者注册数量",
                type: "line",
                smooth: true,
                data: serviceMap_count
              }
            ]
          };
          this.myChart.setOption(baseOption, true);
          this.myChart.resize();
          this.myChart1 = this.$echarts.init(
            document.getElementById("echartsNEW2")
          );
          // 指定图表的配置项和数据

          var Option = {
            // backgroundColor: "#2c343c",
            title: {
              text: "住户注册总数增长曲线图",
              subtext: "",
              textStyle: {
                // color: "#FFF",
                fontSize: "100%"
              }
            },
            tooltip: {
              show: true,
              trigger: "axis",
              textStyle: {
                fontSize: "100%" //此处设置提示文字大小
              },
              padding: [5, 10]
            },
            legend: {
              data: ["住户注册数量"],
              right: "10%", //"35%",
              itemGap: 30,
              textStyle: {
                // color: "#FFF",
                fontSize: "100%" //此处设置提示文字大小
              }
            },
            toolbox: {},
            calculable: true,
            xAxis: [
              {
                type: "category",
                boundaryGap: false,
                data: clientMap_date,
                axisLabel: {
                  show: true,
                  lineStyle: {
                    // color: "#FFF",
                    width: 1
                  },
                  textStyle: {
                    // color: "#fff",
                    fontSize: "100%" //此处设置X轴文字大小
                  }
                },
                axisLine: {
                  lineStyle: {
                    // color: "#FFF",
                    width: 1
                  }
                }
              }
            ],
            yAxis: [
              {
                type: "value",
                axisLabel: {
                  show: true,
                  textStyle: {
                    // color: "#DDD",
                    fontSize: "100%" //此处设置Y轴文字大小
                  }
                },
                axisLine: {
                  lineStyle: {
                    // color: "#FFF",
                    width: 1
                  }
                }
              }
            ],
            series: [
              {
                name: "住户注册数量",
                type: "line",
                smooth: true,
                data: clientMap_count
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          this.myChart1.setOption(Option, true);
          this.myChart1.resize();
        })
        .catch(err => {
          console.log(err);
        });
    },
    sex() {
      this.$http
        .get(this.HOSt + "/statistical/h5/sexCount")
        .then(data => {
          let sexCount = [];
          if (data.status === 200) {
            if (data.data.code === 200) {
              let sex = data.data.data;
              let woman = { value: sex.female, name: "女性" };
              let man = { value: sex.male, name: "男性" };
              sexCount.push(man, woman);
            }
          }

          this.server_sex = this.$echarts.init(
            document.getElementById("server_sex")
          );
          var option = {
            title: {
              text: "认证服务者性别占比图",
              textStyle: {
                // color: "#FFF",
                fontSize: "100%"
              }
            },
            tooltip: {
              show: true,
              trigger: "item",
              formatter: "{a} <br/>{b}: {c} ({d}%)",
              textStyle: {
                fontSize: "100%" //此处设置提示文字大小
              },
              padding: [5, 10]
            },
            legend: {
              // orient: "vertical",
              // x: "left",
              data: ["女性", "男性"],
             //top: 30,
              itemGap: 30,
              textStyle: {
                fontSize: "100%" //此处设置提示文字大小
              }
            },
            series: [
              {
                name: "男女比例",
                type: "pie",
                radius: ["50%", "70%"],
                 center: ['50%','55%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: "center",
                    textStyle: {
                      fontSize: "100%",
                      fontWeight: "bold"
                    }
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: "100%",
                      fontWeight: "bold"
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: sexCount
              }
            ]
          };

          this.server_sex.setOption(option, true);
          this.server_sex.resize();
        })
        .catch(err => {
          console.log(err);
        });
    },
    industry() {
      this.$http
        .get(this.HOSt + "/statistical/h5/industryRatio")
        .then(data => {
          let serverIndustry = [];
          if (data.status === 200) {
            if (data.data.code === 200) {
              if (data.data.data.length > 0) {
                let server = data.data.data;
                server.forEach((val, index) => {
                  serverIndustry.push({
                    value: val.serviceCount,
                    name: val.dictName
                  });
                });
              }
            }
          }
          this.server_industry = this.$echarts.init(
            document.getElementById("server_industry")
          );
          var option = {
            // backgroundColor: "#2c343c",
            title: {
              text: "服务者所在行业占比",
              left: "left",
              //top: 20,
              textStyle: {
                // color: "#ccc",
                fontSize: "100%"
              }
            },

            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
              {
                name: "服务者行业占比",
                type: "pie",
                radius: "75%",
                center: ["50%", "50%"],
                data: serverIndustry.sort(function(a, b) {
                  return a.value - b.value;
                }),
                roseType: "radius",
                label: {
                  normal: {
                    textStyle: {
                      fontSize: "100%"
                      // color: "rgba(255, 255, 255, 0.8)"
                    }
                  }
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      // color: "rgba(255, 255, 255, 0.8)"
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                  }
                },
                itemStyle: {
                  // normal: {
                  //   color: ["red","#AC0055","#eC2055","#Aff355"],
                  //   shadowBlur: 20,
                  //   shadowColor: "rgba(120, 30, 240, 0.5)"
                  // }
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                  }
                }

                // animationType: "scale",
                // animationEasing: "elasticOut",
                // animationDelay: function(idx) {
                //   return Math.random() * 200;
                // }
              }
            ]
          };

          this.server_industry.setOption(option, true);
          this.server_industry.resize();
        })
        .catch(err => {
          console.log(err);
        });
    },
    dateNumber() {
      //入户数量
      //this.HOSt +'/statistical//H5/statisticalForHours'   addUserCount
      // this.$http
      //   .get(this.HOSt + "/statistical/h5/addUserCount")
      //   .then(data => {
      //     let Timelist = [];
      //     let userCountList = [];
      //     if (data.status === 200) {
      //       data.data.data.data.forEach((val, index) => {
      //         Timelist.push(val.createTime);
      //         userCountList.push(val.addCount);
      //       });
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    content_bar() {
      this.$http
        .get(this.HOSt + "/statistical/h5/operateStatistic")
        .then(data => {
          if (data.status === 200) {
            if (data.data.code === 200) {
              let badList = data.data.data.badList; //差评次数
              let badListObj = { getDayList: [], counts: [] };
              let callList = data.data.data.callList; //报警次数
              let callCounts = [];
              let goodList = data.data.data.goodList; //好评次数
              let goodCounts = [];
              let orderList = data.data.data.orderList; //入户次数
              let orderCounts = [];
              let week = [
                "周日",
                "周一",
                "周二",
                "周三",
                "周四",
                "周五",
                "周六"
              ];
              badList.forEach((val, index) => {
              // let Day = new Date(Date.parse(val.date.replace(/\-/g, "/"))).getDay();
              // badListObj.getDayList.push(week[Day]);
              let date1=val.date.substr(val.date.length-5)
              if(date1[0]==0){
                date1=date1.substr(1);
              }
              badListObj.getDayList.push(date1);
              this.date_create.push(date1);
              badListObj.counts.push(-val.count);
              });
              callList.forEach((val, index) => {
                callCounts.push(-val.count);
              });
              goodList.forEach((val, index) => {
                goodCounts.push(val.count);
              });
              orderList.forEach((val, index) => {
                orderCounts.push(val.count);
              });
              this.date_number = this.$echarts.init(
            document.getElementById("date_number")
          );
          var option = {
            color: ["#3398DB"],
            title: {
              text: "服务者入户次数柱状图",
              left: "left",
              //top: 20,
              textStyle: {
                // color: "#ccc",
                fontSize: "100%"
              }
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "5%",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                data: badListObj.getDayList,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis: [
              {
                type: "value"
              }
            ],
            series: [
              {
                name: "入户次数",
                type: "bar",
                barWidth: "60%",
                data: orderCounts
              }
            ]
          };

          this.date_number.setOption(option, true);
          this.date_number.resize();
              this.contentBar = this.$echarts.init(
                document.getElementById("contentBar")
              );
              var option = {
                title: {
                  text: "服务内容条形图",
                  left: "left",
                  textStyle: {
                    // color: "#ccc",
                    fontSize: "100%"
                  }
                },
                tooltip: {
                  trigger: "axis",
                  axisPointer: {
                    type: "shadow" // 默认为直线，可选为：'line' || 'shadow'
                  }
                },
                legend: {
                  data: ["差评次数", "报警次数", "好评次数", "入户次数"],
                  itemGap: 30,
                  top:30,
                  textStyle: {
                    fontSize: "100%"
                  }
                },
                grid: {
                  left: "3%",
                  right: "4%",
                  bottom: "3%",
                  containLabel: true
                },
                xAxis: [
                  {
                    type: "value",
                    axisLabel: {
                      show: true,
                      textStyle: {
                        // color: "#DDD",
                        fontSize: "100%" //此处设置Y轴文字大小
                      }
                    }
                  }
                ],
                yAxis: [
                  {
                    type: "category",
                    axisTick: { show: false },
                    axisLabel: {
                      show: true,
                      textStyle: {
                        //color: "#DDD",
                        fontSize: "100%" //此处设置Y轴文字大小
                      }
                    },
                    data: badListObj.getDayList
                  }
                ],
                series: [
                  {
                    name: "差评次数",
                    type: "bar",
                    // barWidth:20,
                    stack: "总量2",
                    label: {
                      normal: {
                        show: true,
                        position: "inside"
                      }
                    },
                    data: badListObj.counts
                  },
                  {
                    name: "报警次数",
                    type: "bar",
                    stack: "总量1",
                    // barWidth:20,
                    label: {
                      normal: {
                        show: true
                      }
                    },
                    data: callCounts
                  },
                  {
                    name: "好评次数",
                    type: "bar",
                    stack: "总量2",
                    // barWidth:20,
                    label: {
                      normal: {
                        show: true
                        // position: "inside"
                        //position: "left"
                      }
                    },
                    data: goodCounts
                  },
                  {
                    name: "入户次数",
                    type: "bar",
                    stack: "总量1",
                    // barWidth:20,
                    label: {
                      normal: {
                        show: true
                        //position: "left"
                      }
                    },
                    data: orderCounts
                  }
                ]
              };
              this.contentBar.setOption(option, true);
              this.contentBar.resize();
            }
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-size: 0.36rem;
  text-align: left;
}
.hello {
  position: relative;
  height: 100%;
}
.swiper-container {
  width: 100%;
  min-height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  overflow: hidden;
}
.echart_content {
  width: 100%;
  height: 100vh;
}
#echartsNEW {
  width: 100%;
  height: 45vh;
}
#echartsNEW2 {
  width: 100%;
  height: 45vh;
}
#server_sex {
  width: 100%;
  height: 85vh;
}
#server_industry {
  width: 100%;
  height: 85vh;
}
#date_number {
  width: 100%;
  height: 80vh;
}
#contentBar {
  width: 100%;
  height: 85vh;
}
</style>
