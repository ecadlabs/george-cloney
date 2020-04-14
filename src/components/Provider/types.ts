export interface ProviderProps {
  updateProvider: (e: React.ChangeEvent<HTMLInputElement>) => void;
  provider: string;
  loading: boolean;
}
