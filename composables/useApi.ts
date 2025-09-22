import type { Product, ProductInput } from "~/types/product";

export interface ImportResult {
  imported: number;
  errors?: string[];
  duplicates?: string[];
}

export const useApi = () => {
  const config = useRuntimeConfig();
  const base = config.public.apiBase || "http://localhost:3001";

  const getProducts = async (params?: {
    search?: string;
    brand?: string;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
  }): Promise<Product[]> => {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.brand) query.set("brand", params.brand);
    if (params?.sortBy) query.set("sortBy", params.sortBy);
    if (params?.sortOrder) query.set("sortOrder", params.sortOrder);

    const queryString = query.toString();
    const url = queryString
      ? `${base}/products?${queryString}`
      : `${base}/products`;
    return await $fetch<Product[]>(url);
  };

  const getProduct = async (id: string | number): Promise<Product> => {
    return await $fetch<Product>(`${base}/products/${id}`);
  };

  const createProduct = async (data: ProductInput): Promise<Product> => {
    return await $fetch<Product>(`${base}/products`, {
      method: "POST",
      body: data,
    });
  };

  const updateProduct = async (
    id: string | number,
    data: Partial<ProductInput>
  ): Promise<Product> => {
    return await $fetch<Product>(`${base}/products/${id}`, {
      method: "PUT",
      body: data,
    });
  };

  const clearProducts = async () => {
    await $fetch(`${base}/products/clear`, {
      method: "DELETE",
    });
  };

  const deleteProduct = async (
    id: string | number
  ): Promise<{ message: string }> => {
    return await $fetch<{ message: string }>(`${base}/products/${id}`, {
      method: "DELETE",
    });
  };

  const importByUrl = async (url: string): Promise<ImportResult> => {
    return await $fetch<ImportResult>(`${base}/import`, {
      method: "POST",
      body: { url },
    });
  };

  const importFile = async (file: File): Promise<ImportResult> => {
    const formData = new FormData();
    formData.append("file", file);
    return await $fetch<ImportResult>(`${base}/import`, {
      method: "POST",
      body: formData,
    });
  };

  return {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    clearProducts,
    importByUrl,
    importFile,
  };
};
