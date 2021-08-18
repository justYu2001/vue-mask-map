<template>
    <transition name="modal" v-show="modalShow">
        <div :class="$style['modeal-mask']">
            <div
                :class="$style['modal-container']"
                @click.self="modalShow = false"
            >
                <transition name="body" v-show="modalShow">
                    <div :class="$style['modal-body']">
                        <h2>{{ currentPharmacy?.name }}</h2>
                        <h3>營業時間</h3>
                        <table :class="$style.table">
                            <thead>
                                <tr>
                                    <th :class="$style.time"></th>
                                    <th :class="$style.time">一</th>
                                    <th :class="$style.time">二</th>
                                    <th :class="$style.time">三</th>
                                    <th :class="$style.time">四</th>
                                    <th :class="$style.time">五</th>
                                    <th :class="$style.time">六</th>
                                    <th :class="$style.time">日</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td :class="$style.time">早上</td>
                                    <td
                                        :class="$style.cell"
                                        v-for="isOpen in servicePeriods[0]"
                                    >
                                        <div v-show="isOpen">
                                            <svg :class="$style['check-icon']">
                                                <use xlink:href="#check" />
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td :class="$style.time">中午</td>
                                    <td
                                        :class="$style.cell"
                                        v-for="isOpen in servicePeriods[1]"
                                    >
                                        <div v-show="isOpen">
                                            <svg :class="$style['check-icon']">
                                                <use xlink:href="#check" />
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td :class="$style.time">晚上</td>
                                    <td
                                        :class="$style.cell"
                                        v-for="isOpen in servicePeriods[2]"
                                    >
                                        <div v-show="isOpen">
                                            <svg :class="$style['check-icon']">
                                                <use xlink:href="#check" />
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p>地址: {{ currentPharmacy?.address }}</p>
                        <p>
                            電話:
                            <a :href="phoneLink">{{
                                currentPharmacy?.phone
                            }}</a>
                        </p>
                        <p v-if="currentPharmacy?.['custom_note']">
                            備註:
                            {{ currentPharmacy["custom_note"] }}
                        </p>
                    </div>
                </transition>
            </div>
        </div>
    </transition>
</template>

<script>
import "@/assets/images/check.svg";

import { ref, computed } from 'vue'
import { useStore } from 'vuex';

export default {
    name: "LightBox",
    setup() {
        const store = useStore();

        const modalShow = computed({
            get: () => store.state.modalShow,
            set: (val) => store.commit("setModalShow", val),
        });

        const currentPharmacy = computed(() => {
            const { pharmacies, infoBoxPharmacyId } = store.state;
            return pharmacies.find(
                (pharmacy) => pharmacy.id === infoBoxPharmacyId
            );
        });

        const servicePeriods = computed(() => {
            let servicePeriods = currentPharmacy.value?.["service_periods"] || "";
            servicePeriods = [...servicePeriods].map((symbol) =>
                symbol === "N" ? true : false
            );
            return [
                servicePeriods.slice(0, 7),
                servicePeriods.slice(7, 14),
                servicePeriods.slice(14, 21),
            ];
        });

        const phoneLink = computed(() => {
            let phone = currentPharmacy.value?.phone || "";
            const firstZeroIndex = phone.indexOf("0");
            const rightBrackerIndex = phone.indexOf(")");
            const areaCode = phone.slice(firstZeroIndex + 1, rightBrackerIndex);
            return `tel:+886-${areaCode}-${phone.slice(rightBrackerIndex + 1)}`;
        });

        return{
            modalShow,
            currentPharmacy,
            servicePeriods,
            phoneLink,
        }
    },
};
</script>

<style module lang="scss">
.modeal-mask {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 2000;
}

.modal-container {
    width: 100%;
    height: 100%;
    background-color: rgba(33, 33, 33, 0.46);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-body {
    width: 1200px;
    height: 700px;
    background-color: #fff;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
        0 1px 5px 0 rgb(0 0 0 / 12%);
    border-radius: 10px;
    padding: 20px;
    h2 {
        font-size: $h2-font-size;
        font-weight: $font-weight-medium;
        padding: 20px 0;
        border-bottom: 1px solid $gray;
    }
    h3,
    p {
        font-size: $h3-font-size;
        margin: 20px 0;
    }

    a{
        color: #000;
        text-decoration: none;
        &:hover{
            text-decoration: underline;
        }
    }
}

.table {
    color: #fff;
    .time {
        background-color: $primary;
        width: 150px;
        text-align: center;
        padding: 20px 0;
    }
    td,
    th {
        border-right: 1px solid $gray;
        border-bottom: 1px solid $gray;
        position: relative;
    }

    div {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        width: 24px;
        height: 24px;
        background-color: $primary;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.check-icon {
    width: 18px;
    height: 18px;
    fill: #fff;
}
</style>

<style lang="scss">
.body-enter-from,
.body-leave-to {
    transform: scale(0);
}

.body-leave-from,
.body-enter-to {
    transform: scale(1);
}

.body-leave-active,
.body-enter-active {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-leave-from,
.modal-enter-to {
    opacity: 1;
}

.modal-leave-active,
.modal-enter-active {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>
