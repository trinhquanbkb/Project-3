import React, { useRef, useEffect, forwardRef, useState } from 'react';
import {
    useTable,
    useSortBy,
    usePagination,
    useRowSelect,
    useGlobalFilter,
    useAsyncDebounce,
  
} from 'react-table';
import classNames from 'classnames';

// components
import Pagination from '../../components/Pagination';

interface GlobalFilterProps {
    preGlobalFilteredRows: any;
    globalFilter: any;
    setGlobalFilter: any;
    searchBoxClass: any;
}

// Define a default UI for filtering
const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, searchBoxClass }: GlobalFilterProps) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState<any>(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div className={classNames(searchBoxClass)}>
            <span className="d-flex align-items-center">
                Search :{' '}
                <input
                    type="search"
                    value={value || ''}
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
    children?: React.ReactNode;
}

const IndeterminateCheckbox = forwardRef<HTMLInputElement, IndeterminateCheckboxProps>(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = useRef();
        const resolvedRef: any = ref || defaultRef;

        useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
                    <label htmlFor="form-check-input" className="form-check-label"></label>
                </div>
            </>
        );
    }
);

interface TableProps {
    isSearchable?: boolean;
    isSortable?: boolean;
    pagination?: boolean;
    isSelectable?: boolean;
   
   
    sizePerPageList?: {
        text: string;
        value: number;
    }[];
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

const TableTrackingSearch = (props: TableProps) => {
    const isSearchable = props['isSearchable'] || false;
    const isSortable = props['isSortable'] || false;
    const pagination = props['pagination'] || false;
    const isSelectable = props['isSelectable'] || false;
 
    const sizePerPageList = props['sizePerPageList'] || [];

    let otherProps: any = {};

    if (isSearchable) {
        otherProps['useGlobalFilter'] = useGlobalFilter;
    }
    if (isSortable) {
        otherProps['useSortBy'] = useSortBy;
    }

  
    if (pagination) {
        otherProps['usePagination'] = usePagination;
    }
    if (isSelectable) {
        otherProps['useRowSelect'] = useRowSelect;
    }

    const dataTable = useTable(
        {
            columns: props['columns'],
            data: props['data'],
            initialState: { pageSize: props['pageSize'] || 10 },
        },
        otherProps.hasOwnProperty('useGlobalFilter') && otherProps['useGlobalFilter'],
        otherProps.hasOwnProperty('useSortBy') && otherProps['useSortBy'],
       
        otherProps.hasOwnProperty('usePagination') && otherProps['usePagination'],
        otherProps.hasOwnProperty('useRowSelect') && otherProps['useRowSelect'],
        (hooks) => {
            isSelectable &&
                hooks.visibleColumns.push((columns: any) => [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllPageRowsSelectedProps }: any) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                            </div>
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }: any) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]);

           
            hooks.visibleColumns.push((columns: any) => [
                // Let's make a column for selection
                ...columns,
                {
                    // Build our expander column
                    id: 'action', // Make sure it has an ID
                    Header: (row: any) => (
                        <span>Hành động </span>
                    ),
                    Cell: ({ row }) =>
                        // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
                        // to build the toggle for expanding a row
                        (
                           <div className="group-btn-action"> 
                                <button className='btn btn-update-order'><span className='title-relative'>Cập nhật</span></button>
                           </div>
                        ),
                },
                
            ]);
        }
    );

    let rows = pagination ? dataTable.page : dataTable.rows;
  

    return (
        <>
            

            <div className="table-responsive">
                <table
                    {...dataTable.getTableProps()}
                    className={classNames('table table-centered react-table', props['tableClass'])}>
                    <thead className={props['theadClass']}>
                        {(dataTable.headerGroups || []).map((headerGroup: any) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {(headerGroup.headers || []).map((column: any) => (
                                  
                                    
                                    <th
                                        {...column.getHeaderProps(column.sort && column.getSortByToggleProps())}

                                        className={classNames({
                                            sorting_desc: column.isSortedDesc === true,
                                            sorting_asc: column.isSortedDesc === false,
                                            sortable: column.sort === true,
                                        })}>

                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
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
                                                        className: cell.column.className,
                                                    },
                                                ])}>
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {pagination && <Pagination tableProps={dataTable} sizePerPageList={sizePerPageList} />}
        </>
    );
};

export default TableTrackingSearch;
