import {defineStore} from 'pinia'
export const globalDegiskenler = defineStore("globalDegiskenler",{
    state: ()=> ({
        isDark: false,
    })
})