<template>
  <div>
    <NavBar/>
    <div class="etcs-background-mask">
      <nuxt/>
    </div>
    <Player/>
  </div>
</template>

<script>
  import qs from 'qs';
  import NavBar from "../components/NavBar";
  import Player from "../components/Player";

  export default {
    name: "index",
    components: {Player, NavBar},
    data() {
      return {
        backgroundList: [
          {pageName: 'index', imageUrl: '/images/082.png', blur: true},
          {pageName: 'playlist-management', imageUrl: '/images/089.png', blur: true},
          {pageName: 'upload-music', imageUrl: '/images/085.png', blur: true},
        ],
        th_status: null,
      }
    },
    beforeMount() {
      let self = this;
      if (this.th_status === null) {
        this.th_status = setInterval(function () {
          self.updateStatus();
        }, 1000);
      }
    },
    mounted() {
      mdui.mutation();
      let preloadBackgrounds = [];
      for (let i = 0; i < this.backgroundList.length; i++) {
        preloadBackgrounds[preloadBackgrounds.length] = this.backgroundList[i].imageUrl;
      }
      this.imgPreload(preloadBackgrounds);
      this.updateBackground($nuxt.$route.name);
    },
    methods: {
      rollingTitle() {
        let textEl = $('.player-title-text');
        let containerLength = $('.player-title-box').width();
        let textLength = textEl[0].scrollWidth;
        if (textLength > containerLength) {
          textEl.addClass('animation');
        } else {
          textEl.removeClass('animation');
        }
      },
      imgPreload(arr) {
        let img = [];
        for (let i = 0; i < arr.length; i++) {
          img[i] = new Image();
          img[i].src = arr[i];
        }
      },
      notify(title, content, type = 'info', key = 'globalKey') {
        this.$notification[type]({
          key: key,
          message: title || '提示消息',
          description: content,
        });
      },
      updateBackground(name) {
        let bgSelector = $('html,body');
        let maskSelector = $('.etcs-background-mask');
        for (let i = 0; i < this.backgroundList.length; i++) {
          if (this.backgroundList[i].pageName === name) {
            bgSelector.css('background-image', 'url("' + this.backgroundList[i].imageUrl + '")');
            if (this.backgroundList[i].blur)
              maskSelector.css('backdrop-filter', 'blur(25px)');
            else
              maskSelector.css('backdrop-filter', 'blur(0)');
            break;
          }
          bgSelector.css('background-image', 'none');
        }
      },
      updateStatus() {
        // console.log(this.$store.state.music_meta);
        let self = this;
        this.$axios.post('http://10.1.1.101:5000/fetch', qs.stringify({
          type: 'status',
        }))
          .then((res) => {
            return res.data
          })
          .then((res) => {
            if (res.error === 0) {
              self.$store.commit('setPlaying', res.data.isPlaying || false);
              self.$store.commit('setPlayingMusic', res.data.meta ? res.data.meta.filename.split('/').pop() : null);
              self.$store.commit('setPlayingProgress', Number.parseFloat(res.data.progress) || 0.0);
              self.$store.commit('setMusicMeta', res.data.meta || null);
            } else {
              this.notify('出现错误', `获取状态失败[${res.message}]`, 'error', 'fetchStatusFailed');
            }
          });
        this.rollingTitle();
      },
    },
    watch: {
      $route(to, from) {
        this.updateBackground(to.name)
      }
    }
  }
</script>

<style>
  /*body {*/
  /*  padding-top: 50px;*/
  /*}*/

  html, body {
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
  }

  .etcs-background-mask {
    position: absolute;
    padding-top: 50px;
    min-height: 100vh;
    width: 100%;
    background-color: rgba(255, 255, 255, .15);
    /*backdrop-filter: blur(25px);*/
    /*transition: all .3s;*/
  }
</style>
