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
            <div class="mdui-list-item-content player-title-box">
              <div class="mdui-list-item-title player-title-text">{{ this.$store.state.music_meta ?
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
          <button class="mdui-btn mdui-btn-icon mdui-ripple" mdui-tooltip="{content: '播放/暂停'}"
                  @click="action($store.state.isPlaying ? 'pause' : 'resume')">
            <i class="mdui-icon material-icons">{{ $store.state.isPlaying ? 'pause' : 'play_arrow' }}</i>
          </button>
          <button class="mdui-btn mdui-btn-icon mdui-btn-dense mdui-ripple" mdui-tooltip="{content: '下一首'}"
                  @click="action('next')">
            <i class="mdui-icon material-icons">skip_next</i>
          </button>
        </div>
        <div class="info mdui-col-md-4 mdui-hidden-sm-down">
          <span>{{ `${formatMusicTime($store.state.music_progress)} / ${formatMusicTime(this.$store.state.music_meta ? this.$store.state.music_meta.duration : 0)}` }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from 'qs';
  import moment from 'moment';

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
        let payload = {
          action: type,
        };
        switch (type) {
          case 'prev':
            let position_prev = this.$store.state.playlist.indexOf(this.$store.state.music_playing) - 1;
            if (position_prev < 0)
              position_prev = this.$store.state.playlist.length - 1;
            payload = {
              action: 'play',
              isPlaylist: 0,
              mark: this.$store.state.playlist[position_prev],
            };
            break;
          case 'next':
            let position_next = this.$store.state.playlist.indexOf(this.$store.state.music_playing) + 1;
            if (position_next > this.$store.state.playlist.length - 1)
              position_next = 0;
            payload = {
              action: 'play',
              isPlaylist: 0,
              mark: this.$store.state.playlist[position_next],
            };
            break;
        }
        this.$axios.post('http://10.1.1.101:5000/control', qs.stringify(payload))
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
      formatMusicTime(timestamp) {
        return moment(timestamp * 1000).format('mm:ss')
      }
    },
  }
</script>

<style>
  .player-title-box {
    overflow: hidden;
  }

  .player-title-text {
    display: inline-block;
    white-space: nowrap;
    /*animation: 3s wordsLoop linear infinite normal;*/
  }

  .player-title-text.animation {
    animation: 5s wordsLoop linear infinite normal;
  }

  @keyframes wordsLoop {
    0% {
      transform: translateX(100%);
      -webkit-transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
    }
  }
</style>
