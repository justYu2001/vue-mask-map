<template>
    <LightBox />
    <div :class="$style.app">
        <SideMenu @tiggerMarkerPopup="openPopup"/>
        <Map ref="map" />
    </div>
</template>

<script>
import "@/assets/scss/base/reset.scss";
import "leaflet/dist/leaflet.css";

import SideMenu from "../components/SideMenu.vue";
import LightBox from "../components/LightBox.vue";
import Map from "../components/Map.vue";

import { ref } from 'vue';
import { useStore } from "vuex";

export default {
    name: "MaskMapApp",
    components: {
        SideMenu,
        LightBox,
        Map,
    },
    setup() {
        const store = useStore();

        store.dispatch("fetchLocations");
        store.dispatch("fetchPharmacies");

        const map = ref(null);
        const openPopup = (id) => map.value.tiggerPopup(id);
        
        return{
            map,
            openPopup,
        }
    },
};
</script>

<style module lang="scss">
.app{
    display: flex;
}
</style>
