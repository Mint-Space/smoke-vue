<template>
  <el-row>
    <el-col :span="8">
      <div class="box">
        <div class="box-title">墨染后台</div>
        <div class="box-container">
          <div class="input">
            <div class="title">用户名：</div>
            <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
              v-model="username"
              class="username"
            >
            </el-input>
          </div>
          <div class="input">
            <div class="title">密&nbsp;&nbsp;&nbsp;&nbsp;码：</div>
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-coffee"
              v-model="password"
              class="password"
              show-password
              @keyup.native.enter="login"
            >
              <el-button
                class="login-button"
                slot="append"
                icon="el-icon-right"
                @click="login"
              ></el-button>
            </el-input>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$router.push("/homes");
    },
  },
};
</script>

<style lang="less" scoped>
.el-row {
  position: relative;
  .el-col {
    position: absolute;
    right: 150px;
    top: 50vh;
    transform: translateY(-50%);
  }
}
.box {
  width: 400px;
  height: 300px;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 25px;
  position: relative;
  // box-shadow: 5 5 10 rgb(255, 255, 255);
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(50px);
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 25px;
    box-shadow: 5px 5px 35px rgba(202, 202, 202, 0.4);
  }
  .box-title {
    font-size: 30px;
    padding-top: 50px;
    z-index: 1;
    color: #fff;
  }
  .box-container {
    padding-bottom: 25px;
    z-index: 1;
    .input {
      display: flex;
      flex-flow: row;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 10px;
      .title {
        width: 100px;
        display: flex;
        flex-flow: row;
        justify-content: flex-end;
        color: #fff;
      }
    }
    .password {
      position: relative;
      .login-button {
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        padding: 0;
        padding-left: 5px;
        font-size: 30px;
        color: rgb(169, 186, 223);
      }
    }
  }
}
</style>