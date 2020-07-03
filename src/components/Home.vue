<template>
  <div id="home" class="container">
    <div>
      <div>
        <video ref="video" id="video" width="640" height="480" autoplay></video>
      </div>
      <div class="subtitle">
        <b-button
          type="is-info"
          size="is-large"
          icon-left="camera"
          @click="capture()"
        >Snap Photo</b-button>
      </div>
      <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
      <img v-bind:src="image" height="50" />
    </div>
    <div>
      <b-upload drag-drop v-model="file">
        <a class="button is-primary title">
          <b-icon icon="upload"></b-icon>
          <span>Click to upload</span>
        </a>
        <span class="file-name subtitle" v-if="file">{{ file.name }}</span>
      </b-upload>
    </div>
    <div class="section">
      <b-button
        type="is-success"
        size="is-large"
        icon-left="lock"
        @click="encrypt()"
      >Encrypt</b-button>
      <b-button
        type="is-danger"
        size="is-large"
        icon-left="lock-open"
        @click="decrypt()"
      >Decrypt</b-button>
    </div>
  </div>
</template>

<script>
import FaceRecognition from '@/services/FaceRecognition'
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'Home',
  data () {
    return {
      video: {},
      canvas: {},
      image: null,
      file: null
    }
  },
  mounted () {
    this.video = this.$refs.video
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.srcObject = stream
      })
    }
  },
  methods: {
    capture () {
      this.canvas = this.$refs.canvas
      this.canvas.getContext('2d').drawImage(this.video, 0, 0, 640, 480)
      this.image = this.canvas.toDataURL('image/png')
    },
    async encrypt () {
      let loader = null
      try {
        if (this.image && this.file) {
          loader = this.$buefy.loading.open()
          const res = await FaceRecognition.enroll(this.image, firebase.auth().currentUser.email)
          console.log(res)
          if (res.data.Errors) {
            this.alertCustomError('🤕 ' + res.data.Errors[0].Message, loader)
          } else {
            let form = new FormData()
            form.append('file', this.file)
            const file = await axios({
              method: 'post',
              url: 'https://us-central1-secudubio-46ed5.cloudfunctions.net/encrypt',
              data: form,
              headers: {'Content-Type': 'multipart/form-data'}
            })
            this.saveFile(file.data, loader)
            console.log(file)
          }
        } else {
          this.alertCustomError('🤕 Take a photo and select a file before encrypting', loader)
        }
      } catch (e) {
        this.alertCustomError('🤕 Could not encrypt the file', loader)
      }
    },
    async decrypt () {
      let loader = null
      try {
        if (this.image && this.file) {
          loader = this.$buefy.loading.open()
          const res = await FaceRecognition.verify(this.image, firebase.auth().currentUser.email)
          console.log(res)
          if (res.data.Errors) {
            this.alertCustomError('🤕 ' + res.data.Errors[0].Message, loader)
          } else {
            if (res.data.images[0].transaction.confidence > 0.5) {
              let form = new FormData()
              form.append('file', this.file)
              const file = await axios({
                method: 'post',
                url: 'https://us-central1-secudubio-46ed5.cloudfunctions.net/decrypt',
                data: form,
                headers: {'Content-Type': 'multipart/form-data'}
              })
              this.saveFile(file.data, loader)
              console.log(file)
            } else {
              this.alertCustomError('🤕 This file doesn\'t belong to you ! Thief !', loader)
            }
          }
        } else {
          this.alertCustomError('🤕 Take a photo and select a file before decrypting', loader)
        }
      } catch (e) {
        this.alertCustomError('🤕 Could not decrypt the file', loader)
      }
    },
    saveFile (file, loader) {
      if (loader !== null) {
        loader.close()
      }
      const blob = new Blob([file], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents')
      const a = document.createElement('a')
      a.download = 'File'
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    },
    alertCustomError (msg, loader) {
      if (loader !== null) {
        loader.close()
      }
      this.$buefy.dialog.alert({
        title: 'Error',
        message: msg,
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
        ariaRole: 'alertdialog',
        ariaModal: true
      })
    }
  }
}
</script>

<style scoped>
body {
  background-color: #f0f0f0;
}

#video {
  background-color: #000000;
  border: 1px solid grey;
}

img {
  background-color: #000000;
  border: 1px solid grey;
}

#canvas {
  display: none;
}

li {
  display: inline;
  padding: 5px;
}
</style>
