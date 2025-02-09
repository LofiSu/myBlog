<template>
  <div @click="openLink(post.url)"
    class="relative cursor-pointer break-inside-avoid-column rounded-md border bg-zinc-50/50 py-4 transition-all first:mt-0 hover:scale-[1.01] hover:border-indigo-800 dark:border-transparent dark:bg-slate-800/80 dark:hover:border-sky-300 dark:hover:bg-sky-950/80 sm:pl-0">
    <div class="w-full px-5">
      <div class="flex min-w-0 items-center justify-between gap-2">
        <h1 class="whitespace-normal text-l font-bold leading-8 tracking-tight overflow-hidden text-overflow-ellipsis">
          {{ getTitle(post) }}
        </h1>
      </div>

      <p
        class="mt-2 line-clamp-3 flex-1 leading-relaxed text-black/60 transition-all duration-300 group-hover:text-black dark:text-slate-500 dark:group-hover:text-white/80">
        {{ post.frontmatter.desc }}
      </p>

      <!-- date and tags -->
      <div class="mt-3 flex w-full justify-between">
        <div class="flex min-w-0 items-center gap-1 text-sm text-zinc-400">
          <RiCalendarLine class="h-4 w-4 flex-shrink-0" />
          <p class="truncate">{{ post.date.string }}</p>
        </div>
        <div>
          <p v-for="(tag, tagIndex) in getTags(post)" :key="tagIndex" :class="tagIndex >= 1 ? 'ml-2' : ''"
            class="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs text-blue-800 dark:bg-blue-800/80 dark:text-blue-200">
            {{ tag }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Post } from '../../utils/types.js'
import { fileName2Title } from '../../userConfig/translations.js'
import { useRouter } from 'vitepress'
import { RiCalendarLine } from '@remixicon/vue'

const router = useRouter()
const { post, flow } = defineProps(['post', 'flow'])

// 获取文章标题信息，使用用户自定义的标题或是 md 文件名称
const getTitle = (post: Post): string => {
  const userTitle = post.frontmatter?.title
  if (userTitle) return userTitle

  const { url } = post
  const matches = url.match(/.*\/(.*.html)/)
  let fileName = matches && matches[1].replace('.html', '')
  // 如果匹配成功，返回匹配的部分作为标题，否则返回一个默认标题
  if (fileName) return fileName2Title[fileName] || fileName
  return 'Error Title'
}

// 获取文章的前两个tag
const getTags = (post: Post) => {
  const rawTagString: string = post.frontmatter.tags
  return rawTagString ? rawTagString.split('/').slice(0, 2) : []
}

// 打开文章链接
const openLink = (link: string) => router.go(link)
</script>
