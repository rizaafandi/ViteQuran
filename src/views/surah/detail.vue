<template>
    <div class="grig grid-cols-2 gap-5 flex flex-row relative">
        <div class="lg:w-9/12 w-full">
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
                            <Player playsinline ref="player" controls class="w-full">
                                <Audio>
                                    <source :data-src="item.audio.primary" type="audio/mpeg">
                                </Audio>
                            </Player>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="card bg-base-200 w-3/12 hidden lg:block">
            <div class="card-body w-full">
                <span class="text-3xl font-bold">
                    {{ store.detailSurah.name.transliteration.id }}
                </span>
                <hr/>
                <span> {{ store.detailSurah.name.translation.en }} / {{ store.detailSurah.name.translation.id }} </span>
                <div class="card bg-green-100 mt-3 w-full">
                    <div class="card-body">
                        {{ store.detailSurah.tafsir.id }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import _ from 'lodash'
    import { onBeforeRouteLeave } from 'vue-router'
    import { useStore } from '../../stores'
    import { Player, Audio, DefaultUi } from '@vime/vue-next'
    import '@vime/core/themes/default.css'

    const player = ref(null)
    const store = useStore()
    const props = defineProps({
        id: {
            type: String,
            required: true
        }
    })

    const {id} = toRefs(props)

    onBeforeMount(async () => {
        await fetch('https://api.quran.sutanlab.id/surah/'+atob(id.value)).then(r => r.json()).then(async res => {
            let { verses } = res.data
            let newVerses = []
            verses.map(v => {
                return newVerses.push({...v, favorite: false})
            })
            await store.setDetailSurah({..._.omit(res.data, 'verses'), verses: newVerses})
        })
    })
    onBeforeRouteLeave((from, to, next) => {
        store.detailSurah = []
        next()
    })
    const setFavorite = (index) => {
        store.detailSurah.verses[index].favorite = !store.detailSurah.verses[index].favorite
    }
</script>