import React from 'react';

function extractMarkdown(steps: any[]): string {
  // Try to find a summary or markdown output from the last step
  for (let i = steps.length - 1; i >= 0; i--) {
    const out = steps[i]?.output;
    if (out && out.markdown) return out.markdown;
    if (typeof out === 'string' && out.startsWith('#')) return out;
  }
  return 'No markdown output.';
}

export default function MarkdownPreview({ steps }: { steps: any[] }) {
  return (
    <div className="bg-white rounded p-4 prose max-w-none border">
      <pre>{extractMarkdown(steps)}</pre>
    </div>
  );
}
