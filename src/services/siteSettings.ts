import { supabase } from '../lib/supabase';
import { SiteSettings } from '../types';

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('Site settings not found');
  }

  return data;
};