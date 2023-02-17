export interface IAuthAPI {
    token_type: string;
    expires_in: number;
    access_token: string;
}

export interface IAnimals {
    animals: any[];
    pagination: object;
}

export interface IAnimal {
    animal: object;
}

export type Photos = {
    url: string;
};

export interface IPetInformation {
    name: string;
    photos: Photos[] | null;
    breed: string;
    location: string;
    characteristics: string;
    'house trained': string;
    helth: string;
    'good in a home with': string;
    description: string;
    petLink: string
}

export interface IPetCard {
    id: number;
    name: string;
    imagePath: string;
}

export function isAuthData(data: unknown): data is IAuthAPI {
    if (data && typeof data === 'object') {
        return 'access_token' in data;
    }

    return false;
}

export function isAnimals(data: unknown): data is IAnimals {
    if (data && typeof data === 'object') {
        return 'animals' in data;
    }

    return false;
}

export function isAnimal(data: unknown): data is IAnimal {
    if (data && typeof data === 'object') {
        return 'animal' in data;
    }

    return false;
}
