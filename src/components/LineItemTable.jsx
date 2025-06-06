import React from 'react';
import { lineItems } from '../data';

export default function LineItemTable() {
  const headers = Object.keys(lineItems[0]);

  return (
    <div className="mt-4 max-w-full overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {headers.map(header => (
              <th key={header} scope="col" className="px-6 py-3">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item, index) => (
            <tr key={index} className="bg-white border-b">
              {headers.map(header => (
                <td key={header} className="px-6 py-4">
                  {item[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 