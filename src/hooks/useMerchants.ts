import {GetMerchants} from '@cll.rest/core';
import {Merchant} from '@cll.rest/types';
import {useCallback, useEffect, useState} from 'react';

type UseMerchantsProp = {
  loadMerchants: () => void;
  loading: boolean;
  merchants: Merchant[];
  error: string | undefined;
};

export const useMerchants = (apikey: string, initialValue: Merchant[] = []): UseMerchantsProp => {
  const [merchants, setMerchants] = useState<Merchant[]>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const updateMerchants = (pageNumber: number = 1) => {
    setLoading(true);
    GetMerchants(apikey)
      .then((res) => setMerchants(res))
      .then(() => setLoading(false))
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  };

  const loadMerchants = useCallback(updateMerchants, []);

  useEffect(() => updateMerchants(), []);

  return { loadMerchants, loading, merchants, error };
};
