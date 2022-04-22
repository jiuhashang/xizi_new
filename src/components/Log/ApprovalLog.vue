<template>
  <el-dialog
    title="审批记录"
    :visible.sync="logVisible"
    width="50%"
    :close-on-click-modal="false"
    :before-close="handleClose"
    >
    <el-timeline :reverse="true">
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index">
        <el-card style="margin-top:0;margin-bottom:0;">
          <p>{{activity.title}}</p>
          <p><span>{{activity.userName}}</span><span style="margin-left:14px;">{{activity.createTime}}</span></p>
          <p v-show="activity.remark">审批备注：{{activity.remark}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-dialog>
</template>

<script>
export default {
  name: 'ApprovalLog',
  props: {
    logVisible: {
      type: Boolean,
      default: false
    },
    activities: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:logVisible', false)
    }
  }
};
</script>

<style lang="scss" scoped>

</style>