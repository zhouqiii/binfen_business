<template>
    <el-upload
        style="width:300px;height:200px"
        class="upload-demo"
        ref="upload"
        action="#"
        :http-request="handleUpload"
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-success="success"
        :on-error="error"
        :before-upload="beforeUpload"
        :show-file-list="false"
        :limit="1"
        list-type="picture">
        <el-button size="small" type="primary" >点击上传</el-button>
        <div slot="tip" class="el-upload__tip" >请上传不超过500KB。尺寸300*200,png格式图片
            <img v-if="imageUrl" :src="imageUrl"  width="150px" height="100px">
        </div>
    </el-upload> 
</template>
<script>
let isLt500K = true;
let isImage = true;
let isSize = true;
export default {
  name: "uploadImg",
  props: {
    imgUrl: String
  },
  watch:{
    imgUrl: {
      handler(newValue,oldValue) { this.imageUrl = newValue; },
      deep: true
    }
  },
  data() {
    return {
      file:'',//文件对象
      disabled:false,//按钮默认为disabled
      imageUrl:this.imgUrl,//图片url
      haspic:false//是否已经上传图片
    }
  },
  methods:{
    //on-chage 文件成功失败时都会调用
    handleChange (file, fileList) {
      //每次上传文件之前,先重置状态，清除upload组件中的文件
      this.reset();
      this.imageUrl = file.url;
    },
    handleUpload(data) {
      this.send(data.file);
    },
    //action="#",上传成功,这个方法不会调用
    success(response, file, fileList) {
      this.reset();
    },
    //action="#",上传失败,这个方法不会调用
    error(err, file, fileList) {
      this.reset();
    },
    // 上传之前的格式设置,图片上传尺寸大小检验
    beforeUpload (file) {
      //console.log("beforeUpload");
      this.isImage = file.type.includes("png");
      this.isLt500K = (file.size / 1024) < 500
      if (!this.isLt500K) {
        this.$message.error('图片大小不能超过 500kb!');
        //清空图片
        this.reset();
        return false;
      }
      if (!this.isImage) {
        this.$message.error('图片类型必须是png格式');
        //清空图片
        this.reset();
        return false;
      }

      this.isSize = new Promise(function(resolve, reject) {
        let width = 300;
        let height = 200;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function() {
          let valid = img.width == width && img.height == height;
          valid ? resolve() : reject();
        }
        img.src = _URL.createObjectURL(file);
        }).then(() => {
          this.isSize = true;
          this.valid();
          this.send(file);
        }, () => {
          this.$message.error('图片尺寸必须是300*200!');
          this.isSize = false;
          this.valid();
          this.send(file);
        });
      return this.isLt500K && this.isSize && this.isImage;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //移除图片
    handleRemove(file,fileList) {
      let index = fileList.findIndex( fileItem => {
        return fileItem.uid === file.uid
      });
      fileList.splice(index, 1);
    },
    send(_file){
      var params = {
        file:_file,
        disabled:this.disabled,
        haspic:this.haspic
      }
      this.$emit('func',params);
    },
    valid(){
      var valid = (this.isLt500K==true && this.isImage==true && this.isSize==true);
      //验证都通过,save按钮变成disabled = false
      if(valid){
        this.haspic = true;
        this.disabled = false;
      }else{
        this.reset();
      }
    },
    reset(){
      this.imageUrl="";
      this.disabled = true;
      this.haspic = false;
      this.$refs.upload.clearFiles();
      //清除之后将disabled和haspic两个值再次更新到父组件页面
      this.send();
    }
  }
}
</script>