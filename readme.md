# Excel2JSON

Custom API to convert **XLSX** files into **JSON format**.

## Endpoints


| Route                                      | Description                                                   | Method   |
| ------------------------------------------ | ------------------------------------------------------------- | -------- |
| [`api/xlsx/upload`](#upload)               | Endpoint to upload an XLSX file                               | **POST** |
| [`api/xlsx/jsonContent/:fileId`](#getJson) | Endpoint to access the JSON content of the uploaded XLSX file | **GET**  |


## <a id="upload"></a> api/xlsx/upload

| Parameter | Required | Value  | Type | Example                                        | Description                                                            |
| --------- | -------- | ------ | ---- | ---------------------------------------------- | ---------------------------------------------------------------------- |
| xlsxFile  | YES      | File   | BODY | `/C:/Users/nguen.d/Downloads/TestSheet_1.xlsx` | The excel file to parse                                                |
| id        | YES      | String | BODY | `123454`                                       | Id of the output json. Has to be at lest 6 characters long             |
| sheetName | NO       | String | BODY | `infoSheet`                                    | Sheet name to parse data from. If not provided, first sheet by default |
| range     | NO       | String | BODY | `A1:J10`                                       | Sheet range of data. If not provided, gets all data by default         |


### Curl example
Request
```
curl --location 'localhost:3000/api/xlsx/upload' \
--form 'xlsxFile=@"/C:/Users/nguen.d/Downloads/TestSheet_1.xlsx"' \
--form 'id="34dg57fd"' \
--form 'sheetName="info"' \
--form 'range="B2:Z5"'
```

Response
---
```
{
    "fileName": "34dg57fd"
}
```


## <a id="getJson"></a> api/xlsx/jsonContent/`:fileId`

| Parameter | Required | Value  | Type  | Example  | Description                                                                                                          |
| --------- | -------- | ------ | ----- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| fileId    | YES      | String | Path  | `123454` | Id of the JSON                                                                                                       |
| parsed    | NO       | String | query | `1`      | It's 0 by default. The JSON response will be in BrityBOT table format. Otherwise it will return table as a 2D Array. |

