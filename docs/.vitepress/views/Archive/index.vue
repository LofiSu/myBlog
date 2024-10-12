<template>
  <div
    class="mx-auto my-20 max-w-3xl px-4 pb-8 dark:divide-slate-200/20 sm:px-6 xl:max-w-6xl xl:px-0"
  >
    <!-- 标题 -->
    <div class="0 relative mt-2 flex justify-center">
      <h1 class="text-5xl font-bold">{{ hero.title || 'Blogs' }}</h1>
      <span
        class="absolute bottom-1/3 left-1/2 -translate-x-1/2 bg-gradient-to-b from-black/20 to-black/10 bg-clip-text text-6xl tracking-wider text-transparent opacity-60 dark:from-white/20 dark:to-white/10"
        >{{ hero.title || 'Blogs' }}</span
      >
    </div>

    <p class="mt-2 text-center text-black/50 dark:text-slate-500">{{ hero.subTitle }}</p>

    <!-- 主体 -->
    <ul class="mt-6 grid grid-cols-1 pt-6 lg:grid-cols-4 lg:gap-8">
      <!-- 所有文章 -->
      <div
        :class="categories ? 'col-span-3' : 'col-span-4'"
        class="order-2 pt-6 lg:order-1 lg:mt-0 lg:pt-0"
      >
        <h1
          class="w-fit border-b-4 border-sky-500 pb-2 text-3xl font-bold transition-all duration-300 hover:pr-6 dark:border-sky-700"
        >
          ✨ 近期更新
        </h1>
        <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            v-for="(columnPosts, index) in [firstHalf, secondHalf]"
            :key="index"
            class="col-span-1 flex flex-col gap-4"
          >
            <PostCard
              v-for="post in columnPosts"
              :key="post.date.time"
              :post="post"
              :flow="flow"
            ></PostCard>
          </div>
        </div>
      </div>

      <!-- 文章分类 -->
      <div v-if="categories || features" class="order-1 col-span-1 lg:order-2">
        <Sidebar :types="categories"></Sidebar>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { data as posts } from '../../utils/article.data.js'
import PostCard from './PostCard.vue'
import Sidebar from './Sidebar.vue'

// 获取标题 / 分类 / 推荐阅读
const { frontmatter: pageData, theme } = useData()
const { hero, types, features, flow } = pageData.value

// 分割文章列表
const halfLength = Math.ceil(posts.length / 2)
const firstHalf = posts.slice(0, halfLength)
const secondHalf = posts.slice(halfLength)

// 根据当前 page 名称获取 sidebar 数据并构造相应的类别
const pathname = window.location.pathname
const sidebarData = theme.value.sidebar?.[pathname]
const categories =
  types || sidebarData?.items.map((item: any) => ({ name: item.text, link: item.link }))
</script>
