import { defineStore } from "pinia";

export default defineStore("pinia", ()=>{
  const name="Hello world!";
  return {name}
})