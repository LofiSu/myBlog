<template>
  <div class="min-w-full border dark:border-slate-500 rounded-md flex bg-white dark:bg-slate-800">
    <div class="p-5 mx-auto flex flex-nowrap justify-start overflow-auto scroll-bar">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex flex-shrink-0 w-32 max-w-[12rem] items-center"
        :class="index % 2 ? ' flex-col-reverse' : 'flex-col'"
      >
        <div
          class="w-full flex items-center justify-end opacity-80"
          :class="index % 2 ? ' flex-col-reverse' : 'flex-col'"
          :ref="(el) => (itemContentRef[index] = el as HTMLElement)"
        >
          <div
            :class="[
              'w-full rounded-md p-3 text-xs leading-5',
              THEME_MAP[item.theme].container,
              THEME_MAP[item.theme].content
            ]"
          >
            {{ item.content }}
          </div>
          <span
            v-if="index % 2"
            :class="['translate-y-1/2 rotate-45 w-2 h-2', THEME_MAP[item.theme].container]"
          ></span>
          <span
            v-else
            :class="['-translate-y-1/2 rotate-45 w-2 h-2', THEME_MAP[item.theme].container]"
          ></span>
        </div>
        <div class="flex w-full my-1.5">
          <div :class="index === 0 ? 'flex-1' : 'dot'"></div>
          <div :class="['h-2 w-2 rounded-full', THEME_MAP[item.theme].dot]"></div>
          <div :class="index === items.length - 1 ? 'flex-1' : 'dot'"></div>
        </div>
        <div
          :ref="(el) => (itemDateRef[index] = el as HTMLElement)"
          :class="[
            'text-xs flex flex-col justify-end opacity-80 py-1',
            THEME_MAP[item.theme].content
          ]"
        >
          {{ item.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed, ref, onMounted } from 'vue'

const THEME_MAP = {
  indigo: {
    dot: 'bg-indigo-500',
    container: 'bg-[#e1eaff] dark:bg-indigo-800',
    content: 'text-indigo-900 dark:text-indigo-300'
  },
  green: {
    dot: 'bg-green-500',
    container: 'bg-green-200 dark:bg-green-900',
    content: 'text-green-900 dark:text-green-300'
  },
  blue: {
    dot: 'bg-sky-500',
    container: 'bg-[#d9f3fd] dark:bg-sky-900',
    content: 'text-sky-900 dark:text-sky-300'
  },
  purple: {
    dot: 'bg-purple-500',
    container: 'bg-purple-100 dark:bg-purple-900',
    content: 'text-purple-900 dark:text-purple-300'
  }
}

type Theme = keyof typeof THEME_MAP
interface TimelineItem {
  content: string
  date: string
  theme: Theme
}

const useTimelineItems = () => {
  const randomTheme = (lastTheme: Theme | ''): Theme => {
    const themes = Object.keys(THEME_MAP)
    const theme = themes[Math.floor(Math.random() * themes.length)] as Theme
    return theme === lastTheme ? randomTheme(lastTheme) : theme
  }

  return computed(() => {
    const slotContent = (useSlots().default!()?.[0].children as string) || ''
    const pattern = /- (\d{2}-\d{2}) (.+?) /g
    const items: TimelineItem[] = []
    let match: RegExpExecArray | null
    let lastTheme: Theme | '' = ''
    while ((match = pattern.exec(slotContent))) {
      const [, date, content] = match
      const theme = randomTheme(lastTheme)
      items.push({ content, date, theme })
    }
    return items
  })
}

const items = useTimelineItems()
const itemContentRef = ref<Array<HTMLElement | null>>([])
const itemDateRef = ref<Array<HTMLElement | null>>([])

onMounted(() => {
  let maxContentHeight = -1
  itemContentRef.value.forEach((el) => {
    if (el) maxContentHeight = Math.max(maxContentHeight, el.clientHeight)
  })
  itemDateRef.value.forEach((el, index) => {
    if (index % 2 && el) el.style.height = `${maxContentHeight}px`
  })
  itemContentRef.value.forEach((el) => {
    if (el) el.style.height = `${maxContentHeight}px`
  })
})
</script>

<style scoped>
.dot::after {
  content: '';
  @apply bg-purple-50 border-b h-0 border-dashed block w-full;
}
.dot {
  @apply flex-1 flex items-center;
}

.scroll-bar::-webkit-scrollbar {
  @apply  h-1.5 rounded-md;
}
.scroll-bar::-webkit-scrollbar-thumb {
  @apply bg-slate-400/50 rounded-md;
}
.scroll-bar::-webkit-scrollbar-button {
  @apply w-1;
}
</style>
