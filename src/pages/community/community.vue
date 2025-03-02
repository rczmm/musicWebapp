<template>
  <view class="community-view">
    <view class="post-form-section">
      <view class="post-form">
        <textarea
          class="post-input"
          v-model="newPost.content"
          placeholder="分享你的音乐心情..."
          maxlength="200"
        />
        <view class="music-selector" @tap="selectMusic" v-if="!selectedMusic">
          <text class="at-icon at-icon-sound"></text>
          <text>选择音乐</text>
        </view>
        <view class="selected-music" v-else>
          <image class="selected-music-cover" :src="selectedMusic.cover" />
          <view class="selected-music-info">
            <text class="selected-music-name">{{ selectedMusic.name }}</text>
            <text class="selected-music-artist">{{ selectedMusic.artist }}</text>
          </view>
          <text class="at-icon at-icon-close" @tap="removeSelectedMusic"></text>
        </view>
        <button class="post-button" @tap="submitPost">发布</button>
      </view>
    </view>
    <view class="community-section">
      <view class="section-header">
        <text class="section-title">音乐社区</text>
      </view>
      <view class="post-item" v-for="(post, index) in communityPosts" :key="index">
        <view class="post-header">
          <image class="post-avatar" :src="post.avatar" />
          <view class="post-user-info">
            <text class="post-username">{{ post.username }}</text>
            <text class="post-time">{{ post.time }}</text>
          </view>
        </view>
        <text class="post-content">{{ post.content }}</text>
        <view class="post-music" v-if="post.music">
          <image class="music-cover" :src="post.music.cover" />
          <view class="music-info">
            <text class="music-name">{{ post.music.name }}</text>
            <text class="music-artist">{{ post.music.artist }}</text>
          </view>
        </view>
        <view class="post-actions">
          <view class="action-item">
            <text class="at-icon at-icon-heart"></text>
            <text>{{ post.likes }}</text>
          </view>
          <view class="action-item">
            <text class="at-icon at-icon-message"></text>
            <text>{{ post.comments }}</text>
          </view>
          <view class="action-item">
            <text class="at-icon at-icon-share"></text>
            <text>分享</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Taro from '@tarojs/taro';

const newPost = ref({
  content: '',
});

const selectedMusic = ref(null);

const selectMusic = () => {
  // TODO: 实现音乐选择功能
  selectedMusic.value = {
    cover: 'https://example.com/album3.jpg',
    name: '示例音乐',
    artist: '示例歌手'
  };
};

const removeSelectedMusic = () => {
  selectedMusic.value = null;
};

const submitPost = () => {
  if (!newPost.value.content.trim()) {
    Taro.showToast({
      title: '请输入内容',
      icon: 'none'
    });
    return;
  }

  const post = {
    avatar: 'https://example.com/default-avatar.jpg',
    username: '当前用户',
    time: '刚刚',
    content: newPost.value.content,
    music: selectedMusic.value,
    likes: 0,
    comments: 0
  };

  communityPosts.value.unshift(post);
  newPost.value.content = '';
  selectedMusic.value = null;

  Taro.showToast({
    title: '发布成功',
    icon: 'success'
  });
};

const communityPosts = ref([
  {
    avatar: 'https://example.com/avatar1.jpg',
    username: '音乐爱好者',
    time: '2小时前',
    content: '分享一首最近很喜欢的歌曲，旋律太美了！',
    music: {
      cover: 'https://example.com/album1.jpg',
      name: '晴天',
      artist: '周杰伦'
    },
    likes: 128,
    comments: 32
  },
  {
    avatar: 'https://example.com/avatar2.jpg',
    username: '乐评人',
    time: '4小时前',
    content: '这首歌的编曲真的很棒，推荐大家一听。',
    music: {
      cover: 'https://example.com/album2.jpg',
      name: '起风了',
      artist: '买辣椒也用券'
    },
    likes: 256,
    comments: 48
  }
]);
</script>

<style lang="scss">
.post-form-section {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.post-form {
  .post-input {
    width: 100%;
    height: 100px;
    padding: 12px;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 12px;
    background: #f9f9f9;
  }

  .music-selector {
    display: flex;
    align-items: center;
    padding: 12px;
    background: #f5f7fa;
    border-radius: 8px;
    margin-bottom: 12px;
    cursor: pointer;

    .at-icon {
      margin-right: 8px;
      color: #666;
    }

    &:hover {
      background: #e8edf5;
    }
  }

  .selected-music {
    display: flex;
    align-items: center;
    padding: 12px;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
    border-radius: 8px;
    margin-bottom: 12px;

    .selected-music-cover {
      width: 48px;
      height: 48px;
      border-radius: 6px;
      margin-right: 12px;
    }

    .selected-music-info {
      flex: 1;

      .selected-music-name {
        font-size: 14px;
        font-weight: 600;
        color: #333;
        margin-bottom: 4px;
      }

      .selected-music-artist {
        font-size: 12px;
        color: #666;
      }
    }

    .at-icon-close {
      padding: 8px;
      color: #666;
      cursor: pointer;

      &:hover {
        color: #ff4d4f;
      }
    }
  }

  .post-button {
    width: 100%;
    height: 40px;
    background: linear-gradient(135deg, #fdbb00 0%, #ffcd3c 100%);
    border-radius: 20px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(253, 187, 0, 0.2);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

.community-view {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 16px;
}

.community-section {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-header {
  margin-bottom: 16px;
  
  .section-title {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }
}

.post-item {
  padding: 16px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.post-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}

.post-user-info {
  flex: 1;
}

.post-username {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.post-time {
  font-size: 12px;
  color: #999;
}

.post-content {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 12px;
}

.post-music {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 16px;
}

.music-cover {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-right: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.music-info {
  flex: 1;
}

.music-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.music-artist {
  font-size: 12px;
  color: #666;
}

.post-actions {
  display: flex;
  justify-content: space-around;
  padding-top: 12px;
}

.action-item {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 14px;
  
  .at-icon {
    margin-right: 4px;
  }
  
  &:hover {
    color: #1e90ff;
  }
}
</style>