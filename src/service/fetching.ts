import { useHttp } from './request';

import { IAuthAPI, IAnimals, isAuthData } from '../types/types';

import { IPetCard } from '../types/types';

export const PetsFetching = () => {
    const _API_KEY = 'rZUxT0Vf6i2o7KrrtdmKXlv7nad2RsR0Uk0B5EypuD4mUHJwYF';
    const _SECRET_KEY = 'eFRSGaA4vax0Ee3fVGkgwSD4X5mIupR1e5HPfyN3';

    const { status, setStatus, requestWithErrHandle } = useHttp();

    const getAuthData = async (): Promise<IAuthAPI> => {
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
            throw new Error('Authorization data does not match');
        }
    };

    const getPets = async (
        category: string = 'animals',
        action: string = '',
        accsessToken: string,
        ...paramsAndValues: string[][]
    ): Promise<unknown> => {
        let paramsPath: string = '';

        if (paramsAndValues[0].length === 1) {
            paramsPath = '/' + paramsAndValues[0][0];
        } else {
            paramsPath =
                '?' +
                paramsAndValues
                    .map((item) => {
                        return item.join('=');
                    })
                    .join('&');
        }

        const data = await requestWithErrHandle(
            `https://api.petfinder.com/v2/${action || category}${paramsPath}`,
            'GET',
            null,
            {
                Authorization: `Bearer ${accsessToken}`,
            },
            { cache: 'no-store' },
        );

        return data;
    };

    const _tranformToPetCard = (animal: any): IPetCard => {
        return {
            id: animal.id,
            name: animal.name.length > 9 ? animal.breeds?.primary : animal.name,
            imagePath: animal.primary_photo_cropped?.full ? animal.primary_photo_cropped.full : '',
        };
    };

    return { status, setStatus, getAuthData, getPets, _tranformToPetCard };
};
