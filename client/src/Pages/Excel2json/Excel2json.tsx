import { Button, Input, Modal, Spin, Typography } from "antd";
import { Excel2jsonStore } from "./store";
import Title from "antd/es/typography/Title";
import styles from "./style.module.css";
import useFetch from "../../hooks/useFetch";
const { Text } = Typography;

export const Excel2json = () => {
	const {
		xlsxFilePath,
		id,
		sheetName,
		range,
		idValid,
		hasXlsxFile,
		setXlsxFilePath,
		validateForm,
		setId,
		setSheetName,
		setRange,
	} = Excel2jsonStore();

	const { loading, fetcher } = useFetch(`/api/xlsx/upload/`);

	function handleSubmit() {
		const formHasErrors = validateForm();

		if (!formHasErrors) {
			const data = new FormData();

			xlsxFilePath && data.append("xlsxFile", xlsxFilePath);

			id && data.append("id", id);

			sheetName && data.append("sheetName", sheetName);
			range && data.append("range", range);

			fetcher({
				method: "POST",
				body: data,
			});
		}
	}

	return (
		<div className={styles.container}>
			<Modal
				title="Uploading file"
				open={loading}
				okButtonProps={{ style: { display: "none" } }}
				cancelButtonProps={{ style: { display: "none" } }}
				centered={true}
				closable={false}
			>
				<div className={styles.loading}>
					<Spin tip="Loading" size="large"></Spin>
				</div>
			</Modal>

			<Title>Upload file</Title>

			<div>
				<Input
					status={hasXlsxFile ? "" : "error"}
					type="file"
					placeholder="File"
					onChange={(elem) =>
						setXlsxFilePath(elem.target.files?.[0] || null)
					}
				/>
				{!hasXlsxFile && (
					<Text type="danger">Choose file to upload</Text>
				)}
			</div>

			<div>
				<Input
					required
					status={idValid ? "" : "error"}
					placeholder="File ID"
					onChange={(elem) => setId(elem.target.value)}
				/>
				{!idValid && (
					<Text type="danger">
						ID has to be at least 6 characters long
					</Text>
				)}
			</div>

			<Input
				placeholder="Sheet name"
				onChange={(elem) => setSheetName(elem.target.value)}
			></Input>

			<Input
				placeholder="Range"
				onChange={(elem) => setRange(elem.target.value)}
			></Input>

			<Button onClick={handleSubmit}>Submit</Button>
		</div>
	);
};
