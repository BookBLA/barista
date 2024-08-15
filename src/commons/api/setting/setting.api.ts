import { Get } from '@commons/configs/axios/http.api';

export const getVersionApi = () => Get('settings/versions');
