<template>
  <div>
    <div class="musinux-player" style="color: #FFF;">
      <div class="mdui-row" style="height: 100%;">
        <a-slider class="progressbar" id="progressBar"
                  :min="0"
                  :max="Number.parseFloat(this.$store.state.music_meta ? this.$store.state.music_meta.duration : 1)"
                  v-model="this.$store.state.music_progress" :step="0.01"/>
        <div class="meta mdui-col-xs-8 mdui-col-md-4">
          <div class="mdui-list-item">
            <div style="min-width: .7rem;margin-right: 1rem;">
              <img v-if="$store.state.isPlaying" src="/icon/wave.gif" alt="playing"/>
            </div>
            <div class="mdui-list-item-content">
              <div class="mdui-list-item-title">{{ this.$store.state.music_meta ?
                (this.$store.state.music_meta.tags.TITLE || this.$store.state.music_meta.tags.title ||
                this.$store.state.music_playing)
                : 'Musinux' }}
              </div>
              <div class="mdui-list-item-text mdui-list-item-one-line">
                {{ this.$store.state.music_meta ?
                (this.$store.state.music_meta.tags.ARTIST || this.$store.state.music_meta.tags.artist || '未知作者')
                : '没有播放音乐' }}
              </div>
            </div>
          </div>
        </div>
        <div class="control mdui-col-xs-4 mdui-col-md-4">
          <button class="mdui-btn mdui-btn-icon mdui-btn-dense mdui-ripple" mdui-tooltip="{content: '上一首'}"
                  @click="action('prev')">
            <i class="mdui-icon material-icons">skip_previous</i>
          </button>
          <button class="mdui-btn mdui-btn-icon mdui-ripple" mdui-tooltip="{content: '播放'}"
                  @click="action($store.state.isPlaying ? 'pause' : 'resume')">
            <i class="mdui-icon material-icons">{{ $store.state.isPlaying ? 'pause' : 'play_arrow' }}</i>
          </button>
          <button class="mdui-btn mdui-btn-icon mdui-btn-dense mdui-ripple" mdui-tooltip="{content: '下一首'}"
                  @click="action('next')">
            <i class="mdui-icon material-icons">skip_next</i>
          </button>
        </div>
        <div class="info mdui-col-md-4 mdui-hidden-sm-down">
          <span>02:13 / 04:35</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs';

  export default {
    name: "Player",
    data() {
      return {
        inputValue: 0
      }
    },
    mounted() {
    },
    methods: {
      notify(title, content, type = 'info', key = null) {
        this.$notification[type]({
          key: key,
          message: title || '提示消息',
          description: content,
        });
      },
      action(type) {
        let self = this;
        this.$axios.post('http://10.1.1.101:5000/control', qs.stringify({
          action: type,
        }))
          .then((res) => {
            return res.data
          })
          .then((res) => {
            if (res.error === 0) {
              self.$store.commit('setPlaying', type !== 'pause');
            } else {
              this.notify('出现错误', `操作失败[${res.message}]`, 'error');
            }
          });
      },
      progressAdj(data) {
        console.log(data);
      },
    },
  }
</script>

<style scoped>

</style>
