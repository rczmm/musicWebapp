<template>
  <view class="music-player">
    <view class="player-container">
      <view class="album-art" :class="{ 'rotating': isPlaying }">
        <image :src="currentTrack.cover" alt="专辑封面" mode="aspectFill"/>
      </view>

      <view class="player-controls">
        <view class="track-info">
          <text class="track-title">{{ currentTrack.title }}</text>
          <text class="artist-name">{{ currentTrack.artist }}</text>
        </view>

        <view class="progress-bar-container">
          <input
            type="range"
            v-model="progress"
            min="0"
            :max="duration"
            step="0.01"
            class="progress-bar"
            @change="handleProgressChange"/>
          <view class="time-info">
            <text class="current-time">{{ currentTimeFormatted }}</text>
            /
            <text class="duration-time">{{ durationFormatted }}</text>
          </view>
        </view>

        <view class="volume-control">
          <i class="iconfont icon-volume" @click="toggleMute"></i>
          <input
            type="range"
            v-model="volume"
            min="0"
            max="1"
            step="0.1"
            class="volume-slider"
            @change="handleVolumeChange"/>
        </view>

        <view class="controls">
          <button @click="previousTrack" class="control-button">
            <i class="iconfont icon-shangyishou"></i>
          </button>
          <button @click="togglePlay" class="control-button play-pause-button">
            <i :class="['iconfont', isPlaying ? 'icon-zanting' : 'icon-bofang']"></i>
          </button>
          <button @click="nextTrack" class="control-button">
            <i class="iconfont icon-xiayishou"></i>
          </button>
          <button @click="togglePlayMode" class="control-button">
            <i :class="['iconfont', playModeIcon]"></i>
          </button>
        </view>
      </view>

      <view class="lyrics-container" ref="lyricsContainer">
        <view
          v-for="(line, index) in parsedLyrics"
          :key="index"
          :class="['lyrics-line', { 'active': currentLyricIndex === index }]"
        >
          {{ line.text }}
        </view>
      </view>

      <view class="playlist-container">
        <text class="playlist-title">播放列表</text>
        <list class="playlist">
          <item
            v-for="(track, index) in playlist"
            :key="track.id"
            :class="{ active: index === currentTrackIndex }"
            @click="playTrack(index)"
            class="playlist-item"
          >
            <text>{{ track.title }} - {{ track.artist }}</text>
          </item>
        </list>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {ref, reactive, computed, onMounted, onUnmounted, watch} from 'vue';
import Taro from '@tarojs/taro';
import './index.scss'

// 播放列表数据
const playlist = reactive([
  {
    id: 1,
    title: '歌曲1',
    artist: '歌手A',
    cover: 'https://i2.hdslb.com/bfs/archive/39e6ba12dff19fa990ca1775e81ff6eb8528950f.jpg',
    url: 'https://er-sycdn.kuwo.cn/22b1c5b60beb06d6bba6f8f2b5181778/67b0837c/resource/30106/trackmedia/M80000047g4B4BrTWg.mp3',
    lyrics: '[00:00.00]歌词1第一行\n[00:03.00]歌词1第二行\n[00:06.00]歌词1第三行'
  },
  {
    id: 2,
    title: '歌曲2',
    artist: '歌手B',
    cover: 'https://i2.hdslb.com/bfs/archive/39e6ba12dff19fa990ca1775e81ff6eb8528950f.jpg',
    url: 'https://er-sycdn.kuwo.cn/22b1c5b60beb06d6bba6f8f2b5181778/67b0837c/resource/30106/trackmedia/M80000047g4B4BrTWg.mp3',
    lyrics: '[00:00.00]歌词2第一行\n[00:03.00]歌词2第二行\n[00:06.00]歌词2第三行'
  },
  {
    id: 3,
    title: '歌曲3',
    artist: '歌手C',
    cover: 'https://i2.hdslb.com/bfs/archive/39e6ba12dff19fa990ca1775e81ff6eb8528950f.jpg',
    url: 'https://er-sycdn.kuwo.cn/22b1c5b60beb06d6bba6f8f2b5181778/67b0837c/resource/30106/trackmedia/M80000047g4B4BrTWg.mp3',
    lyrics: '[00:00.00]歌词3第一行\n[00:03.00]歌词3第二行\n[00:06.00]歌词3第三行'
  },
]);

const currentTrackIndex = ref(0);
const currentTrack = computed(() => playlist[currentTrackIndex.value]);
const isPlaying = ref(false);
const innerAudioContext = ref();
const progress = ref(0);
const duration = ref(0);
const currentTime = ref(0);
const volume = ref(1);
const isMuted = ref(false);
const previousVolume = ref(1);
const playMode = ref('sequence'); // sequence, single, random
const currentLyricIndex = ref(0);
const lyricsContainer = ref(null);

const playModeIcon = computed(() => {
  switch (playMode.value) {
    case 'sequence':
      return 'icon-sequence';
    case 'single':
      return 'icon-single';
    case 'random':
      return 'icon-random';
    default:
      return 'icon-sequence';
  }
});

