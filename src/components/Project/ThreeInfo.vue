<template>
  <div>
    <ProjectTitle title="近3年销售与利润" />
    <table style="width: 100%;text-align:center;margin:15px 0;font-size:12px;" class="ht" cellpadding="0" cellspacing="0">
      <tr style="background:#f2f2f2;">
        <td></td>
        <td>2019年</td>
        <td>2020年</td>
        <td>2021年</td>
      </tr>
      <tr>
        <td>年销售额（万元）</td>
        <td>{{ first.sellMoney ? first.sellMoney : '-' }}</td>
        <td>{{ second.sellMoney ? second.sellMoney : '-' }}</td>
        <td>{{ three.sellMoney ? three.sellMoney : '-' }}</td>
      </tr>
      <tr>
        <td>年利润额（万元）</td>
        <td>{{ first.profix ? first.profix : '-' }}</td>
        <td>{{ second.profix ? second.profix : '-' }}</td>
        <td>{{ three.profix ? three.profix : '-' }}</td>
      </tr>
    </table>
    <div style="margin-bottom:15px;" class="yi">
      <span style="font-size: 12px;color: #aaa;margin:0 10px 0 0;">近3年销售与利润说明</span>
      <el-tooltip class="item" effect="dark" :content="seProjectFinanceOtherMessage.financeOtherMessage" placement="top">
        <span style="font-size: 12px;">{{ seProjectFinanceOtherMessage.financeOtherMessage }}</span>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThreeInfo',
  props: {
    seProjectNearThreeYearSellProfixList: {
      type: Array,
      default: () => {}
    },
    seProjectFinanceOtherMessage: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    seProjectNearThreeYearSellProfixList(newVal) {
      if (newVal.length > 0) {
        this.first = newVal[0] 
        this.second = newVal[1]
        this.three = newVal[2]
      }
    }
  },
  data() {
    return {
      first: {
        sellMoney: null,
        profix: null
      },
      second: {
        sellMoney: null,
        profix: null
      },
      three: {
        sellMoney: null,
        profix: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ht {
    border-collapse:collapse;
    border: 1px solid #DCDFE6;
    td {
      width: 25%;
      height: 30px;
      border: 1px solid #DCDFE6;
    }
  }
</style>