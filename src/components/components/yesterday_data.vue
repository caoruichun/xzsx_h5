<template>
    <div>
    <h2>以下数据为昨日的汇总数据</h2>
        <Row>
        <Col span="6" v-for="(item,i) in inforCardData" :key="i">
          <Card>
            <div class="Card_box">
              <div class="icon">
                <img :src="item.src" style="width:80px;"  alt="">
                <!-- <Icon :type="item.icon" size="100"  :color="item.color"></Icon>   -->
              </div>
                <div class="count">
                <p><span  ref="counts">{{item.count}}</span></p>
                <p><small>{{item.title}}</small>  </p>
              </div>
            </div>
          </Card>
        </Col>
        </Row>
    </div>
</template>
<script>
import iosperson from '@/images/ios-person.png'
import iosserver from '@/images/ios-server.png'
import briefcase from '@/images/ios-briefcase.png'
import more from '@/images/ios-more.png'
import CountUp from "countup";
export default {
  name: "yesterdayData",
  data() {
    return {
      numAnim: null,
      inforCardData: [
        {
          title: "普通用户总数",
          src: iosperson,
          count: 0.0,
        },
        {
          title: "服务者总数",
          src: iosserver,
          count: 0,
        },
        {
          title: "入户验证总次数",
          src: briefcase,
          count: 0,
        },
        {
          title: "平均验证次数",
          src: more,
          count: 0.0,
        }
      ]
    };
  },
  mounted() {
    this.getMenuList();
  },
  // props:['count'],
  methods: {
    getMenuList() {
      this.get("/statistical/getCount", {}, data => {
        // "clientUser": 普通用户数
        // "validationCount": 入户验证总次数
        // "serviceUser":服务者总数
        // "avgValidation": 平均验证次数
        //let avgValidation=parseFloat(data.avgValidation.toFixed(2));
        this.inforCardData[0].count = data.clientUser;
        this.inforCardData[1].count = data.serviceUser;
        this.inforCardData[2].count = data.validationCount;
        this.inforCardData[3].count = data.avgValidation;
        this.initCountUp();
      });
    },
    initCountUp() {
      for (let i = 0; i < 4; i++) {
        this.numAnim = new CountUp(
          this.$refs.counts[i],
          0,
          this.inforCardData[i].count,
          0,
          4
        );
        if (i == 3) {
          this.numAnim = new CountUp(
            this.$refs.counts[i],
            0,
            this.inforCardData[i].count,
            2,
            4
          );
        }
        this.numAnim.start();
      }
    }
  }
};
</script>
<style lang="less" scoped>
h2 {
  margin: 20px 0;
}
.ivu-card{
  margin:0 10px;
}
.Card_box {
  display: flex;
  justify-content: space-around;
  .icon{
    display:flex;
    align-items:center;/*垂直居中*/
  }
}
.count {
  p {
    text-align: center;
    span {
      font-size: 40px;
      font-weight: 600;
    }
    small {
      font-size: 16px;
      color: #aaa;
    }
  }
}
</style>
