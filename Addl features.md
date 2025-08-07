**Research Synthesizer — Product Requirements Document**

---

## 1. Executive Summary

The **Research Synthesizer** is a web application that automates high‑quality, multi‑agent research workflows. Users submit a complex query; the platform cascades three specialized AI agents—Literature Summarizer, Data Analyst, and Science Communicator—each driven by rigorously engineered system prompts derived from the x1xhlol prompt repository. By combining **function‑calling**, **chain‑of‑thought**, and **role‑based personas**, the app delivers polished research reports with minimal manual effort.

**Key Differentiators:**

* **Multi‑agent orchestration** for literature review, data processing, and narrative synthesis
* **Strict JSON function calls** for tool integration (web search, Python analysis)
* **Token‑efficient prompts** optimized via patterns from public prompt repos
* **Persistent state** in Supabase and localStorage to support draft workflows and offline edits

---

## 2. Objectives & Success Metrics

### 2.1 Objectives

1. Provide one‑click generation of comprehensive research briefs.
2. Minimize user editing by enforcing structured JSON outputs.
3. Leverage Gemini 2.5 Pro function‑calling for real‑time tool use (web\_search, code\_executor).
4. Persist all intermediate artifacts for reproducibility and collaboration.

### 2.2 Key Metrics

* **First draft time**: ≤10 minutes
* **User satisfaction**: CSAT ≥4.6/5
* **Average tokens per report**: Efficient by ≥25% vs. unstructured prompts
* **Monthly active researchers**: ≥500 in 3 months

---

## 3. Major Features & Components

| Feature                | Description                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| Agent Pipeline Manager | Orchestrates sequential calls: Literature → Data → Synthesis                              |
| Prompt Registry        | Central store of enhanced system prompts and function specs (in Supabase)                 |
| Tool Integrations      | `web_search(query)`, `execute_python(code)`, `translate(text, lang)` function definitions |
| Draft Workspace        | Rich text editor with JSON preview and localStorage auto‑save                             |
| Versioning & Export    | Snapshot reports; export to PDF, Markdown, or Jupyter notebook format                     |

---

## 4. Top 15 User Stories & Enhanced System Prompts

Below are the top 15 user stories with **precision‑tuned prompts**. Each prompt leverages JSON schemas, function calls, and persona framing from the x1xhlol repo.

| #                                                                                                                                                                                                          | User Story                                                                                                | Enhanced System Prompt (Gemini 2.5 Pro) |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| **1**                                                                                                                                                                                                      | **Initial Query**: As a researcher, I want to submit my broad research question to kick off the pipeline. | \`\`\`system                            |
| You are **Query Intake Agent**. Input: {"query": string}. Output: JSON {"query\_id": uuid, "standardized\_query": string}. Perform minimal normalization (capitalize, remove filler). No extra commentary. |                                                                                                           |                                         |

