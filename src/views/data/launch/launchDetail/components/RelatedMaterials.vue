<template>
  <!-- 相关材料 -->
  <div> 
    <div class="xian">
      <div>相关材料</div>
    </div>
    <el-alert title="如文件较多，可将文件进行压缩打包上传。" type="success" :closable="false" />
    <el-form ref="relevantFileForm" :rules="relevantFileRules" :model="seProjectRelevantFile" style="text-align:right;" label-width="150px">
      <el-row :gutter="20" style="margin:0 30px;">
        <el-col :span="8">
          <el-form-item label="不动产权证或三证" prop="realPropertyRightFile" class="must-form-item">
            <file-upload-string
              v-model="seProjectRelevantFile.realPropertyRightFile"
              :limit="1"
              accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm"
            >
            </file-upload-string>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="近12个月电费复核单" prop="nearYearElectricityBill" class="must-form-item">
            <file-upload-string
              v-model="seProjectRelevantFile.nearYearElectricityBill"
              :limit="1"
              accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm"
            >
            </file-upload-string>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结构图" prop="structureFile" class="must-form-item">
            <file-upload-string
              v-model="seProjectRelevantFile.structureFile"
              :limit="1"
              accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm"
            >
            </file-upload-string>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:0 30px;">
        <el-col :span="8">
          <el-form-item label="配电室内部照片">
            <file-upload-string
              v-model="seProjectRelevantFile.electricityRoomInsideFile"
              :limit="1"
              accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm"
            >
            </file-upload-string>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建筑图">
            <file-upload-string
              v-model="seProjectRelevantFile.buildFile"
              :limit="1"
              accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm"
            >
            </file-upload-string>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总平图">
            <file-upload-string
              v-model="seProjectRelevantFile.generalLayoutFile"
              :limit="1"
              accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm"
            >
            </file-upload-string>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:0 30px;">
        <el-col :span="8">
          <el-form-item label="厂房内部照片" prop="workShopInsideFile" class="must-form-item">
            <file-upload-string
              v-model="seProjectRelevantFile.workShopInsideFile"
              :limit="1"
              accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm"
            >
            </file-upload-string>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="厂名正面照片" prop="workShopFrontFile" class="must-form-item">
            <file-upload-string
              v-model="seProjectRelevantFile.workShopFrontFile"
              :limit="1"
              accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm"
            >
            </file-upload-string>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="屋顶细节照片" prop="houseTopDetailFile" class="must-form-item">
            <file-upload-string
              v-model="seProjectRelevantFile.houseTopDetailFile"
              :limit="1"
              accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm"
            >
            </file-upload-string>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:0 30px;">
        <el-col :span="8">
          <el-form-item label="厂房内屋顶照片" prop="workShopInsideTopFile" class="must-form-item">
            <file-upload-string
              v-model="seProjectRelevantFile.workShopInsideTopFile"
              :limit="1"
              accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm"
            >
            </file-upload-string>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目发起额外材料">
            <file-upload-string
              v-model="seProjectRelevantFile.projectOtherFile"
              :limit="1"
              accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm"
            >
            </file-upload-string>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:0 30px;">
        <el-col>
          <el-form-item label="项目发起额外说明">
            <el-input placeholder="请输入" class="width100"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'RelatedMaterials',

  data() {
    return {
      
    }
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style lang="scss" scoped>

</style>