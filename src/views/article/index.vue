<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <div class="text item">
        <el-form ref="ArticleFormRef" :model="searcForm" label-width="100px">
          <el-form-item label="文章状态："></el-form-item>
          <el-form-item label="频道列表："></el-form-item>
          <el-form-item label="时间选择："></el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      searchForm: {}
    }
  }
}
</script>

<style lang="less" scoped></style>
