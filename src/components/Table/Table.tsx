import React from "react";

interface Column<T> {
  key: keyof T | "action";
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: (Column<T> & { key: keyof T | "action" })[];
  data: T[];
  striped?: boolean;
}

type rowIdType = string | undefined;

export default function Table<T extends { _id?: rowIdType }>({
  columns,
  data,
  striped = true,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto shadow rounded-lg bg-white">
      <table className="min-w-full">
        <thead className="bg-primaryColor text-white">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="py-3 px-4 text-left">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr
              key={row._id}
              className={`border-b hover:bg-primaryColor/10 border-primaryColor ${
                striped && rowIndex % 2 === 0 ? "bg-gray-100" : ""
              }`}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="py-3 px-4">
                  {col.render
                    ? col.render(row)
                    : col.key !== "action" && col.key in row
                    ? String(row[col.key])
                    : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
