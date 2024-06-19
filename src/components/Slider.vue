<template>
  <div class="relative w-full overflow-hidden" style="aspect-ratio: 4/1; border-radius: 16px;">
    <div
      class="flex transition-transform duration-500"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="w-full flex-shrink-0"
      >
        <img :src="slide" class="w-full h-full object-cover" style="border-radius: 16px;" />
      </div>
    </div>
    <button
      @click="prevSlide"
      class="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-700 bg-opacity-50 p-2 rounded-full hidden group-hover:block"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-700 bg-opacity-50 p-2 rounded-full hidden group-hover:block"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
    <div class="absolute bottom-4 left-4 flex space-x-2">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        :class="{
          'bg-gray-700 bg-opacity-50': currentIndex === index,
          'bg-gray-300 bg-opacity-50': currentIndex !== index,
        }"
        class="w-2 h-2 rounded-full"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      slides: [
        'https://via.placeholder.com/1208x302?text=Slide+1',
        'https://via.placeholder.com/1208x302?text=Slide+2',
        'https://via.placeholder.com/1208x302?text=Slide+3',
      ],
      intervalId: null,
    }
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.slides.length) % this.slides.length
    },
    goToSlide(index) {
      this.currentIndex = index
    },
    startAutoplay() {
      this.intervalId = setInterval(this.nextSlide, 3000)
    },
    stopAutoplay() {
      clearInterval(this.intervalId)
    },
  },
  mounted() {
    this.startAutoplay()
  },
  beforeDestroy() {
    this.stopAutoplay()
  },
}
</script>

<style scoped>
.relative:hover .group-hover\:block {
  display: block;
}
</style>
