import { useState, useEffect, useCallback } from 'react';
import { getMemberSameBookApi } from '../../../../../commons/api/member.api';
import { TFilterKeys, TFilterState } from '../../../HomeStack.types';
import { filterOptions } from '../../../HomeStack.constants';

export const useFetchMembersSameBook = (filter: TFilterState) => {
  const [data, setData] = useState([]);

  const fetchMembersSameBook = useCallback(async () => {
    const params = Object.keys(filter).reduce(
      (acc, key) => {
        const filterKey = key as TFilterKeys;
        const option = filterOptions[filterKey].find((option) => option.label === filter[filterKey]);
        if (option) {
          acc[key] = option.value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    try {
      const response = await getMemberSameBookApi({ params });
      setData(response?.result.content ?? []);
    } catch (error) {
      console.error('error', error);
    }
  }, [filter]);

  useEffect(() => {
    fetchMembersSameBook();
  }, [fetchMembersSameBook]);

  return { data };
};
