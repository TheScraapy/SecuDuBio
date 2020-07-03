<template>
  <div id="index" class="container">
    <b-button
      class="title"
      type="is-info"
      size="is-large"
      icon-left="google"
      @click="signInWithGoogle"
    >Login with Google</b-button>
    <div class="content">
      <readme />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import readme from '../../README.md'

export default {
  name: 'Index',
  components: {
    readme
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async signInWithGoogle () {
      try {
        const provider = new firebase.auth.GoogleAuthProvider()
        await firebase.auth().signInWithPopup(provider)
        this.$router.push({ name: 'Home' })
      } catch (e) {
        alert('🤕 ' + e.message)
      }
    }
  }
}
</script>

<style scoped>
</style>
