<template>
    <Icon :icon="icon" :style="{ fontSize: size+'rem' }"></Icon>
</template>
<script setup>
import { Icon } from '@iconify/vue'
import { toRefs } from '@vue/reactivity'

const props = defineProps({
    icon: String,
    size: Number
})
const { icon, size } = toRefs(props)
</script>