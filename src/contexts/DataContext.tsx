import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, SiteSettings } from '../types';
import { getProducts } from '../services/products';
import { getSiteSettings } from '../services/siteSettings';

type DataContextType = {
  products: Product[];
  siteSettings: SiteSettings | null;
  loading: boolean;
  error: string | null;
  refetchProducts: () => Promise<void>;
  refetchSiteSettings: () => Promise<void>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

type DataProviderProps = {
  children: ReactNode;
};

export const DataProvider = ({ children }: DataProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    }
  };

  const fetchSiteSettings = async () => {
    try {
      const data = await getSiteSettings();
      setSiteSettings(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch site settings');
    }
  };

  const refetchProducts = async () => {
    setLoading(true);
    await fetchProducts();
    setLoading(false);
  };

  const refetchSiteSettings = async () => {
    setLoading(true);
    await fetchSiteSettings();
    setLoading(false);
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchSiteSettings()]);
      setLoading(false);
    };

    initializeData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        products,
        siteSettings,
        loading,
        error,
        refetchProducts,
        refetchSiteSettings,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
