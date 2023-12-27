import {useCallback, useEffect, useState} from "react";

type Return<T> = {
    data?: T,
    fetch: (...args: any[]) => Promise<void>,
    loading: boolean,
    error: string,
    clearError?: () => void
}

export const useFetch = <T>(fetchData: (...args: any[]) => Promise<Response>): Return<T> => {
    const [data, setData] = useState<T>()
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const clearError = () => setError('')

    const fetch = useCallback(async (...args: any[]) => {
        setLoading(true)
        clearError()

        try {
            const response = await fetchData(...args)

            if (response.ok) {
                const resp = await response.json();
                setData(resp)
            }
            else {
                setError(response.statusText.toString() || 'An error occurred during the request');
            }
        } catch (e: any) {
            setError(e.toString() || 'An error occurred during the request');
        }
        setLoading(false)
    }, [fetchData]);

    return {data, fetch, loading, error, clearError}
}