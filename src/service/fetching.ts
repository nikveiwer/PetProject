import { useHttp } from './request';

import {
    IAuthAPI,
    IAnimals,
    IPetInformation,
    IPetCard,
    IFilters,
    isAuthData,
} from '../types/types';

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
        ...paramsAndValues: (string | boolean)[][]
    ): Promise<unknown> => {
        let paramsPath: string = '';

        if (paramsAndValues && paramsAndValues[0].length === 1) {
            paramsPath = '/' + paramsAndValues[0][0];
        } else if (paramsAndValues) {
            paramsPath =
                '?' +
                paramsAndValues
                    .map((item) => {
                        return item.join('=');
                    })
                    .join('&');
        }

        console.log(`https://api.petfinder.com/v2/${action || category}${paramsPath}`);

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

    const getFilters = async (accsessToken: string) => {
        const data = await requestWithErrHandle(
            `https://api.petfinder.com/v2/types`,
            'GET',
            null,
            {
                Authorization: `Bearer ${accsessToken}`,
            },
            { cache: 'no-store' },
        );

        return data;
    };

    const getBreeds = async (accsessToken: string, type: string) => {
        const data = await requestWithErrHandle(
            `https://api.petfinder.com/v2/types/${type.slice(0, -1)}/breeds`,
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
            name: animal.name.length > 9 ? animal.name.slice(0, 9) + '...' : animal.name,
            imagePath: animal.primary_photo_cropped?.full ? animal.primary_photo_cropped.full : '',
            likedInfo: `${animal.age}, ${animal.gender}`, 
            breed: animal.breeds.primary,
            petLink: animal.url
        };
    };

    const _tranformToPetInformation = (animal: any): IPetInformation => {
        return {
            name: animal.name,
            photos:
                animal.photos?.length > 0
                    ? animal.photos.map((item: any) => {
                          return {
                              url: item.full,
                          };
                      })
                    : null,
            breed: animal.breeds.primary,
            location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
            characteristics: `${animal.age}, ${animal.gender}, ${animal.size}, ${animal.colors.primary}`,
            specificity: animal.tags.length !== 0 ? animal.tags.join(', ') : "There is no information yet",
            'house trained': animal.attributes.house_trained ? 'Yes' : 'No',
            helth: 'Vacination up to date',
            'good in a home with': `Other ${Object.entries(animal.environment)
                .filter((item) => item[1] === true)
                .map((item) => item[0])
                .join(', ')}`,
            description: animal.description,
            petLink: animal.url,
        };
    };

    const _transformToFilters = (reqFil: any, reqBreeds: any,): IFilters => {
        return {
            // sort: ["random", "recent", "-recent"],

            breed: reqBreeds.breeds.map((item: any) => {
                return item.name;
            }),
            age: ['baby', 'young', 'adult', 'senior'],
            size: ['small', 'medium', 'large', 'xlarge'],
            gender: reqFil.genders,
            good_with: ['children', 'cats', 'dogs'],
            coat: reqFil.coats,
            color: reqFil.colors.filter((item: any) => !item.includes('&')),
        };
    };

    return {
        status,
        setStatus,
        getAuthData,
        getPets,
        getFilters,
        getBreeds,
        _tranformToPetCard,
        _tranformToPetInformation,
        _transformToFilters,
    };
};
