'use client';

import React from 'react';

interface Column {
  key: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  width?: string;
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, React.ReactNode>[];
  striped?: boolean;
  compact?: boolean;
  highlightColumn?: string;
  className?: string;
}

export function DataTable({ columns, rows, striped = true, compact = false, highlightColumn, className = '' }: DataTableProps) {
  const cellPadding = compact ? 'px-2 py-1.5' : 'px-3 py-2';
  const cellSize = compact ? 'text-xs' : 'text-sm';

  return (
    <div className={`overflow-x-auto border border-white/10 rounded ${className}`}>
      <table className="w-full font-mono">
        <thead className="sticky top-0">
          <tr className="bg-white/[0.03] border-b border-white/10">
            {columns.map((col) => {
              const align = col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left';
              const isHighlight = highlightColumn === col.key;
              return (
                <th
                  key={col.key}
                  className={`${cellPadding} text-xs tracking-[0.1em] uppercase whitespace-nowrap ${align} ${
                    isHighlight ? 'text-[#ff6b35]' : 'text-white/40'
                  }`}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={`border-b border-white/[0.05] transition-colors hover:bg-[#ff6b35]/[0.04] ${
                striped && rowIdx % 2 === 1 ? 'bg-white/[0.02]' : ''
              }`}
            >
              {columns.map((col) => {
                const align = col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left';
                const isHighlight = highlightColumn === col.key;
                return (
                  <td
                    key={col.key}
                    className={`${cellPadding} ${cellSize} whitespace-nowrap ${align} ${
                      isHighlight ? 'text-[#ff6b35] font-bold' : 'text-white/80'
                    }`}
                    style={isHighlight ? { textShadow: '0 0 6px rgba(255,107,53,0.15)' } : undefined}
                  >
                    {row[col.key]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
