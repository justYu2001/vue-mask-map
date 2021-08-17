import { createStore } from "vuex";

export default createStore({
    state: {
        currentCity: "臺北市",
        currentDistrict: "",
        location: [],
        pharmacies: [],
        keyword: "",
    },
    getters: {
        cityList(state) {
            return state.location.map((city) => ({
                id: city.id,
                name: city.name,
            }));
        },
        districtList(state) {
            return (
                state.location.find((city) => city.name === state.currentCity)
                    ?.districts || []
            );
        },
        filteredPharmacies(state) {
            const { keyword, pharmacies, currentCity, currentDistrict } = state;
            let filteredPharmacies = pharmacies.filter(
                (pharmacy) =>
                    pharmacy.county === currentCity &&
                    pharmacy.town === currentDistrict
            );
            if (keyword) {
                filteredPharmacies = filteredPharmacies.filter((pharmacy) =>
                    pharmacy.name.includes(keyword)
                );
            }
            return filteredPharmacies;
        },
    },
    mutations: {
        setCurrentCity(state, payload) {
            state.currentCity = payload;
        },
        setCurrentDistrict(state, payload) {
            state.currentDistrict = payload;
        },
        setLocation(state, payload) {
            state.location = payload;
        },
        setPharmacies(state, payload) {
            state.pharmacies = payload;
        },
        setKeyword(state, payload) {
            state.keyword = payload;
        },
    },
    actions: {
        async fetchLocations({ commit }) {
            try {
                const url =
                    "https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json";
                const res = await fetch(url);
                const locations = await res.json();
                commit("setLocation", locations);
            } catch (error) {
                console.log("fetch location error:\n", error);
            }
        },
        async fetchPharmacies({ commit }) {
            try {
                const url =
                    "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json";
                const res = await fetch(url);
                const json = await res.json();
                const pharmacies = json.features.map((pharmacy) => ({
                    ...pharmacy.properties,
                    latitude: pharmacy.geometry.coordinates[0],
                    longitude: pharmacy.geometry.coordinates[1],
                }));
                commit("setPharmacies", pharmacies);
            } catch (error) {
                console.log("fetch pharmacies error:\n", error);
            }
        },
    },
    modules: {},
});
