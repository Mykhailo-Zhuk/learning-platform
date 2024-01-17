import { replacedPartOfText } from "@/lib/utils";

type Row = {
  id: number | string;
  item: string;
  example?: string;
  description: string;
};

type Table = {
  title?: string;
  headers: string[];
  rows: Row[];
};

type Props = {
  data: Table | undefined;
};

const NotionStyleTable: React.FC<Props> = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block px-1">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {data.headers[0]}
                  </th>
                  {data.headers[1] && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {data.headers[1]}
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {data.headers[2]}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.rows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-6 py-4">{row.item}</td>
                    {row.example && (
                      <td className="px-6 py-4 whitespace-pre-line">
                        {replacedPartOfText(row.example)}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-pre-line">
                      {replacedPartOfText(row.description)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionStyleTable;
