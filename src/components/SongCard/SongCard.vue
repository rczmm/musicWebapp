<template>
  <view class="song-view">

    <image class="song-image" :src="song.image"/>

    <view class="song-info">
      <view class="song-song">
        <view class="song-title">
          <text>{{ song.title }}</text>
        </view>
        <view class="song-tag">
          <text> {{ song.tag }}</text>
        </view>
      </view>
      <view class="song-singer">
        <text>
          {{ song.singer }}
        </text>
      </view>
    </view>

  </view>
</template>

<script setup lang="ts">

import './index.scss';

defineProps({
  song: {
    type: Object,
    required: true
  }
})

</script>
