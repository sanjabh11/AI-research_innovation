import React from 'react';
import { Button } from './ui/button';

export default function VersionExportBar({ draftId, steps }: { draftId: string | null, steps: any[] }) {
  return (
    <div className="flex space-x-2 mt-4">
      <Button disabled={!draftId}>Save Version</Button>
      <Button disabled={!steps.length}>Export as PDF</Button>
      <Button disabled={!steps.length}>Export as Markdown</Button>
    </div>
  );
}
