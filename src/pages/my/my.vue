<template>
  <view class="my-view">
    <view class="home-container">
    <!-- 用户信息区域 -->
    <view class="user-profile">
      <view class="user-info">
        <image class="avatar" src="https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg" mode="aspectFill" />
        <view class="user-details">
          <text class="username">音乐爱好者</text>
          <view class="user-stats">
            <text class="stat-item">关注 128</text>
            <text class="stat-item">粉丝 356</text>
            <text class="stat-item">等级 8</text>
          </view>
        </view>
        <view class="edit-profile">
          <text class="edit-btn">编辑资料</text>
        </view>
      </view>
      <view class="user-achievements">
        <view class="achievement-item">
          <text class="achievement-count">128</text>
          <text class="achievement-label">收藏歌单</text>
        </view>
        <view class="achievement-item">
          <text class="achievement-count">235</text>
          <text class="achievement-label">关注歌手</text>
        </view>
        <view class="achievement-item">
          <text class="achievement-count">1890</text>
          <text class="achievement-label">听歌总数</text>
        </view>
      </view>
    </view>


    <!-- 轮播图 -->
    <swiper
      class="banner-swiper"
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="500"
      circular
    >
      <swiper-item v-for="(banner, index) in banners" :key="index">
        <image :src="banner.image" mode="aspectFill" class="banner-image" />
      </swiper-item>
    </swiper>

    <!-- 快捷功能区 -->
    <view class="quick-access">
      <view class="quick-grid">
        <view class="quick-item" v-for="(item, index) in quickAccessData" :key="index">
          <view class="quick-icon">
            <i :class="['iconfont', item.iconClass]"></i>
          </view>
          <text class="quick-text">{{ item.value }}</text>
        </view>
      </view>
    </view>

    <!-- 推荐歌单 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">推荐歌单</text>
        <text class="section-more">更多 ></text>
      </view>
      <scroll-view
        scroll-x
        class="playlist-scroll"
        :enable-flex="true"
        :show-scrollbar="false"
      >
        <view class="playlist-container">
          <view
            class="playlist-item"
            v-for="(playlist, index) in recommendPlaylists"
            :key="index"
          >
            <image :src="playlist.cover" mode="aspectFill" class="playlist-cover" />
            <text class="playlist-name">{{ playlist.name }}</text>
            <text class="playlist-count">{{ playlist.playCount }}次播放</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 最近播放 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">最近播放</text>
        <text class="section-more">全部 ></text>
      </view>
      <scroll-view
        scroll-x
        class="recent-scroll"
        :enable-flex="true"
        :show-scrollbar="false"
      >
        <view class="recent-container">
          <view
            class="recent-item"
            v-for="(item, index) in recentPlays"
            :key="index"
          >
            <image :src="item.cover" mode="aspectFill" class="recent-cover" />
            <text class="recent-name">{{ item.name }}</text>
            <text class="recent-artist">{{ item.artist }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 推荐歌曲列表 -->
    <view class="section-container">
      <view class="section-header">
        <text class="section-title">发现好歌</text>
      </view>
      <view class="song-list">
        <view
          class="song-item"
          v-for="(song, index) in recommendSongs"
          :key="index"
          @tap="playSong(song)"
        >
          <image :src="song.cover" mode="aspectFill" class="song-cover" />
          <view class="song-info">
            <text class="song-name">{{ song.name }}</text>
            <text class="song-artist">{{ song.artist }}</text>
          </view>
          <view class="song-actions">
            <text class="iconfont icon-play"></text>
          </view>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 轮播图数据
const banners = ref([
  { image: 'https://p1.music.126.net/uLq-1MbX5FqZQsF2fGQv4Q==/109951165665036659.jpg' },
  { image: 'https://p1.music.126.net/C2edKwXGq0Vq5XjUzAtw0A==/109951165664895095.jpg' },
  { image: 'https://p1.music.126.net/q5rKcBx9Y0V37DsUSaQKXg==/109951165664876829.jpg' },
]);

// 快捷功能数据
const quickAccessData = ref([
  { image: 'https://p2.music.126.net/GvYQoflE99eoeGi9jG4Bsw==/109951165375336156.jpg', value: '每日推荐', iconClass: 'icon-calendar' },
  { image: 'https://p2.music.126.net/o-FjCrUlhyFC96xiVvJZ8g==/109951165374966765.jpg', value: '私人FM', iconClass: 'icon-radio' },
  { image: 'https://p2.music.126.net/WEoawrpCPV3ZZBZk_LDTrA==/109951165374881177.jpg', value: '歌单', iconClass: 'icon-music' },
  { image: 'https://p2.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg', value: '排行榜', iconClass: 'icon-rank' },
]);

// 推荐歌单数据
const recommendPlaylists = ref([
  { cover: 'https://p2.music.126.net/GvYQoflE99eoeGi9jG4Bsw==/109951165375336156.jpg', name: '华语速爆新歌', playCount: '20万' },
  { cover: 'https://p2.music.126.net/o-FjCrUlhyFC96xiVvJZ8g==/109951165374966765.jpg', name: '流行趋势榜', playCount: '35万' },
  { cover: 'https://p2.music.126.net/WEoawrpCPV3ZZBZk_LDTrA==/109951165374881177.jpg', name: '热门歌单', playCount: '15万' },
]);

// 最近播放数据
const recentPlays = ref([
  { cover: 'https://p2.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg', name: '空空如也', artist: '任然' },
  { cover: 'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg', name: '谁', artist: '廖佳琳' },
  { cover: 'https://p2.music.126.net/fS_5RbP_4qg66Uv-FxXDWg==/109951165374881177.jpg', name: '晴天', artist: '周杰伦' },
]);

// 推荐歌曲数据
const recommendSongs = ref([
  { cover: 'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg', name: '起风了', artist: '买辣椒也用券' },
  { cover: 'https://p2.music.126.net/fS_5RbP_4qg66Uv-FxXDWg==/109951165374881177.jpg', name: '这世界那么多人', artist: '莫文蔚' },
  { cover: 'https://p2.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg', name: '阿拉斯加海湾', artist: '蓝心羽' },
]);

// 播放歌曲
const playSong = (song) => {
  console.log('播放歌曲:', song);
  // 实现播放逻辑
};
</script>

<style lang="scss">
.home-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120px;
}

