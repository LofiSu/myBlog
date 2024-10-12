<template>
    <div class="lg:sticky lg:top-20">
      <!-- 类别 -->
      <div class="">
        <h1
          class="w-fit border-b-4 border-sky-500 pb-2 text-3xl font-bold transition-all duration-300 hover:pr-6 dark:border-sky-700"
        >
          🏷️ 文章分类
        </h1>
        <div class="mt-4 flex flex-col gap-4">
          <div
            @click="openLink(category.link)"
            class="group flex relative flex-1 items-center justify-between rounded-lg bg-gradient-to-r p-5 text-white transition-all hover:cursor-pointer overflow-hidden"
            :class="THEME_ARRAY[index % THEME_ARRAY.length]"
            v-for="(category, index) in categories"
            :key="category.name"
          >
            <div>
              <h1 class="text-lg font-bold">{{ category.name }}</h1>
              <div class=" grid transition-all overflow-hidden duration-700 grid-rows-[0fr] group-hover:grid-rows-[1fr]">
                <p class="min-h-0 whitespace-pre-wrap" >{{ category.desc }}</p>
              </div>
            </div>
            <p
              class=" absolute right-2 top-6 group-hover:top-2 rotate-12 scale-150 text-3xl opacity-20 blur-[2px] transition-all duration-700 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 group-hover:blur-none"
            >
              {{ category.icon || '🔗' }}
            </p>
          </div>
        </div>
  
        <!-- <div class="mt-4">
          <div
            @click="openLink(category.link)"
            class="relative rounded-lg px-2 py-1 transition-all hover:cursor-pointer hover:bg-sky-200/80 dark:hover:bg-sky-900/80"
            v-for="category in categories"
            :key="category.name"
          >
            <h1 class="font-bold">{{ category.name }}</h1>
            <p class="line-clamp-1 text-sm">{{ category.desc }}</p>
            <div class="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-end">
              <p>{{ category.icon || '🔗' }}</p>
              <RiArrowRightLine class="h-4 w-4" />
            </div>
          </div>
        </div> -->
      </div>
  
      <!-- 随机一言 -->
      <div
        class="mt-4 rounded-lg bg-amber-100 bg-text-card px-2 py-2 shadow-md dark:bg-amber-950/80"
        v-if="quoteInfo.string"
      >
        <div class="flex gap-2">
          <span class="self-start text-2xl">“</span>
          <div class="my-4 flex-1 indent-4 italic">
            {{ quoteInfo.string }}
          </div>
          <span class="self-end text-2xl">”</span>
        </div>
        <p v-if="quoteInfo.from" class="text-right">—— 《{{ quoteInfo.from }}》</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, reactive } from 'vue'
  import { type Category } from '../../utils/types.js'
  import { useRouter } from 'vitepress'
  
  
  const router = useRouter()
  const { types, features } = defineProps(['types', 'features'])
  const categories: Category[] = [...types]
  
  const THEME_MAP = {
    blue: 'from-blue-400 to-sky-400 dark:from-blue-600/80 dark:to-sky-600/80',
    green: 'from-teal-400 to-emerald-400 dark:from-teal-500/80 dark:to-emerald-500/80',
    orange: 'from-orange-400 to-amber-400 dark:from-orange-400/80 dark:to-amber-400/80'
  }
  const THEME_ARRAY = Object.values(THEME_MAP)
  
  // 打开文章链接
  const openLink = (link: string | undefined) => link && router.go(link)
  
  // 随机一言
  const quoteInfo = reactive({
    string: '姜黄色的猫是突然决定要走的',
    from: '猫不在乎'
  })
  
  onMounted(async () => {
    fetch('https://v1.hitokoto.cn?c=a&c=b&c=d&c=i')
      .then((response) => response.json())
      .then(({ hitokoto, from }) => {
        quoteInfo.string = hitokoto
        quoteInfo.from = from
      })
      .catch(console.error)
  })
  </script>
  
  
  <style scoped>
  
  .bg-text-card {
    background-size: 20px 20px;
    background-image: linear-gradient(90deg, rgba(60, 10, 30, 0.1) 3%, transparent 0),
      linear-gradient(1turn, rgba(60, 10, 30, 0.1) 3%, transparent 0);
  }
  </style>