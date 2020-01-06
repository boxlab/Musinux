export const state = () => ({
  isPlaying: false,
  playlist: null,
  music_playing: null,
  music_progress: 0.0,
  music_meta: null,
});

export const mutations = {
  setPlaying(state, isPlaying) {
    state.isPlaying = isPlaying;
  },
  setMusicList(state, list) {
    state.playlist = list;
  },
  setPlayingMusic(state, playingMusic) {
    state.music_playing = playingMusic;
  },
  setPlayingProgress(state, progress) {
    state.music_progress = progress;
  },
  setMusicMeta(state, meta) {
    state.music_meta = meta;
  },
};
