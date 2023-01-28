import { getAuthData } from '../../service/fetching';

export const ViewedPets = async () => {
    const authorizedData = await getAuthData();

    console.log(authorizedData);

    return (
        <div className=" pt-9">
            <h2>{authorizedData.token_type}</h2>
            <h2>{authorizedData.expires_in}</h2>
            <h2>{authorizedData.access_token}</h2>
        </div>
    );
};
