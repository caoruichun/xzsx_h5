<template>
  <div id="app">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created() {
   
  },
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
/* button,input,textarea{
  -webkit-appearance: none;
  outline: none;
  -webkit-tap-highlight-color: rgb(0, 0, 0, 0);
  -webkit-user-modify: read-write-plaintext-only;
} */
</style>
