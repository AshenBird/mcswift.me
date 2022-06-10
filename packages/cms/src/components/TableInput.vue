<script lang="ts" setup>
import {NInput, NButton, NSpace} from "naive-ui" 
import { ref } from "vue";
const props = defineProps({
  value: {
    type: String,
    default: "",
  }
});
const emits = defineEmits({
  "update:value":null
})
const editing = ref(false)
const temp = ref("")
temp.value = props.value

const update = (v:string)=>{
  temp.value = v
}

const action = ()=>{
  console.log("a")
  if(editing.value){
    emits("update:value", temp.value)
    editing.value = false
  }else{
    editing.value = true
  }
}

</script>
<template>
  <div style="display: flex;justify-content: space-between;">
    <n-input v-if="editing" size="tiny" :value="temp" @update:value="update" @keyup.enter="action"></n-input>
    <div v-else style="padding: 0 8px;min-width: 133px;">{{temp}}</div>
    <n-button @click="action" size="tiny">{{editing?'完成':'编辑'}}</n-button>
  </div>
  
</template>
