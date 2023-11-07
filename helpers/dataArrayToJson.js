function dataArrayToJson(dataArr, listCount, title) {
  const dataKey = dataArr.shift().map((el) => el || "-");
  const dataTitle = dataKey;

  const dataValue = dataArr.map((row) => {
    const rowObj = {};
    dataKey.forEach((key, index) => {
      const cellData = row[index];
      rowObj[key] = cellData === null ? "" : cellData;
    });
    return rowObj;
  });

  const jsonData = {
    webchatRichFormVersion: "1.0",
    richForm: [
      {
        type: "TABLE",
        title,
        dataKey,
        dataTitle: dataTitle || "",
        dataValue,
        listCount,
      },
    ],
  };

  return jsonData;
}

module.exports = { dataArrayToJson };
