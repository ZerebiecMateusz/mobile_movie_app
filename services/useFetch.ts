import { useState, useEffect, useCallback } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch: boolean = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    // Owijamy w useCallback, aby uniknąć nieskończonych pętli, 
    // gdybyśmy użyli refetch jako zależności w innym useEffect
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An error occurred'));
        } finally {
            setLoading(false);
        }
    }, [fetchFunction]);

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    };

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
        // Pusta tablica zależności sprawi, że autoFetch zadziała tylko raz (mount)
    }, [autoFetch, fetchData]); 

    return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;