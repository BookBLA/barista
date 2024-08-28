import { Get } from '@commons/configs/axios/http.api';
import { VersionReadResponse } from '@commons/types/openapiGenerator';

export const getVersionApi = () => Get<VersionReadResponse>('settings/versions');
