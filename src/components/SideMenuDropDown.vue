<template>
    <div :class="[$style.dropdown, { [$style.active]: isShow }]">
        <button
            :class="$style['dropdown-toggle']"
            @click.stop="isShow = !isShow"
        >
            {{ currentOption }}
        </button>
        <svg :class="$style['chevron-up-icon']" v-if="isShow">
            <use xlink:href="#chevron-up" />
        </svg>
        <svg :class="$style['chevron-down-icon']" v-else>
            <use xlink:href="#chevron-down" />
        </svg>
        <ul :class="$style['dropdown-menu']" v-show="isShow">
            <li
                :class="$style['dropdown-item']"
                v-for="option in options"
                :key="option.id"
                @click="updateOption(option.name)"
            >
                {{ option.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import "@/assets/images/chevron-up.svg";
import "@/assets/images/chevron-down.svg";

export default {
    name: "SideMenuDropDown",
    data() {
        return {
            isShow: false,
        };
    },
    props: {
        currentOption: String,
        options: Array,
    },
    emits: ["updateOption"],
    methods: {
        closeDropdown() {
            this.isShow = false;
        },
        updateOption(option) {
            this.$emit("updateOption", option);
            this.closeDropdown();
        },
    },
    mounted() {
        document.addEventListener("click", () => {
            this.closeDropdown();
        }, true);
    },
};
</script>

<style module lang="scss">
.dropdown {
    border: 1px solid $gray;
    border-radius: 5px;
    position: relative;
    margin: 0 20px;
    .chevron-up-icon,
    .chevron-down-icon {
        position: absolute;
        pointer-events: none;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
    }
}

.active {
    border-color: $primary;
}

.dropdown-toggle {
    background-color: transparent;
    font-size: $btn-font-size;
    border: 0;
    padding: 5px 10px;
    width: 134px;
    text-align: start;
    cursor: pointer;
    &:focus {
        outline: 0;
    }
}

.dropdown-menu {
    position: absolute;
    top: 39px;
    height: 220px;
    z-index: 1;
    overflow-y: scroll;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    @include custom-scrollbar;
}

.dropdown-item {
    padding: 10px 20px;
    background-color: #fff;
    cursor: pointer;
    &:hover {
        background-color: #eee;
    }
}
</style>
