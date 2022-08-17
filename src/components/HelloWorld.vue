<template>
  <div class="hello">
    <!-- 第一个按钮，路由链接到的是"/"地址，在点击之后，会跳转到'/'页面 -->
    <router-link to="/">
      <el-button>按钮</el-button>
    </router-link>
    <!-- 第二个按钮，路由链接到的是"/user"地址，在点击之后，跳转到‘user’页面,可以看到url发生变化 -->
    <router-link to="/user">
      <el-button @click='open' type="primary">主要按钮</el-button>
    </router-link>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
