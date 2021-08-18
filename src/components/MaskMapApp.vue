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

import { mapActions } from "vuex";

export default {
    name: "MaskMapApp",
    components: {
        SideMenu,
        LightBox,
        Map,
    },
    methods: {
        ...mapActions(["fetchLocations", "fetchPharmacies"]),
        openPopup(id){
            this.$refs.map.tiggerPopup(id);
        }
    },
    created() {
        this.fetchLocations();
        this.fetchPharmacies();
    },
};
</script>

<style module lang="scss">
.app{
    display: flex;
}
</style>
