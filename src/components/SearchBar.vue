<template>
    <label :class="[$style.search, { [$style.active]: isFocus }]" @click="isFocus = true">
        <input
            :class="$style.input"
            ref="input"
            type="text"
            placeholder="關鍵字搜尋"
            v-model="keyword"
            @blur="isFocus = false"
        />
        <svg :class="$style['search-icon']">
            <use xlink:href="#search" />
        </svg>
    </label>
</template>

<script>
export default {
    name: "SearchBar",
    data() {
        return {
            isFocus: false,
        }
    },
    computed: {
        keyword:{
            get(){
                return this.$store.state.keyword;
            },
            set(val){
                this.$store.commit("setKeyword", val);
            }
        }
    },
};
</script>

<style module lang="scss">
.search {
    border: 1px solid $gray;
    border-radius: 30px;
    padding-left: 20px;
    padding-right: 10px;
    padding-top: 9px;
    padding-bottom: 7px;
    display: flex;
    cursor: text;
}

.active {
    &.search {
        border-color: $primary;
    }
    .search-icon {
        fill: $primary;
    }
}

.input {
    border: 0;
    flex-grow: 1;
    padding: 0;
    font-size: $input-font-size;
    height: $input-font-size;
    &:focus {
        outline: 0;
    }
}

.search-icon {
    width: 18px;
    height: 18px;
    fill: $gray;
    margin-top: -1px;
}
</style>
