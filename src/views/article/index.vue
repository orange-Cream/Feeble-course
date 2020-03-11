<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <div class="text item">
        <el-form ref="ArticleFormRef" :model="searchForm" label-width="100px">
          <el-form-item label="文章状态：">
            <el-radio v-model="searchForm.status" label="">全部</el-radio>
            <el-radio v-model="searchForm.status" label="0">草稿</el-radio>
            <el-radio v-model="searchForm.status" label="1">待审核</el-radio>
            <el-radio v-model="searchForm.status" label="2">审核通过</el-radio>
            <el-radio v-model="searchForm.status" label="3">审核失败</el-radio>
            <el-radio v-model="searchForm.status" label="4">已删除</el-radio>
          </el-form-item>
          <el-form-item label="频道列表：">
            <el-select
              v-model="searchForm.channel_id"
              placeholder="请选择"
              clearable
            >
              <el-option v-for="item in channelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间选择：">
            <el-date-picker
              v-model="timetotime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{tot}}条符合条件的内容</span>
      </div>
      <el-table :data="articleList" style="width: 100%">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      articleList: [], // 文章列表
      tot: 0, // 文章总条数
      channelList: [], // 真实频道数据进行展示
      timetotime: [], // 临时接收时间范围信息
      searchForm: {
        status: '0', // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
        channel_id: '', // 频道id
        begin_pubdate: '', // 文章发布开始时间
        end_pubdate: '' // 文章发布结束时间
      }
    }
  },
  watch: {
    timetotime: function (newV) {
      if (newV) {
        this.searchForm.begin_pubdate = newV[0]
        this.searchForm.end_pubdate = newV[0]
      } else {
        // 清除时间信息
        this.searchForm.begin_pubdate = ''
        this.searchForm.end_pubdate = ''
      }
    }
  },
  created () {
    this.getArticleList()
    this.getChannelList()
  },
  methods: {
  // 获得真实文章列表数据
    getArticleList () {
      const pro = this.$http({
        url: '/mp/v1_0/articles',
        method: 'get'
      })
      pro
        .then(result => {
          console.log(result)
          // data接收文章数据
          this.articleList = result.data.data.results
          // 接收总条数
          this.tot = result.data.data.total_count
        })
        .catch(err => {
          return this.$message.error('获得文章失败：' + err)
        })
    },
    // 获取频道列表
    getChannelList () {
      const pro = this.$http({
        url: '/mp/v1_0/channels',
        method: 'get'
      })
      pro.then(result => {
        // data接收频道数据
        this.channelList = result.data.data.channels
      })
        .catch(err => {
          return this.$message.error('获得频道失败:' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
  /*给卡片区设置向下的外边距*/
  .box-card{margin-bottom:15px;}
</style>
