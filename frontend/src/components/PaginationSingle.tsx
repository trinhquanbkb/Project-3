import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

interface IProps {
	totalPage: number;
	page: number;
	handlePagination: any;
	className?: string;
}

export default function PaginationSingle(props: IProps) {
	const [pageCurrent, setPageCurrent] = useState<number>(props.page);
	const [visiblePage, setVisiblePage] = useState<number[]>([]);
	const totalPage = props.totalPage;

	useEffect(() => {
		if (totalPage === 0) {
			setVisiblePage([1]);
		} else if (totalPage < 7) {
			let x = [];
			for (let i = 0; i < totalPage; i++) {
				x.push(i + 1);
			}
			setVisiblePage(x);
		} else {
			if (
				pageCurrent! % 5 >= 0 &&
				pageCurrent! > 4 &&
				pageCurrent! + 2 < totalPage
			) {
				setVisiblePage([
					1,
					pageCurrent! - 1,
					pageCurrent!,
					pageCurrent! + 1,
					totalPage,
				]);
			} else if (
				pageCurrent! % 5 >= 0 &&
				pageCurrent! > 4 &&
				pageCurrent! + 2 >= totalPage
			) {
				setVisiblePage([
					1,
					totalPage - 3,
					totalPage - 2,
					totalPage - 1,
					totalPage,
				]);
			} else {
				setVisiblePage([1, 2, 3, 4, 5, totalPage]);
			}
		}
	}, []);

	useEffect(() => {
		props.handlePagination(pageCurrent);
	}, [pageCurrent]);

	return (
		<div className={props.className ? props.className : ""}>
			<Pagination className="w-100 d-flex justify-content-center">
				{visiblePage.map((page: number, index: number) => {
					if (page === 1) {
						return (
							<div key={index}>
								{page === pageCurrent ? (
									<div className="d-flex">
										<Pagination.Item active>
											{1}
										</Pagination.Item>
									</div>
								) : (
									<div className="d-flex">
										<Pagination.Prev
											onClick={() => {
												setPageCurrent(pageCurrent - 1);
											}}
										/>
										<Pagination.Item
											onClick={() => {
												setPageCurrent(page);
											}}
										>
											{1}
										</Pagination.Item>
									</div>
								)}
							</div>
						);
					} else if (
						visiblePage[index] - visiblePage[index - 1] > 1 &&
						index + 1 !== visiblePage.length
					) {
						return (
							<div className="d-flex">
								<Pagination.Ellipsis />
								{page === pageCurrent ? (
									<Pagination.Item active>
										{page}
									</Pagination.Item>
								) : (
									<Pagination.Item
										onClick={() => {
											setPageCurrent(page);
										}}
									>
										{page}
									</Pagination.Item>
								)}
							</div>
						);
					} else if (
						visiblePage[index] - visiblePage[index - 1] > 1 &&
						index + 1 === visiblePage.length
					) {
						return (
							<div className="d-flex">
								<Pagination.Ellipsis />
								{page === pageCurrent ? (
									<div className="d-flex">
										<Pagination.Item active>
											{page}
										</Pagination.Item>
										<Pagination.Next disabled />
									</div>
								) : (
									<div className="d-flex">
										<Pagination.Item
											onClick={() => {
												setPageCurrent(page);
											}}
										>
											{page}
										</Pagination.Item>
										<Pagination.Next
											onClick={() => {
												setPageCurrent(pageCurrent + 1);
											}}
										/>
									</div>
								)}
							</div>
						);
					} else if (index + 1 === visiblePage.length) {
						return (
							<div className="d-flex">
								{page === pageCurrent ? (
									<div className="d-flex">
										<Pagination.Item active>
											{page}
										</Pagination.Item>
										<Pagination.Next disabled />
									</div>
								) : (
									<div className="d-flex">
										<Pagination.Item
											onClick={() => {
												setPageCurrent(page);
											}}
										>
											{page}
										</Pagination.Item>
										<Pagination.Next
											onClick={() => {
												setPageCurrent(pageCurrent + 1);
											}}
										/>
									</div>
								)}
							</div>
						);
					}
					if (page === 1 && pageCurrent !== 1) {
						return (
							<div className="d-flex">
								<Pagination.Prev disabled />
								<Pagination.Item
									onClick={() => {
										setPageCurrent(page);
									}}
								>
									{1}
								</Pagination.Item>
							</div>
						);
					} else {
						return (
							<div>
								{pageCurrent === page ? (
									<Pagination.Item active>
										{page}
									</Pagination.Item>
								) : (
									<Pagination.Item
										onClick={() => {
											setPageCurrent(page);
										}}
									>
										{page}
									</Pagination.Item>
								)}
							</div>
						);
					}
				})}
			</Pagination>
		</div>
	);
}
