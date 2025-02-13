<template>

  <view class="page-container">

    <at-search-bar></at-search-bar>

    <scroll-view :scroll-y="true">
      <swiper
        class='swiper-view'
        indicatorColor='#999'
        indicatorActiveColor='#333'
      >
        <swiper-item v-for="(item, idx) in  [
        'https://i0.hdslb.com/bfs/archive/06281b0277e49b968987bb58298cb6e1ad132f8d.jpg',
        'https://i0.hdslb.com/bfs/archive/bc473ee3fb1895005e5163a1e58afdb4a6ef45d3.jpg',
        'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
      ]" :key="idx">
          <image :src="item" class="slide-image"/>
        </swiper-item>
      </swiper>

      <scroll-view :scroll-x="true" :enable-flex="true" style="flex-direction: row">
        <view class="scroll-category-view">
          <view class="main-view">
            <view class="main-item">
              <text class="main-item-text">每日推荐</text>
            </view>
            <view class="main-item">
              <text class="main-item-text">猜你喜欢</text>
            </view>
          </view>
          <view class="category-view">
            <view class="category-item">歌单</view>
            <view class="category-item">排行榜</view>
            <view class="category-item">最新</view>
            <view class="category-item">歌手</view>
          </view>
        </view>
      </scroll-view>


      <view class="song-list">
        <view class="tips-text">
          <text>大家都在听</text>
        </view>
        <song-card v-for="song in songList" :song="song"></song-card>
      </view>


      <view>今日推荐歌曲</view>

      <view class="music-list">
        <view class="music-item" v-for="item in 3">
          <image class="music-img"
                 src="https://i2.hdslb.com/bfs/archive/5c9ff55cfa2b637a087493dfdd0478eecc594f83.jpg">
          </image>
          <view class="music-item-info">
            <view class="music-name">歌曲名</view>
            <view class="music-singer">歌手</view>
          </view>
        </view>
      </view>

      <view style="height: 40px"></view>
    </scroll-view>

    <player></player>

  </view>


</template>

<script setup lang="ts">
import './index.scss';
import Player from "../../components/Player/Player.vue";
import SongCard from "../../components/SongCard/SongCard.vue";
import {Song} from "../../components/SongCard/Song";

const song: Song = {
  title: 'title',
  image: 'https://i0.hdslb.com/bfs/archive/6eeddb567699fc9f1f944f1256ba4dd5477cec2c.jpg',
  singer: 'singer',
  tag: 'tag'
}

const songList = [
  {
    title: '爱要怎么说出口',
    image: 'https://i0.hdslb.com/bfs/archive/88fc336faad46b4687de7e96852b02d24fa21d30.jpg',
    singer: '林俊杰',
    tag: '本周热播'
  },
  {
    title: '爱要怎么锁住狗',
    image: 'https://i0.hdslb.com/bfs/archive/1b236cc33ab65ff426f5be8658e1d804136ae464.jpg',
    singer: '林俊杰',
    tag: '本周热播'
  }
]

</script>
