<template>
  <div>
    <Bread />
    <el-card>
      <div slot="header">
        <i class="el-icon-s-data" style="margin-right:10px;color:#1890ff;"></i>
        <span class="title">整体概况</span>
      </div>
      <div class="fl">
        <div>
          <span class="count">{{ countInfo.allNum ? countInfo.allNum : 0 }}</span>
          <span class="name">全部项目</span>
        </div>
        <div>
          <span class="count">{{ countInfo.neverStart ? countInfo.neverStart : 0 }}</span>
          <span class="name">未开始</span>
        </div>
        <div>
          <span class="count">{{ countInfo.alreadyStart ? countInfo.alreadyStart : 0 }}</span>
          <span class="name">进行中</span>
        </div>
        <div>
          <span class="count">{{ countInfo.stopNum ? countInfo.stopNum : 0 }}</span>
          <span class="name">已暂停</span>
        </div>
        <div>
          <span class="count">{{ countInfo.endNum ? countInfo.endNum : 0 }}</span>
          <span class="name">已终止</span>
        </div>
        <div>
          <span class="count">{{ countInfo.finishNum ? countInfo.finishNum : 0 }}</span>
          <span class="name">已结项</span>
        </div>
      </div>
    </el-card>

    <el-card>
      <div slot="header">
        <i class="el-icon-s-data" style="margin-right:10px;color:#1890ff;"></i>
        <span class="title">延期情况</span>
      </div>
      <div class="fl">
        <div>
          <span class="count">{{ countInfo.notExpired ? countInfo.notExpired : 0 }}</span>
          <span class="name">未延期</span>
        </div>
        <div>
          <span class="count">{{ countInfo.nearExpired ? countInfo.nearExpired : 0 }}</span>
          <span class="name">临期</span>
        </div>
        <div>
          <span class="count">{{ countInfo.expired ? countInfo.expired : 0 }}</span>
          <span class="name">已延期</span>
        </div>
        <div style="border:none;"></div>
        <div style="border:none;"></div>
        <div style="border:none;"></div>
      </div>
    </el-card>
  
    <el-card>
      <div slot="header">
        <i class="el-icon-s-data" style="margin-right:10px;color:#1890ff;"></i>
        <span class="title">项目进度</span>
      </div>
      <div class="fl">
        <div>
          <span class="count">{{ countInfo.progressFirst ? countInfo.progressFirst : 0 }}</span>
          <span class="name">起始阶段</span>
        </div>
        <div>
          <span class="count">{{ countInfo.progressSecond ? countInfo.progressSecond : 0 }}</span>
          <span class="name">接入方案</span>
        </div>
        <div>
          <span class="count">{{ countInfo.progressThird ? countInfo.progressThird : 0 }}</span>
          <span class="name">初设完成</span>
        </div>
        <div>
          <span class="count">{{ countInfo.progressFourth ? countInfo.progressFourth : 0 }}</span>
          <span class="name">施工进场</span>
        </div>
        <div>
          <span class="count">{{ countInfo.progressFifth ? countInfo.progressFifth : 0 }}</span>
          <span class="name">并网完成</span>
        </div>
        <div>
          <span class="count">{{ countInfo.progressSixth ? countInfo.progressSixth : 0 }}</span>
          <span class="name">竣工验收</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getEpcProjectCount } from '@/api/epc'
export default {
  name: 'KanBan',
  data() {
    return {
      countInfo: {}
    }
  },
  created() {
    this.getEpcProjectCount()
  },
  methods: {
    getEpcProjectCount () {
      getEpcProjectCount().then( res => {
        // console.log(res)
        this.countInfo = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fl {
  display: flex;
  justify-content: space-around;
  align-items: center;
  div {
    width: 100%;
    height: 70px;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #eee;
    border-radius: 3px;
  }
}
.title {
  font-size: 13px;
  font-weight: 600;
}
.count {
  font-size: 16px;
  font-weight: 600;
}
.name {
  font-size: 12px;
}
</style>