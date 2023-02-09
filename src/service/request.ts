


import { useState, useCallback } from "react";

type StatusType = "idle" | "loading" | "error";


export const useHttp = () => {

    const [status, setStatus] = useState<StatusType>("idle");

    const requestWithErrHandle = useCallback(async (
        url: string,
        method: 'GET' | 'POST' | 'PUSH' | 'PULL' | 'DELETE' = 'GET',
        body: any = null,
        headers: any = { 'Content-Type': 'application/json' },
        cacheParameters: any,
    ): Promise<unknown> => {

        setStatus("loading");

        try {
            const response = await fetch(url, { method, body, headers, ...cacheParameters });
    
            if (!response.ok) {
                throw new Error(`Ohhh, my apologize, could not fetch ${url}, status: ${response.status}`);
            }
    
            const data = await response.json();

            setStatus("idle");
    
            return data as Promise<unknown>;
        } catch (e) {

            setStatus("error");
            throw e;
        }
    }, [])

    return { status, setStatus, requestWithErrHandle };
}


// export const usHttp = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const request = useCallback(async (url, method = "GET", body = null, headers = {"Content-Type": "application/json"}) => {

//         setLoading(true);

//         try {
//             const response = await fetch(url, {method, body, headers});

//             if (!response.ok) {
//                 throw new Error(`Could not fetch ${url}, status: ${response.status}`)
//             }

//             const data = await response.json();

//             setLoading(false);
//             return data;

//         } catch(e) {

//             setLoading(false);
//             setError(e.massage);
//             throw e;

//         }

//     }, [])

//     const clearError = useCallback(() => setError(null), []);

//     return {loading, error, request, clearError}

// }

    