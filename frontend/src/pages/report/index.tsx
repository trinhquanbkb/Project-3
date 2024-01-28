import React, { useEffect, useState } from "react";
import { Row, Col, Breadcrumb, Modal } from "react-bootstrap";
import { useGetReportListQuery } from "../../api/reportApi";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import TableReport from "./Components/TableReport";
import { convertDate } from "../../utils/function";
import { IReport } from "../../models/report.model";

const listBreadCrumb = [
	{
		path: "/",
		label: "Home",
		active: false,
		icon: "uil-home-alt",
	},
	{
		path: "/",
		label: "Báo cáo",
		active: true,
	},
];

const OrderList = () => {
	const location = useLocation();
	const [show, setShow] = useState(false);
	const [idReport, setIdReport] = useState<any>();
	const [contentModel, setCOntentModel] = useState<string>("");
	const [search, setSearch] = useState<any>({
		page: 1,
		pageSize: 10,
	});

	const { data: listReport } = useGetReportListQuery({
		...search,
	});

	useEffect(() => {
		const query = location.search;
		const parsed = queryString.parse(query);
		const page = parsed.page ? Number(parsed.page) : 1;
		const pageSize = parsed.pageSize ? Number(parsed.pageSize) : 10;

		setSearch({
			...search,
			page,
			pageSize,
		});
	}, []);

	// xử lý việc url thay đổi khi có filter
	useEffect(() => {
		const query = queryString.stringifyUrl(
			{
				url: "/reports",
				query: {
					page: search.page,
					pageSize: search.pageSize,
				},
			},
			{
				skipEmptyString: true,
			}
		);
		window.history.pushState(null, "", query);
	}, [search]);

	useEffect(() => {
		if (listReport) {
			const detail = listReport?.data.filter(
				(item: IReport) => item._id === idReport
			);
			if (detail.length > 0) {
				setShow(true);
				setCOntentModel(detail[0].note);
			}
		}
	}, [idReport]);

	const handleFilterPage = (filter: any) => {
		setSearch({
			...search,
			page: filter.page,
			pageSize: filter.pageSize,
		});
	};

	const handleClose = () => setShow(false);
	const handleShow = (id: string) => {
		setIdReport(id);
	};

	return (
		<>
			<Row>
				<Col xs={12}>
					<div className="page-title-box">
						<Breadcrumb listProps={{ className: "m-0" }}>
							{(listBreadCrumb || []).map((item, index) => {
								return item.active ? (
									<Breadcrumb.Item active key={index}>
										{item.label}
									</Breadcrumb.Item>
								) : (
									<Breadcrumb.Item
										key={index}
										href={item.path}
									>
										{item.label}
									</Breadcrumb.Item>
								);
							})}
						</Breadcrumb>
					</div>
				</Col>
			</Row>

			<hr className="mt-0" />

			{listReport ? (
				<TableReport
					handleFilter={handleFilterPage}
					paginations={listReport.paginations}
					handleView={handleShow}
					data={
						listReport
							? listReport.data.map(
									(item: IReport, index: number) => {
										return {
											id: item._id,
											stt: index + 1,
											username:
												item.user_id.username +
												" (" +
												item.user_id._id +
												")",
											productName:
												item.product_id.product_name,
											warehouse: item.warehouse_id.name,
											createdAt: convertDate(
												item.createdAt.toString()
											),
											note: item.note,
										};
									}
							  )
							: null
					}
				/>
			) : (
				<Loading />
			)}

			{show && contentModel ? (
				<Modal show={show} onHide={handleClose} animation={false}>
					<Modal.Header closeButton>
						<Modal.Title>Nội dung</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<textarea
							className="w-100 px-2 py-1"
							style={{ minHeight: "120px" }}
						>
							{contentModel}
						</textarea>
					</Modal.Body>
				</Modal>
			) : null}
		</>
	);
};

export default OrderList;
