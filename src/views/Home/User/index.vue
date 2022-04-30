<template>
  <div class="box">
    <el-card>
      <el-avatar
        shape="square"
        fit="cover"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
      <div class="user-info">
        <div class="name">姓名：{{ user.name }}</div>
        <div>职位：{{ user.position }}</div>
        <div>手机：{{ user.phone }}</div>
        <div>邮箱：{{ user.email }}</div>
        <div>住址：{{ user.address }}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CUser",
  data() {
    return {
      user: {
        name: "张三",
        position: "消防工程师",
        phone: "13216285978",
        email: "13216285978@163.com",
        address: "中国浙江杭州西湖",
      },
    };
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  .el-avatar {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
    }
  }
  .user-info {
    padding: 10px;
    color: rgb(88, 154, 216);
    height: 80%;
    .name {
      font-size: 20px;
    }
    div {
      margin: 10px 0px;
      font-size: 15px;
    }
  }
}
</style>