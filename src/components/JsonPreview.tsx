import React from 'react';

export default function JsonPreview({ steps }: { steps: any[] }) {
  return (
    <div className="bg-gray-100 rounded p-4 text-xs overflow-x-auto">
      <pre>{JSON.stringify(steps, null, 2)}</pre>
    </div>
  );
}
