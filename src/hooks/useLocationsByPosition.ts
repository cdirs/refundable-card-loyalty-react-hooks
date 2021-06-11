import {GetLocationsByPosition} from '@cll.rest/core';
import {Location} from '@cll.rest/types';
import {useCallback, useEffect, useState} from 'react';

type UseLocationsProp = {
  loadLocations: () => void;
  loading: boolean;
  locations: Location[];
  error: string | undefined;
};

export const useLocations = (initialValue: Location[] = []): UseLocationsProp => {
  const [locations, setLocations] = useState<Location[]>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const updateLocations = (pageNumber: number = 1) => {
    setLoading(true);
    GetLocationsByPosition('', 0, 0)
      .then((res) => setLocations(res))
      .then(() => setLoading(false))
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  };

  const loadLocations = useCallback(updateLocations, []);

  useEffect(() => updateLocations(), []);

  return { loadLocations, loading, locations, error };
};
