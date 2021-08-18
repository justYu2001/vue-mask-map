<template>
    <div id="mapid" class="map"></div>
</template>

<script>
import L from "leaflet";
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex';

export default {
    name: "Map",
    setup() {
        const store = useStore();

        const map = ref({});

        const markers = reactive([]);

        const addMaker = (pharmacy) => {
            const icon = L.icon({
                iconUrl: require("../assets/images/placeholder.png"),
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [8, -40],
            });
            const marker = L.marker([pharmacy.longitude, pharmacy.latitude], {
                icon
            });
            marker.addTo(map.value);
            marker.bindPopup(`<h2 class="popup">${pharmacy.name}</h2>`);
            marker.id = pharmacy.id;
            marker.latitude = pharmacy.latitude;
            marker.longitude = pharmacy.longitude;
            markers.push(marker);
        };

        const clearMarkers = () => {
            map.value.eachLayer((layer) => {
                if(layer instanceof L.Marker){
                    map.value.removeLayer(layer);
                }
            });
            markers.length = 0;
        };

        const tiggerPopup = (id) => {
            const marker = markers.find((marker) => marker.id === id);
            map.value.flyTo(new L.LatLng(marker.longitude, marker.latitude), 15);
            marker.openPopup();
        }

        const currentDistrictInfo = computed(() => store.getters.currentDistrictInfo);
        watch(currentDistrictInfo, (district) => {
            map.value.panTo(new L.LatLng(district.latitude, district.longitude));
        });

        const filteredPharmacies = computed(() => store.getters.filteredPharmacies);
        watch(filteredPharmacies, (pharmacies) => {
            clearMarkers();
            pharmacies.forEach((pharmacy) => addMaker(pharmacy));
        })

        onMounted(() => {
            map.value = L.map("mapid").setView([25.03, 121.55], 14);
            const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
            const attribution =
                '<a href="https://www.openstreetmap.org/" target="_blank">© OpenStreetMap 貢獻者</a>';
            L.tileLayer(url, {
                attribution,
                maxZoom: 18,
            }).addTo(map.value);
        });

        return {
            tiggerPopup,
        }
    },
};
</script>

<style lang="scss">
#mapid {
    flex-grow: 1;
}

.popup{
    font-size: 18px;
}
</style>