````|
| **2**  | **Literature Retrieval**: As a user, I want the agent to fetch top 5 relevant papers or sources.                      | ```system
You are **Literature Summarizer Agent**. Tools: `web_search(query, top_k)`. Input: {"query": string}. Use `web_search(query, 5)`. Output: JSON {"sources":[{"title":string,"url":string,"abstract":string}]}. Truncate abstracts to ≤200 words. No commentary.
```                                                                                                       |
| **3**  | **Abstract Extraction**: As a user, I want concise summaries of each source’s abstract.                             | ```system
You are **Abstract Extractor Agent**. Input: {"sources":[...]}. Output: JSON {"summaries":[{"title":string,"summary":string}]}. Each summary no more than 100 words. Use bullet points inside summary field.
```                                                                                                                                       |
| **4**  | **Thematic Analysis**: As a user, I want the agent to identify core themes across the sources.                      | ```system
You are **Thematic Analysis Agent**. Input: {"summaries":[...]}. Output: JSON {"themes":[{"theme":string,"citation_keys":[int]}]}. Identify 3–5 themes and cite by index into summaries. No narrative.
```                                                                                                                                                                   |
| **5**  | **Data Gathering**: As a user, I want the Data Analyst agent to gather numerical data or metrics related to themes.  | ```system
You are **Data Analyst Agent**. Tools: `execute_python(code)`. Input: {"themes":[...]}. For each theme, write Python code to fetch or simulate related data (e.g., stats APIs, random sampling). Use pandas. Output as function call: `execute_python` with code string. Do not wrap code in markdown.
```                                                                               |
| **6**  | **Data Processing**: As a user, I want the Data Analyst agent to run the code and return structured results.         | ```system
You are **Data Analyst Agent**. Process `execute_python` results. Input: tool response. Output: JSON {"data_insights":[{"theme":string,"values": [number],"stats":{"mean":float,"std":float}}]}. No extra text.
```                                                                                                                                                     |
| **7**  | **Chart Generation**: As a user, I want the agent to produce matplotlib plot specs for the data.                      | ```system
You are **Visualization Agent**. Input: {"data_insights":[...]}. Output JSON: {"plots":[{"type":"line"|"bar"|"scatter","x":string,"y":string,"title":string,"code":string}]}. Code must use matplotlib without setting colors manually.
```                                                                                                                                       |
| **8**  | **Narrative Synthesis**: As a user, I want the Science Communicator agent to weave findings into a coherent story.    | ```system
You are **Science Communicator Agent**. Input: {"themes":[...],"data_insights":[...],"plots":[...]}. Output JSON: {"report": [{"heading":string,"paragraph":string}]}. Write 5 sections: Introduction, Methods, Results, Discussion, Conclusion. Paragraphs ≤150 words.
```                                                                                             |
| **9**  | **Citation Formatting**: As a user, I want the agent to produce properly formatted citations.                         | ```system
You are **Citation Agent**. Input: {"sources":[...]}. Output: JSON {"citations":[{"key":int,"format":"APA"|"MLA","text":string}]}. Provide both APA and MLA for each.
```                                                                                                                                                                         |
| **10** | **Executive Summary**: As an executive, I want a one‑page bulleted summary of key insights.                         | ```system
You are **Executive Summary Agent**. Input: {"report":[...]}. Output: JSON {"summary_bullets":[string]}. 5–7 bullets, each ≤20 words.
```                                                                                                                                                                                        |
| **11** | **Confidence Analysis**: As a user, I want the agent to rate confidence in each insight.                             | ```system
You are **Confidence Scorer Agent**. Input: {"report":[...]}. Output: JSON {"confidence":[{"section":string,"score":0–1}]}. Provide float scores.
```                                                                                                                                                                               |
| **12** | **Glossary Generation**: As a user, I want the agent to define technical terms used in the report.                    | ```system
You are **Glossary Agent**. Input: {"report":[...]}. Output: JSON {"glossary":[{"term":string,"definition":string}]}. Include 5–10 terms. No external text.
```                                                                                                                                                                  |
| **13** | **Translation**: As a user, I want the agent to translate the executive summary into another language.               | ```system
You are **Translation Agent**. Tools: `translate(text, lang)`. Input: {"summary": [...] , "lang": string}. Output: function call `translate` only.
```                                                                                                                                                                                         |
| **14** | **Versioning**: As a user, I want to snapshot and label my report version.                                            | ```system
You are **Version Agent**. Input: {"version_label": string, "report_id": uuid}. Output JSON {"version_id": uuid, "timestamp": string}. Generate new UUID.
```                                                                                                                                                                                   |
| **15** | **Export & Presentation**: As a user, I want the agent to prepare a slide deck outline.                               | ```system
You are **Presentation Agent**. Input: {"report": [...], "slides": int}. Output JSON {"slides":[{"title":string,"bullet_points":[string]}]}. Ensure each slide has ≤5 bullets.
```                                                                                                                                                          |

---

## 5. API Implementation Plan

### 5.1 Tech Stack
- **LLM**: Gemini 2.5 Pro via REST
- **DB**: Supabase for query, source, artifact storage
- **Frontend**: React + ShadCN/Tailwind, Draft.js for editor
- **Cache**: localStorage for in‑progress reports
- **Backend**: Node.js/Express or direct client calls

### 5.2 Supabase Schema (excerpt)
```sql
-- Research Queries
CREATE TABLE queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  query_text text,
  created_at timestamptz DEFAULT now()
);

-- Sources
CREATE TABLE sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query_id uuid REFERENCES queries(id),
  title text,
  url text,
  abstract text
);

-- Artifacts (summaries, themes, data, reports)
CREATE TABLE artifacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query_id uuid REFERENCES queries(id),
  type text, -- e.g., "summary", "data_insights"
  payload jsonb,
  created_at timestamptz DEFAULT now()
);
````

### 5.3 Frontend Integration Snippets

**Initialize Clients**

```js
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(URL, KEY);
const GEMINI = 'https://api.gemini.com/v2/chat';
const GEMINI_KEY = localStorage.getItem('GEMINI_API_KEY');
```

**Calling an Agent**

```js
async function callAgent(agentPrompt, userPayload) {
  const messages = [
    { role: 'system', content: agentPrompt },
    { role: 'user', content: JSON.stringify(userPayload) }
  ];
  const res = await fetch(GEMINI, {
    method: 'POST',
    headers: {'Authorization': `Bearer ${GEMINI_KEY}`, 'Content-Type': 'application/json'},
    body: JSON.stringify({ model: 'gemini-2.5-pro', messages, function_call: 'auto' })
  });
  return res.json();
}
```

**LocalStorage Drafts**

```js
function saveDraft(queryId, data) {
  localStorage.setItem(`draft-${queryId}`, JSON.stringify(data));
}
function loadDraft(queryId) {
  return JSON.parse(localStorage.getItem(`draft-${queryId}`) || 'null');
}
```

### 5.4 REST Endpoints (Express)

```js
app.post('/api/queries', async (req, res) => {
  const { data, error } = await supabase.from('queries').insert([{ user_id: req.body.user, query_text: req.body.query }]).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

app.post('/api/artifacts', async (req, res) => {
  const { query_id, type, payload } = req.body;
  const { data, error } = await supabase.from('artifacts').insert([{ query_id, type, payload }]).select();
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});
```

---

## 6. Next Steps

1. Finalize prompt-to-tool binding logic in backend.
2. Build agent pipeline orchestration engine.
3. Create draft UI with JSON and rich preview.
4. Integrate Supabase events (onInsert triggers).
5. Conduct user testing with academic and industry researchers.

---

*End of PRD — Research Synthesizer*
