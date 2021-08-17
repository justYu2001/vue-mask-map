<template>
    <SideMenu />
    <LightBox />
</template>

<script>
import "@/assets/scss/base/reset.scss";

import SideMenu from "../components/SideMenu.vue"
import LightBox from "../components/LightBox.vue"

import { mapActions } from 'vuex';

export default {
    name: "MaskMapApp",
    components: {
        SideMenu,
        LightBox,
    },
    methods: {
        ...mapActions(["fetchLocations", "fetchPharmacies"]),
    },
    created(){
        this.fetchLocations();
        this.fetchPharmacies();
    },
}
</script>

<style module lang="scss">
    
</style>