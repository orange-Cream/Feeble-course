<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发表文章</span>
      </div>
      <div class="text item">
        <el-form
          :rules="addFormRules"
          ref="addFormRef"
          :model="addForm"
          label-width="120px"
        >
          <el-form-item label="标题：" prop="title">
            <el-input v-model="addForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容：" prop="content">
            <quillEditor v-model="addForm.content"></quillEditor>
          </el-form-item>
          <el-form-item label="封面" prop="channel_id">
            <el-radio-group v-model="addForm.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道：">
            <el-select
              v-model="addForm.channel_id"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in channelList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addarticle(false)"
              >发布</el-button
            >
            <el-button @click="addarticle(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 通过es6按需导入方式 导入需要的组件模块
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      // 表单校验规则
      addFormRules: {
        title: [
          { required: true, message: '标题必填' },
          // 后端要求title长度介于5-30个字符
          {
            min: 5,
            max: 30,
            message: '标题长度介于5-30个字符'
          }
        ],
        content: [{ required: true, message: '内容必填' }],
        channel_id: [{ required: true, message: '频道必选' }]
      },
      channelList: [],
      addForm: {
        title: '',
        content: '',
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        },
        channel_id: ''
      }
    }
  },
  components: {
    // 简易成员赋值 quillEditor: quillEditor
    // 组件使用两种方式：<quillEditor></quillEditor> 或 <quill-editor></quill-editor>
    quillEditor
  },
  created () {
    this.getChannelList()
  },
  methods: {
    // 发表文章
    addArticle (flag) {
      // 表单整体校验
      this.$refs.addFormRef.validate(valid => {
        // 校验失败停止后续执行
        if (!valid) {
          return false
        }
        // 继续
        const pro = this.$http({
          url: '/mp/v1_0/articles',
          method: 'post',
          data: this.addForm, // 表单数据
          params: { draft: flag } // 请求字符串数据
        })
        pro.then(result => {
          this.$message.success('发布文章成功')
          this.$router.push({ name: 'article' })
        })
          .catch(err => {
            return this.$message.error('发布文章失败：' + err)
          })
      })
    },
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
          return this.$message.error('获得文章频道错误:' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
/*控制富文本编辑器的高度样式*/
// .ql-editor{height:200px;}  // 编译变为.ql-editor[data-v-494db270] { height: 200px; } 失效的

/*使用深度作用选择器
  /deep/深度作用选择器作用： 前边的会关联data-v-xx属性，而后边的不会关联
*/
.quill-editor /deep/ .ql-editor {
  height: 200px;
}
// 上述样式解析完毕：.quill-editor[data-v-494db270] .ql-editor{height:200px;}
</style>
