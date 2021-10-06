<template>
    <transition-group tag="div" name="animate" class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        <template v-for="(item, index) in store.filteredSurah" :key="index">
            <SurahCard 
                :no="item.number"
                :surah-title="item.name.transliteration.id" 
                :surah-title-arabic="item.name.short" 
                :surah-meaning="item.name.translation.en" 
                :surah-meaning-translate="item.name.translation.id"
                :favorite="item.favorite"
                @set-favorite="item.favorite = !item.favorite"
                />
        </template>
    </transition-group>
</template>

<script setup>
    import { useStore } from '../stores'
    const store = useStore()

    onBeforeMount(async () => {
        if(!store.dataSurah){
            await fetch('https://api.quran.sutanlab.id/surah').then(r => r.json()).then(async res => {
                let data = []
                res.data.map(d => {
                    return data.push({...d, favorite: false})
                })
                await store.setAllSurah(data)
            })
        }
    })
</script>

<style lang="scss" scoped>
.animate-move {
  transition: transform 0.8s ease;
}
</style>