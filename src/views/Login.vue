<!--  -->
<template>
  <div class="login">
    <div class="login-title">
      <h1>Welcome</h1>
    </div>

    <div class="login-content" v-show="signIn">
      <van-form @submit="onSubmit">
        <van-field
          v-model="user.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="user.pwd"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit" @click="sign('signIn')">
            登录
          </van-button>
        </div>
      </van-form>

     
    </div>
    <div class="login-content" v-show="signUp">
       <van-form @submit="onSubmit">
        <van-field
          v-model="user.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="user.pwd"
          type="password"
          name="密码"
          label="密码"
          placeholder="数字,字母组成,长度大于6"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="user.rePwd"
          type="password"
          name="验证密码"
          label="验证密码"
          placeholder="验证密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit" @click="sign('signUp')">
            注册
          </van-button>
        </div>
      </van-form>
     
    </div>
    <div class="login-sign">
      <el-link type="primary" @click="changeSign('signIn')">登录</el-link>
      <el-link type="primary" @click="changeSign('signUp')">注册</el-link>
    </div>
    <!-- <footer>
      版权所有092818106
    </footer> -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import "../assets/login.scss";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      signIn: true,
      signUp: false,
      user: {
        username: "",
        pwd: "",
        rePwd: "",
      },
      temUser: {
        username: "",
        pwd: "",
        rePwd: "",
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    changeSign(data) {
      if (data == "signIn") {
        if (!this.signIn) {
          this.signIn = true;
          this.signUp = false;
        }
      } else {
        if (!this.signUp) {
          this.signIn = false;
          this.signUp = true;
        }
      }
    },
    sign(data) {
      var pwdRegx = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
      var pwd = this.user.pwd.trim();
      var rePwd = this.user.rePwd.trim();
      var username = this.user.username.trim();
      if (data == "signIn") {
        if (username == "" || !pwdRegx.test(pwd)) {
          this.$message.error("用户名或者密码格式不正确");
        } else {
          this.temUser = JSON.parse(localStorage.getItem("user"));
          console.log("本地存储的用户信息", this.temUser);
          if (!this.temUser) {
            console.log("用户没有登录过");
            this.$message.warning("您还未注册");
            // this.$router.push({ path: "/" });
          } else {
            if (
              this.temUser.username == this.user.username &&
              this.temUser.pwd == this.user.pwd
            ) {
              this.$message.success("登录成功,正在跳转");
              var login = {
                state: 1,
                expTime: new Date().getTime() + 24 * 60 * 60 * 1000,
              };
              localStorage.setItem("login", JSON.stringify(login));
              this.$router.push({ path: "/" });
            } else {
              this.$message.error("用户名或者密码不正确");
            }
          }
        }
      } else {
        if (username == "" || !pwdRegx.test(pwd) || pwd != rePwd) {
          this.$message.error("请输入正确的信息");
        } else {
          const user = JSON.stringify(this.user);
          localStorage.setItem("user", user);
          this.$message.success("注册成功,赶快去登录吧");
        }
      }
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
.login {
  background-image: url("../source/image/bg.jpg");
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  width: 411px;
  height: 731px;
}
.login-content {
  display: flex;
  text-align: center;
  padding-top: 11rem;
}
.login-title {
  position: relative;
  left: 2rem;
  top: 2rem;
  color: whitesmoke;
}
.login-sign {
  margin-top: 1rem;
  padding-left: 5rem;
  padding-right: 5rem;
  display: flex;
  justify-content: space-around;
  text-align: center;
}
footer {
  position: fixed;
  bottom: 0;
  width: 412px;
}
</style>