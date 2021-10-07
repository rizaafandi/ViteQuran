<template>
    <header class="bg-gray-200 navbar px-10 py-5 flex">
        <!-- <h4 class="flex-none uppercase">
            Al-Qur'an Online
        </h4> -->
        
        <div class="form-control lg:w-5/12 w-9/12 mx-auto">
            <input type="search" placeholder="Search ( / )" class="input input-bordered rounded-full w-full" ref="search" @keydown.space.prevent @input.prevent="store.setSearch($event.target.value)">
        </div>
        <!-- <div class="flex-none"></div> -->
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