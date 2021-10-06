import { defineStore } from 'pinia'
import secureStorage from '../utils/secureStorage'

export const useStore = defineStore('main', {
    state:()=>({
        dataSurah: secureStorage.get('dataSurah') ?? [],
        detailSurah: secureStorage.get('detailSurah') ?? [],
        search: null
    }),
    actions:{
        setAllSurah(data){
            this.dataSurah = data
            secureStorage.set('dataSurah', this.dataSurah);
            secureStorage.remove('detailSurah')
        },
        setDetailSurah(data){
            this.detailSurah = data
            secureStorage.set('detailSurah', this.detailSurah);
        },
        setSearch(data){
            this.search = data
        }
    },
    getters:{
        filteredSurah(state){
            return state.dataSurah.length < 1 ? [] : (!state.search ? state.dataSurah : state.dataSurah.filter(s => s.name.transliteration.id.toLowerCase().includes(state.search)))
        }
    }
})