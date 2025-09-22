import { ref, computed, onMounted, watch } from "vue";
import type { Product } from "~/types/product";
import { useApi } from "./useApi";

export const useProducts = () => {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const searchQuery = ref("");
  const selectedBrand = ref("");
  const error = ref<string | null>(null);
  const sortBy = ref<string>("createdAt");
  const sortOrder = ref<"ASC" | "DESC">("DESC");

  const { getProducts, clearProducts: clearProductsApi } = useApi();

  const debouncedSearch = ref("");
  let searchTimeout: NodeJS.Timeout;

  const loadProducts = async (params?: {
    search?: string;
    brand?: string;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
  }) => {
    loading.value = true;
    error.value = null;
    try {
      products.value = await getProducts({
        search: params?.search,
        brand: params?.brand,
        sortBy: params?.sortBy ?? sortBy.value,
        sortOrder: params?.sortOrder ?? sortOrder.value,
      });
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Ошибка загрузки продуктов";
    } finally {
      loading.value = false;
    }
  };

  const changeSort = (column: string) => {
    if (sortBy.value === column) {
      sortOrder.value = sortOrder.value === "ASC" ? "DESC" : "ASC";
    } else {
      sortBy.value = column;
      sortOrder.value = "ASC";
    }
    loadProducts({
      search: debouncedSearch.value,
      brand: selectedBrand.value,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value,
    });
  };

  const brands = computed(() => {
    const allBrands = products.value
      .map((p) => p.brand)
      .filter(Boolean) as string[];
    return [...new Set(allBrands)].sort();
  });

  const filteredProducts = computed(() => {
    let filtered = products.value;
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.article.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q))
      );
    }
    if (selectedBrand.value)
      filtered = filtered.filter((p) => p.brand === selectedBrand.value);
    return filtered;
  });

  watch(searchQuery, (newValue) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      debouncedSearch.value = newValue;
    }, 500);
  });

  watch([debouncedSearch, selectedBrand], ([search, brand]) => {
    loadProducts({
      search,
      brand,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value,
    });
  });

  const refresh = () => {
    loadProducts({
      search: debouncedSearch.value,
      brand: selectedBrand.value,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value,
    });
  };

  onMounted(() => {
    loadProducts();
  });

  const clearProducts = async () => {
    await clearProductsApi();
    products.value = [];
    refresh();
  };

  return {
    products,
    filteredProducts,
    loading,
    error,
    searchQuery,
    selectedBrand,
    brands,
    loadProducts,
    clearProducts,
    refresh,
    sortBy,
    sortOrder,
    changeSort,
  };
};
