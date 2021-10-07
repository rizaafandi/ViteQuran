<template>
    <div class="grig grid-cols-2 gap-5 flex flex-row relative" :class="!isMobile ? 'h-80' : 'h-100'" v-if="store.detailSurah">
        <div class="lg:w-9/12 w-full overflow-y-scroll" id="detail">
            <template v-for="(item, index) in store.detailSurah.verses" :key="index">
                <div class="card bg-base-200 mb-4">
                    <div class="card-body">
                        <div class="text-green-600 table justify-center items-center font-bold mb-3">
                            {{ item.number.inSurah }} : {{ store.detailSurah.numberOfVerses }}
                        </div>
                        <div class="flex flex-col">
                            <h1 class="font-bold text-2xl text-right text-gray-800">
                                {{ item.text.arab }}
                            </h1>
                        </div>
                        <div class="flex flex-row justify-between mt-2">
                            <div class="flex flex-col">
                                <i class="text-sm text-gray-400 text-left">
                                    {{ item.text.transliteration.en }}
                                </i>
                            </div>
                        </div>
                        <hr class="my-2"/>
                        <div class="flex flex-row justify-between mt-2">
                            <div class="flex flex-col">
                                <span class="font-semibold text-gray-500 text-md text-left">
                                    {{ item.translation.en }}
                                </span>
                            </div>
                        </div>
                        <div class="flex flex-row mt-7">
                            <icon-button @click.prevent="setFavorite(index)" color="red" :class="item.favorite ? 'text-red-600' : ''">
                                <iconify :icon="item.favorite ? 'eva:heart-fill' : 'eva:heart-outline'" class="w-6 h-6"></iconify>
                            </icon-button>
                            <icon-button color="indigo">
                                <iconify icon="eva:share-outline" class="w-6 h-6"></iconify>
                            </icon-button>
                            <icon-button color="yellow">
                                <iconify icon="eva:link-2-outline" class="w-6 h-6"></iconify>
                            </icon-button>
                            <!-- <icon-button color="green">
                                <iconify icon="eva:play-circle-outline" class="w-6 h-6"></iconify>
                            </icon-button> -->
                        </div>
                        <Player playsinline ref="player" controls class="w-full">
                            <Audio>
                                <source :data-src="item.audio.primary" type="audio/mpeg">
                            </Audio>
                        </Player>
                    </div>
                </div>
            </template>
        </div>
        <div class="card rounded-none bg-base-200 w-3/12 hidden lg:block  overflow-y-scroll">
            <div class="card-body">
                <span class="text-2xl font-bold">
                    {{ store.detailSurah.name.transliteration.id }}
                </span>
                <hr/>
                <span> {{ store.detailSurah.name.translation.en }} / {{ store.detailSurah.name.translation.id }} </span>
                <div class="mt-3 w-full text-justify">
                    {{ store.detailSurah.tafsir.id }}
                </div>
            </div>
        </div>
    </div>
    <div class="card bg-base-200" style="height: 80vh" v-else>
        <div class="card-body flex justify-center items-center">
            <iconify icon="eva:book-open-outline" :size="15"></iconify>
            <span class="text-5xl">Choose Surah to Recite</span>
        </div>
    </div>
</template>
<script setup>
    import _ from 'lodash'
    import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
    import { useStore } from '../stores'
    import { Player, Audio, DefaultUi } from '@vime/vue-next'
    import '@vime/core/themes/default.css'
    import { toRefs } from '@vue/reactivity'

    const player = ref(null)
    const store = useStore()
    const props = defineProps({
        isMobile: Boolean
    })
    const {isMobile} = toRefs(props)
    

    const setFavorite = (index) => {
        store.detailSurah.verses[index].favorite = !store.detailSurah.verses[index].favorite
    }
</script>
<style lang="scss" scoped>
    .h-80 {
        height: 80vh;
    }
    .h-100 {
        height: 100vh;
    }
    ::-webkit-scrollbar-button {
        display: none
    }
    ::-webkit-scrollbar {
        background-color: rgba(229, 231, 235, 1);
        width: 16px
    }
    ::-webkit-scrollbar-track {
        background-color: rgba(229, 231, 235, 1)
    }
    ::-webkit-scrollbar-thumb {
        background-color: #babac0;
        border-radius: 16px;
        border: 5px solid rgba(229, 231, 235, 1);
        &::hover{
            background-color: #a0a0a5;
            border: 4px solid rgba(229, 231, 235, 1);
        }
    }
    ::-webkit-scrollbar-button {
        display: none
    }
</style>