<template>
    <SideMenu />
</template>

<script>
import "@/assets/scss/base/reset.scss";

import SideMenu from "../components/SideMenu.vue"

import { mapActions } from 'vuex';

export default {
    name: "MaskMapApp",
    components: {
        SideMenu,
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