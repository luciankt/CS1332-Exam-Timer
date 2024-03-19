<template>
  <div class="pane">
    <Instructions />
  </div>
</template>

<script>
import Instructions from "./Instructions.vue";

export default {
  name: "RightPane",
  components: {
    Instructions,
  },
};
</script>
<style scoped>
.pane {
  width: 45%;
  height: 95%;
  background-color: #939ac8;
  position: flex;
  margin-top: 1.5%;
  margin-left: 1.8%;
  -webkit-text-size-adjust: none;
}
</style>
