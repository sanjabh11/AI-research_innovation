import React from 'react';

interface Step {
  name: string;
  output?: any;
}

export default function PipelineStepper({ steps }: { steps: Step[] }) {
  return (
    <div className="flex flex-col space-y-2">
      {steps.length === 0 && <div className="text-gray-400">No steps run yet.</div>}
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-500" />
          <div className="font-semibold">{step.name}</div>
          {step.output && <span className="text-green-600 ml-2">✔</span>}
        </div>
      ))}
    </div>
  );
}
