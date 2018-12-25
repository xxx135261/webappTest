<template>
  <div style="padding:15px">FERM3-UI-LAR
    <!-- <tag-cloud :data="hotTag" @clickTag="clickTagItem"></tag-cloud> -->

    <VueTagCloud v-bind:data="tagData"></VueTagCloud>
  </div>
</template>

<script>
import tagCloud from '../components/tagCloud.vue'
import VueTagCloud from "../components/VueTagCloud";

export default {
  components: { tagCloud, VueTagCloud },
  data() {
    return {
      hotTag: [
        { id: "05023f8da31c4b4187cc6899e2a3aec2", name: "镇远县" },
        { id: "0ef028e5278f4f5ca31f99f1bd22b1cc", name: "剑河县" },
        { id: "1a32ef04d3c548eaa6777abb46da32f2", name: "台江县" },
        { id: "2c26488325bd493687d16315fe0e5fdd", name: "岑巩县" },
        { id: "3a786111828a4b9f89ae9da25753eedd", name: "黎平" },
         { id: "05023f8da31c4b4187cc6899e2a3aec2", name: "上海交易所" },
        { id: "0ef028e5278f4f5ca31f99f1bd22b1cc", name: "剑河县" },
        { id: "1a32ef04d3c548eaa6777abb46da32f2", name: "台江县" },
        { id: "2c26488325bd493687d16315fe0e5fdd", name: "岑巩县" },
        { id: "3a786111828a4b9f89ae9da25753eedd", name: "披露" },
      ],
      tagData: [
        { text: "上海交易所", weight: 13, link: "https://google.com" },
        { text: "披露", weight: 9 },
        { text: "台江县", weight: 6 },
        { text: "通策广场", weight: 7 },
        { text: "临江花园2单元t", weight: 5 },
        { text: "上海交易所", weight: 11,},
        { text: "披露", weight: 9 },
        { text: "台江县", weight: 6 },
        { text: "通策广场", weight: 7 },
        { text: "临江花园2单元t", weight: 5 }
      ]
    };
  },
  methods: {
    clickTagItem(tag) {
      // TODO
      debugger
    }
  }
};
</script>