import React, { useRef, useEffect, forwardRef, useState } from "react";
import {
	useTable,
	useSortBy,
	useRowSelect,
	useGlobalFilter,
	useAsyncDebounce,
	useExpanded,
} from "react-table";
import classNames from "classnames";

// components
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
	searchBoxClass?: string;
	tableClass?: string;
	theadClass?: string;
}

const TableFullData = (props: TableProps) => {
	const isSearchable = props["isSearchable"] || false;
	const isSortable = props["isSortable"] || false;
	const isSelectable = props["isSelectable"] || false;
	const isExpandable = props["isExpandable"] || false;

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
	if (isSelectable) {
		otherProps["useRowSelect"] = useRowSelect;
	}

	let dataTable = useTable(
		{
			columns: props["columns"],
			data: props["data"],
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
		},
	);

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

			<div className="table-responsive">
				<table
					{...dataTable.getTableProps()}
					className={classNames(
						"table table-centered react-table",
						props["tableClass"],
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
														column.getSortByToggleProps(),
												)}
												className={classNames(
													column?.class,
													{
														sorting_desc:
															column.isSortedDesc ===
															true,
														sorting_asc:
															column.isSortedDesc ===
															false,
														sortable:
															column.sort ===
															true,
													},
												)}
												style={{
													minWidth: column.width,
													width: column.width,
													textAlign: column.align
														? column.align
														: "left",
												}}
											>
												<span>
													{column.render("Header")}
												</span>
											</th>
										),
									)}
								</tr>
							),
						)}
					</thead>
					<tbody {...dataTable.getTableBodyProps()}>
						{(dataTable.rows || []).map((row: any, i: number) => {
							dataTable.prepareRow(row);
							if (dataTable.data[i].deleteRow) {
								return (
									<tr
										className="delete-row-table"
										{...row.getRowProps()}
									>
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
													className="data-table-text"
													style={{
														textAlign: cell.column
															.align
															? cell.column.align
															: "left",
													}}
												>
													{cell.render("Cell")}
												</td>
											);
										})}
									</tr>
								);
							} else {
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
													className="data-table-text"
													style={{
														textAlign: cell.column
															.align
															? cell.column.align
															: "left",
													}}
												>
													{cell.render("Cell")}
												</td>
											);
										})}
									</tr>
								);
							}
						})}
					</tbody>
				</table>
				{dataTable.data.length === 0 && <NotFound />}
			</div>
		</>
	);
};

export default TableFullData;
