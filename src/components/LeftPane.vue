<template>
  <div class="pane">
    <Timer />
  </div>
</template>

<script>
import Timer from "./Timer.vue";

export default {
  name: "LeftPane",
  components: {
    Timer,
  },
};
</script>
<style scoped>
.pane {
  width: 50%;
  height: 95%;
  background-color: #939ac8;
  position: flex;
  margin-top: 1.5%;
  margin-left: 1.5%;
  -webkit-text-size-adjust: none;
}
</style>
