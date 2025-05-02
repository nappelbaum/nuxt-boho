export const useOpen = () => useState<boolean>("open", () => false);
export const useProducts = () => useState<IProduct[]>("products", () => []);
export const useActiveIndex = () => useState<number>("activeIndex", () => 0);
export const useBanks = () => useState<IBank[]>("banks", () => []);

export const useCategories = () => useState<ICategory[]>("categories", () => []);
export const useProduct = () => useState<IProduct>("product");
export const useCategory = () => useState<ICategory>("category");
export const useCategoriesSimple = () => useState<ICategorySimple[]>("categories_simple", () => []);
export const useMainInfo = () => useState<IMainInfo>("main_info");

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

interface ICategorySimple {
  id: number;
  long_name: string;
  slug: string;
  description: string;
}

interface IMainInfo {
  id: number;
  author_name: string;
  slogan: string;
  main_path: string;
  copy_main: string;
  copy_2400: string;
  copy_1600: string;
  copy_1200: string;
  copy_800: string;
}