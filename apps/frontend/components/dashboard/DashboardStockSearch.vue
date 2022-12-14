<script setup lang="ts">
const props = defineProps<{
  defaultQuery?: string;
}>();

const emits = defineEmits<{
  (e: "do-search", value: string): void;
}>();

const config = useRuntimeConfig();

const query = ref(props.defaultQuery ?? "");
const currentSymbol = ref("");
const list = ref<{ symbol: string; longname?: string; shortname?: string }[]>(
  [],
);

watch(
  () => query.value,
  async () => {
    if (query.value === "" || query.value === currentSymbol.value) {
      list.value = [];
      return;
    }

    list.value = await $fetch<
      { symbol: string; longname?: string; shortname?: string }[]
    >(`${config.public.apiBaseUrl}/search`, {
      params: { query: query.value },
    });
  },
);

function doSearch(symbol: string) {
  currentSymbol.value = symbol;
  query.value = symbol;
  emits("do-search", symbol);
  list.value = [];
}
</script>

<template>
  <div class="search-box">
    <form>
      <input
        v-model="query"
        type="text"
        placeholder="Search for symbol"
        @keypress.enter.prevent="
          () => {
            if (list.length > 0) doSearch(list[0].symbol);
          }
        "
      />
      <div>
        <ul>
          <li v-for="item in list" @click="doSearch(item.symbol)">
            <div class="symbol">{{ item.symbol }}</div>
            <div class="company-name">
              {{ item.longname ?? item.shortname }}
            </div>
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<style scoped>
.search-box {
  display: flex;
  height: 3rem;
  width: 32rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

.search-box > form {
  width: 100%;
  height: 100%;
}

.search-box > form > input {
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
}

.search-box > form > input:focus {
  outline: 1px solid #ddd;
}

.search-box > form > div > ul {
  margin-top: 5px;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.search-box > form > div > ul > li {
  display: flex;
  list-style: none;
  max-width: 100%;
  padding: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}

.search-box > form > div > ul > li:hover {
  background-color: cornsilk;
}

.search-box > form > div > ul > li > div {
  display: inline-block;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.symbol {
  width: 6rem;
  margin-right: 1rem;
  font-weight: bold;
}
</style>
