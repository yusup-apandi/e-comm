<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import Slider from '../components/Slider.vue';
import CompanyLogo from '../components/CompanyLogo.vue';
</script>

<template>
    <Navbar />
       <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Slider />
        <CompanyLogo/>
        <h1>ini sample text</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, nobis id voluptatem odio voluptatum alias dolores velit, nemo, quo porro est ullam neque corporis error iste tenetur adipisci ad non.</p>
    </div>
    <Footer />
</template>
