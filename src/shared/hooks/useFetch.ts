import {useState} from "react";

type Return<T> = {
    data: T | undefined,
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

    const fetch = async (...args: any[]) => {
        setLoading(true)
        clearError()

        try {
            const response = await fetchData(...args)

            if (response.ok)
                setData(await response.json() as T)
            else {
                setError(response.statusText.toString() || 'An error occurred during the request');
            }
        } catch (e: any) {
            setError(e.toString() || 'An error occurred during the request');
        }
        setLoading(false)
    }

    return {data, fetch, loading, error, clearError}
}