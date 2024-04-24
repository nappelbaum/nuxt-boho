export const useOpen = () => useState<boolean>("open", () => false);
export const useProducts = () => useState<IProduct[]>("products", () => []);
export const useActiveIndex = () => useState<number>("activeIndex", () => 0);
export const useBanks = () => useState<IBank[]>("banks", () => []);

interface IProduct {
  id: number;
  name: string;
  price: number;
  thumbnailUrl: string;
}

interface IBank {
  id: number;
  bankId: number;
  bankName: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
