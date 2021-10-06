<template>
    <header class="bg-gray-200 navbar px-10 py-5">
        <h4 class="flex-1 uppercase">
            Al-Qur'an Online
        </h4>
        <div class="flex flex-row flex-none">
            <div class="form-control">
                <input type="search" placeholder="Search ( / )" class="input input-ghost input-bordered rounded-full" ref="search" @keydown.space.prevent @input.prevent="store.setSearch($event.target.value)">
            </div>
        </div>
    </header>
</template>
<script setup>
    import { useStore } from '../../stores'
    const search = ref()

    document.body.onkeypress = (e) => {
        e.key == '/' ? search.value.focus() : false
        e.key == '/' ? e.preventDefault() : false
    } 

    const store = useStore();
</script>