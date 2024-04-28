import { useState, useEffect, useCallback } from 'react';
import { getMemberSameBookApi } from '../../../../../commons/api/member.api';
import { TFilterKeys, TFilterState } from '../../../HomeStack.types';
import { filterOptions } from '../../../HomeStack.constants';

export const useFetchMembersSameBook = (filter: TFilterState) => {
  const [data, setData] = useState([]);

  // TODO: 성진 - 페이지 처리 예정
  const fetchMembersSameBook = useCallback(async () => {
    const params: Record<string, string> = {};

    for (const key of Object.keys(filter)) {
      const filterKey = key as TFilterKeys;
      const option = filterOptions[filterKey].find((option) => option.label === filter[filterKey]);

      if (option && option.value && option.value !== '전체') {
        params[key] = option.value;
      }
    }

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
