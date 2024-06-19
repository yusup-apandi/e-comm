<template>
  <div class="slider">
    <div class="slider-inner" @mouseover="pauseSlider" @mouseleave="startSlider">
      <div
        v-for="(logo, index) in logos"
        :key="index"
        class="logo-container"
        @click="openLink(logo.link)"
      >
        <img :src="logo.image" :alt="logo.name" class="logo" />
      </div>
      <div
        v-for="(logo, index) in logos"
        :key="'clone-' + index"
        class="logo-container"
        @click="openLink(logo.link)"
      >
        <img :src="logo.image" :alt="logo.name" class="logo" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logos: [
        { name: 'Company 1', image: 'https://via.placeholder.com/150?text=Company+1', link: 'https://company1.com' },
        { name: 'Company 2', image: 'https://via.placeholder.com/150?text=Company+2', link: 'https://company2.com' },
        { name: 'Company 3', image: 'https://via.placeholder.com/150?text=Company+3', link: 'https://company3.com' },
        { name: 'Company 4', image: 'https://via.placeholder.com/150?text=Company+4', link: 'https://company4.com' },
        { name: 'Company 5', image: 'https://via.placeholder.com/150?text=Company+5', link: 'https://company5.com' },
        { name: 'Company 6', image: 'https://via.placeholder.com/150?text=Company+6', link: 'https://company6.com' },
        { name: 'Company 7', image: 'https://via.placeholder.com/150?text=Company+7', link: 'https://company7.com' },
        { name: 'Company 8', image: 'https://via.placeholder.com/150?text=Company+8', link: 'https://company8.com' },
      ],
    };
  },
  methods: {
    openLink(link) {
      window.open(link, '_blank');
    },
    pauseSlider() {
      const sliderInner = this.$el.querySelector('.slider-inner');
      sliderInner.style.animationPlayState = 'paused';
    },
    startSlider() {
      const sliderInner = this.$el.querySelector('.slider-inner');
      sliderInner.style.animationPlayState = 'running';
    },
  },
};
</script>

<style scoped>
.slider {
  width: 100%;
  overflow: hidden;
  margin-top: 8px;
}
.slider-inner {
  display: flex;
  animation: slide 20s linear infinite;
  animation-play-state: running;
}
.slider:hover .slider-inner {
  animation-play-state: paused;
}
@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-200%));
  }
}
.logo-container {
  flex: 0 0 auto;
  width: 150px; /* Adjust width as needed */
  margin-right: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.logo-container:hover {
  transform: scale(1.05);
}
.logo {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}
</style>