.user-profile {
  background: linear-gradient(135deg, #1e90ff, #4a90e2);
  padding: 20px 16px;
  color: white;

  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
    }

    .user-details {
      flex: 1;
      margin-left: 16px;

      .username {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 8px;
      }

      .user-stats {
        display: flex;
        gap: 16px;

        .stat-item {
          font-size: 14px;
          opacity: 0.9;
        }
      }
    }

    .edit-profile {
      .edit-btn {
        padding: 6px 12px;
        border: 1px solid rgba(255, 255, 255, 0.6);
        border-radius: 16px;
        font-size: 14px;
      }
    }
  }

  .user-achievements {
    display: flex;
    justify-content: space-around;
    padding: 16px 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;

    .achievement-item {
      text-align: center;

      .achievement-count {
        font-size: 20px;
        font-weight: bold;
        display: block;
        margin-bottom: 4px;
      }

      .achievement-label {
        font-size: 12px;
        opacity: 0.9;
      }
    }
  }
}

.search-container {
  padding: 16px;
  background: linear-gradient(to bottom, #1e90ff, #f5f5f5);

  .search-box {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    padding: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .custom-search {
    --at-search-bar-background-color: transparent;
    --at-search-bar-input-background-color: rgba(255, 255, 255, 0.95);
    --at-search-bar-input-padding: 0 40px;
    --at-search-bar-height: 44px;
    --at-search-bar-font-size: 15px;
    --at-search-bar-border-radius: 22px;
    --at-search-bar-placeholder-color: #999;
    --at-search-bar-input-color: #333;
    --at-search-bar-icon-color: #666;
    --at-search-bar-icon-size: 18px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin: 0;

    :deep(.at-search-bar__input-container) {
      background-color: var(--at-search-bar-input-background-color);
      border-radius: var(--at-search-bar-border-radius);
      height: var(--at-search-bar-height);
      padding: 0 12px;

      .at-search-bar__input {
        color: var(--at-search-bar-input-color);
        font-size: var(--at-search-bar-font-size);
        height: 100%;
      }

      .at-icon {
        color: var(--at-search-bar-icon-color);
        font-size: var(--at-search-bar-icon-size);
      }
    }
  }
}

.banner-swiper {
  height: 150px;
  margin: 0 16px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .banner-image {
    width: 100%;
    height: 100%;
  }
}

.quick-access {
  margin: 20px 16px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .quick-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    
    .quick-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px;
      border-radius: 8px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .quick-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;

        .iconfont {
          font-size: 24px;
          color: #4a90e2;
        }
      }

      .quick-text {
        font-size: 14px;
        color: #333;
        text-align: center;
      }
    }
  }
}

.section-container {
  margin: 20px 16px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  .section-title {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  .section-more {
    font-size: 14px;
    color: #666;
  }
}

.playlist-scroll,
.recent-scroll {
  white-space: nowrap;

  .playlist-container,
  .recent-container {
    display: inline-flex;
    padding: 8px 0;
  }
}

.playlist-item,
.recent-item {
  display: inline-block;
  margin-right: 12px;
  width: 120px;

  .playlist-cover,
  .recent-cover {
    width: 120px;
    height: 120px;
    border-radius: 8px;
  }

  .playlist-name,
  .recent-name {
    font-size: 14px;
    color: #333;
    margin-top: 8px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .playlist-count,
  .recent-artist {
    font-size: 12px;
    color: #999;
    display: block;
    margin-top: 4px;
  }
}

.song-list {
  .song-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .song-cover {
      width: 50px;
      height: 50px;
      border-radius: 6px;
      margin-right: 12px;
    }

    .song-info {
      flex: 1;

      .song-name {
        font-size: 16px;
        color: #333;
        margin-bottom: 4px;
        display: block;
      }

      .song-artist {
        font-size: 14px;
        color: #666;
        display: block;
      }
    }

    .song-actions {
      padding: 0 12px;

      .icon-play {
        font-size: 24px;
        color: #1e90ff;
      }
    }
  }
}
</style>
