import CustomTable from '@/components/GlobalComponents/CustomTable'
import CustomPagination from '@/components/GlobalComponents/CustomPagination'
import ImageUpload from '@/components/GlobalComponents/ImageUpload'
import FileUpload from '@/components/GlobalComponents/FileUpload'
import ImageUploadString from '@/components/GlobalComponents/ImageUpload/string.vue'
import FileUploadString from '@/components/GlobalComponents/FileUpload/string.vue'
import CustomTabs from '@/components/GlobalComponents/Tabs/Tabs.vue'
import CustomInputNumber from '@/components/GlobalComponents/Input/Input.vue'

import ApprovalLog from '@/components/Log/ApprovalLog.vue'
import ProjectTitle from '@/components/Project/ProjectTitle.vue'
import ProjectInfo from '@/components/Project/ProjectInfo.vue'
import OwnerInfo from '@/components/Project/OwnerInfo.vue'
import RoofInfo from '@/components/Project/RoofInfo.vue'
import PowerInfo from '@/components/Project/PowerInfo.vue'
import ModeInfo from '@/components/Project/ModeInfo.vue'
import ThreeInfo from '@/components/Project/ThreeInfo.vue'
import MaterialInfo from '@/components/Project/MaterialInfo.vue'
import LoadInfo from '@/components/Project/LoadInfo.vue'
import MeasureInfo from '@/components/Project/MeasureInfo.vue'
import OtherInfo from '@/components/Project/OtherInfo.vue'
import DataInfo from '@/components/Project/DataInfo.vue'
import ParamInfo from '@/components/Project/ParamInfo.vue'
import SuppleInfo from '@/components/Project/SuppleInfo.vue'
import Bread from '@/components/Project/Bread'

function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  Vue.component('cTable', CustomTable)
  Vue.component('cPagination', CustomPagination)
  Vue.component('ImageUpload', ImageUpload)
  Vue.component('FileUpload', FileUpload)
  Vue.component('ImageUploadString', ImageUploadString)
  Vue.component('FileUploadString', FileUploadString)
  Vue.component('cTabs', CustomTabs)
  Vue.component('CInputNumber', CustomInputNumber)

  Vue.component('ApprovalLog', ApprovalLog)
  Vue.component('ProjectTitle', ProjectTitle)
  Vue.component('ProjectInfo', ProjectInfo)
  Vue.component('OwnerInfo', OwnerInfo)
  Vue.component('RoofInfo', RoofInfo)
  Vue.component('PowerInfo', PowerInfo)
  Vue.component('ModeInfo', ModeInfo)
  Vue.component('ThreeInfo', ThreeInfo)
  Vue.component('MaterialInfo', MaterialInfo)
  Vue.component('LoadInfo', LoadInfo)
  Vue.component('MeasureInfo', MeasureInfo)
  Vue.component('OtherInfo', OtherInfo)
  Vue.component('DataInfo', DataInfo)
  Vue.component('ParamInfo', ParamInfo)
  Vue.component('SuppleInfo', SuppleInfo)
  Vue.component('Bread', Bread)
}

export default plugin
