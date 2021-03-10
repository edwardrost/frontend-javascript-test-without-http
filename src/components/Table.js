import React, { useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';

const Table = ({ columns, data }) => {
        // Use the state and functions returned from useTable to build your UI
        const {
          getTableProps,
          getTableBodyProps,
          headerGroups,
          prepareRow,
          page,
          canPreviousPage,
          canNextPage,
          pageOptions,
          pageCount,
          gotoPage,
          nextPage,
          previousPage,
          setPageSize,
          state: { pageIndex, pageSize },
        } = useTable({
          columns,
          data,
          initialState: { pageIndex: 0},
          },
          useSortBy,
          usePagination
        )

        const [details, setDetails] = useState(null);

        let classNames = details ? "tl" : "hidden";

        let id = details ? details.id : null;
        let name = details ? details.firstName + ' ' + details.lastName : null;
        let streetAddress = details ? details.address.streetAddress : null;
        let state = details ? details.address.state : null;
        let city = details ? details.address.city : null;
        let zip = details ? details.address.zip : null;
        let description = details ? details.description : null;        

                    
        // Render the UI for your table
        return (
          <div className="ph4">
            <div className="overflow-auto">       
              <table className="f6 w-100 mw8 center bg-grey" cellSpacing="0" {...getTableProps()}>
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th className="tl pv3 pr3 bb b--black-20" {...column.getHeaderProps(column.getSortByToggleProps())}>
                          {column.render('Header')}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? ' 🔽'
                                : ' 🔼'
                              : ''}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="lh-copy" {...getTableBodyProps()}>
                  {page.map(
                    (row, i) => {
                      prepareRow(row);
                      return (
                        <tr className="line pointer" {...row.getRowProps()} 
                            onClick={() => setDetails(data[i])}>
                          {row.cells.map(cell => {
                            return <td className="tl pv3 pr3 bb b--black-20" {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                          })}
                        </tr>
                      )}
                  )}
                </tbody>
              </table>
              <div className="tc center pa4">
              <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                  {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                  {'>>'}
                </button>{' '}
                <span>
                  Страница {' '}
                  <strong>
                    {pageIndex + 1} из {pageOptions.length}
                  </strong>{' '}
                </span>
                <select
                  value={pageSize}
                  onChange={e => {
                    setPageSize(Number(e.target.value))
                  }}
                >
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Показывать по {pageSize}
                    </option>
                  ))}
                </select>
              </div>

              <div className={classNames}>
                <div className = "f6 w-100 mw8 center bg-grey">
                    <div>
                        <p>Выбран пользователь <b>{name}</b></p>
                        <p>Описание:<br/>{description}</p>
                        <p>Адрес проживания: <b>{streetAddress}</b></p>
                        <p>Город: <b>{city}</b></p>
                        <p>Провинция/штат: <b>{state}</b></p>
                        <p>Индекс: <b>{zip}</b></p>
                    </div>
                </div>
            </div>
              </div>
          </div>
          </div>
        
        )
}

export default Table;