<template>
  <view class="player-view">
    <progress :percent="pro" stroke-width="2" :active="true" active-color="blue"
              activeMode="forwards"
              borderRadius="100px"
              class="process-line"
    />
    <view class="page-view">
      <view class="music-info">
        <image
          class="music-img"
          src="https://img4.kuwo.cn/star/albumcover/500/15/15/292190359.jpg"
        />
        <text>示例歌曲</text>
      </view>
      <view class="music-controller">
        <text @tap="changeCollect">{{ collect }}</text>
        <text @tap="play">{{ playStatus }}</text>
        <text @tap="show = !show">播放列表</text>
      </view>
    </view>

    <at-float-layout
      :is-opened="show"
      @close="show = false"
      :title="'播放列表'"
    >
      <text>我是内容，我是内容</text>

    </at-float-layout>

  </view>
</template>

<script setup lang="ts">
import './Player.scss';
import Taro from "@tarojs/taro";
import {computed, ref} from "vue";

defineProps();

const show = ref(false);

const collect = ref("收藏");

const changeCollect = () => {
  collect.value = collect.value === "收藏" ? "取消收藏" : "收藏";
}

const audioContext = Taro.createInnerAudioContext();
const isPause = ref(true);
audioContext.autoplay = false;
audioContext.src = "https://lx-sycdn.kuwo.cn/df4c257daec4fa0b21178c3c30fa6dc7/67ab76f3/resource/n1/53/31/348557463.mp3"
audioContext.onPlay(() => {
  console.log('开始播放')
})
audioContext.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})
audioContext.onPause(() => {
  console.log('暂停播放')
})

audioContext.onEnded(() => {
  console.log('播放结束');
  isPause.value = true; // 当播放结束时，设置为暂停状态
});

const play = () => {
  audioContext.paused ? audioContext.play() : audioContext.pause();
  isPause.value = !isPause.value;
}

const playStatus = computed(() => {
  return isPause.value ? '播放' : '暂停'
})


const pro = ref(audioContext.currentTime / audioContext.duration * 100);
const updateProgress = () => {
  if (audioContext.duration) {
    // 保留小数点后两位
    pro.value = Math.round(audioContext.currentTime / audioContext.duration * 100);
    setTimeout(updateProgress, 1000);
  }
};
audioContext.onTimeUpdate(updateProgress);
setInterval(updateProgress, 50);
</script>
