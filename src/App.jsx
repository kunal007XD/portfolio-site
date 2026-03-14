
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { HiMail, HiPhone, HiDownload, HiSparkles } from 'react-icons/hi'

const EXPERIENCE = [
  {
    id: 'oracle-2023',
    company: 'Oracle',
    title: 'Software Engineer II',
    dates: 'Jul 2023 – Present',
    bullets: [
      'Designed and implemented a DynamicAgentOrchestrator in Python and a production-grade observability/integration layer (FastAPI, asyncio, WebSockets, contextvars, structured logging): built an orchestration pipeline that discovers MCP tools, maps free-text requests to agent-backed tasks, compiles and executes a dynamic state graph (planner → producer → per-task workers → synthesizer) with tool-first / LLM-fallback logic, supports structured JSON parsing, includes human-approval hooks, and provides run-id routed live logging (queue-backed WebSocket stream), approval UI and final JSON report.',
      'Designed and launched a RAG (Retrieval-Augmented Generation) testbed to evaluate document chunking strategies, retrieval pipelines, and generative models; implemented an end-to-end pipeline (preprocessing, retrieval integration, evaluation), automated and manual metrics (accuracy, faithfulness, relevance), and a tie-breaking algorithm to select optimal chunking—enabling rapid, data-driven experimentation.',
      'Engineered an end-to-end pipeline to extract and chunk chapter text from PDFs, build per-book embedding-backed vectorstores, and use retrieval-augmented LLMs to generate QA pairs, perform coherence checks, and rewrite items for clarity. Added semantic deduplication, interactive multi-step exercise generation, batching, checkpointing, and parallel processing to ensure high-quality, efficient, and fault-tolerant production runs',
      'Extracted and preprocessed data and built statistical models for performance analysis to identify questionable entries.',
      'Built a Java-based visualizer tool that extracts data, generates graphs, and sends email notifications summarizing cluster performance. Built fact services and identified issues in existing fact-service implementations; developed two services and an interface using Oracle APEX for table interaction.',
      'Researched GenAI feasibility for document-to-communications migration, recommended and built a rule-based method.'
    ],
    details: `At Oracle I built systems that must be reliable, observable, and auditable. The orchestrator's runtime exposes per-run logs, structured JSON outputs, and human approval checkpoints so compliance and engineering teams can inspect results. I focused on robust error handling, checkpointed retries, and feature flags to enable safe rollouts in production environments.`
  },
  {
    id: 'meraki-2023',
    company: 'Cisco Meraki',
    title: 'Software Engineer II Intern',
    dates: 'Jan 2023 – Apr 2023',
    bullets: [
      'ETL data and built a Random Forest model to predict the probability of watchdog triggers for different devices.',
      'Extracted and preprocessed data and used a Hugging Face summarizer to summarize top customer-facing issues.'
    ],
    details: `I worked with streaming telemetry and learned to clean time-series signals quickly. The model was production-minded: we built pipelines to convert raw telemetry into engineered features, performed cross-val tuning, and logged feature importances to guide next steps.`
  },
  {
    id: 'oracle-2022',
    company: 'Oracle',
    title: 'Software Engineer Intern',
    dates: 'May 2022 – Aug 2022',
    bullets: [
      'Analyzed log data, identified relationships between parameters, and found primary causes of bottlenecks (large blobs, missing indexes, many small network connections).',
      'Built Random Forest models (≈89% accuracy) to predict elapsed time and identify bottleneck causes.',
      'Designed, built, and deployed an OCI system that preprocesses log data from Elasticsearch, enables engineer labelling of low-confidence samples via a Flask server, and stores labels in MySQL for iterative retraining.'
    ],
    details: `I focused on traceability: linking prediction errors back to input signals and making labeling ergonomic for engineers. This cut iteration cycles and improved model trust.`
  }
]

