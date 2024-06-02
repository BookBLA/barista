import { useState, useEffect, useCallback } from 'react';
import { getMemberAllOtherMembersApi } from '../../../../../commons/api/member.api';
import { IDdata, TFilterKeys, TFilterState } from '../../../HomeStack.types';
import { filterOptions } from '../../../HomeStack.constants';

export const useFetchAllMembers = (filter: TFilterState) => {
  const [data, setData] = useState<IDdata[]>([]);
  const [page, setPage] = useState(0);

  const fetchAllMembersBook = useCallback(async () => {
    const params: Record<string, string> = { page: String(page) };

    for (const key of Object.keys(filter)) {
      const filterKey = key as TFilterKeys;
      const option = filterOptions[filterKey].find((option) => option.label === filter[filterKey]);

      if (option && option.value && option.value !== '전체') {
        params[key] = option.value;
      }
    }

    try {
      const response = await getMemberAllOtherMembersApi({ params });
      setData((prev) => [...prev, ...(response?.result.content ?? [])]);
    } catch (error) {
      console.error('error', error);
    }
  }, [filter, page]);

  useEffect(() => {
    setPage(0);
    setData([]);
  }, [filter]);

  useEffect(() => {
    fetchAllMembersBook();
  }, [page]);

  return { data, setPage, setData };
};
