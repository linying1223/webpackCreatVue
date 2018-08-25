<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <at :members="members" name-key="name" :filterMatch="filterMatch" :deleteMatch="deleteMatch" v-model="htmla">
      <template slot="item" slot-scope="s">
        <span v-text="s.item.name"></span>
        <span v-text="s.item.id"></span>
      </template>
      <div class="editor" contenteditable></div>
    </at>
    <at v-model="htmla"  :members="members">
      <div contenteditable></div>
    </at>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
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
