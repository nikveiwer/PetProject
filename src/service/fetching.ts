import { requestWithErrHandle } from './request';

import { IAuthAPI } from '../types/types';

const _API_KEY = 'rZUxT0Vf6i2o7KrrtdmKXlv7nad2RsR0Uk0B5EypuD4mUHJwYF';
const _SECRET_KEY = 'eFRSGaA4vax0Ee3fVGkgwSD4X5mIupR1e5HPfyN3';

export const getAuthData = async (): Promise<IAuthAPI> => {
    function isAuthData(data: unknown): data is IAuthAPI {
        if (data && typeof data === 'object') {
            return 'access_token' in data;
        }

        return false;
    }

    const data = await requestWithErrHandle(
        'https://api.petfinder.com/v2/oauth2/token',
        'POST',
        `grant_type=client_credentials&client_id=${_API_KEY}&client_secret=${_SECRET_KEY}`,
        {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        { cache: 'no-store' },
    );

    if (isAuthData(data)) {
        return data;
    } else {
        throw new Error('something went wrong with API authorization');
    }
};