const PROJECTS = [
  {
    id: 'dist-obj-detect',
    title: 'Distributed Object Detection (M.S. Thesis)',
    summary: 'Built a distributed object-detection system (frame extraction, Dockerized detectors on Kubernetes) and benchmarked/optimized server and video-quality configurations to improve scalability and speed.',
    tags: ['Kubernetes', 'Docker', 'Distributed Systems', 'CV'],
    details: `Architected a pipeline that splits video into frames, schedules detector containers on a k8s cluster, aggregated detections and implemented backpressure for input queues. Benchmarked latency vs throughput tradeoffs across instance sizes and optimized batching to reduce GPU idle time by ~40%.` 
  },
  {
    id: 'rag-testbed',
    title: 'RAG Testbed & Vectorstore Pipeline',
    summary: 'End-to-end pipeline for extracting and chunking chapter text from PDFs, building embedding-backed vectorstores, and generating QA pairs using retrieval-augmented LLMs.',
    tags: ['NLP', 'Embeddings', 'RAG', 'Python'],
    details: `Implemented semantic deduplication, chunking heuristics, vectorstore partitioning and an evaluation harness to run experiments across different retrievers and LLMs. Used checkpointing and parallelism to scale to large book collections.`
  }
]

const METRICS_DATA = [
  {name: 'oracle', value: 40},
  {name: 'meraki', value: 18},
  {name: 'media.net', value: 14},
  {name: 'orcasound', value: 10}
]

