import {GetBrands} from '@cll.rest/core';
import {Brand} from '@cll.rest/types';
import {useCallback, useEffect, useState} from 'react';

type UseBrandsProp = {
  loadBrands: () => void;
  loading: boolean;
  brands: Brand[];
  error: string | undefined;
};

export const useBrands = (initialValue: Brand[] = []): UseBrandsProp => {
  const [brands, setBrands] = useState<Brand[]>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const updateBrands = (pageNumber: number = 1) => {
    setLoading(true);
    GetBrands('')
      .then((res) => setBrands(res))
      .then(() => setLoading(false))
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  };

  const loadBrands = useCallback(updateBrands, []);

  useEffect(() => updateBrands(), []);

  return { loadBrands, loading, brands, error };
};
