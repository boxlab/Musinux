<template>
  <div class="np-navbar">
    <div class="np-navbar-title mdui-hidden-xs-down" @click="$router.push('/')">
      <b>Musinux</b> <sup>alpha</sup>
    </div>
    <div class="np-navbar-title mdui-hidden-sm-up" @click="$router.push('/')">
      <b>Musinux</b> <sup>alpha</sup>
    </div>
    <div class="np-navbar-actions mdui-hidden-xs-down">
      <nuxt-link v-for="(link, key) in routesList" :key="'route' + key" :to="link.path">
          <span class="mdui-btn mdui-text-color-grey-700 nav-btn"
                :class="{'nav-btn-active': $route.path === link.path}">
            {{ link.name }}
          </span>
      </nuxt-link>
      <!--      <button class="mdui-btn mdui-color-light-blue-500 mdui-text-color-white" id="btn_play_now" @click="playNow">-->
      <!--        <i class="mdui-icon material-icons">play_arrow</i>-->
      <!--        上传音乐-->
      <!--      </button>-->
    </div>

    <div class="np-navbar-actions mdui-hidden-sm-up">
      <button class="mdui-btn mdui-btn-icon" mdui-menu="{target: '#mobile-menu'}">
        <i class="mdui-icon material-icons">menu</i>
      </button>

      <ul class="mdui-menu" id="mobile-menu">
        <li v-for="(link, k) in routesList" :key="'route' + k" class="mdui-menu-item"
            :class="{'mdui-list-item-active': $route.path === link.path}">
          <nuxt-link :to="link.path" class="mdui-ripple">
            <!--            <i class="mdui-menu-item-icon"/>-->
            {{ link.name }}
          </nuxt-link>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar",
    data() {
      return {
        routesList: [
          {name: '播放器', path: '/'},
          // {name: '播放列表', path: '/playlist-management'},
          {name: '上传音乐', path: '/upload-music'},
        ],
      }
    },
    methods: {
      playNow() {
        this.$router.push('/play-now');
      },
    },
    mounted() {
      mdui.mutation();
    }
  }
</script>

<style scoped>
  .np-navbar {
    position: fixed;
    z-index: 1000;
    top: 0;
    width: 100%;
    height: 50px;
    display: flex;
    align-content: center;
    padding: 0 1.5rem;
    transition: all .3s;
    box-shadow: 0.5rem 0.875rem 2.375rem rgba(39, 44, 49, .06), 0.0625rem 0.1875rem 0.5rem rgba(39, 44, 49, .03);
    background: rgba(255, 255, 255, .5);
    backdrop-filter: blur(20px);
  }

  .np-navbar.immerse {
    box-shadow: none;
    background: #FFFFFF00;
  }

  .np-navbar .np-navbar-title {
    width: 100%;
    margin: auto 0;
    font-size: 1.2rem;
    font-family: Poppins, "Microsoft JhengHei", sans-serif;
    cursor: pointer;
  }

  .np-navbar .np-navbar-actions {
    margin: auto 0;
    float: right;
    display: inline-flex;
    font-size: 1.2rem;
    font-family: "Microsoft JhengHei", sans-serif;
  }

  a.nav-btn {
    text-decoration: none;
    out-line: none;
  }

  .nav-btn:before {
    position: absolute;
    display: inline-block;
    z-index: 1;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 100%;
    background-color: #03A9F4;
    content: "";
    transform: scale3d(0, 1, 1);
    transform-origin: center;
    transition: all 0.5s;
    border-radius: 15px;
  }

  .nav-btn-active:before,
  .nav-btn:hover:before {
    transform: scale3d(1, 1, 1);
  }

  #btn_play_now {
    margin-left: .5rem;
    padding-left: .65rem;
    padding-right: .65rem;
  }

  #btn_play_now i {
    margin-left: -.5rem;
  }

  #mobile-menu {
    text-align: left;
    border-radius: 10px;
    box-shadow: 0.5rem 0.875rem 2.375rem rgba(39, 44, 49, .06), 0.0625rem 0.1875rem 0.5rem rgba(39, 44, 49, .03);
  }
</style>
