import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("pinia", ()=>{
  let nowPage = ref<string[]>(['settings']);

  let formData=ref({
    subscribeMode: true,
    rssLink: "",
    exclude: [],
    startWith: [],
  })

  return {nowPage, formData}
})