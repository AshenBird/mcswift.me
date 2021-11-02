 <script setup lang="ts">

const props = defineProps({
  src:{ 
    type:String,
    required:true,
  }
})


</script>
<template>
  <div class="mcswift-icon-container">
    <img class="mcswift-icon" :src="props.src">
  </div>
</template>
<style>
.mcswift-icon-container{
  display: inline-flex;
  height: 100%;
  font-size: inherit;
  min-width: 1em;
  vertical-align: middle;
}
.mcswift-icon{
  display:inline-block;
  margin: auto;
  height: 1em;
  line-height: 1em;
  font-size: inherit;
  /* vertical-align: middle; */
}
</style>