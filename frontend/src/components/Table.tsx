import React, { useRef, useEffect, forwardRef, useState } from "react";
import {
	useTable,
	useSortBy,
	usePagination,
	useRowSelect,
	useGlobalFilter,
	useAsyncDebounce,
	useExpanded,
} from "react-table";
import classNames from "classnames";

// components
import Pagination from "./Pagination";
import NotFound from "./NotFound";

interface GlobalFilterProps {
	preGlobalFilteredRows: any;
	globalFilter: any;
	setGlobalFilter: any;
	searchBoxClass: any;
}

// Define a default UI for filtering
const GlobalFilter = ({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
	searchBoxClass,
}: GlobalFilterProps) => {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = useState<any>(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		<div className={classNames(searchBoxClass)}>
			<span className="d-flex align-items-center">
				Search :{" "}
				<input
					type="search"
					value={value || ""}
					onChange={(e: any) => {
						setValue(e.target.value);
						onChange(e.target.value);
					}}
					placeholder={`${count} records...`}
					className="form-control w-auto ms-1"
				/>
			</span>
		</div>
	);
};

interface IndeterminateCheckboxProps {
	indeterminate: any;
	// children?: React.ReactNode;
}

const IndeterminateCheckbox = forwardRef<
	HTMLInputElement,
	IndeterminateCheckboxProps
>(({ indeterminate, ...rest }, ref) => {
	const defaultRef = useRef();
	const resolvedRef: any = ref || defaultRef;

	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<>
			<div className="form-check">
				<input
					type="checkbox"
					className="form-check-input"
					ref={resolvedRef}
					{...rest}
				/>
				<label
					htmlFor="form-check-input"
					className="form-check-label"
				></label>
			</div>
		</>
	);
});

interface TableProps {
	isSearchable?: boolean;
	isSortable?: boolean;
	pagination?: any;
	isSelectable?: boolean;
	isExpandable?: boolean;
	handleProps?: any;
	sizePerPageList?: {
		text: string;
		value: number;
	}[];
	handleFilter?: any;
	columns: {
		Header: string;
		accessor: string;
		sort?: boolean;
		Cell?: any;
		className?: string;
	}[];
	data: any[];
	pageSize?: any;
	searchBoxClass?: string;
	tableClass?: string;
	theadClass?: string;
}

