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
        'https://i1.hdslb.com/bfs/archive/9a1899fe5edf56c36ed640b9789e0514f2cfcf7a.jpg',
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


      <view class="tips-text">
        <text>今日推荐歌曲</text>
      </view>
      <view class="music-list">
        <view class="music-item" v-for="music in musicList">
          <image class="music-img"
                 :src="music.image">
          </image>
          <view class="music-item-info">
            <view class="music-name">{{music.title}}</view>
            <view class="music-singer">{{ music.singer}}</view>
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

const musicList = [
  {
    title: "葡萄成熟时",
    singer: "陈奕迅",
    image: "https://i0.hdslb.com/bfs/archive/75fbeda3d3f0e54785646e02615bd82bd0c3dc88.jpg"
  },
  {
    title: "零下几分钟",
    singer: "陈奕迅",
    image: "https://i0.hdslb.com/bfs/archive/21d97aeca78757f6bd9ce9923d2a491618d9906a.jpg"
  },
];

</script>
