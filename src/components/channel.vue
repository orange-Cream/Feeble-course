<template>
  <div>
      <el-select v-model="nowid" placeholder="请选择" clearable>
          <el-option v-for="item in channelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
  </div>
</template>

<script>
export default {
  name: 'Channel',
  props: {
    chid: {
      // 接收父组件传递过来的频道id
      default: ''
    }
  },
  watch: {
    nowid (newV) {
      // 选中的频道传递给父组件
      this.$emit('slt', newV)
    },
    chid (newV) {
      this.nowid = newV
    }
  },

  data () {
    return {
      channelList: [], // 接收频道列表数据
      nowid: '' // 当前选中的频道id
    }
  },
  created () {
    this.getChannelList()
  },
  methods: {
    // 获取频道列表数据
    getChannelList () {
      var pro = this.$http.get('/mp/v1_0/channels')
      pro
        .then(result => {
          if (result.data.message === 'OK') {
            this.channelList = result.data.data.channels
          }
        })
        .catch(err => {
          return this.$message.error('获得文章频道错误：' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
