<template>

  <view class="play-list-view">
    <image class="play-list-image"
           :src="playList.image"></image>
    <text>{{ playList.name }} {{ playList.num }}首</text>
  </view>


</template>

<script setup lang="ts">

import './index.scss';

defineProps(
  {
    playList: {
      type: Object
    }
  }
)

</script>
