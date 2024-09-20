import { getVersionApi } from '@commons/api/setting/setting.api';
import { storeUrls } from '@commons/contents/storeUrl/storeUrl';
import { useEffect, useState } from 'react';
import { ISettingData } from '../../../../screens/Setting/screens/Setting/Setting.types';
import { initDataState } from '../../../../screens/Setting/screens/Setting/contents/initDataState';

export const useGetLatestVersion = () => {
  const [data, setData] = useState<ISettingData>(initDataState);
  const { googlePlayStoreUrl, appStoreUrl } = storeUrls;
  const getLatestVersion = async () => {
    try {
      const response = await getVersionApi();

      const { version } = response.result ?? {};
      setData({
        version: version ?? '',
        googlePlayStoreUrl,
        appStoreUrl,
      });
    } catch {
      setData({
        version: '',
        googlePlayStoreUrl,
        appStoreUrl,
      });
    }
  };

  useEffect(() => {
    getLatestVersion();
  }, []);

  return { data };
};
