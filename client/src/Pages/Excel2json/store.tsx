import { useState } from 'react'
import type { Nullable } from '../../types/generics'
import { validateLength } from './helpers/validateLength';

const ID_MIN_LENGTH = 6

export const Excel2jsonStore = () => {

    const [xlsxFilePath, setXlsxFilePath] = useState<Nullable<File>>(null);
    const [id, setId] = useState<Nullable<string>>(null);
    const [sheetName, setSheetName] = useState<Nullable<string>>(null);
    const [range, setRange] = useState<Nullable<string>>(null);

    const [idValid, setIdValidity] = useState<Nullable<boolean>>(true);
    const [hasXlsxFile, setXlsxFileAvailability] = useState<Nullable<boolean>>(true);

    function validateForm() {
        setIdValidity(id ? validateLength(id, ID_MIN_LENGTH) : false)
        setXlsxFileAvailability(Boolean(xlsxFilePath))

        return (!idValid || !xlsxFilePath)
    }


    return {
        xlsxFilePath,
        id,
        sheetName,
        range,
        idValid,
        hasXlsxFile,


        setXlsxFilePath,
        setId,
        setSheetName,
        setRange,
        validateForm
    }

}