<template>
  <div>
    <ContentArea title="歌曲列表">
      <div class="mdui-container etcs-container container"
           style="background: rgba(255,255,255,.5); margin-bottom: 5rem;">
        <div class="mdui-table-fluid mdui-typo">
          <table class="mdui-table">
            <thead>
            <tr>
              <th style="width: 50px; text-align: center;">#</th>
              <th>文件名</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr class="list" v-for="(music, key) in $store.state.music_list" :key="key">
              <td style="text-align: center;" v-if="music === $store.state.music_playing && $store.state.isPlaying">
                <i class="mdui-icon material-icons mdui-text-color-black-disabled mdui-list-item-icon">
                  <img src="/icon/wave.gif" alt="playing"/>
                </i>
              </td>
              <td style="text-align: center;" v-else>{{ key + 1 }}</td>
              <td>
                {{ music }}
              </td>
              <td>
                <button class="mdui-btn mdui-btn-icon mdui-btn-dense mdui-ripple" mdui-tooltip="{content: '播放'}"
                        @click="play(music)">
                  <i class="mdui-icon material-icons mdui-text-color-black-icon">play_arrow</i>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ContentArea>
  </div>
</template>

<script>
  import qs from 'qs';
  import ContentArea from "../components/ContentArea";

  export default {
    name: "index",
    components: {ContentArea},
    data() {
      return {}
    },
    mounted() {
      mdui.mutation();
      this.updateMusicList();
    },
    beforeDestroy() {
      clearInterval(this.th_status);
      this.th_status = null;
    },
    methods: {
      play(name) {
        let self = this;
        self.$store.commit('setPlaying', false);
        self.$store.commit('setPlayingMusic', null);
        this.$axios.post('http://10.1.1.101:5000/control', qs.stringify({
          action: 'play',
          isPlaylist: 0,
          mark: name,
        }))
          .then((res) => {
            return res.data
          })
          .then((res) => {
            if (res.error === 0) {
              this.notify('开始播放', name, 'info');
              self.$store.commit('setPlaying', true);
              self.$store.commit('setPlayingMusic', name);
            } else {
              this.notify('播放失败', `服务器返回错误码 [${res.error}]`, 'error');
            }
          })
          .catch((e) => {
            console.log(e);
            this.notify('播放失败', e.toString(), 'error');
          });
        console.log('Start playing: ' + name)
      },
      notify(title, content, type = 'info', key = 'globalKey') {
        this.$notification[type]({
          key: key,
          message: title || '提示消息',
          description: content,
        });
      },
      updateMusicList() {
        let self = this;
        this.$axios.post('http://10.1.1.101:5000/fetch', qs.stringify({
          type: 'musics'
        }))
          .then((res) => {
            return res.data
          })
          .then((res) => {
            if (res.error === 0) {
              self.$store.commit('setMusicList', res.data.musics);
              mdui.updateTables();
            } else {
              this.notify('出现错误', `获取音乐列表失败[${res.message}]`, 'error', 'fetchMusicListFailed');
            }
          });
      },
    },
  }
</script>

<style scoped>
  tr.list {
    transition: all .1s;
  }

  tr.list:hover {
    background-color: rgba(255, 255, 255, .25);
  }

  .mdui-table-fluid {
    border: none;
    box-shadow: none;
  }

  .mdui-table {
    background: rgba(0, 0, 0, 0);
    user-select: none;
  }

  .mdui-table td, .mdui-table th {
    font-size: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, .05);
  }

  .mdui-table tbody {
    font-family: Poppins, sans-serif;
  }
</style>