export default function App() {
  const [openExp, setOpenExp] = useState(null)
  const [activeProject, setActiveProject] = useState(null)
  const [filterTag, setFilterTag] = useState('All')

  const allTags = Array.from(new Set(PROJECTS.flatMap(p => p.tags))).sort()
  allTags.unshift('All')

  const projectsToShow = PROJECTS.filter(p => filterTag === 'All' || p.tags.includes(filterTag))

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-slate-900 p-6 antialiased">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-start justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-indigo-800">Kunal Mehta</h1>
            <p className="text-slate-600 mt-1">Software Engineer II — Austin, TX</p>
            <p className="text-sm mt-2 text-slate-600">M.S. Computer Science, University of Colorado Boulder</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <HiMail /> <a href="mailto:mehtakunalbhavesh7@gmail.com" className="underline">mehtakunalbhavesh7@gmail.com</a>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <HiPhone /> <a href="tel:+17207616876">720-761-6876</a>
            </div>
            <div className="flex gap-2 mt-2">
              <button onClick={()=>window.print()} className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:brightness-95"> <HiDownload/> Print / Download</button>
              <a href="/resume.pdf" className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm">Download PDF</a>
            </div>
          </div>
        </header>

        <main className="grid md:grid-cols-3 gap-6">
          {/* Left column */}
          <section className="md:col-span-2 space-y-6">
            {/* Skills card */}
            <motion.div initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} className="bg-white p-5 rounded-xl shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Skills & Technologies</h2>
                <span className="text-sm text-slate-500">Python · ML · RAG · FastAPI · React · Docker · K8s</span>
              </div>
              <div className="mt-3 text-sm text-slate-700">
                <p><strong>Languages & Specialties:</strong> Python, Java, C, JavaScript, TypeScript, AI Agent Orchestration, RAG, ML & stats modeling</p>
                <p className="mt-2"><strong>Tools & Frameworks:</strong> pandas, scikit-learn, xgboost, Langchain, FastAPI, Flask, Docker, Kubernetes, PostgreSQL, Elasticsearch</p>
              </div>
            </motion.div>

            {/* Experience list with expand */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="bg-white p-5 rounded-xl shadow">
              <h3 className="text-lg font-medium">Work Experience</h3>

              <div className="mt-4 space-y-3">
                {EXPERIENCE.map(exp => (
                  <article key={exp.id} className="border rounded-md p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-baseline gap-3">
                          <h4 className="font-semibold text-sm">{exp.company}</h4>
                          <span className="text-xs text-slate-500">— {exp.title}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">{exp.dates}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button onClick={() => setOpenExp(openExp === exp.id ? null : exp.id)} className="text-indigo-600 text-sm">{openExp === exp.id ? 'Hide' : 'Expand'}</button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <ul className="list-disc pl-5 text-sm text-slate-700">
                        {exp.bullets.map((b,i)=> <li key={i} className="mb-2">{b}</li>)}
                      </ul>
                    </div>

                    <AnimatePresence>
                      {openExp === exp.id && (
                        <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} exit={{opacity:0, height:0}} className="mt-3 pt-3 border-t text-sm text-slate-700">
                          <p>{exp.details}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                ))}
              </div>
            </motion.div>

            {/* Projects */}
            <motion.div initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} className="bg-white p-5 rounded-xl shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Projects & Case Studies</h3>
                <div className="text-sm text-slate-500">Interactive case studies</div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex gap-3 items-center flex-wrap">
                  {allTags.map(tag => (
                    <button key={tag} onClick={()=>setFilterTag(tag)} className={`px-2 py-1 text-xs rounded ${filterTag===tag ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}>{tag}</button>
                  ))}
                </div>

                <div className="mt-3 space-y-3">
                  {projectsToShow.map(p => (
                    <div key={p.id} className="p-3 border rounded-md">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{p.title}</h4>
                          <div className="text-sm text-slate-500 mt-1">{p.tags.join(' · ')}</div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setActiveProject(p)} className="text-indigo-600 text-sm">View</button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-slate-700">{p.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </section>

          {/* Right column / sidebar */}
          <aside className="space-y-6">
            <div className="bg-white p-5 rounded-xl shadow">
              <h4 className="font-medium">Snapshot</h4>
              <div className="mt-3 text-sm text-slate-700">
                <p><strong>Experience:</strong> Oracle, Cisco Meraki, Media.net, Orcasound</p>
                <p className="mt-2"><strong>Focus:</strong> Production ML & data pipelines, observability, RAG, feature engineering</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h4 className="font-medium">Metrics</h4>
              <div className="h-44 mt-3">
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={METRICS_DATA}>
                    <XAxis dataKey="name" tick={{fontSize:12}} />
                    <YAxis hide />
                    <Tooltip />
                    <Bar dataKey="value" radius={[6,6,0,0]} fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 text-xs text-slate-500">Bars represent relative project / team impact (visual).</div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow">
              <h4 className="font-medium">Contact</h4>
              <div className="text-sm text-slate-700 mt-2">
                <p className="flex items-center gap-2"><HiMail/> <a href="mailto:mehtakunalbhavesh7@gmail.com" className="underline">mehtakunalbhavesh7@gmail.com</a></p>
                <p className="flex items-center gap-2 mt-2"><HiPhone/> <a href="tel:+17207616876">720-761-6876</a></p>
                <p className="mt-3 text-xs text-slate-500">Want deeper case studies? Click "View" on a project to open a full interactive write-up and code snippets.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <HiSparkles className="w-6 h-6" />
                <div>
                  <div className="text-sm font-semibold">Open to roles in: Surveillance, ML Systems, Data Infrastructure</div>
                  <div className="text-xs opacity-90 mt-1">Seeking roles where I can build observable, auditable production ML systems.</div>
                </div>
              </div>
            </div>
          </aside>
        </main>

        <footer className="mt-8 text-sm text-slate-500 text-center">© {new Date().getFullYear()} Kunal Mehta — Built with React, Tailwind, Framer Motion</footer>
      </div>

      {/* Modal: Project details */}
      <AnimatePresence>
        {activeProject && (
          <motion.div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <motion.div className="bg-white w-[95%] md:w-3/4 rounded-xl p-6 max-h-[90vh] overflow-auto" initial={{scale:0.98}} animate={{scale:1}} exit={{scale:0.98}}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{activeProject.title}</h3>
                  <div className="text-sm text-slate-500 mt-1">{activeProject.tags.join(' · ')}</div>
                </div>
                <div>
                  <button onClick={()=>setActiveProject(null)} className="text-slate-600 text-sm">Close</button>
                </div>
              </div>

              <div className="mt-4 text-sm text-slate-700">
                <p>{activeProject.details}</p>

                <h4 className="mt-4 font-medium">Technical highlights</h4>
                <ul className="list-disc pl-5 mt-2">
                  <li>Productionized with batching, checkpointing, and parallel workers.</li>
                  <li>Engineered robust error handling and logging for observability and audits.</li>
                  <li>Designed evaluation harness with automated metrics for faithfulness and relevance.</li>
                </ul>

                <h4 className="mt-4 font-medium">Code snippets</h4>
                <pre className="bg-slate-100 p-3 rounded text-xs overflow-auto">{`// Example: parallel worker (pseudo)\nasync def worker(task_queue, results):\n  while True:\n    task = await task_queue.get()\n    try:\n      res = await process(task)\n      results.put(res)\n    finally:\n      task_queue.task_done()`}</pre>

                <div className="mt-4 flex gap-2">
                  <a className="px-3 py-1.5 bg-indigo-600 text-white rounded" href="#">View repo</a>
                  <a className="px-3 py-1.5 border rounded" href="#">Request full case study</a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
