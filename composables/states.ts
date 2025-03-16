export const useOpen = () => useState<boolean>("open", () => false);
export const useProducts = () => useState<IProduct[]>("products", () => []);
export const useActiveIndex = () => useState<number>("activeIndex", () => 0);
export const useBanks = () => useState<IBank[]>("banks", () => []);

export const useCategories = () => useState<ICategory[]>("categories", () => []);
export const useProduct = () => useState<IProduct>("product");

interface ICategory {
  id: number;
  long_name: string;
  description: string;
  products: [];
}

interface IProduct {
  id: number;
  name: string;
  description: string;
  images: [];
  sizes: [];
  categories: [];
}

interface IBank {
  id: number;
  bankId: number;
  bankName: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
