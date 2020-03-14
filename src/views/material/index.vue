<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>素材管理</span>
      </div>
      <div class="text item">
        <ul>
          <li class="image-box" v-for="item in 20" :key="item">
            <img src="../../assets/logo.png" alt="" />
                      <div class="image-bot">
            <el-button
              type="success"
              icon="el-icon-star-off"
              circle
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </div>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Material'
}
</script>

<style lang="less" scoped>
.image-box{
    list-style: none;
    width: 200px;
    height: 200px;
    background-color: #fff;
    margin: 10px;
    float: left;
    border: 1px solid #eee;
    img{
        width: 200px;
        height: 140px;
    }
    .image-bot {
    width: 200px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
}
</style>
