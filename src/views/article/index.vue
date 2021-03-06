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
          <el-form-item label="频道列表：" prop="channel_id">
            <channel @slt="selectHandler"></channel>
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
        <span>共找到{{ tot }}条符合条件的内容</span>
      </div>
      <el-table :data="articleList" style="width: 100%">
        <el-table-column label="图标">
          <img
            :src="stData.row.cover.images[0]"
            slot-scope="stData"
            alt="没有图标"
            width="150"
            height="100"
          />
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="stData">
            <el-tag v-if="stData.row.status === 0">草稿</el-tag>
            <el-tag v-else-if="stData.row.status === 1" type="success"
              >待审核</el-tag
            >
            <el-tag v-else-if="stData.row.status === 2" type="info"
              >审核通过</el-tag
            >
            <el-tag v-else-if="stData.row.status === 3" type="warning"
              >审核失败</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="stData">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="$router.push(`/articleedit/${stData.row.id}`)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="del(stData.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="searchForm.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tot"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// 引入频道公共组件
import Channel from '@/components/channel.vue'
export default {
  name: 'Article',
  components: {
    // 注册频道独立组件
    Channel
  },
  data () {
    return {
      articleList: [], // 文章列表
      tot: 0, // 文章总条数
      channelList: [], // 真实频道数据进行展示
      timetotime: [], // 临时接收时间范围信息
      searchForm: {
        page: 1, // 当前数据记录页码
        per_page: 10, // 分页数据记录条数(10~50)
        begin_pubdate: '', // 开始时间
        end_pubdate: '', // 结束时间
        channel_id: '', // 频道id
        status: '' // 文章状态，''-全部, 0-草稿，1-待审核，2-审核通过，3-审核失败
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
    },
    searchForm: {
      handler: function (newV, oldV) {
        this.getArticleList()
      },
      deep: true
    }
  },
  created () {
    this.getArticleList()
    this.getChannelList()
  },
  methods: {
    // 频道组件方法，获得子组件传递过来的频道id并赋予给channel_id成员
    // val:子组件给传递过来的频道信息
    selectHandler (val) {
      this.searchForm.channel_id = val
    },
    // 删除文章
    del (id) {
      // 确认事情
      // 确认事情
      this.$confirm('确认要删除该文章么?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // axios请求服务器端实现删除
          const pro = this.$http({
            url: '/mp/v1_0/articles/' + id,
            method: 'delete'
          })
          pro
            .then(result => {
              // 删除成功
              // console.log(result)  // 返回空的data数据
              // 直接页面刷新即可
              this.getArticleList()
            })
            .catch(err => {
              return this.$message.error('删除文章失败：' + err)
            })
        })
        .catch(() => {})
    },
    // 分页相关
    // 每条条数变化的回调处理
    handleSizeChange (val) {
      // val: 变化后的每页条数
      console.log(val)
      // 更新每页条数
      this.searchForm.per_page = val
      // 根据变化后的每页条数重新获得文章列表
      //   this.getArticleList()
    },
    // 页码变化的回调处理
    handleCurrentChange (val) {
      // val: 变化后的页码
      console.log(val)
      // 更新页码
      this.searchForm.page = val
      // 根据变化后页码重新获得文章列表
      //   this.getArticleList()
    },
    // 获得真实文章列表数据
    getArticleList () {
      // 把searchForm内部为空的成员都"过滤掉"
      const searchData = {}
      for (var i in this.searchForm) {
        // i:代表对象的成员属性名称, status、channel_id、begin_pudate等等
        if (this.searchForm[i] || this.searchForm[i] === 0) {
          // 成员值非空
          searchData[i] = this.searchForm[i]
        }
      }

      const pro = this.$http({
        url: '/mp/v1_0/articles',
        method: 'get',
        params: searchData
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
      pro
        .then(result => {
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
.box-card {
  margin-bottom: 15px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
