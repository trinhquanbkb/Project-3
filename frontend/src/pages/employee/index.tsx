import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, Breadcrumb, Card } from "react-bootstrap";

//dummy data
import { records as data } from "./dataDemo";
import TableEmployee from "./component/TableEmployee";

const listBreadCrumb = [
	{
		path: "/",
		label: "Home",
		active: false,
		icon: "uil-home-alt",
	},
	{
		path: "/",
		label: "Quản lý nhân sự",
		active: true,
	},
];

const TrackingList = () => {
	const [btnData, setBtnData] = useState("tat-ca");
	const [keywordTracking, setKeywordTracking] = useState();
	const [dataDemo, setDataDemo] = useState(data);

	const handleKeywordTracking = (event: any) => {
		setKeywordTracking(event.target.value);
	};

	useEffect(() => {
		// fetch(`https://jsonplaceholder.typicode.com/${btnData}`)
		// .then(res => res.json())
		// .then(posts => {
		//   setDataFilter(posts)
		//     // in vao state se bi vong lap vo han
		// })
	}, [btnData]);

	return (
		<>
			<Row>
				<Col xs={12}>
					<div className="page-title-box">
						<Breadcrumb listProps={{ className: "m-0" }}>
							{/* {console.log(listBreadCrumb) } */}

							{(listBreadCrumb || []).map((item, index) => {
								return item.active ? (
									<Breadcrumb.Item active key={index}>
										{item.icon !== "" ? (
											<i
												className={`uil ${item.icon}`}
											></i>
										) : (
											""
										)}{" "}
										{item.label}
									</Breadcrumb.Item>
								) : (
									<Breadcrumb.Item
										key={index}
										href={item.path}
									>
										{item.icon !== "" ? (
											<i
												className={`uil ${item.icon}`}
											></i>
										) : (
											""
										)}{" "}
										{item.label}
									</Breadcrumb.Item>
								);
							})}
						</Breadcrumb>
						<div className="page-title-right">
							<div className="mt-2 mt-md-0">
								<Button
									variant="primary"
									className="mb-2 mb-sm-0"
								>
									<i className="uil-plus me-1"></i> Thêm nhân
									sự
								</Button>
							</div>
						</div>
					</div>
				</Col>
			</Row>

			<hr className="mt-0" />

			<Row>
				<Col xs={12}>
					<div className="wrap-filter">
						<div className="list-input">
							<Row>
								<Col xs={3}>
									<div className="col-left">
										<div className="input-search">
											<Form.Group className="form-search-user form-search-tracking">
												<Form.Control
													type="search"
													placeholder="Tìm kiếm theo tên"
													onChange={
														handleKeywordTracking
													}
													value={
														keywordTracking || ""
													}
												/>
												<Button
													type="submit"
													className="btn-search"
												></Button>
											</Form.Group>
										</div>
									</div>
								</Col>

								<Col xs={6}>
									<div className="col-right">
										<Form.Select
											className="list-time-select"
											aria-label="Default select example"
										>
											<option value="1">Admin</option>
											<option value="2">Quản lý</option>
											<option value="3">
												Nhân viên kho
											</option>
											<option value="4">Ké toán</option>
										</Form.Select>
									</div>
								</Col>
							</Row>
						</div>
					</div>
				</Col>
			</Row>

			<Row>
				<Col>
					<Card>
						<Card.Body>
							<TableEmployee
								data={dataDemo}
								paginations={{
									page: 1,
									pageSize: 10,
									total: 92,
									totalPage: 1,
								}}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default TrackingList;
