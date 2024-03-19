<template>
  <div class="background">
    <LeftPane />
    <RightPane />
  </div>
</template>

<script>
import LeftPane from "./LeftPane.vue";
import RightPane from "./RightPane.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Background",
  components: {
    LeftPane,
    RightPane,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.background {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #d2d6ec;
  position: absolute;
  margin-top: -8px;
  margin-left: -8px;
}
</style>
