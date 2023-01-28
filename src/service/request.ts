export const requestWithErrHandle = async (
    url: string,
    method: 'GET' | 'POST' | 'PUSH' | 'PULL' | 'DELETE' = 'GET',
    body: any = null,
    headers: any = { 'Content-Type': 'application/json' },
    cacheParameters: any,
): Promise<unknown> => {
    try {
        const response = await fetch(url, { method, body, headers, ...cacheParameters });

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();

        return data as Promise<unknown>;
    } catch (e) {
        throw e;
    }
};
