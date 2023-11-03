import React from "react";

type Table = {
  title: string;
  headers: string[];
  rows: {
    id: number;
    selector: string;
    example: string;
    description: string;
  }[];
};
const NotionStyleTable = ({ data }: { data: Table }) => {
  return (
    <div className="flex flex-col w-full ">
      <div className="my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block px-1">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Селектор
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Приклад
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Опис
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.rows.map(
                  (row: { id: number; selector: string; example: string; description: string }) => (
                    <tr key={row.id}>
                      <td className="px-6 py-4">{row.selector}</td>
                      <td className="px-6 py-4">{row.example}</td>
                      <td className="px-6 py-4">{row.description}</td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionStyleTable;
