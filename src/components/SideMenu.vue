<template>
    <div :class="$style.sidemenu">
        <div :class="$style.dropdowns">
            <SideMenuDropDown
                :currentOption="currentCity"
                :options="cityList"
                @updateOption="updateCurrentCity"
            />
            <SideMenuDropDown
                :currentOption="currentDistrict"
                :options="districtList"
                @updateOption="updateCurrentDistrict"
            />
        </div>
        <div :class="$style.search">
            <SearchBar />
        </div>
        <ul :class="$style['pharmacy-list']">
            <li
                :class="$style.pharmacy"
                v-for="pharmacy in filteredPharmacies"
                :key="pharmacy.id"
                @click="tiggerMarkerPopup(pharmacy.id)"
            >
                <h3
                    :class="$style.highlight"
                    v-html="highlightKeyword(pharmacy.name)"
                ></h3>
                <h4>成人口罩</h4>
                <p>{{ pharmacy["mask_adult"] }}</p>
                <h4>兒童口罩</h4>
                <p>{{ pharmacy["mask_child"] }}</p>
                <h4>最後更新時間</h4>
                <p>{{ pharmacy.updated }}</p>
                <button :class="$style.info" @click.stop="openInfoBox(pharmacy.id)">
                    詳細資訊
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import SideMenuDropDown from "@/components/SideMenuDropDown.vue";
import SearchBar from "@/components/SearchBar.vue";

import "@/assets/images/search.svg";

import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex';


export default {
    name: "SideMenu",
    components: {
        SideMenuDropDown,
        SearchBar,
    },
    emits: ["tiggerMarkerPopup"],
    setup(props, { emit }) {
        const store = useStore();

        const currentCity = computed(() => store.state.currentCity);
        const cityList = computed(() => store.getters.cityList);
        const updateCurrentCity = (city) => store.commit("setCurrentCity", city);

        const currentDistrict = computed(() => store.state.currentDistrict);
        const districtList = computed(() => store.getters.districtList);
        watch(districtList, (value) => {
            store.commit("setCurrentDistrict", value[0].name);
        })
        const updateCurrentDistrict = (dsitrict) => {
            store.commit("setCurrentDistrict", dsitrict)
        };

        const filteredPharmacies = computed(() => store.getters.filteredPharmacies);

        const keyword = computed(() => store.state.keyword);
        const highlightKeyword = (string) => {
            const keywordHtml = `<span>${keyword.value}</span>`;
            const regExp = new RegExp(keyword.value, "g");
            return string.replace(regExp, keywordHtml);
        };

        const infoBoxPharmacyId = computed(() => store.state.infoBoxPharmacyId);
        const openInfoBox = (id) =>{
            store.commit("setInfoBoxPharmacyId", id);
            store.commit("setModalShow", true);
        }

        const tiggerMarkerPopup = (id) => emit("tiggerMarkerPopup", id);

        return{
            currentCity,
            cityList,
            updateCurrentCity,
            currentDistrict,
            districtList,
            updateCurrentDistrict,
            filteredPharmacies,
            keyword,
            highlightKeyword,
            infoBoxPharmacyId,
            openInfoBox,
            tiggerMarkerPopup,
        }
    },
};
</script>

<style module lang="scss">
.sidemenu {
    width: 400px;
    height: 100vh;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    display: flex;
    flex-direction: column;
}
.dropdowns {
    padding-top: 30px;
    display: flex;
    justify-content: center;
}
.search {
    padding: 30px 44px;
    border-bottom: 1px solid $gray;
}

.pharmacy-list {
    flex-grow: 1;
    overflow-y: scroll;
    @include custom-scrollbar;
}

.pharmacy {
    position: relative;
    padding: 10px 20px;
    border-bottom: 1px solid $gray;
    cursor: pointer;

    &:hover{
        background-color: #e3e3e3;
    }

    h4 {
        font-size: $h4-font-size;
        padding-top: 10px;
        padding-left: 1px;
        font-weight: $font-weight-regular;
    }
    h3 {
        font-size: $h3-font-size;
        font-weight: $font-weight-medium;
        padding-top: 10px;
        padding-bottom: 5px;
    }
    p {
        padding-top: 5px;
        padding-left: 1px;
        font-weight: $font-weight-medium;
    }
    .info {
        position: absolute;
        right: 20px;
        bottom: 10px;
        border: 0;
        padding: 5px 10px;
        background-color: $primary;
        color: #fff;
        font-weight: bold;
        border-radius: 5px;
        cursor: pointer;
    }
}

.highlight span {
    color: $primary;
}
</style>
