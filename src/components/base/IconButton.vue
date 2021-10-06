<template>
    <div class="transition duration-300 ease-in-out rounded-full p-2" :class="classes">
        <slot/>
    </div>
</template>
<script setup>
    import { computed, toRefs } from 'vue'

    const props = defineProps({
        color: String,
    })
    const { color } = toRefs(props)

    const classes = computed(() => {
        return `hover:text-${color.value}-600 hover:bg-${color.value}-100`
    })
</script>