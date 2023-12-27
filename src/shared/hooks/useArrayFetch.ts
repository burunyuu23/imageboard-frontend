import {useCallback, useEffect, useState} from "react";

type Return<T> = {
    data: {response?: T, arrayData?: T[]},
    fetch: (...args: any[]) => Promise<void>,
    loading: boolean,
    error: string,
    clearError?: () => void
}

export const useFetch = <T>(fetchData: (...args: any[]) => Promise<Response>, arrayProperty?: string): Return<T> => {
    const [response, setResponse] = useState<T>()
    const [arrayData, setArrayData] = useState<T[] | undefined>(arrayProperty ? [] : undefined)
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
                if (arrayProperty)
                    setArrayData(prevState => prevState!.concat(...resp[arrayProperty]))
                setResponse(resp)
                console.log(response)
                console.log(arrayData)
            }
            else {
                setError(response.statusText.toString() || 'An error occurred during the request');
            }
        } catch (e: any) {
            setError(e.toString() || 'An error occurred during the request');
        }
        setLoading(false)
    }, [fetchData]);

    return {data: {response, arrayData}, fetch, loading, error, clearError}
}