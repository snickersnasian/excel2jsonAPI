# Excel2JSON

Custom API to convert **XLSX** files into **JSON format**.

## Prerequisites

1. Raise a FW request on `it4u.sec.samsung.net`

   | Source         | Destination                      |
   | -------------- | -------------------------------- |
   | Your static IP | 106.69.100.39 PORT 80, 443, 3000 |

   | ---                            | ---                                                                                                                    |
   | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
   | Purpose                        | For Brity assistant API usage                                                                                          |
   | Explanation of related systems | The user uploads xlsx or txt data to the API. Brity assistant will request data from the API to display it to the user |

1. Once the FW request is approved, you should try to telnet the IP:

   ```
   telnet 106.69.100.39 443
   ```

   If it is accessible, the connection will be established.

1. It case it is not, you should connect with `choon.byun`(Choon) from Network Group SDSE

## <a id="endpoints"></a> Endpoints

| Route                                      | Description                                                   | Method   |
| ------------------------------------------ | ------------------------------------------------------------- | -------- |
| [`api/xlsx/upload`](#upload)               | Endpoint to upload an XLSX file                               | **POST** |
| [`api/txt/upload`](#uploadTxt)             | Endpoint to upload an TXT file                                | **POST** |
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

## Response

```
{
    "fileName": "34dg57fd"
}
```

## <a id="uploadTxt"></a> api/txt/upload

| Parameter | Required | Value  | Type | Example                                         | Description                                                            |
| --------- | -------- | ------ | ---- | ----------------------------------------------- | ---------------------------------------------------------------------- |
| txtFile   | YES      | File   | BODY | `/C:/Users/nguen.d/Downloads/TestSheetData.txt` | The txt file to parse                                                  |
| id        | YES      | String | BODY | `123454`                                        | Id of the output json. Has to be at lest 6 characters long             |
| sheetName | NO       | String | BODY | `infoSheet`                                     | Sheet name to parse data from. If not provided, first sheet by default |
| range     | NO       | String | BODY | `A1:J10`                                        | Sheet range of data. If not provided, gets all data by default         |

### Curl example

Request

```
curl --location 'localhost:3000/api/xlsx/upload' \
--form 'xlsxFile=@"/C:/Users/nguen.d/Downloads/TestSheetData.txt"' \
--form 'id="34dg57fd"' \
--form 'sheetName="info"' \
--form 'range="B2:Z5"'
```

## Response

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
