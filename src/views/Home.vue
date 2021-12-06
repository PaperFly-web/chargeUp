<!--  -->
<template>
  <div class="">
    <router-view name="main"></router-view>
    <router-view name="addData"></router-view>
    <router-view name="setting"></router-view>
    <footer>
      <el-card class="el-card" shadow="never">
        <div id="footer-button">
          <el-button
            icon="el-icon-search"
            circle
            @click="switchPage('main')"
          ></el-button>
          <el-button icon="el-icon-plus" @click="switchPage('addData')" circle></el-button>
          <el-button icon="el-icon-setting" @click="switchPage('setting')" circle></el-button>
        </div>
      </el-card>
    </footer>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import hello from "../components/HelloWorld.vue"
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    "hello":hello
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    state() {},
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    switchPage(data) {
      this.$router.push({ path: "/"+data });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
footer {
  position: fixed;
  bottom: 0;
  width: 412px;
}

#footer-button {
  display: flex;
  justify-content: space-around;
}
</style>