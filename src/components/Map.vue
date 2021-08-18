<template>
    <div id="mapid" class="map"></div>
</template>

<script>
import L from "leaflet";
import { mapGetters } from "vuex";

export default {
    name: "Map",
    data() {
        return {
            map: {},
            markers: [],
        };
    },
    computed: {
        ...mapGetters(["currentDistrictInfo", "filteredPharmacies"]),
    },
    watch: {
        currentDistrictInfo(district) {
            this.map.panTo(new L.LatLng(district.latitude, district.longitude));
        },
        filteredPharmacies(pharmacies) {
            this.clearMarkers();
            pharmacies.forEach((pharmacy) => this.addMaker(pharmacy));
        },
    },
    methods: {
        addMaker(pharmacy) {
            const icon = L.icon({
                iconUrl: require("../assets/images/placeholder.png"),
                iconSize: [40, 40],
                iconAnchor: [12, 41],
                popupAnchor: [8, -40],
            });
            const marker = L.marker([pharmacy.longitude, pharmacy.latitude], {
                icon
            });
            marker.addTo(this.map);
            marker.bindPopup(`<h2 class="popup">${pharmacy.name}</h2>`);
            marker.id = pharmacy.id;
            marker.latitude = pharmacy.latitude;
            marker.longitude = pharmacy.longitude;
            this.markers.push(marker);
        },
        clearMarkers(){
            this.map.eachLayer((layer) => {
                if(layer instanceof L.Marker){
                    this.map.removeLayer(layer);
                }
            });
            this.markers = [];
        },
        tiggerPopup(id){
            const marker = this.markers.find((marker) => marker.id === id);
            this.map.flyTo(new L.LatLng(marker.longitude, marker.latitude), 15);
            marker.openPopup();
        }
    },
    mounted() {
        this.map = L.map("mapid").setView([25.03, 121.55], 14);
        const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        const attribution =
            '<a href="https://www.openstreetmap.org/" target="_blank">© OpenStreetMap 貢獻者</a>';
        L.tileLayer(url, {
            attribution,
            maxZoom: 18,
        }).addTo(this.map);
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
