<template>
  <div class="dashboard">
    <div class="top">
      <img :src="image" alt="">
      <h2>你好，{{ nickName }}</h2>
    </div>
    <el-card class="box-card">
      <div slot="header">
        <span style="font-weight:900;">项目概况</span>
      </div>
      <div class="item">
        <div class="c">
          <p>全部项目</p>
          <h3>{{ totalNum }}</h3>
        </div>
        <div class="shu"></div>
        <div class="c">
          <p>项目发起</p>
          <h3>{{projectInputNum  }}</h3>
        </div>
        <div class="shu"></div>
        <div class="c">
          <p>项目初审</p>
          <h3>{{firstExamineNum }}</h3>
        </div>
        <div class="shu"></div>
        <div class="c">
          <p>图纸复核</p>
          <h3>{{ secondExamineNum }}</h3>
        </div>
        <div class="shu"></div>
        <div class="c">
          <p>材料补充</p>
          <h3>{{ fileSupplementNum }}</h3>
        </div>
        <div class="shu"></div>
        <div class="c">
          <p>项目终审</p>
          <h3>{{ thirdExamineNum }}</h3>
        </div>
        <div class="shu"></div>
        <div class="c">
          <p>项目补充</p>
          <h3>{{endFileSupplementNum }}</h3>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getProjectCount } from '@/api/listProject'
export default {
  name: 'Dashboard',
  data() {
    return {
      endFileSupplementNum: 0,
      fileSupplementNum: 0,
      firstExamineNum: 0,
      projectInputNum: 0,
      secondExamineNum: 0,
      thirdExamineNum: 0,
      totalNum: 0
    }
  },
  created() {
    this.getProjectCount()
  },
  methods: {
    getProjectCount() {
      getProjectCount().then(res => {
        const { endFileSupplementNum, fileSupplementNum, firstExamineNum, projectInputNum, secondExamineNum, thirdExamineNum, totalNum } = res.data
        this.endFileSupplementNum = endFileSupplementNum
        this.fileSupplementNum = fileSupplementNum
        this.firstExamineNum = firstExamineNum
        this.projectInputNum = projectInputNum
        this.secondExamineNum = secondExamineNum
        this.thirdExamineNum = thirdExamineNum
        this.totalNum = totalNum
      })
    }
  },
  computed: {
    nickName() {
      return window.sessionStorage.getItem('nickName')
    },
    image() {
      return window.sessionStorage.getItem('image')
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 125px;
  display: flex;
  padding: 30px 15px 30px 30px;
  background-color: #fff;
  box-sizing: border-box;
  line-height: 15px;
}
img {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  margin-right: 15px;
}
.item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 100px;
  .c {
    text-align: center;
  }
}
.shu {
  height: 30px;
  border: 1px solid #eee;
}
.el-steps {
  background-color: #fff;
  margin: 20px;
}
/deep/ .el-step__icon.is-text {
  display: none;
}
/deep/ .el-step.is-simple .el-step__title {
  color:black;
}
</style>