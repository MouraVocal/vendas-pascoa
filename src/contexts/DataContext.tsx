import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, SiteSettings } from '../types';
import { getProducts } from '../services/products';
import { getSiteSettings } from '../services/siteSettings';
import { supabase } from '../lib/supabase';

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

    // Subscribe to products changes
    const productsSubscription = supabase
      .channel('products_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'products',
        },
        payload => {
          setProducts(currentProducts => [...currentProducts, payload.new as Product]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'products',
        },
        payload => {
          setProducts(currentProducts =>
            currentProducts.map(product =>
              product.id === payload.new.id ? (payload.new as Product) : product
            )
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'products',
        },
        payload => {
          setProducts(currentProducts =>
            currentProducts.filter(product => product.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    // Subscribe to site settings changes
    const siteSettingsSubscription = supabase
      .channel('site_settings_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'site_settings',
        },
        async payload => {
          setSiteSettings(payload.new as SiteSettings);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'site_settings',
        },
        async payload => {
          setSiteSettings(payload.new as SiteSettings);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'site_settings',
        },
        async () => {
          setSiteSettings(null);
        }
      )
      .subscribe();

    return () => {
      productsSubscription.unsubscribe();
      siteSettingsSubscription.unsubscribe();
    };
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
