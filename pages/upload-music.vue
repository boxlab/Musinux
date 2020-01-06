<template>
  <div>
    <ContentArea title="上传歌曲">
      <a-alert message="支持的文件格式: .mp3/.flac/.wav/.acc。未来将支持将上传的 .ncm 格式文件自动转换为支持的格式。" type="info"/>
      <br/>
      <div class="upload-area">
        <a-upload-dragger
          name="file"
          :multiple="true"
          action="http://10.1.1.101:5000/upload"
          :beforeUpload="beforeUpload"
          @change="handleChange"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox"/>
          </p>
          <p class="ant-upload-text">点击或拖动文件到此处上传</p>
          <p class="ant-upload-hint">
            支持单个或批量上传
          </p>
        </a-upload-dragger>
      </div>
    </ContentArea>
  </div>
</template>

<script>
  import ContentArea from "../components/ContentArea";

  export default {
    name: "upload-music",
    components: {ContentArea},
    data() {
      return {
        defaultFileList: []
      }
    },
    methods: {
      beforeUpload(file) {
        const isAudio = this.isAudio(file.type);
        if (!isAudio) {
          // this.$message.error(`${file.name} 文件格式不受支持`);
          file.status = 'error';
        }
        return isAudio;
      },
      handleChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          this.$message.success(`${info.file.name} 上传成功.`);
        } else if (status === 'error') {
          this.$message.error(`${info.file.name} 上传失败` + (this.isAudio(info.file.type) ? '' : ('(格式不受支持)')) + `.`);
        }
      },
      isAudio(type) {
        return type === 'audio/mp3' || type === 'audio/flac' || type === 'audio/wav' || type === 'audio/aac';
      },
    },
  }
</script>

<style>
  .upload-area {
    width: 100%;
  }

  .ant-upload {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 250px;
  }

  .ant-upload-drag {
    background-color: rgba(255, 255, 255, .35) !important;
    border-radius: 10px !important;
  }

  .ant-upload-list {
    padding: 10px;
    margin-top: 1rem;
    border: 1px dashed #d9d9d9;
    background-color: rgba(255, 255, 255, .35);
    border-radius: 10px;
  }
</style>
