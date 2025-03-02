<template>
  <view class="page-container">
    <view class="search-bar-wrapper">
      <at-search-bar
        placeholder="搜索音乐、歌手、歌单"
        :show-action-button="false"
        @change="handleSearch"
      />
    </view>

    <scroll-view :scroll-y="true" class="main-scroll-view">
      <swiper
        class="swiper-view"
        :indicator-dots="true"
        :autoplay="true"
        :interval="3000"
        :duration="500"
        :circular="true"
        indicator-color="#ddd"
        indicator-active-color="#1e90ff"
      >
        <swiper-item v-for="(banner, idx) in banners" :key="idx">
          <image :src="banner.image" class="slide-image" mode="aspectFill" />
        </swiper-item>
      </swiper>

      <view class="scroll-category-view">
        <view class="main-view">
          <view class="main-item" @tap="handleDailyRecommend" :style="{ backgroundImage: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)' }">
            <text class="main-item-text">每日推荐</text>
          </view>
          <view class="main-item" @tap="handlePersonalFM" :style="{ backgroundImage: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)' }">
            <text class="main-item-text">私人FM</text>
          </view>
        </view>
        <view class="category-view">
          <view
            v-for="category in categories"
            :key="category.id"
            class="category-item"
            @tap="handleCategory(category)"
          >
            <view class="category-icon">
              <i :class="['iconfont', getIconForCategory(category.name)]"></i>
            </view>
            <text class="category-name">{{ category.name }}</text>
          </view>
        </view>
      </view>
    </scroll-view>


    <view class="song-list">
      <view class="tips-text">
        <text>大家都在听</text>
      </view>
      <view class="song-card" v-for="song in songList" :key="song.id">
        <SongCard :song="song" @tap="handlePlaySong(song)" />
      </view>
    </view>


    <view class="music-list">
      <view class="tips-text">
        <text>今日推荐歌曲</text>
      </view>
      <view class="music-item" v-for="music in musicList" :key="music.id" @tap="handlePlayMusic(music)">
        <image class="music-img" :src="music.image" mode="aspectFill" />
        <view class="music-item-info">
          <view class="music-name">{{ music.title }}</view>
          <view class="music-singer">{{ music.singer }}</view>
        </view>
      </view>
    </view>

    <view style="height: 40px"></view>

  <player></player>

  </view>


</template>

<script setup lang="ts">
import { ref } from 'vue';
import './index.scss';
import Player from "../../components/Player/Player.vue";
import SongCard from "../../components/SongCard/SongCard.vue";

const banners = ref([
  { image: 'https://i0.hdslb.com/bfs/archive/06281b0277e49b968987bb58298cb6e1ad132f8d.jpg', id: 1 },
  { image: 'https://i0.hdslb.com/bfs/archive/bc473ee3fb1895005e5163a1e58afdb4a6ef45d3.jpg', id: 2 },
  { image: 'https://i1.hdslb.com/bfs/archive/9a1899fe5edf56c36ed640b9789e0514f2cfcf7a.jpg', id: 3 },
]);

const categories = ref([
  { name: '歌单', id: 1 },
  { name: '排行榜', id: 2 },
  { name: '最新', id: 3 },
  { name: '歌手', id: 4 },
]);

const songList = ref([
  {
    id: 1,
    title: '爱要怎么说出口',
    image: 'https://i0.hdslb.com/bfs/archive/88fc336faad46b4687de7e96852b02d24fa21d30.jpg',
    singer: '林俊杰',
    tag: '本周热播'
  },
  {
    id: 2,
    title: '爱要怎么锁住狗',
    image: 'https://i0.hdslb.com/bfs/archive/1b236cc33ab65ff426f5be8658e1d804136ae464.jpg',
    singer: '林俊杰',
    tag: '本周热播'
  }
]);

const musicList = ref([
  {
    id: 1,
    title: "葡萄成熟时",
    singer: "陈奕迅",
    image: "https://i0.hdslb.com/bfs/archive/75fbeda3d3f0e54785646e02615bd82bd0c3dc88.jpg"
  },
  {
    id: 2,
    title: "零下几分钟",
    singer: "陈奕迅",
    image: "https://i0.hdslb.com/bfs/archive/21d97aeca78757f6bd9ce9923d2a491618d9906a.jpg"
  },
]);



const handleDailyRecommend = () => {
  console.log('跳转到每日推荐');
};

const handlePersonalFM = () => {
  console.log('跳转到私人FM');
};

const handleCategory = (category: any) => {
  console.log('选择分类:', category.name);
};

const handlePlaySong = (song: any) => {
  console.log('播放歌曲:', song.title);
};

const handlePlayMusic = (music: any) => {
  console.log('播放音乐:', music.title);
};

const getIconForCategory = (name: string) => {
  const iconMap: { [key: string]: string } = {
    '歌单': 'icon-gedan',
    '排行榜': 'icon-paihangbang',
    '最新': 'icon-zuixin',
    '歌手': 'icon-geshou'
  };
  return iconMap[name] || 'icon-default';
};
</script>
