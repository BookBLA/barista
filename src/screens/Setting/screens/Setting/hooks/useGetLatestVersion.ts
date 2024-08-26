import { getVersionApi } from '@commons/api/setting/setting.api';
import { storeUrls } from '@commons/contents/storeUrl/storeUrl';
import { useEffect, useState } from 'react';
import { ISettingData } from '../Setting.types';
import { initDataState } from '../contents/initDataState';

export const useGetLatestVersion = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ISettingData>(initDataState);
  const getLatestVersion = async () => {
    const response = await getVersionApi();
    const { googlePlayStoreUrl, appStoreUrl } = storeUrls;
    const { version } = response.result ?? {};
    setData({
      version: version ?? '0.0.0',
      googlePlayStoreUrl,
      appStoreUrl,
    });
    setLoading(false);
  };

  useEffect(() => {
    getLatestVersion();
  }, []);

  return { data, loading };
};