const Table = (props: TableProps) => {
	const isSearchable = props["isSearchable"] || false;
	const isSortable = props["isSortable"] || false;
	const pagination = props["pagination"] || false;
	const isSelectable = props["isSelectable"] || false;
	const isExpandable = props["isExpandable"] || false;
	const sizePerPageList = props["sizePerPageList"] || [];
	const [pageCurrent, setPageCurent] = useState<number | null>();
	const [pageSize, setPageSize] = useState(props.pageSize);
	const [visiblePage, setVisiblePage] = useState<number[]>([]);
	const totalPage = props.pagination.totalPage;

	const getVisiblePages = () => {
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
	};

	useEffect(() => {
		getVisiblePages();
	}, [pageCurrent, props.pagination.totalPage]);

	useEffect(() => {
		setPageCurent(props.pagination.page);
	}, [props.pagination.page]);

	useEffect(() => {
		setPageSize(props.pagination.pageSize);
	}, [props.pagination.pageSize]);

	let otherProps: any = {};

	if (isSearchable) {
		otherProps["useGlobalFilter"] = useGlobalFilter;
	}
	if (isSortable) {
		otherProps["useSortBy"] = useSortBy;
	}
	if (isExpandable) {
		otherProps["useExpanded"] = useExpanded;
	}
	if (pagination) {
		otherProps["usePagination"] = usePagination;
	}
	if (isSelectable) {
		otherProps["useRowSelect"] = useRowSelect;
	}

	let dataTable = useTable(
		{
			columns: props["columns"],
			data: props["data"],
			initialState: { pageSize: pageSize },
		},
		otherProps.hasOwnProperty("useGlobalFilter") &&
			otherProps["useGlobalFilter"],
		otherProps.hasOwnProperty("useSortBy") && otherProps["useSortBy"],
		otherProps.hasOwnProperty("useExpanded") && otherProps["useExpanded"],
		otherProps.hasOwnProperty("usePagination") &&
			otherProps["usePagination"],
		otherProps.hasOwnProperty("useRowSelect") && otherProps["useRowSelect"],
		(hooks) => {
			isSelectable &&
				hooks.visibleColumns.push((columns: any) => [
					// Let's make a column for selection
					{
						id: "selection",
						// The header can use the table's getToggleAllRowsSelectedProps method
						// to render a checkbox
						Header: ({
							getToggleAllPageRowsSelectedProps,
						}: any) => (
							<div>
								<IndeterminateCheckbox
									{...getToggleAllPageRowsSelectedProps()}
								/>
							</div>
						),
						// The cell can use the individual row's getToggleRowSelectedProps method
						// to the render a checkbox
						Cell: ({ row }: any) => (
							<div>
								<IndeterminateCheckbox
									{...row.getToggleRowSelectedProps()}
								/>
							</div>
						),
					},
					...columns,
				]);
		}
	);

	let rows = pagination ? dataTable.page : dataTable.rows;

	return (
		<>
			{isSearchable && (
				<GlobalFilter
					preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
					globalFilter={dataTable.state.globalFilter}
					setGlobalFilter={dataTable.setGlobalFilter}
					searchBoxClass={props["searchBoxClass"]}
				/>
			)}
			{pagination && (
				<Pagination
					handleBlock={(value: number) => {
						setPageCurent(value);
					}}
					visiblePage={
						visiblePage.length === 0
							? [1, 2, 3, 4, 5, totalPage]
							: visiblePage
					}
					pageCurrent={pageCurrent}
					pageSize={pageSize}
					tableProps={dataTable}
					totalPage={totalPage}
					handleFilter={props.handleFilter}
					paginations={props.pagination}
					sizePerPageList={sizePerPageList}
				/>
			)}

			<div className="table-responsive">
				<table
					key={pageSize}
					{...dataTable.getTableProps()}
					className={classNames(
						"table table-centered react-table",
						props["tableClass"]
					)}
				>
					<thead className={props["theadClass"]}>
						{(dataTable.headerGroups || []).map(
							(headerGroup: any) => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{(headerGroup.headers || []).map(
										(column: any) => (
											<th
												{...column.getHeaderProps(
													{
														style: {
															width: column.width,
														},
													},
													column.sort &&
														column.getSortByToggleProps()
												)}
												className={classNames({
													sorting_desc:
														column.isSortedDesc ===
														true,
													sorting_asc:
														column.isSortedDesc ===
														false,
													sortable:
														column.sort === true,
												})}
												style={{
													minWidth: column.width,
													width: column.width,
												}}
											>
												<span>
													{column.render("Header")}
												</span>
											</th>
										)
									)}
								</tr>
							)
						)}
					</thead>
					<tbody {...dataTable.getTableBodyProps()}>
						{(rows || []).map((row: any, i: number) => {
							dataTable.prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{(row.cells || []).map((cell: any) => {
										return (
											<td
												{...cell.getCellProps([
													{
														className:
															cell.column
																.className,
													},
												])}
											>
												{cell.render("Cell")}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
				{dataTable.data.length === 0 && <NotFound />}
			</div>
			{pagination && (
				<Pagination
					handleBlock={(value: number) => {
						setPageCurent(value);
					}}
					visiblePage={
						visiblePage.length === 0
							? [1, 2, 3, 4, 5, totalPage]
							: visiblePage
					}
					pageCurrent={pageCurrent}
					pageSize={pageSize}
					tableProps={dataTable}
					totalPage={totalPage}
					handleFilter={props.handleFilter}
					paginations={props.pagination}
					sizePerPageList={sizePerPageList}
				/>
			)}
		</>
	);
};

export default Table;
