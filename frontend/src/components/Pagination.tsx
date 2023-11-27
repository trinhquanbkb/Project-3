import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

interface PaginationProps {
	visiblePage: number[];
	pageCurrent: number | null | undefined;
	handleBlock: any;
	tableProps: any;
	pageSize: number;
	totalPage: number;
	handleFilter: any;
	paginations: any;
	sizePerPageList: {
		text: string;
		value: number;
	}[];
	isMobile?: boolean;
}

const Pagination = ({
	visiblePage,
	pageCurrent,
	totalPage,
	tableProps,
	sizePerPageList,
	paginations,
	handleFilter,
	handleBlock,
	pageSize,
	isMobile,
}: PaginationProps) => {
	const [filterPage, setFilterPage] = useState({
		page: 1,
		pageSize: 10,
	});

	const [isInitialRender, setIsInitialRender] = useState(true);

	// Sử dụng useRef để lưu trữ giá trị trước đó của filterPage
	const prevFilterPage = useRef(filterPage);

	// Sử dụng useEffect để cập nhật giá trị prevFilterPage khi filterPage thay đổi
	useEffect(() => {
		prevFilterPage.current = filterPage;
	}, [filterPage]);
	// Sử dụng useEffect để gọi đánh dấu đã qua lần đầu render
	useEffect(() => {
		if (!isInitialRender) {
			handleFilter(filterPage);
		}
		setIsInitialRender(false);
	}, [filterPage]);

	// Sử dụng useEffect để gọi handleFilter khi filterPage thay đổi thực sự
	useEffect(() => {
		if (
			!isInitialRender &&
			(filterPage.page !== prevFilterPage.current.page ||
				filterPage.pageSize !== prevFilterPage.current.pageSize)
		) {
			handleFilter(filterPage);
		}
	}, [filterPage]);

	/**
	 * handle page change
	 * @param page - current page
	 * @returns
	 */
	const changePage = (page: number) => {
		handleBlock(page);
		setFilterPage({ page: page, pageSize: pageSize });
		const activePage = filterPage.page;

		if (page === activePage) {
			return;
		}
	};

	return (
		<>
			<div className="d-flex align-items-center flex-wrap text-center table-user-bottom">
				{sizePerPageList.length > 0 && (
					<div className="d-inline-block me-0 me-sm-3 ms-auto ms-sm-0 ml-a my-1">
						{isMobile ? null : (
							<label className="me-1 fw-normal">
								{`${
									paginations.pageSize *
										(paginations.page - 1) +
									1
								}-${
									paginations.pageSize * paginations.page
								} of ${paginations.total}`}
							</label>
						)}
						<select
							value={pageSize}
							onChange={(e: any) => {
								setFilterPage({
									page:
										Math.floor(
											(pageSize * (pageCurrent || 1 - 1) +
												1) /
												e.target.value
										) + 1,
									pageSize: e.target.value,
								});
								if (isMobile) {
									handleFilter({
										...filterPage,
										pageSize: Number(e.target.value),
									});
								} else {
									tableProps.setPageSize(
										Number(e.target.value)
									);
								}
							}}
							className="form-select d-inline-block w-auto"
						>
							{(sizePerPageList || []).map((pageSize, index) => {
								return (
									<option key={index} value={pageSize.value}>
										{pageSize.text}
									</option>
								);
							})}
						</select>
					</div>
				)}

				<ul className="pagination pagination-rounded ms-auto my-1 d-inline-flex">
					<li
						key="prevpage"
						className={classNames(
							"page-item",
							"paginate_button",
							"previous",
							{
								disabled: pageCurrent === 1,
							}
						)}
						onClick={() => {
							if (pageCurrent === 1) return;
							changePage(pageCurrent || 1 - 1);
						}}
					>
						<div className="page-link px-md-2 px-1">
							<i
								className={classNames("uil", "uil-angle-left", {
									disabled: pageCurrent === 1,
								})}
							></i>
						</div>
					</li>
					{(visiblePage || []).map((page, index, array) => {
						return array[index - 1] + 1 < page ? (
							<React.Fragment key={page}>
								<li className="page-item disabled d-inline-block">
									<div className="page-link px-md-2 px-1">
										...
									</div>
								</li>
								<li
									className={classNames(
										"page-item",
										"d-inline-block",
										{
											active: pageCurrent === page,
										}
									)}
									onClick={(e: any) => changePage(page)}
								>
									<div className="page-link px-md-2 px-1">
										{page}
									</div>
								</li>
							</React.Fragment>
						) : (
							<li
								key={page}
								className={classNames(
									"page-item",
									"d-inline-block",
									{
										active: pageCurrent === page,
									}
								)}
								onClick={(e: any) => changePage(page)}
							>
								<div className="page-link px-md-2 px-1">
									{page}
								</div>
							</li>
						);
					})}
					<li
						key="nextpage"
						className={classNames(
							"page-item",
							"paginate_button",
							"next",
							{
								disabled: pageCurrent === totalPage,
							}
						)}
						onClick={() => {
							if (pageCurrent === totalPage) return;
							changePage(pageCurrent || 1 + 1);
						}}
					>
						<div className="page-link px-md-2 px-1">
							<i
								className={classNames(
									"uil",
									"uil-angle-right",
									{
										disabled: pageCurrent === totalPage,
									}
								)}
							></i>
						</div>
					</li>
				</ul>
			</div>
		</>
	);
};

export default Pagination;
