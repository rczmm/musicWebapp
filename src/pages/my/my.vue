<template>

  <view class="my-view">

    <at-search-bar></at-search-bar>

    <view class="my-card-view">

      <view class="my-info-view">
        <image class="my-image"
               src="https://i0.hdslb.com/bfs/archive/fbfda8e61daafbaf469167aa7278eaab9ec4abec.jpg"></image>
        <text class="my-username">demo</text>
      </view>

      <at-divider :height="30"></at-divider>

      <at-grid mode="rect" :has-border="false" :column-num="4" :data="data"/>

    </view>

    <text>最近播放</text>
    <scroll-view :scroll-x="true" @scroll="scroll" style="width: 100%;white-space: nowrap" :enableFlex="true">
      <view class="item" v-for="(item, index) in playList" :key="index">
        <play-list :play-list="item"></play-list>
      </view>
    </scroll-view>


    <at-tabs
      :swipeable="false"
      :current="current"
      :tab-list="tabList"
      @click="handleChick"
    >
      <at-tabs-pane :current="current" :index="0">
        <song-card v-for="song in songList" :song="song"></song-card>
      </at-tabs-pane>
      <at-tabs-pane :current="current" :index="1">
        <view class='tab-content'>标签页一的内容</view>
      </at-tabs-pane>
      <at-tabs-pane :current="current" :index="2">
        <view class='tab-content'>标签页一的内容</view>
      </at-tabs-pane>
    </at-tabs>

  </view>
</template>

<script setup lang="ts">
import './my.scss';
import {ref} from "vue";
import PlayList from "../../components/PlayList/PlayList.vue";
import SongCard from "../../components/SongCard/SongCard.vue";


const current = ref(0);

const data = ref([
  {
    image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
    value: '收藏'
  },
  {
    image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
    value: '本地'
  },
  {
    image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
    value: '有声'
  },
  {
    image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
    value: '已购'
  }
])

const tabList = ref([
  {title: '最近播放'},
  {title: '自建歌单'},
  {title: '收藏歌单'}
])

const handleChick = (index: number) => {
  current.value = index;
}

const playList = ref([
  {
    image: "https://i2.hdslb.com/bfs/archive/928665dcbf1256280b426e1a887c523739f182af.jpg",
    name: "我的歌单",
    num: 20
  }, {
    image: "https://i2.hdslb.com/bfs/archive/928665dcbf1256280b426e1a887c523739f182af.jpg",
    name: "我的歌单",
    num: 20
  }, {
    image: "https://i2.hdslb.com/bfs/archive/928665dcbf1256280b426e1a887c523739f182af.jpg",
    name: "我的歌单",
    num: 20
  }, {
    image: "https://i2.hdslb.com/bfs/archive/928665dcbf1256280b426e1a887c523739f182af.jpg",
    name: "我的歌单",
    num: 20
  },
])

const scroll = (e: any) => {
  console.log(e);
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
