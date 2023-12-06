import { useState } from 'react'
import type {Nullable} from '../../types/generics'

export const Excel2jsonStore = () => {

    const [xlsxFilePath, setXlsxFilePath] = useState<Nullable<File>>(null);
    const [id, setId] = useState<Nullable<string>>(null);
    const [sheetName, setSheetName] = useState<Nullable<string>>(null);
    const [range, setRange] = useState<Nullable<string>>(null);

    return {
        xlsxFilePath,
        id,
        sheetName,
        range,


        setXlsxFilePath,
        setId,
        setSheetName,
        setRange
    }

}