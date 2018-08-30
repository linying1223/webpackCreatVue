<template>
  <div class="view-setting">
    {{msg}}
    {{getName}}
    <ul class="view-item">
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
<style lang="scss" scoped>
  .view-setting {
    width: 300px;
    color: red;
    .view-item {
      list-style: none;
    }
  }
</style>
