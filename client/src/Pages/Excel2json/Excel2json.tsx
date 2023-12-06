import { Button, Input } from "antd";
import { Excel2jsonStore } from "./store"
import Title from "antd/es/typography/Title";
import styles from './style.module.css'
import useFetch from "../../hooks/useFetch";

export const Excel2json = () => {

    const {
        xlsxFilePath,
        id,
        sheetName,
        range,


        setXlsxFilePath,
        setId,
        setSheetName,
        setRange
    } = Excel2jsonStore();

    const { loading, data, fetcher } = useFetch(`/api/xlsx/upload/`)


    function handleSubmit() {
        console.log({
            xlsxFilePath,
            sheetName,
            range,
            id,
        });

        const data = new FormData()

        xlsxFilePath && data.append('xlsxFile', xlsxFilePath)

        id && data.append('id', id)


        fetcher({
            method: 'POST',
            body: data
        })

    }




    return (
        <div className={styles.container}>
            <Title>Upload file</Title>
            <Input type="file" placeholder="File" onChange={elem => setXlsxFilePath(elem.target.files?.[0] || null)}></Input>
            <Input required placeholder="File ID" onChange={elem => setId(elem.target.value)}></Input>
            <Input placeholder="Sheet name" onChange={elem => setSheetName(elem.target.value)}></Input>
            <Input placeholder="Range" onChange={elem => setRange(elem.target.value)}></Input>
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    )
}