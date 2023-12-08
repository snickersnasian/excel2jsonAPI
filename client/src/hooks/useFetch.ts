import { useState } from "react"
import type { Nullable } from "../types/generics"

 
export default function useFetch(url: string) {
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState<Nullable<[key: string]>>(null)


    const fetcher = (options = {}) => {
        setLoading(true)

        fetch(url, {
            ...options
        })
        .then((res) => {
            if(!res.ok) {
                return null
            } else {
                return res.json()
            }
        })
        .then((resData) => {
            setLoading(false)
            setData(resData)
        })
    }

    return {loading, data, fetcher};
}