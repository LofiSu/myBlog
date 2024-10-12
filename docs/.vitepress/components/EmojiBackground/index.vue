<template>
  <div
    ref="emojiBgRef"
    class="absolute left-0 top-0 -z-[1] flex h-screen w-full flex-col gap-1 overflow-hidden dark:bg-slate-900 bg-slate-50/95"
  >
    <div
      class="emoji-line leading-10"
      v-for="(line, lineIndex) in renderEmojis"
      :key="lineIndex"
      :style="getRadomStyle()"
    >
      <span class="text-3xl opacity-20" v-for="(emoji, emojiIndex) in line" :key="emojiIndex">
        {{ emoji }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, onMounted, ref } from 'vue'
import emojiJson from './emoji-compact.json'

const emojis: string[] = emojiJson

const useEmojiBackground = () => {
  const emojiBgRef = ref<HTMLElement | null>(null)
  const renderEmojis = ref<string[][]>([])

  const getRadomStyle = () => {
    return {
      animationDuration: `${Math.random() * 60 + 60}s`,
      animationDirection: Math.random() > 0.5 ? 'reverse' : 'normal'
    } as CSSProperties
  }

  const randomEmoji = () => {
    const index = Math.floor(Math.random() * emojis.length)
    return emojis.at(index)!
  }

  const randomEmojis = (len: number) => {
    return new Array(len).fill(0).map(() => randomEmoji())
  }

  const getRenderEmojis = () => {
    const height = emojiBgRef.value?.clientHeight || 0
    const countLines = Math.floor(height / 40)
    const emojiPerLine = Math.floor(window.innerWidth / 40) * 2
    const interval = 5;

    const renderChunk = (start:number,end:number) => {
      if(start >= end) return;

      const chunk = new Array(Math.min(end,countLines) - start).fill(0).map(() => randomEmojis(emojiPerLine))
      renderEmojis.value = [...renderEmojis.value, ...chunk]

      requestAnimationFrame(() => {
        renderChunk(end,end + interval)
      })
    }
    renderEmojis.value = []
    renderChunk(0,interval)
  }

  return { renderEmojis, getRenderEmojis, emojiBgRef, getRadomStyle }
}

const { renderEmojis, getRenderEmojis, emojiBgRef, getRadomStyle } = useEmojiBackground()

onMounted(() => {
  getRenderEmojis()
})
</script>

<style scoped>
@keyframes move {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-90%);
  }
  100% {
    transform: translateY(0);
  }
}

.emoji-line {
  white-space: nowrap;
  animation: move 60s linear infinite;
}
</style>
