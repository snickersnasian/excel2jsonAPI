import { useState } from "react"
import type { Nullable } from "../types/generics"

 
export default function useFetch(url: string) {
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState<Nullable<{[key: string]: string}>>(null)
    const [error, setError] = useState<Nullable<{[key: string]: string}>>(null)


    const fetcher = (options = {}) => {
        setError(null)
        setLoading(true)
        setData(null)

        fetch(url, {
            ...options
        })
        .then((res) => {
            setLoading(false)
            if(!res.ok) {
                throw new Error(res.statusText);
            } 
            return res.json()
            
        })
        .then((resData) => {
            setData(resData)
        })
        .catch((err) => {
            setError(err)
        })
    }

    return {loading, data, error, fetcher};
}