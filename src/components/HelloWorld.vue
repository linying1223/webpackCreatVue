<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link :to="{name: 'ViewSetting', params:{ID:111}}">to ViewSetting</router-link>
    <at :members="members" name-key="name" :filterMatch="filterMatch" :deleteMatch="deleteMatch" v-model="htmla">
      <template slot="item" slot-scope="s">
        <span v-text="s.item.name"></span>
        <span v-text="s.item.id"></span>
      </template>
      <div class="editor" contenteditable></div>
    </at>
  </div>
</template>

<script>
import At from 'vue-at'
export default {
  name: 'HelloWorld',
  data () {
    return {
      htmla: '',
      msg: 'Welcome to Your Vue.js App',
      members: [{
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        name: 'myrtie.green',
        id: '1'
      }, {
        avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
        name: '椿木',
        id: '2'
      }]
    }
  },
  components: { At },
  created () {
    this.$axios.get('/bg/MiniAppC/GetAppInfo')
      .then(res => {
        console.log(res)
      })
      .catch(errMsg => {
        console.log(errMsg)
      })
  },
  methods: {
    clickWho () {
      console.log('22222222222')
    },
    filterMatch (name, chunk, at) {
      console.log(this.htmla, 'qq')
      console.log(name, chunk, at, '11111111111111')
      return name.toLowerCase().indexOf(chunk.toLowerCase()) > -1
    },
    deleteMatch (name, chunk) {
      console.log(name, chunk, 'yyyyyyyyyyyyyyyyyyyyyyy')
    }
  },
  watch: {
    htmla (val) {
      console.log(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
.editor {
  border: 1px solid #333;
  width: 50%;
}
</style>