const parsedLyrics = computed(() => {
  const lyrics = currentTrack.value.lyrics;
  return lyrics.split('\n').map(line => {
    const match = line.match(/\[(\d{2}:\d{2}\.\d{2})\](.+)/);
    if (match) {
      const timeStr = match[1];
      const [minutes, seconds] = timeStr.split(':');
      const time = parseInt(minutes) * 60 + parseFloat(seconds);
      return {
        time,
        text: match[2]
      };
    }
    return null;
  }).filter(Boolean);
});

const currentTimeFormatted = computed(() => formatTime(currentTime.value));
const durationFormatted = computed(() => formatTime(duration.value));

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

onMounted(() => {
  innerAudioContext.value = Taro.createInnerAudioContext();
  innerAudioContext.value.src = currentTrack.value.url;
  innerAudioContext.value.onCanplay(handleCanplay);
  innerAudioContext.value.onTimeUpdate(handleTimeUpdate);
  innerAudioContext.value.onEnded(handleEnded);
  innerAudioContext.value.onError(handleError);
});

onUnmounted(() => {
  if (innerAudioContext.value) {
    innerAudioContext.value.destroy();
    innerAudioContext.value.offCanplay(handleCanplay);
    innerAudioContext.value.offTimeUpdate(handleTimeUpdate);
    innerAudioContext.value.offEnded(handleEnded);
    innerAudioContext.value.offError(handleError);
  }
});

const handleCanplay = () => {
  innerAudioContext.value.duration && (duration.value = innerAudioContext.value.duration);
};

const handleTimeUpdate = () => {
  currentTime.value = innerAudioContext.value.currentTime;
  duration.value && (progress.value = (currentTime.value / duration.value) * 100);
  
  // 更新当前歌词
  const currentTime = innerAudioContext.value.currentTime;
  const index = parsedLyrics.value.findIndex((lyric, index) => {
    const nextLyric = parsedLyrics.value[index + 1];
    return lyric.time <= currentTime && (!nextLyric || nextLyric.time > currentTime);
  });
  if (index !== -1) {
    currentLyricIndex.value = index;
    // 滚动歌词
    scrollToCurrentLyric();
  }
};

const scrollToCurrentLyric = () => {
  if (lyricsContainer.value) {
    const lineHeight = 24; // 每行歌词的高度
    const scrollTop = currentLyricIndex.value * lineHeight;
    lyricsContainer.value.scrollTop = scrollTop - (lyricsContainer.value.clientHeight / 2) + (lineHeight / 2);
  }
};

const handleEnded = () => {
  switch (playMode.value) {
    case 'sequence':
      nextTrack();
      break;
    case 'single':
      playTrack(currentTrackIndex.value);
      break;
    case 'random':
      playRandomTrack();
      break;
  }
};

const handleError = (res) => {
  console.error('音频播放错误', res);
  Taro.showToast({
    title: '音频播放出错',
    icon: 'none',
    duration: 2000,
  });
  isPlaying.value = false;
};

const togglePlay = () => {
  if (isPlaying.value) {
    innerAudioContext.value.pause();
    isPlaying.value = false;
  } else {
    innerAudioContext.value.play();
    isPlaying.value = true;
  }
};

const toggleMute = () => {
  if (isMuted.value) {
    volume.value = previousVolume.value;
    isMuted.value = false;
  } else {
    previousVolume.value = volume.value;
    volume.value = 0;
    isMuted.value = true;
  }
  innerAudioContext.value.volume = volume.value;
};

const handleVolumeChange = () => {
  innerAudioContext.value.volume = volume.value;
  if (volume.value > 0) {
    isMuted.value = false;
  }
};

const togglePlayMode = () => {
  const modes = ['sequence', 'single', 'random'];
  const currentIndex = modes.indexOf(playMode.value);
  playMode.value = modes[(currentIndex + 1) % modes.length];
};

const playTrack = (index) => {
  currentTrackIndex.value = index;
  innerAudioContext.value.src = currentTrack.value.url;
  innerAudioContext.value.startTime = 0;
  innerAudioContext.value.play();
  isPlaying.value = true;
  progress.value = 0;
  currentTime.value = 0;
  currentLyricIndex.value = 0;
};

const playRandomTrack = () => {
  const randomIndex = Math.floor(Math.random() * playlist.length);
  playTrack(randomIndex);
};

const previousTrack = () => {
  let index = currentTrackIndex.value;
  index--;
  if (index < 0) {
    index = playlist.length - 1;
  }
  playTrack(index);
};

const nextTrack = () => {
  let index = currentTrackIndex.value;
  index++;
  if (index >= playlist.length) {
    index = 0;
  }
  playTrack(index);
};

const handleProgressChange = (event) => {
  const seekTime = (event.detail.value / 100) * duration.value;
  innerAudioContext.value.seek(seekTime);
  currentTime.value = seekTime;
};

// 监听音量变化
watch(volume, (newVolume) => {
  if (newVolume > 0) {
    isMuted.value = false;
  }
});
</script>

