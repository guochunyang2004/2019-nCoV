<template>
  <div id="app">
    <router-view />
    <!-- <div id="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/travelquery">查询</router-link>
      <router-link to="/about">新增</router-link>
      <router-link to="/test">分析</router-link>
    </div> -->
    <div style="height:90px;">

    </div>
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/travelquery" icon="search">查询</van-tabbar-item>
      <van-tabbar-item replace to="/about" icon="friends-o">新增</van-tabbar-item>
      <van-tabbar-item replace to="/test" icon="setting-o">分析</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  line-height: 50px;
  font-size: 22px;
  background-color: #ddd;
  display: flex;
  justify-content: space-around;
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
