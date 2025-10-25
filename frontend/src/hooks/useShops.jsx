import { useState, useEffect } from 'react';
import { shopService } from '../services/shopService';

export const useShops = (category = null) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        let data;
        if (category) {
          data = await shopService.getShopsByCategory(category);
        } else {
          data = await shopService.getAllShops();
        }
        setShops(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [category]);

  return { shops, loading, error };
};

