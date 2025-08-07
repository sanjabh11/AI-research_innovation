import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import PipelineStepper from '../components/PipelineStepper';
import JsonPreview from '../components/JsonPreview';
import MarkdownPreview from '../components/MarkdownPreview';
import VersionExportBar from '../components/VersionExportBar';

export default function DraftWorkspace() {
  const [query, setQuery] = useState('');
  const [pipelineSteps, setPipelineSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'json' | 'markdown'>('json');
  const [draftId, setDraftId] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    // Example pipeline: Literature → Analysis → Synthesis
    const steps = [
      { name: 'Literature', input: { query }, promptName: 'literature-summarizer' },
      { name: 'Analysis', input: {}, promptName: 'data-analyst' },
      { name: 'Synthesis', input: {}, promptName: 'science-communicator' }
    ];
    const res = await fetch('/api/pipeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ steps })
    });
    const data = await res.json();
    setPipelineSteps(data.steps);
    setLoading(false);
    // Autosave draft
    const newDraftId = draftId || `draft-${Date.now()}`;
    setDraftId(newDraftId);
    localStorage.setItem(newDraftId, JSON.stringify({ query, steps: data.steps }));
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Research Synthesizer Workspace</h1>
      <div className="mb-4 flex space-x-2">
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="Enter your research question..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={loading || !query}>
          {loading ? 'Running...' : 'Submit'}
        </Button>
      </div>
      <PipelineStepper steps={pipelineSteps} />
      <div className="mt-4">
        <div className="flex space-x-2 mb-2">
          <Button variant={activeTab === 'json' ? 'default' : 'outline'} onClick={() => setActiveTab('json')}>JSON Preview</Button>
          <Button variant={activeTab === 'markdown' ? 'default' : 'outline'} onClick={() => setActiveTab('markdown')}>Markdown Preview</Button>
        </div>
        {activeTab === 'json' ? (
          <JsonPreview steps={pipelineSteps} />
        ) : (
          <MarkdownPreview steps={pipelineSteps} />
        )}
      </div>
      <VersionExportBar draftId={draftId} steps={pipelineSteps} />
    </div>
  );
}
