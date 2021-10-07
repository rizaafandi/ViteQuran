<template>
    <div class="card bg-base-200 p-5 hover:shadow-lg transition duration-200 ease-in-out">
        <div class="flex flex-row justify-between">
            <div class="rounded-full bg-green-100 text-green-600 w-6 h-6 p-4 flex justify-center items-center">
                {{ no }}
            </div>
            <icon-button @click.prevent="setFavorite" color="red" :class="favorite ? 'text-red-600' : ''">
                <iconify :icon="favorite ? 'eva:heart-fill' : 'eva:heart-outline'" class="w-6 h-6"></iconify>
            </icon-button>
        </div>
        <div class="card-body p-0 pt-3 flex flex-row justify-between">
            <div class="flex flex-col">
                <span class="font-medium text-lg hover:underline cursor-pointer " v-html="title" @click.prevent="detail"></span>
                <span class="font-medium text-base text-gray-500 uppercase"> {{ surahMeaning }} </span>
                <span class="font-medium text-base text-gray-500 capitalize hidden lg:block"> {{ surahMeaningTranslate }} </span>
            </div>
            <div class="table">
                <span class="font-medium text-2xl hidden lg:block" v-html="surahTitleArabic"></span>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { useStore } from '../stores'

    const store = useStore();
    const router = useRouter();
    const props = defineProps({
        no: Number,
        surahTitle: String,
        surahTitleArabic: String,
        surahMeaning: String,
        surahMeaningTranslate: String,
        favorite: Boolean
    })
    const emits = defineEmits(['setFavorite','clickSurah'])
    const { no, surahTitle, surahTitleArabic, surahMeaning, surahMeaningTranslate, favorite } = toRefs(props)



    const title = computed(() => {
        return !store.search ? surahTitle.value : surahTitle.value.replace(new RegExp(store.search, "gi"), (match) => `<mark>${match}</mark>`);
    })
    const detail = () => {
        emits('clickSurah')
    }
    const setFavorite = () => {
        emits('setFavorite')
    }
</script>