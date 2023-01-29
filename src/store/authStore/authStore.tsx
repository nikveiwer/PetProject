import { makeAutoObservable } from "mobx";

import { createContext, useContext } from "react";

import {IAuthAPI} from "../../types/types"


export default class AuthStore {
    constructor() {
        makeAutoObservable(this);
    }

    accessToken: string = "";
    accessTimeLeft: number = 0;

    setAPIAuthData = ({ access_token, expires_in}: IAuthAPI) => {
        this.accessToken = access_token;
        this.accessTimeLeft = expires_in;
    }

}

export const AuthStoreContext = createContext<AuthStore>(null as  unknown as AuthStore)

export const useAuthStore = () => useContext(AuthStoreContext);