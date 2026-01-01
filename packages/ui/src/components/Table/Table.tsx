import React, { useMemo, useState } from 'react';
import type { TableProps, SortConfig, FilterConfig, Column } from './Table.types';

export const Table = React.memo(function Table<T extends Record<string, any>>({
  columns,
  data,
  rowKey = 'id' as keyof T | string,
  className = '',
  striped = true,
  hover = true,
  onRowClick,
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState<FilterConfig>({});
  const [expandedFilters, setExpandedFilters] = useState<Set<string>>(new Set());

  const toggleSort = (key: string) => {
    setSortConfig((prev: SortConfig) => {
      if (prev.key !== key) return { key, direction: 'asc' };
      return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
    });
  };

  const toggleFilter = (key: string) => {
    setExpandedFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: FilterConfig) => ({ ...prev, [key]: value }));
  };

  const processedData = useMemo(() => {
    let result = [...data];

    // Apply filters
    result = result.filter((row) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const cell = row[key as keyof T];
        if (cell == null) return false;
        return String(cell).toLowerCase().includes(String(value).toLowerCase());
      });
    });

    // Apply sorting
    if (sortConfig.key) {
      const key = sortConfig.key;
      const dir = sortConfig.direction === 'asc' ? 1 : -1;
      result.sort((a, b) => {
        const av = a[key as keyof T];
        const bv = b[key as keyof T];
        if (av == null && bv == null) return 0;
        if (av == null) return -1 * dir;
        if (bv == null) return 1 * dir;
        if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
        return String(av).localeCompare(String(bv)) * dir;
      });
    }

    return result;
  }, [data, filters, sortConfig]);

  const rootClasses = ['w-full bg-white rounded-md overflow-hidden', className].filter(Boolean).join(' ');

  return (
    <div className={rootClasses}>
      <div className="w-full overflow-x-auto">
        <table className={`min-w-full text-left divide-y divide-slate-100`}>
          <thead className="bg-slate-50 sticky top-0">
            <tr>
              {columns.map((col: Column<T>) => {
                const key = String(col.key);
                return (
                  <th
                    key={key}
                    className={`px-3 py-2 text-sm font-semibold text-slate-700 ${col.width || ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => col.sortable && toggleSort(key)}
                        className={`${col.sortable ? 'cursor-pointer' : ''} flex items-center gap-2`}
                      >
                        <span>{col.label}</span>
                        {col.sortable && (
                          <span className="text-slate-400 text-xs">
                            {sortConfig.key === key ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '⇅'}
                          </span>
                        )}
                      </button>

                      {col.filterable && (
                        <button
                          onClick={() => toggleFilter(key)}
                          type="button"
                          className="text-slate-400 hover:text-slate-600 text-xs ml-1"
                          aria-label={`Toggle filter for ${col.label}`}
                        >
                          🔍
                        </button>
                      )}
                    </div>

                    {col.filterable && expandedFilters.has(key) && (
                      <div className="mt-2">
                        <input
                          value={filters[key] || ''}
                          onChange={(e) => handleFilterChange(key, e.target.value)}
                          placeholder={`Filter ${col.label}`}
                          className="w-full px-2 py-1 text-sm border border-slate-200 rounded-md bg-white"
                        />
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {processedData.map((row, ri) => {
              const key = typeof rowKey === 'string' ? row[rowKey as keyof T] ?? ri : (row[rowKey as keyof T] as any) ?? ri;
              return (
                <tr
                  key={String(key) + ri}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`${hover ? 'hover:bg-slate-50 cursor-pointer' : ''} ${
                    striped && ri % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                  }`}
                >
                  {columns.map((col: Column<T>) => {
                    const ck = String(col.key);
                    const value = row[ck as keyof T];
                    return (
                      <td key={ck} className={`px-3 py-2 align-top text-sm text-slate-700`}>
                        {col.render ? col.render(value, row) : String(value ?? '')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-3 py-2 text-xs text-slate-500 bg-slate-50 flex justify-between items-center">
        <div>
          Showing <strong className="text-slate-700">{processedData.length}</strong> of <strong className="text-slate-700">{data.length}</strong>
        </div>
        <div className="italic">Filters applied: {Object.values(filters).filter(Boolean).length}</div>
      </div>
    </div>
  );
});

export default Table;
