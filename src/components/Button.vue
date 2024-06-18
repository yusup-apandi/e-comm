<script setup>
import { ref } from 'vue'

defineProps({
    text: String,
    type: {
        type: String,
        enum: ['fill', 'solid', 'outline'],
        default: 'fill'
    }
})
</script>

<template>

    <button v-if="type == 'fill'" type="button" class="btn-primary"
        :class="[type == 'solid' ? 'text-primary-500' : 'text-primary-100']">
        {{ text }}<slot></slot>
    </button>

    <button v-else-if="type == ''" type="button" class="btn-primary">
        {{ text }}<slot></slot>
    </button>

    <button v-else type="button" class="btn-primary">
        {{ text }}<slot></slot>
    </button>

    <slot name="header"></slot>
</template>