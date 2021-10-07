<template>
    <div class="gap-5 flex flex-row">
        <div class="w-4/12 overflow-y-scroll " style="height: 80vh" id="surah">
            <transition-group tag="div" name="animate" class="grid grid-cols-1 gap-5" >
                <template v-for="(item, index) in store.filteredSurah" :key="index">
                    <SurahCard 
                        :no="item.number"
                        :surah-title="item.name.transliteration.id" 
                        :surah-title-arabic="item.name.short" 
                        :surah-meaning="item.name.translation.en" 
                        :surah-meaning-translate="item.name.translation.id"
                        :favorite="item.favorite"
                        @set-favorite="item.favorite = !item.favorite"
                        @click-surah="detail(item.number)"
                        />
                </template>
            </transition-group>
        </div>
        <div class="w-8/12">
            <DetailSurah/>
        </div>
    </div>
</template>

<script setup>
    import _ from 'lodash'
    import { onBeforeRouteLeave } from 'vue-router'
    import router from '../routes'
    import { useStore } from '../stores'
    import swal from 'sweetalert2'
    const store = useStore()

    onBeforeMount(async () => {
        if(!store.dataSurah){
            swal.fire({
                icon: 'info',
                title: 'Please Wait',
                allowOutsideClick: false,
                showConfirmButton: false
            })
            await fetch('https://api.quran.sutanlab.id/surah').then(r => r.json()).then(async res => {
                let data = []
                res.data.map(d => {
                    return data.push({...d, favorite: false})
                })
                await store.setAllSurah(data)
                swal.close()
            }).catch(() => {
                swal.fire({
                    icon: 'error',
                    title: 'Error fetching data, reload page'
                })
            })
        }
    })
    const detail = async (id) => {
        swal.fire({
            icon: 'info',
            title: 'Please Wait',
            allowOutsideClick: false,
            showConfirmButton: false
        })
        store.detailSurah = []
        await fetch('https://api.quran.sutanlab.id/surah/'+id).then(r => r.json()).then(async res => {
            swal.close()
            let { verses } = res.data
            let newVerses = []
            verses.map(v => {
                return newVerses.push({...v, favorite: false})
            })
            await store.setDetailSurah({..._.omit(res.data, 'verses'), verses: newVerses})
        }).catch(() => {
            swal.fire({
                icon: 'error',
                title: 'Error fetching data, reload page'
            })
        })
    }
    onBeforeRouteLeave((to, from, next) => {
        store.detailSurah = []
        next()
    })
</script>

<style lang="scss" scoped>
.animate-move {
  transition: transform 0.8s ease;
}
</style>

<style lang="scss" scoped>
    #surah::-webkit-scrollbar {
        background-color: rgba(229, 231, 235, 1);
        width: 16px
    }
    #surah::-webkit-scrollbar-track {
        background-color: rgba(229, 231, 235, 1)
    }
    #surah::-webkit-scrollbar-thumb {
        background-color: #babac0;
        border-radius: 16px;
        border: 5px solid rgba(229, 231, 235, 1);
        &::hover{
            background-color: #a0a0a5;
            border: 4px solid rgba(229, 231, 235, 1);
        }
    }
</style>