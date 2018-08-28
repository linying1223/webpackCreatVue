<template>
  <div>
    {{msg}}
    {{getName}}
    <ul>
      <li v-for="(item,index) in activeName" :key="index">
        {{item.name}}
      </li>
    </ul>
    <button @click="changeName">change name</button>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      msg: 'ddd'
    }
  },
  computed: {
    ...mapState(['getName']),
    ...mapGetters(['activeName'])
  },
  mounted () {
    this.msg = this.$store.state.user
  },
  methods: {
    changeName () {
      this.$store.commit('updateName', 'o')
    }
  }
}
</script>
