import React, { useEffect } from 'react';

const OperatingSystem = () => {
    useEffect(() => {
        // Scroll-reveal animation observer
        const observerOptions = { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible', 'active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in-section, .reveal').forEach(el => observer.observe(el));
        
        return () => observer.disconnect();
    }, []);

    return (
        <div className="text-slate-800 antialiased font-sans w-full bg-[#f8fafc] min-h-screen pt-8 pb-16">
            {/*  UX: Z-Pattern Top (Logo -> Navigation)  */}
                                {/*  30% Color Rule: Secondary Dark Header  */}
                                <header className="glass-header fixed top-0 w-full z-50 text-white py-4 px-6">
                                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                                        <div className="flex flex-col">
                                            <h1 className="text-xl md:text-2xl font-bold tracking-wide font-merriweather">Computer Science Masterclass</h1>
                                            <p className="text-sm text-slate-300 font-jakarta mt-1">BPSC TRE 4.0 Academic Resource</p>
                                        </div>
                                        {/*  IA: Clear logical navigation  */}
                                        <nav className="hidden lg:flex gap-6 xl:gap-8 text-sm font-semibold mt-4 md:mt-0 items-center">
                                            <a href="#foundations" className="hover:text-accent-400 transition-colors">Foundations</a>
                                            <a href="#process" className="hover:text-accent-400 transition-colors">Process Mgt</a>
                                            <a href="#scheduling" className="hover:text-accent-400 transition-colors">Scheduling</a>
                                            <a href="#synchronization" className="hover:text-accent-400 transition-colors">Synchronization</a>
                                            <a href="#memory" className="hover:text-accent-400 transition-colors">Memory Mgt</a>
                                            <a href="#numericals" className="hover:text-accent-400 transition-colors">Numericals</a>
                                            <a href="#bpsc-strategy" className="hover:text-accent-400 transition-colors">Exam Strategy</a>
                                            {/*  Fitts's Law / 10% Rule: Standout, accessible target  */}
                                            <a href="#assessment" className="bg-accent-500 text-white px-5 py-2.5 rounded-lg hover:bg-accent-600 transition-all shadow-md hover:shadow-lg font-bold">Assessment Simulator</a>
                                        </nav>
                                    </div>
                                </header>

                                <main className="max-w-7xl mx-auto pt-32 pb-16 px-4 sm:px-6 lg:px-8 space-y-24">

                                    {/*  UX: Z-Pattern Middle & Bottom (Hero Image/Text -> Big CTA)  */}
                                    <section className="flex flex-col items-start max-w-4xl pt-10 reveal active">
                                        <h2 className="text-5xl md:text-6xl font-extrabold text-secondary leading-tight mb-6">
                                            Operating Systems Architecture & Process Synchronization
                                        </h2>
                                        <p className="text-xl text-slate-600 font-jakarta leading-relaxed mb-10 max-w-3xl">
                                            A highly academic, deep-dive compendium designed exclusively for the Bihar Teacher Recruitment Examination. Master system foundations, scheduling mathematics, concurrency, and hardware-software interfacing.
                                        </p>
                                        {/*  Fitts's Law: Massive, unmissable Call to Action  */}
                                        <a href="#foundations" className="inline-flex items-center justify-center bg-accent-500 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-xl hover:bg-accent-600 hover:-translate-y-1 transition-all duration-300 gap-3 group">
                                            Commence Study
                                            {/*  Micro-interaction: Arrow moves on hover  */}
                                            <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                        </a>
                                    </section>

                                    {/*  Module 1: OS Foundations (UI: 12-Column Grid & Gestalt Proximity)  */}
                                    <section id="foundations" className="scroll-mt-32 reveal">
                                        <div className="mb-6 border-b-2 border-slate-200 pb-2 flex items-end gap-3">
                                            <span className="text-4xl font-black text-slate-300">01</span>
                                            <h3 className="text-3xl font-bold text-secondary">Foundations & System Architecture</h3>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                            {/*  UX: F-Pattern (Text-heavy content aligned left, spanning 8 cols)  */}
                                            <div className="lg:col-span-8 space-y-8">
                                                <div className="glass-panel p-8 rounded-2xl">
                                                    <h4 className="text-xl font-bold text-secondary mb-3">Definition & Core Functions</h4>
                                                    <p className="text-slate-700 leading-relaxed">The Operating System (OS) is the quintessential system software that manages computer hardware, software resources, and provides common services for application programs. It acts as the critical intermediary between the user (via CLI/GUI) and the underlying bare-metal hardware.</p>

                                                    <h4 className="text-xl font-bold text-secondary mt-8 mb-4">OS Typology Matrix</h4>
                                                    <ul className="space-y-4 text-slate-700">
                                                        <li className="flex items-start gap-3">
                                                            <svg className="w-6 h-6 text-accent-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                            <span><strong>Single-user, Multi-tasking:</strong> Modern consumer OS (Windows, macOS). Permits concurrent execution of applications.</span>
                                                        </li>
                                                        <li className="flex items-start gap-3">
                                                            <svg className="w-6 h-6 text-accent-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                            <span><strong>Multi-user, Multi-task:</strong> Enterprise architecture (UNIX, Linux). Manages hundreds of concurrent users securely.</span>
                                                        </li>
                                                        <li className="flex items-start gap-3">
                                                            <svg className="w-6 h-6 text-accent-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                            <span><strong>Real-Time Operating Systems (RTOS):</strong> Zero-latency tolerance systems used in industrial machinery. Execution must be precisely deterministic.</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            {/*  Gestalt: Visual grouping on the right (4 cols)  */}
                                            <div className="lg:col-span-4 space-y-6">
                                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                                    <h4 className="text-lg font-bold text-center text-secondary mb-6 font-merriweather">The Bootstrapping Paradigm</h4>
                                                    <div className="flex flex-col items-center space-y-3">
                                                        <div className="flow-node w-full text-sm">1. Power ON</div>
                                                        <div className="text-slate-400 font-bold">&#8595;</div>
                                                        <div className="flow-node w-full text-sm">2. ROM (BIOS/UEFI)</div>
                                                        <div className="text-slate-400 font-bold">&#8595;</div>
                                                        <div className="flow-node w-full text-sm">3. Bootstrap Loader</div>
                                                        <div className="text-slate-400 font-bold">&#8595;</div>
                                                        <div className="flow-node w-full text-sm bg-slate-900 text-white border-slate-900">4. OS Kernel in RAM</div>
                                                    </div>
                                                </div>

                                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                                    <h4 className="text-lg font-bold text-center text-secondary mb-4 font-merriweather">Memory Hierarchy</h4>
                                                    <div className="flex flex-col items-center w-full space-y-1">
                                                        <div className="w-1/4 bg-slate-800 py-2 text-center text-xs font-bold text-white rounded-t-lg">CPU Registers</div>
                                                        <div className="w-2/4 bg-slate-600 py-2 text-center text-sm font-bold text-white">SRAM (Cache)</div>
                                                        <div className="w-3/4 bg-slate-400 py-2 text-center text-sm font-bold text-white">DRAM (Main)</div>
                                                        <div className="w-full bg-slate-200 py-2 text-center text-base font-bold text-slate-800">Virtual Memory</div>
                                                        <div className="w-full bg-slate-100 py-2 text-center text-base font-bold text-slate-600 rounded-b-lg border border-slate-200">Magnetic/SSD Disk</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/*  Module 2: Process Management (UI: 12-Column Grid)  */}
                                    <section id="process" className="scroll-mt-32 reveal">
                                        <div className="mb-6 border-b-2 border-slate-200 pb-2 flex items-end gap-3">
                                            <span className="text-4xl font-black text-slate-300">02</span>
                                            <h3 className="text-3xl font-bold text-secondary">Process Management & Dual-Mode</h3>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                            <div className="lg:col-span-8 space-y-8">
                                                <p className="text-lg text-slate-700 leading-relaxed">Under the <strong>Von Neumann Architecture</strong>, instructions and data share the same memory space. A <em className="font-semibold text-secondary">Program</em> is a passive entity (binary code on disk), whereas a <em className="font-semibold text-secondary">Process</em> is an active entity (a program in execution loaded into Main Memory).</p>

                                                <div className="glass-panel p-8 rounded-2xl border-l-4 border-l-accent-500">
                                                    <h4 className="text-2xl font-bold text-secondary mb-4">Dual-Mode Operation</h4>
                                                    <p className="text-slate-700 mb-6">Hardware provides two execution modes governed by a <strong>Mode Bit</strong> to prevent malicious or errant applications from crashing the system.</p>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                                                            <strong className="block text-lg text-slate-800 mb-2">User Mode (Bit = 1)</strong>
                                                            <p className="text-sm text-slate-600">Execution of user applications. Restricted access to hardware. Cannot execute privileged instructions.</p>
                                                        </div>
                                                        <div className="bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-800">
                                                            <strong className="block text-lg text-white mb-2">Kernel Mode (Bit = 0)</strong>
                                                            <p className="text-sm text-slate-300">OS execution. Full privileges to manage hardware and execute all instructions. Triggered via <strong>System Calls</strong>.</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <h4 className="text-2xl font-bold text-secondary">Process Control Block (PCB)</h4>
                                                <p className="text-slate-700 mb-4">The repository for any information that may vary from process to process. Essential for Context Switching.</p>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    {/*  Micro-interaction cards  */}
                                                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-accent-400 transition-colors">
                                                        <strong className="block text-secondary text-sm">Process State</strong>
                                                        <span className="text-xs text-slate-500">Ready, Running, Waiting</span>
                                                    </div>
                                                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-accent-400 transition-colors">
                                                        <strong className="block text-secondary text-sm">Program Counter</strong>
                                                        <span className="text-xs text-slate-500">Address of next instruction</span>
                                                    </div>
                                                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-accent-400 transition-colors">
                                                        <strong className="block text-secondary text-sm">CPU Registers</strong>
                                                        <span className="text-xs text-slate-500">Accumulators, stack pointers</span>
                                                    </div>
                                                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-accent-400 transition-colors">
                                                        <strong className="block text-secondary text-sm">Memory Limits</strong>
                                                        <span className="text-xs text-slate-500">Base/limit registers</span>
                                                    </div>
                                                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-accent-400 transition-colors">
                                                        <strong className="block text-secondary text-sm">CPU Scheduling</strong>
                                                        <span className="text-xs text-slate-500">Priorities, queue pointers</span>
                                                    </div>
                                                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-accent-400 transition-colors">
                                                        <strong className="block text-secondary text-sm">I/O Status</strong>
                                                        <span className="text-xs text-slate-500">Allocated devices, open files</span>
                                                    </div>
                                                </div>

                                                {/*  NEW: Extracted from Lecture 03 - Process Queues & Capacity  */}
                                                <div className="mt-8 bg-sky-50 p-6 rounded-2xl border border-sky-100 shadow-sm">
                                                    <h4 className="text-xl font-bold text-sky-900 mb-4 font-merriweather">Process Queues & System Capacity</h4>
                                                    <p className="text-sm text-sky-800 mb-4">As processes enter the system, they are placed into specific queues managed by the OS.</p>

                                                    <div className="space-y-3 mb-6">
                                                        <div className="bg-white p-3 rounded-lg border border-sky-200 text-sm flex gap-3 shadow-sm">
                                                            <span className="font-bold text-sky-700 w-24 shrink-0">Job Queue:</span>
                                                            <span className="text-slate-700">Located in Secondary Memory. All PCBs are initially stored here upon creation.</span>
                                                        </div>
                                                        <div className="bg-white p-3 rounded-lg border border-sky-200 text-sm flex gap-3 shadow-sm">
                                                            <span className="font-bold text-sky-700 w-24 shrink-0">Ready Queue:</span>
                                                            <span className="text-slate-700">Located in Main Memory. Processes waiting to be assigned to the processor.</span>
                                                        </div>
                                                        <div className="bg-white p-3 rounded-lg border border-sky-200 text-sm flex gap-3 shadow-sm">
                                                            <span className="font-bold text-sky-700 w-24 shrink-0">Device Queue:</span>
                                                            <span className="text-slate-700">Processes waiting for a specific I/O device to become available.</span>
                                                        </div>
                                                    </div>

                                                    <div className="bg-sky-900 text-white p-4 rounded-xl">
                                                        <strong className="block text-sky-300 mb-2 font-merriweather text-sm">Mathematical Capacity Limits (For 'n' Processes):</strong>
                                                        <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
                                                            <div className="bg-black/30 p-2 rounded">
                                                                <span className="block text-slate-400 mb-1">Running State</span>
                                                                <span className="font-bold text-lg">Max: 1</span>
                                                            </div>
                                                            <div className="bg-black/30 p-2 rounded">
                                                                <span className="block text-slate-400 mb-1">Ready State</span>
                                                                <span className="font-bold text-lg">Max: (n-1)</span>
                                                            </div>
                                                            <div className="bg-black/30 p-2 rounded border border-rose-500/50">
                                                                <span className="block text-slate-400 mb-1">Waiting State</span>
                                                                <span className="font-bold text-lg text-rose-300">Max: n</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="lg:col-span-4">
                                                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg sticky top-24">
                                                    <h4 className="text-xl font-bold text-secondary mb-6 text-center font-merriweather">Process Memory Layout</h4>
                                                    <div className="memory-layout">
                                                        <div className="mem-block mem-stack">Stack <br /><span className="text-xs text-slate-500 font-normal">Local vars, function calls</span></div>
                                                        <div className="mem-free text-slate-400">
                                                            <span>&#8595;</span>
                                                            <em className="font-serif">Dynamic Expansion Space</em>
                                                            <span>&#8593;</span>
                                                        </div>
                                                        <div className="mem-block mem-heap">Heap <br /><span className="text-xs text-slate-500 font-normal">Dynamic memory (malloc)</span></div>
                                                        <div className="mem-block mem-data">Data Section <br /><span className="text-xs text-slate-500 font-normal">Global & static variables</span></div>
                                                        <div className="mem-block mem-text text-white">Text Section <br /><span className="text-xs text-slate-200 font-normal">Compiled binary instructions</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/*  Module 3: Scheduling Architecture (UI: Full Width Table & Cards)  */}
                                    <section id="scheduling" className="scroll-mt-32 reveal">
                                        <div className="mb-6 border-b-2 border-slate-200 pb-2 flex items-end gap-3">
                                            <span className="text-4xl font-black text-slate-300">03</span>
                                            <h3 className="text-3xl font-bold text-secondary">Schedulers & CPU Algorithms</h3>
                                        </div>

                                        {/*  Gestalt Proximity: Grouping schedulers together  */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                            <div className="glass-panel p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-blue-500">
                                                <h5 className="font-bold text-secondary text-lg border-b border-slate-300 pb-2 mb-3">Long-Term (Job)</h5>
                                                <p className="text-sm text-slate-600">Moves processes from Disk to Ready Queue. Controls the <strong className="text-blue-600">Degree of Multiprogramming</strong>. Balances I/O-bound and CPU-bound processes.</p>
                                            </div>
                                            <div className="glass-panel p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-indigo-500">
                                                <h5 className="font-bold text-secondary text-lg border-b border-slate-300 pb-2 mb-3">Short-Term (CPU)</h5>
                                                <p className="text-sm text-slate-600">Selects process from Ready Queue to execute next. Executes frequently (milliseconds). Works closely with the <strong className="text-indigo-600">Dispatcher</strong> (Context Switch).</p>
                                            </div>
                                            <div className="glass-panel p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300 border-t-4 border-t-purple-500">
                                                <h5 className="font-bold text-secondary text-lg border-b border-slate-300 pb-2 mb-3">Medium-Term</h5>
                                                <p className="text-sm text-slate-600">Part of swapping. Removes processes from main memory (swap out) to secondary memory to decrease multiprogramming temporarily.</p>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
                                            <div className="p-6 bg-slate-50 border-b border-slate-200">
                                                <h4 className="text-xl font-bold text-secondary font-merriweather">Core CPU Scheduling Algorithms</h4>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="bg-slate-900 text-white">
                                                            <th className="p-4 font-bold w-1/4">Algorithm</th>
                                                            <th className="p-4 font-bold w-1/6">Type</th>
                                                            <th className="p-4 font-bold">Mechanism & Critical Vulnerabilities</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                                                        <tr className="hover:bg-slate-50 transition-colors">
                                                            <td className="p-4 font-bold text-secondary">First-Come, First-Served (FCFS)</td>
                                                            <td className="p-4"><span className="px-3 py-1 bg-slate-200 text-slate-800 rounded-full text-xs font-bold">Non-Preemptive</span></td>
                                                            <td className="p-4 leading-relaxed">Implemented via FIFO. Simple, but suffers heavily from the <strong className="text-red-600">Convoy Effect</strong> (short processes stuck waiting behind a massive CPU-bound process).</td>
                                                        </tr>
                                                        <tr className="hover:bg-slate-50 transition-colors">
                                                            <td className="p-4 font-bold text-secondary">Shortest Job First (SJF)</td>
                                                            <td className="p-4"><span className="px-3 py-1 bg-slate-200 text-slate-800 rounded-full text-xs font-bold">Both</span></td>
                                                            <td className="p-4 leading-relaxed">Provably optimal for minimizing average waiting time. Impossible to implement perfectly as future CPU burst time cannot be exactly known.</td>
                                                        </tr>
                                                        <tr className="hover:bg-slate-50 transition-colors">
                                                            <td className="p-4 font-bold text-secondary">Round Robin (RR)</td>
                                                            <td className="p-4"><span className="px-3 py-1 bg-accent-100 text-accent-800 rounded-full text-xs font-bold">Preemptive</span></td>
                                                            <td className="p-4 leading-relaxed">Each process gets a fixed <strong className="text-accent-600">Time Quantum</strong>. Excellent response time. High context-switch overhead if quantum is too small.</td>
                                                        </tr>
                                                        <tr className="hover:bg-slate-50 transition-colors">
                                                            <td className="p-4 font-bold text-secondary">Priority Scheduling</td>
                                                            <td className="p-4"><span className="px-3 py-1 bg-slate-200 text-slate-800 rounded-full text-xs font-bold">Both</span></td>
                                                            <td className="p-4 leading-relaxed">Executes highest priority first. Major vulnerability: <strong className="text-red-600">Starvation</strong> (low priority processes never execute). Solution: <em className="font-serif font-bold">Aging</em> (gradually increasing priority).</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/*  Processes vs Threads  */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg">
                                                <h4 className="text-2xl font-bold text-accent-400 mb-4 font-merriweather">Processes vs. Threads</h4>
                                                <p className="text-slate-300 mb-6">A thread is the basic unit of CPU utilization ("Lightweight Process"). Processes are "heavyweight" with separate memory spaces.</p>

                                                <div className="space-y-6">
                                                    <div>
                                                        <strong className="text-lg text-white border-b border-slate-700 pb-1 block mb-3">Shared Across Threads</strong>
                                                        <ul className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                                                            <li>✓ Code Section (Text)</li>
                                                            <li>✓ Data Section (Globals)</li>
                                                            <li>✓ OS Resources (Files)</li>
                                                            <li>✓ Heap Memory</li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <strong className="text-lg text-white border-b border-slate-700 pb-1 block mb-3">NOT Shared (Thread-Specific)</strong>
                                                        <ul className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                                                            <li>✗ Thread ID</li>
                                                            <li>✗ Program Counter (PC)</li>
                                                            <li>✗ Register Set</li>
                                                            <li>✗ Stack</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="glass-panel p-8 rounded-2xl flex flex-col justify-center">
                                                <h4 className="text-xl font-bold text-secondary mb-4">Why use Threads?</h4>
                                                <ul className="space-y-4 text-slate-700">
                                                    <li className="flex items-start gap-3">
                                                        <span className="w-6 h-6 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center font-bold text-xs mt-0.5">1</span>
                                                        <span><strong>Responsiveness:</strong> Multithreading allows an application to remain responsive even if part of it is blocked.</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="w-6 h-6 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center font-bold text-xs mt-0.5">2</span>
                                                        <span><strong>Resource Sharing:</strong> Threads share memory by default, eliminating the need for complex Inter-Process Communication (IPC).</span>
                                                    </li>
                                                    <li className="flex items-start gap-3">
                                                        <span className="w-6 h-6 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center font-bold text-xs mt-0.5">3</span>
                                                        <span><strong>Economy:</strong> Creating and context-switching threads is significantly faster and cheaper than full processes.</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </section>

                                    {/*  Module 4: Process Synchronization  */}
                                    <section id="synchronization" className="scroll-mt-32 reveal">
                                        <div className="mb-6 border-b-2 border-slate-200 pb-2 flex items-end gap-3">
                                            <span className="text-4xl font-black text-slate-300">04</span>
                                            <h3 className="text-3xl font-bold text-secondary">Process Synchronization & Concurrency</h3>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                            {/*  F-Pattern Layout  */}
                                            <div className="lg:col-span-7 space-y-8">
                                                <div className="glass-panel p-8 rounded-2xl border-t-4 border-t-violet-500">
                                                    <h4 className="text-2xl font-bold text-secondary mb-4">Data Integrity & Race Conditions</h4>
                                                    <p className="text-slate-700 mb-4">Concurrent access to shared data may result in data inconsistency. A <strong>Race Condition</strong> occurs when several processes access and manipulate shared data concurrently. The final value depends crucially on which process finishes last.</p>

                                                    <div className="bg-violet-50 p-4 rounded-lg border border-violet-200 mb-6">
                                                        <h5 className="font-bold text-violet-900 mb-2">The Critical-Section Problem</h5>
                                                        <p className="text-sm text-violet-800">When <em>n</em> processes are competing to use shared data, we must ensure that when one process is executing in its critical section, no other process is allowed to execute in its corresponding critical section.</p>
                                                    </div>

                                                    <h5 className="text-lg font-bold text-secondary mb-3">General Structure of a Process</h5>
                                                    <div className="code-snippet mb-6">
                                                        <span className="code-keyword">do</span> {"{"}<br />
                                                                <span className="code-comment">// Entry Section: Requests permission to enter</span><br />
                                                                    <span className="code-var">critical_section()</span>;<br />
                                                                        <span className="code-comment">// Exit Section: Releases permission</span><br />
                                                                            <span className="code-var">remainder_section()</span>;<br />
                            {"}"} <span className="code-keyword">while</span> (<span className="code-keyword">true</span>);
                                                                        </div>

                                                                        <h5 className="text-lg font-bold text-secondary mb-3">3 Mandatory Requirements for a Solution:</h5>
                                                                        <ul className="space-y-3 text-sm text-slate-700">
                                                                            <li className="flex gap-3">
                                                                                <span className="font-black text-violet-600 text-lg">1</span>
                                                                                <div><strong className="text-slate-900">Mutual Exclusion:</strong> If process <em className="font-serif">P</em> is executing in its critical section, then no other processes can be executing in their critical sections.</div>
                                                                            </li>
                                                                            <li className="flex gap-3">
                                                                                <span className="font-black text-violet-600 text-lg">2</span>
                                                                                <div><strong className="text-slate-900">Progress:</strong> If no process is in its critical section, only processes attempting to enter can participate in deciding who enters next. This selection cannot be postponed indefinitely.</div>
                                                                            </li>
                                                                            <li className="flex gap-3">
                                                                                <span className="font-black text-violet-600 text-lg">3</span>
                                                                                <div><strong className="text-slate-900">Bounded Waiting:</strong> A bound must exist on the number of times other processes are allowed to enter their critical sections after a process has made a request to enter its own.</div>
                                                                            </li>
                                                                        </ul>

                                                                        {/*  UX: Inline Examiner's Trap  */}
                                                                        <div className="mt-8 bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-lg shadow-sm transition-transform hover:-translate-y-1">
                                                                            <h6 className="font-bold text-rose-800 flex items-center gap-2 text-sm mb-2">
                                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                                                                Examiner's Trap: Progress vs. Bounded Waiting
                                                                            </h6>
                                                                            <p className="text-sm text-rose-700 leading-relaxed">
                                                                                I frequently design MCQs that swap the definitions of these two rules to confuse you.<br />
                                                                                    <strong className="font-bold">The Catch:</strong> Remember that <strong>Progress</strong> guarantees the system doesn't deadlock (a process <em>outside</em> its CS cannot block others). <strong>Bounded Waiting</strong> guarantees a process won't suffer from starvation (it will eventually get its turn).
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/*  Gestalt: Visual Grouping of Solutions  */}
                                                                <div className="lg:col-span-5 space-y-6">
                                                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                                                        <h4 className="text-lg font-bold text-secondary mb-4 font-merriweather">Taxonomy of Solutions</h4>

                                                                        <div className="space-y-4">
                                                                            <div className="border-l-4 border-slate-400 pl-4 py-1">
                                                                                <strong className="block text-slate-800">1. Two-Process Solutions (Software)</strong>
                                                                                <ul className="list-disc pl-5 text-sm text-slate-600 mt-1">
                                                                                    <li>Boolean variable <code className="bg-slate-100 px-1 rounded">turn</code></li>
                                                                                    <li>Boolean array <code className="bg-slate-100 px-1 rounded">flag</code></li>
                                                                                    <li><strong>Peterson's Solution</strong> (Combines both)</li>
                                                                                </ul>
                                                                            </div>

                                                                            <div className="border-l-4 border-violet-400 pl-4 py-1">
                                                                                <strong className="block text-slate-800">2. Operating System Solutions</strong>
                                                                                <ul className="list-disc pl-5 text-sm text-slate-600 mt-1">
                                                                                    <li>Counting Semaphore</li>
                                                                                    <li>Binary Semaphore (Mutex)</li>
                                                                                </ul>
                                                                            </div>

                                                                            <div className="border-l-4 border-accent-400 pl-4 py-1">
                                                                                <strong className="block text-slate-800">3. Hardware Solutions</strong>
                                                                                <ul className="list-disc pl-5 text-sm text-slate-600 mt-1">
                                                                                    <li>Test and Set Lock (TSL)</li>
                                                                                    <li>Disable Interrupts</li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/*  Code block demonstrating Peterson's approach  */}
                                                                    <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 overflow-hidden">
                                                                        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 text-xs font-bold text-slate-300">
                                                                            Peterson's Solution Logic (Process 0)
                                                                        </div>
                                                                        <div className="p-4 code-snippet bg-transparent rounded-none">
                                                                            <span className="code-keyword">while</span> (<span className="code-keyword">true</span>) {"{"}<br />
                                                                                    flag[0] = <span className="code-keyword">true</span>;<br />
                                                                                        turn = 1;<br />
                                                                                            <span className="code-keyword">while</span> (turn == 1 && flag[1] == <span className="code-keyword">true</span>);<br />
                                                                                                <br />
                                                                                                    <span className="code-comment">// --- CRITICAL SECTION ---</span><br />
                                                                                                        <br />
                                                                                                            flag[0] = <span className="code-keyword">false</span>;<br />
                                                                                                                <span className="code-comment">// --- REMAINDER SECTION ---</span><br />
                            {"}"}
                                                                                                            </div>

                                                                                                            {/*  UX: Inline Revision Trick  */}
                                                                                                            <div className="bg-emerald-50 p-4 border-t border-emerald-200">
                                                                                                                <h6 className="font-bold text-emerald-800 flex items-center gap-2 text-sm mb-1">
                                                                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                                                                                                                    Question Setter's Numerical Catch
                                                                                                                </h6>
                                                                                                                <p className="text-xs text-emerald-700">
                                                                                                                    If asked "What is the minimum number of shared variables required in Peterson's Solution?" — The answer is <strong>3</strong>. It strictly requires a boolean <code>flag</code> array of size 2, plus one integer <code>turn</code> variable.
                                                                                                                </p>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </section>

                                                                                            {/*  Module 5: Memory Management & Virtual Memory  */}
                                                                                            <section id="memory" className="scroll-mt-32 reveal">
                                                                                                <div className="mb-6 border-b-2 border-slate-200 pb-2 flex items-end gap-3">
                                                                                                    <span className="text-4xl font-black text-slate-300">05</span>
                                                                                                    <h3 className="text-3xl font-bold text-secondary">Memory Management & Partitioning</h3>
                                                                                                </div>

                                                                                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                                                                                    {/*  F-Pattern Layout  */}
                                                                                                    <div className="lg:col-span-7 space-y-8">

                                                                                                        {/*  NEW: Extracted from Lecture 07 - Memory Hardware Physics  */}
                                                                                                        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-md text-white relative overflow-hidden">
                                                                                                            <div className="absolute right-0 top-0 w-32 h-32 bg-sky-500/10 rounded-bl-full"></div>
                                                                                                            <h4 className="text-xl font-bold text-sky-400 mb-4 font-merriweather flex items-center gap-2">
                                                                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
                                                                                                                Memory Hardware Physics (BPSC Catch)
                                                                                                            </h4>
                                                                                                            <p className="text-sm text-slate-300 mb-4">Examiners test the electronic foundation of memory layers. You must distinguish between static and dynamic architectures.</p>

                                                                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                                                                                                <div className="bg-black/40 p-4 rounded-xl border border-slate-600">
                                                                                                                    <strong className="text-emerald-400 block mb-1">Registers & SRAM (Cache)</strong>
                                                                                                                    <span className="text-slate-300">Built using <strong className="text-white">Flip-Flops</strong>. Highly expensive, incredibly fast, and does not require refreshing.</span>
                                                                                                                </div>
                                                                                                                <div className="bg-black/40 p-4 rounded-xl border border-slate-600">
                                                                                                                    <strong className="text-rose-400 block mb-1">DRAM (Main Memory / RAM)</strong>
                                                                                                                    <span className="text-slate-300">Built using <strong className="text-white">Capacitors</strong>. Cheaper, slower, and strictly requires a <em className="text-rose-200">Refreshing Circuit</em> to maintain data.</span>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>

                                                                                                        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden">
                                                                                                            <div className="absolute right-0 top-0 w-24 h-24 bg-indigo-500 opacity-5 rounded-bl-full"></div>
                                                                                                            <h4 className="text-xl font-bold text-indigo-900 mb-2 font-merriweather">Locality of Reference</h4>
                                                                                                            <p className="text-sm text-indigo-800 mb-4">The fundamental principle making Cache and Virtual Memory effective. Programs tend to access a relatively small, clustered portion of their address space at any given time.</p>
                                                                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                                                                <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-50">
                                                                                                                    <strong className="text-indigo-700 block mb-1 text-sm">Spatial Locality</strong>
                                                                                                                    <span className="text-slate-600 text-xs">If a memory location is referenced, nearby locations will likely be referenced soon (e.g., iterating through Arrays).</span>
                                                                                                                </div>
                                                                                                                <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-50">
                                                                                                                    <strong className="text-indigo-700 block mb-1 text-sm">Temporal Locality</strong>
                                                                                                                    <span className="text-slate-600 text-xs">If a memory location is referenced, it will likely be referenced again soon (e.g., executing Loops, counters).</span>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>

                                                                                                        <div className="glass-panel p-8 rounded-2xl border-t-4 border-t-sky-500">
                                                                                                            <h4 className="text-2xl font-bold text-secondary mb-4">Contiguous Allocation & Fragmentation</h4>
                                                                                                            <p className="text-slate-700 mb-4">Memory management keeps track of each primary memory (RAM) location. Early systems used <strong>Contiguous Allocation</strong>, meaning an executing process must be loaded entirely in consecutive main-memory blocks.</p>

                                                                                                            <div className="space-y-4 mb-6">
                                                                                                                <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
                                                                                                                    <h5 className="font-bold text-sky-900 mb-1">1. Fixed (Static) Partitioning</h5>
                                                                                                                    <p className="text-sm text-sky-800 leading-relaxed">Partitions are made before execution. It severely limits the <strong>Degree of Multiprogramming</strong> and suffers heavily from <strong className="text-red-600">Internal Fragmentation</strong> (unused space <em>inside</em> an allocated partition) as well as External Fragmentation.</p>
                                                                                                                </div>
                                                                                                                <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
                                                                                                                    <h5 className="font-bold text-sky-900 mb-1">2. Variable (Dynamic) Partitioning</h5>
                                                                                                                    <p className="text-sm text-sky-800 leading-relaxed">Partitions are made at runtime to perfectly fit the process size. This completely removes Internal Fragmentation, but introduces <strong className="text-red-600">External Fragmentation</strong> (free memory blocks become scattered and too small to use individually).</p>
                                                                                                                </div>
                                                                                                            </div>

                                                                                                            {/*  UX: Inline Revision Trick for Fragmentation  */}
                                                                                                            <div className="mb-8 bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-lg shadow-sm transition-transform hover:-translate-y-1">
                                                                                                                <h6 className="font-bold text-emerald-800 flex items-center gap-2 text-sm mb-3 font-merriweather">
                                                                                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                                                                                                    Revision Trick: The Fragmentation Matrix
                                                                                                                </h6>
                                                                                                                <p className="text-sm text-emerald-700 mb-3">BPSC examiners love testing your memory allocation definitions. Memorize this exact mapping to instantly solve MCQ matching questions:</p>
                                                                                                                <div className="grid grid-cols-2 gap-3 text-sm text-emerald-900 font-semibold bg-white p-3 rounded-lg border border-emerald-100">
                                                                                                                    <div className="flex items-center gap-2"><span>1. Fixed Partition</span> ➔ <span className="text-rose-600">Internal Frag.</span></div>
                                                                                                                    <div className="flex items-center gap-2"><span>2. Variable Partition</span> ➔ <span className="text-rose-600">External Frag.</span></div>
                                                                                                                    <div className="flex items-center gap-2"><span>3. Paging</span> ➔ <span className="text-rose-600">Internal Frag.</span></div>
                                                                                                                    <div className="flex items-center gap-2"><span>4. Segmentation</span> ➔ <span className="text-rose-600">External Frag.</span></div>
                                                                                                                </div>
                                                                                                            </div>

                                                                                                            <h4 className="text-2xl font-bold text-secondary mb-4">Non-Contiguous: Paging & Segmentation</h4>
                                                                                                            <p className="text-slate-700 mb-4">To solve external fragmentation, modern OS maps logical address spaces to non-contiguous physical spaces dynamically.</p>

                                                                                                            <ul className="space-y-4 text-sm text-slate-700 mb-6">
                                                                                                                <li className="flex gap-3">
                                                                                                                    <span className="bg-sky-100 text-sky-700 p-2 rounded-lg font-bold shrink-0">Paging</span>
                                                                                                                    <div>Physical memory is divided into fixed-size blocks called <strong>Frames</strong>. Logical memory is divided into blocks of the same size called <strong>Pages</strong>. This resolves External Fragmentation entirely, but minor internal fragmentation remains on the last page.</div>
                                                                                                                </li>
                                                                                                                <li className="flex gap-3">
                                                                                                                    <span className="bg-sky-100 text-sky-700 p-2 rounded-lg font-bold shrink-0">Segments</span>
                                                                                                                    <div>Logical address space is divided into variable-length blocks (Segments) reflecting program semantics (functions, arrays). Mapped via a Segment Table containing <strong>Base Address</strong> and <strong>Limit</strong>.</div>
                                                                                                                </li>
                                                                                                            </ul>
                                                                                                        </div>
                                                                                                    </div>

                                                                                                    {/*  Gestalt: Visual Grouping of Hardware Translation  */}
                                                                                                    <div className="lg:col-span-5 space-y-6">
                                                                                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                                                                                            <h4 className="text-lg font-bold text-secondary mb-4 font-merriweather">Address Translation via TLB</h4>
                                                                                                            <p className="text-sm text-slate-600 mb-4">Checking the Page Table in RAM for every instruction slows down execution drastically. The OS uses a <strong>Translation Look-aside Buffer (TLB)</strong>—a high-speed, associative hardware cache—to store recent translations.</p>

                                                                                                            <div className="flex flex-col items-center space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-200 text-sm font-semibold">
                                                                                                                <div className="bg-slate-900 text-white px-4 py-3 rounded-lg w-full text-center tracking-wide">Logical Addr: Page (<span className="text-sky-300">p</span>) | Offset (<span className="text-sky-300">d</span>)</div>
                                                                                                                <div className="text-slate-400 font-bold">&#8595;</div>
                                                                                                                <div className="flow-node w-full text-sm border-sky-400 text-sky-800 bg-sky-50 shadow-sm">TLB Hardware Cache Check</div>
                                                                                                                <div className="w-full flex justify-between px-6 text-xs font-extrabold text-slate-400 uppercase">
                                                                                                                    <span>&#8601; TLB Miss</span>
                                                                                                                    <span className="text-sky-600">TLB Hit &#8600;</span>
                                                                                                                </div>
                                                                                                                <div className="w-full flex gap-3">
                                                                                                                    <div className="w-1/2 bg-slate-200 p-3 rounded-lg text-center border border-slate-300 shadow-inner flex items-center justify-center text-xs">Search Main<br />Page Table</div>
                                                                                                                    <div className="w-1/2 bg-emerald-100 text-emerald-800 p-3 rounded-lg text-center border border-emerald-300 shadow-sm flex items-center justify-center">Extract<br />Frame (<span className="font-bold">f</span>)</div>
                                                                                                                </div>
                                                                                                                <div className="text-slate-400 font-bold">&#8595;</div>
                                                                                                                <div className="bg-emerald-800 text-white px-4 py-3 rounded-lg w-full text-center tracking-wide">Physical Addr: Frame (<span className="text-emerald-300">f</span>) | Offset (<span className="text-emerald-300">d</span>)</div>

                                                                                                                {/*  UX: Inline Examiner's Trap  */}
                                                                                                                <div className="mt-4 bg-rose-50 border border-rose-200 p-4 rounded-lg w-full text-left">
                                                                                                                    <strong className="text-rose-800 text-sm flex items-center gap-1 mb-2 font-merriweather">
                                                                                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                                                                                                        Examiner's Trap
                                                                                                                    </strong>
                                                                                                                    <p className="text-xs text-rose-700 font-normal leading-relaxed">I will ask you <em>"Where is the Page Table strictly stored?"</em>. The trap distractors are "TLB" or "Hard Disk". <br /><br /><strong>Reality:</strong> The actual Page Table is <strong>always stored in Main Memory (RAM)</strong>. The TLB is purely a high-speed hardware <em>cache</em> of recent translations to prevent double-memory access penalties.</p>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                            </section>

                                                                                            {/*  Module 6: Numerical Masterclass  */}
                                                                                            <section id="numericals" className="scroll-mt-32 reveal">
                                                                                                <div className="mb-6 border-b-2 border-slate-200 pb-2 flex items-end gap-3">
                                                                                                    <span className="text-4xl font-black text-slate-300">06</span>
                                                                                                    <h3 className="text-3xl font-bold text-secondary">Numerical Masterclass</h3>
                                                                                                </div>

                                                                                                <p className="text-slate-600 mb-8 max-w-3xl text-lg">Directly extracted from Lectures 06 & 07, these numericals test your mathematical application of OS theories. Mastering these guarantees a competitive edge in the BPSC TRE 4.0 exam.</p>

                                                                                                <div className="space-y-10">

                                                                                                    {/*  Numerical 1: Concurrency / Race Condition  */}
                                                                                                    <div className="bg-violet-900 rounded-3xl shadow-xl border border-violet-800 overflow-hidden text-white flex flex-col md:flex-row">
                                                                                                        <div className="p-8 md:w-2/5 border-b md:border-b-0 md:border-r border-violet-700 bg-violet-950/50">
                                                                                                            <div className="flex items-center gap-2 mb-4 text-violet-300">
                                                                                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                                                                                                                <h5 className="font-bold text-sm tracking-widest uppercase">Lecture 06 Problem</h5>
                                                                                                            </div>
                                                                                                            <h4 className="text-2xl font-bold mb-4 font-merriweather leading-snug">The Concurrency & Interleaving Trap</h4>
                                                                                                            <p className="text-sm text-violet-200 mb-6 leading-relaxed">The following two functions <code className="bg-violet-800 px-1.5 py-0.5 rounded text-white">P1</code> and <code className="bg-violet-800 px-1.5 py-0.5 rounded text-white">P2</code> share a variable <code className="bg-violet-800 px-1.5 py-0.5 rounded text-white">B</code> with an initial value of <strong>2</strong>. They execute concurrently.</p>

                                                                                                            <div className="space-y-4 font-mono text-sm mb-6">
                                                                                                                <div className="bg-black/40 p-4 rounded-xl border border-violet-500/30">
                                                                                                                    <span className="text-violet-400 mb-1 block text-xs">// Process P1</span>
                                                                                                                    <span className="text-pink-400">void</span> P1() {"{"}<br />
                                  C = B - 1;<br />
                                  B = 2 * C;<br />
                                {"}"}
                            </div>
                            <div className="bg-black/40 p-4 rounded-xl border border-violet-500/30">
                                <span className="text-violet-400 mb-1 block text-xs">// Process P2</span>
                                <span className="text-pink-400">void</span> P2() {"{"}<br />
                                  D = 2 * B;<br />
                                  B = D - 1;<br />
                                {"}"}
                            </div>
                        </div>
                        <p className="font-bold text-accent-400 text-lg border-l-4 border-accent-400 pl-3">Q: The number of distinct values that B can possibly take is?</p>
                    </div>
                    
                    <div className="p-8 md:w-3/5 bg-slate-900">
                        <strong className="text-accent-400 text-xl block mb-4 font-merriweather border-b border-slate-700 pb-2">Answer: 3 Distinct Values (2, 3, and 4)</strong>
                        <p className="mb-4 text-sm text-slate-300">Because there is no <em>Mutual Exclusion</em>, the CPU can switch between P1 and P2 at any point (Race Condition). Let's trace the atomic instructions:</p>
                        
                        <ul className="space-y-4">
                            <li className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 shadow-sm relative">
                                <div className="absolute top-0 right-0 bg-slate-700 text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">Path 1</div>
                                <strong className="text-white block mb-2 text-sm">Sequential Execution (P1 completes, then P2)</strong>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono text-slate-400 bg-black/30 p-2 rounded">
                                    <div>P1: C = 2 - 1 = 1</div>
                                    <div>P1: B = 2 * 1 = 2</div>
                                    <div>P2: D = 2 * 2 = 4</div>
                                    <div>P2: B = 4 - 1 = 3</div>
                                </div>
                                <div className="mt-2 text-right"><span className="font-bold text-white bg-violet-600 px-3 py-1 rounded-full text-xs shadow-md">Final B = 3</span></div>
                            </li>
                            
                            <li className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 shadow-sm relative">
                                <div className="absolute top-0 right-0 bg-slate-700 text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">Path 2</div>
                                <strong className="text-white block mb-2 text-sm">Reverse Sequential (P2 completes, then P1)</strong>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono text-slate-400 bg-black/30 p-2 rounded">
                                    <div>P2: D = 2 * 2 = 4</div>
                                    <div>P2: B = 4 - 1 = 3</div>
                                    <div>P1: C = 3 - 1 = 2</div>
                                    <div>P1: B = 2 * 2 = 4</div>
                                </div>
                                <div className="mt-2 text-right"><span className="font-bold text-white bg-violet-600 px-3 py-1 rounded-full text-xs shadow-md">Final B = 4</span></div>
                            </li>
                            
                            <li className="p-4 bg-violet-900/40 rounded-xl border border-violet-500/50 shadow-sm relative">
                                <div className="absolute top-0 right-0 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">Trap Path!</div>
                                <strong className="text-accent-300 block mb-2 text-sm">Interleaved Execution (Context Switch)</strong>
                                <div className="grid grid-cols-1 gap-1 text-xs font-mono text-slate-300 bg-black/30 p-2 rounded">
                                    <div>P1: C = 2 - 1 = 1 <em className="text-slate-500 font-sans ml-2">(Context Switch!)</em></div>
                                    <div>P2: D = 2 * 2 = 4</div>
                                    <div>P2: B = 4 - 1 = 3 <em className="text-slate-500 font-sans ml-2">(Context Switch back!)</em></div>
                                    <div>P1: B = 2 * 1 = 2 <em className="text-rose-400 font-sans ml-2">&lt;- Overwrites P2's work!</em></div>
                                </div>
                                <div className="mt-2 text-right"><span className="font-bold text-white bg-accent-600 px-3 py-1 rounded-full text-xs shadow-md">Final B = 2</span></div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/*  Numerical 2: Memory Management Conversion  */}
                <div className="bg-sky-900 rounded-3xl shadow-xl border border-sky-800 overflow-hidden text-white flex flex-col md:flex-row">
                    <div className="p-8 md:w-2/5 border-b md:border-b-0 md:border-r border-sky-700 bg-sky-950/50">
                        <div className="flex items-center gap-2 mb-4 text-sky-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
                            <h5 className="font-bold text-sm tracking-widest uppercase">Lecture 07 Problem</h5>
                        </div>
                        <h4 className="text-2xl font-bold mb-4 font-merriweather leading-snug">Address Space Bit Calculation</h4>
                        <p className="text-sm text-sky-200 mb-6 leading-relaxed">Consider a computer system with the following specifications as discussed in class:</p>
                        
                        <ul className="space-y-3 font-mono text-sm mb-6 bg-black/30 p-5 rounded-xl border border-sky-500/30">
                            <li className="flex justify-between items-center border-b border-sky-800 pb-2">
                                <span className="text-sky-400">RAM (Main Memory)</span>
                                <span className="font-bold text-white">8 GB</span>
                            </li>
                            <li className="flex justify-between items-center pt-1">
                                <span className="text-sky-400">Hard Disk (Secondary)</span>
                                <span className="font-bold text-white">512 GB</span>
                            </li>
                        </ul>
                        <p className="font-bold text-accent-400 text-lg border-l-4 border-accent-400 pl-3">Q: Calculate the exact number of bits required to represent the Physical Address and Logical Address.</p>
                    </div>
                    
                    <div className="p-8 md:w-3/5 bg-slate-900 flex flex-col justify-center">
                        <div className="space-y-8">
                            {/*  Physical Address Calc  */}
                            <div>
                                <strong className="text-emerald-400 text-lg block mb-3 font-merriweather border-b border-slate-700 pb-2">1. Physical Address (Based on RAM)</strong>
                                <div className="bg-black/50 p-4 rounded-xl border border-slate-700 font-mono text-sm space-y-2 text-slate-300">
                                    <div>Size = 8 GB</div>
                                    <div>Size = 8 &times; 1024 MB</div>
                                    <div className="text-sky-300">Size = <span className="font-bold text-white bg-sky-900/50 px-1 rounded">2<sup>3</sup></span> &times; <span className="font-bold text-white bg-sky-900/50 px-1 rounded">2<sup>30</sup></span> Bytes</div>
                                    <div className="text-emerald-400 font-bold border-t border-slate-700 pt-2 mt-2">Size = 2<sup>33</sup> Bytes   ➔   33 Bits</div>
                                </div>
                            </div>
                            
                            {/*  Logical Address Calc  */}
                            <div>
                                <strong className="text-emerald-400 text-lg block mb-3 font-merriweather border-b border-slate-700 pb-2">2. Logical Address (Based on Disk/Virtual)</strong>
                                <div className="bg-black/50 p-4 rounded-xl border border-slate-700 font-mono text-sm space-y-2 text-slate-300">
                                    <div>Size = 512 GB</div>
                                    <div>Size = 512 &times; 1024 MB</div>
                                    <div className="text-sky-300">Size = <span className="font-bold text-white bg-sky-900/50 px-1 rounded">2<sup>9</sup></span> &times; <span className="font-bold text-white bg-sky-900/50 px-1 rounded">2<sup>30</sup></span> Bytes</div>
                                    <div className="text-emerald-400 font-bold border-t border-slate-700 pt-2 mt-2">Size = 2<sup>39</sup> Bytes   ➔   39 Bits</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Numerical 3: Paging Frameworks  */}
                <div className="bg-indigo-900 rounded-3xl shadow-xl border border-indigo-800 overflow-hidden text-white flex flex-col md:flex-row">
                    <div className="p-8 md:w-2/5 border-b md:border-b-0 md:border-r border-indigo-700 bg-indigo-950/50">
                        <div className="flex items-center gap-2 mb-4 text-indigo-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            <h5 className="font-bold text-sm tracking-widest uppercase">Advanced Problem</h5>
                        </div>
                        <h4 className="text-2xl font-bold mb-4 font-merriweather leading-snug">Frames & Paging Bit Calculation</h4>
                        <p className="text-sm text-indigo-200 mb-6 leading-relaxed">Consider a system with a logical address space of 32 pages of 2 KB each, mapped onto a physical memory of 16 frames.</p>
                        
                        <p className="font-bold text-accent-400 text-lg border-l-4 border-accent-400 pl-3">Q: Calculate the number of bits required for the Logical Address and the Physical Address.</p>
                    </div>
                    
                    <div className="p-8 md:w-3/5 bg-slate-900 flex flex-col justify-center">
                        <div className="space-y-6">
                            
                            {/*  Logical Address Calc  */}
                            <div>
                                <strong className="text-emerald-400 text-lg block mb-3 font-merriweather border-b border-slate-700 pb-2">1. Logical Address Calculation (Pages)</strong>
                                <div className="bg-black/50 p-4 rounded-xl border border-slate-700 font-mono text-sm space-y-3 text-slate-300">
                                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                                        <span>Total Pages</span>
                                        <span className="text-white">32 pages = 2<sup>5</sup> ➔ <strong className="text-indigo-400">5 bits</strong></span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                                        <span>Page Size (Offset)</span>
                                        <span className="text-white">2 KB = 2<sup>11</sup> Bytes ➔ <strong className="text-indigo-400">11 bits</strong></span>
                                    </div>
                                    <div className="text-emerald-400 font-bold border-t border-slate-700 pt-2">Logical Address = 5 (Page) + 11 (Offset) = 16 Bits</div>
                                </div>
                            </div>

                            {/*  Physical Address Calc  */}
                            <div>
                                <strong className="text-emerald-400 text-lg block mb-3 font-merriweather border-b border-slate-700 pb-2">2. Physical Address Calculation (Frames)</strong>
                                <div className="bg-black/50 p-4 rounded-xl border border-slate-700 font-mono text-sm space-y-3 text-slate-300">
                                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                                        <span>Total Frames</span>
                                        <span className="text-white">16 frames = 2<sup>4</sup> ➔ <strong className="text-sky-400">4 bits</strong></span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                                        <span>Frame Size (Offset)</span>
                                        <span className="text-white">Same as Page Size ➔ <strong className="text-sky-400">11 bits</strong></span>
                                    </div>
                                    <div className="text-emerald-400 font-bold border-t border-slate-700 pt-2">Physical Address = 4 (Frame) + 11 (Offset) = 15 Bits</div>
                                    
                                    <div className="bg-slate-800/80 p-3 rounded-lg mt-3 text-xs flex gap-2">
                                        <span className="text-rose-400 shrink-0 font-bold">Trap Alert!</span>
                                        <span>Examiners trick you into calculating Frame size separately. <strong className="text-white">Rule: Frame Size is ALWAYS exactly equal to Page Size.</strong> The Offset bits (11) never change between Logical and Physical addresses!</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section>

        {/*  BPSC EXAM STRATEGY (Moved up before Assessment)  */}
                                                                                                                    <section id="bpsc-strategy" className="scroll-mt-32 reveal">
                                                                                                                        <div className="bg-secondary rounded-3xl p-8 md:p-12 shadow-2xl text-white relative overflow-hidden border-t-8 border-accent-500">
                                                                                                                            {/*  Abstract UI shapes for depth  */}
                                                                                                                            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-accent-500 opacity-10 rounded-full blur-3xl animate-float"></div>
                                                                                                                            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl animate-float-delayed"></div>

                                                                                                                            <div className="relative z-10">
                                                                                                                                <div className="flex items-center gap-4 mb-10 border-b border-slate-700 pb-6">
                                                                                                                                    <div className="bg-accent-500 p-3 rounded-xl text-white shadow-lg shadow-accent-500/30">
                                                                                                                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                                                                                                                    </div>
                                                                                                                                    <div>
                                                                                                                                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-merriweather">BPSC TRE 4.0: Mastery Cheatsheet</h2>
                                                                                                                                        <p className="text-accent-300 mt-2 font-jakarta font-medium">Exclusive: The Examiner's Point of View (P.O.V.)</p>
                                                                                                                                    </div>
                                                                                                                                </div>

                                                                                                                                {/*  Question Setter's POV Full Width Card  */}
                                                                                                                                <div className="bg-gradient-to-r from-violet-900/80 to-slate-900/80 p-[1px] rounded-2xl mb-10 shadow-lg">
                                                                                                                                    <div className="bg-slate-900 p-6 md:p-8 rounded-2xl h-full">
                                                                                                                                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 font-merriweather">
                                                                                                                                            <span className="bg-violet-600 text-white p-2 rounded-lg"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></span>
                                                                                                                                            From the Question Setter's Mind
                                                                                                                                        </h3>
                                                                                                                                        <p className="text-slate-300 mb-8 font-jakarta text-sm leading-relaxed">As an examiner designing the BPSC TRE 4.0 paper based on these exact class notes, my goal is to test your conceptual clarity, not just rote memorization. Here is exactly how I construct "trap" questions to separate average candidates from top-tier ones:</p>

                                                                                                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                                                                                                            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 relative overflow-hidden group hover:border-violet-500 transition-colors">
                                                                                                                                                <div className="absolute top-0 right-0 w-16 h-16 bg-violet-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
                                                                                                                                                <h4 className="font-bold text-accent-400 mb-3 flex items-center gap-2">
                                                                                                                                                    <span className="text-xl">📊</span> Gantt Chart Illusion
                                                                                                                                                </h4>
                                                                                                                                                <p className="text-sm text-slate-300 leading-relaxed">In scheduling numericals, I will deliberately scramble the <strong className="text-white">Arrival Time (AT)</strong> column. <em>My Expectation:</em> You must sort by Arrival Time first before allocating the CPU.</p>
                                                                                                                                            </div>
                                                                                                                                            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 relative overflow-hidden group hover:border-violet-500 transition-colors">
                                                                                                                                                <div className="absolute top-0 right-0 w-16 h-16 bg-violet-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
                                                                                                                                                <h4 className="font-bold text-accent-400 mb-3 flex items-center gap-2">
                                                                                                                                                    <span className="text-xl">🧩</span> Fragmentation Flip
                                                                                                                                                </h4>
                                                                                                                                                <p className="text-sm text-slate-300 leading-relaxed">I will swap the definitions of fragmentation. <em>My Expectation:</em> You must instantly recognize: Fixed Partition = <strong className="text-white">Internal Frag</strong>. Variable Partition = <strong className="text-rose-400">External Frag</strong>.</p>
                                                                                                                                            </div>
                                                                                                                                            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 relative overflow-hidden group hover:border-violet-500 transition-colors">
                                                                                                                                                <div className="absolute top-0 right-0 w-16 h-16 bg-violet-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
                                                                                                                                                <h4 className="font-bold text-accent-400 mb-3 flex items-center gap-2">
                                                                                                                                                    <span className="text-xl">🧵</span> Multithreading Trap
                                                                                                                                                </h4>
                                                                                                                                                <p className="text-sm text-slate-300 leading-relaxed">When asking "What do threads share?", the trap answers are Stack and Registers. <em>My Expectation:</em> You know they share the Heap/Data, but <strong className="text-white">Stacks are strictly private</strong>.</p>
                                                                                                                                            </div>
                                                                                                                                            <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 relative overflow-hidden group hover:border-violet-500 transition-colors">
                                                                                                                                                <div className="absolute top-0 right-0 w-16 h-16 bg-violet-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
                                                                                                                                                <h4 className="font-bold text-accent-400 mb-3 flex items-center gap-2">
                                                                                                                                                    <span className="text-xl">📈</span> Queue Max/Min
                                                                                                                                                </h4>
                                                                                                                                                <p className="text-sm text-slate-300 leading-relaxed">With <em>n</em> processes on a single processor, I'll ask for the max processes in the Ready Queue. <em>My Expectation:</em> 1 is running, so the max in Ready is <strong className="text-white">n - 1</strong>. Min is 0.</p>
                                                                                                                                            </div>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </div>

                                                                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                                                                                                                    {/*  Mathematical Focus & Critical Section Logic  */}
                                                                                                                                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-md">
                                                                                                                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 font-merriweather">
                                                                                                                                            <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                                                                                                                            High-Yield Exam Formulations
                                                                                                                                        </h3>
                                                                                                                                        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 font-mono text-sm mb-4">
                                                                                                                                            <div className="text-green-400"><span className="text-slate-500">TAT (Turnaround Time)</span> = Completion Time - Arrival Time</div>
                                                                                                                                            <div className="text-green-400"><span className="text-slate-500">WT (Waiting Time)</span> = TAT - Burst Time</div>
                                                                                                                                        </div>
                                                                                                                                        <div className="bg-violet-900/40 p-4 rounded-xl border border-violet-800 space-y-2 text-sm text-violet-200 mb-4">
                                                                                                                                            <strong className="text-white">Critical Section Mandates:</strong><br />
                                                                                                                                                1. Mutual Exclusion (Only 1 in CS)<br />
                                                                                                                                                    2. Progress (No deadlocks by outsiders)<br />
                                                                                                                                                        3. Bounded Waiting (No starvation)
                                                                                                                                                    </div>
                                                                                                                                                    <div className="bg-blue-900/40 p-4 rounded-xl border border-blue-800 space-y-1 text-sm text-blue-200">
                                                                                                                                                        <strong className="text-white">Memory Management Keys:</strong><br />
                                                                                                                                                            • <span className="font-bold">Logical Addr:</span> CPU generated (Page No + Page Offset)<br />
                                                                                                                                                                • <span className="font-bold">Physical Addr:</span> RAM mapped (Frame No + Frame Offset)
                                                                                                                                                            </div>
                                                                                                                                                    </div>

                                                                                                                                                    {/*  MCQ Trigger Words  */}
                                                                                                                                                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-md">
                                                                                                                                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 font-merriweather">
                                                                                                                                                            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
                                                                                                                                                            Fast-Track Keyword Mapping
                                                                                                                                                        </h3>
                                                                                                                                                        <ul className="space-y-3 text-sm text-slate-300">
                                                                                                                                                            <li className="flex justify-between items-center border-b border-slate-700 pb-1">
                                                                                                                                                                <span className="font-bold text-white">"Degree of Multiprogramming"</span> <span className="text-cyan-300">➔ LTS (Long Term Scheduler)</span>
                                                                                                                                                            </li>
                                                                                                                                                            <li className="flex justify-between items-center border-b border-slate-700 pb-1">
                                                                                                                                                                <span className="font-bold text-white">"Time Slice / Quantum"</span> <span className="text-cyan-300">➔ Round Robin (RR)</span>
                                                                                                                                                            </li>
                                                                                                                                                            <li className="flex justify-between items-center border-b border-slate-700 pb-1">
                                                                                                                                                                <span className="font-bold text-white">"Data Inconsistency"</span> <span className="text-cyan-300">➔ Race Condition</span>
                                                                                                                                                            </li>
                                                                                                                                                            <li className="flex justify-between items-center border-b border-slate-700 pb-1">
                                                                                                                                                                <span className="font-bold text-white">"Hardware Cache / Lookup"</span> <span className="text-cyan-300">➔ TLB</span>
                                                                                                                                                            </li>
                                                                                                                                                            <li className="flex justify-between items-center border-b border-slate-700 pb-1">
                                                                                                                                                                <span className="font-bold text-white">"Fixed Size Partitions"</span> <span className="text-cyan-300">➔ Paging (Frames)</span>
                                                                                                                                                            </li>
                                                                                                                                                            <li className="flex justify-between items-center">
                                                                                                                                                                <span className="font-bold text-white">"Variable Length Modules"</span> <span className="text-cyan-300">➔ Segmentation</span>
                                                                                                                                                            </li>
                                                                                                                                                        </ul>
                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </section>

                                                                                                                                {/*  Module 7: Self-Assessment & PYQs (Moved to Bottom & CBT Layout Applied)  */}
                                                                                                                                <section id="assessment" className="scroll-mt-32 reveal">
                                                                                                                                    <div className="mb-8 border-b-2 border-slate-200 pb-4 flex items-end justify-between">
                                                                                                                                        <div className="flex items-end gap-3">
                                                                                                                                            <span className="text-4xl font-black text-slate-300">07</span>
                                                                                                                                            <h3 className="text-3xl font-bold text-secondary">Final Assessment: Exam Simulator</h3>
                                                                                                                                        </div>
                                                                                                                                        <span className="hidden md:inline-block bg-accent-100 text-accent-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-accent-200">CBT Mode</span>
                                                                                                                                    </div>

                                                                                                                                    <p className="text-slate-600 mb-10 max-w-3xl text-lg">These foundational questions are extracted directly from the course modules. The layout simulates a Computer-Based Test (CBT) environment. Select your answers using the radio buttons before revealing the solutions to test your active recall.</p>

                                                                                                                                    <div className="space-y-6">

                                                                                                                                        {/*  Q1  */}
                                                                                                                                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:border-accent-400 transition-all">
                                                                                                                                            <div className="p-6 md:p-8">
                                                                                                                                                <h5 className="font-bold text-secondary text-lg mb-6 font-merriweather leading-snug flex gap-3">
                                                                                                                                                    <span className="text-accent-500 shrink-0">Q1.</span>
                                                                                                                                                    <span>A Process Control Block (PCB) does not contain which of the following?</span>
                                                                                                                                                </h5>
                                                                                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 md:pl-9">
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q1" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">a) Code</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q1" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">b) Stack</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q1" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">c) Bootstrap program</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q1" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">d) Data</span>
                                                                                                                                                    </label>
                                                                                                                                                </div>
                                                                                                                                                <div className="md:pl-9">
                                                                                                                                                    <details className="group/details">
                                                                                                                                                        <summary className="list-none cursor-pointer inline-block bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md">Reveal Solution</summary>
                                                                                                                                                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-900">
                                                                                                                                                            <strong className="text-base">Answer: c) Bootstrap program</strong>
                                                                                                                                                            <div className="mt-2 text-green-800 opacity-90 border-t border-green-200 pt-2"><strong>Explanation:</strong> The bootstrap program is stored in ROM/Firmware. The PCB is a RAM data structure used exclusively for tracking active processes.</div>
                                                                                                                                                        </div>
                                                                                                                                                    </details>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>

                                                                                                                                        {/*  Q2  */}
                                                                                                                                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:border-accent-400 transition-all">
                                                                                                                                            <div className="p-6 md:p-8">
                                                                                                                                                <h5 className="font-bold text-secondary text-lg mb-6 font-merriweather leading-snug flex gap-3">
                                                                                                                                                    <span className="text-accent-500 shrink-0">Q2.</span>
                                                                                                                                                    <span>The number of processes completed per unit time is known as:</span>
                                                                                                                                                </h5>
                                                                                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 md:pl-9">
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q2" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">a) Output</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q2" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">b) Throughput</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q2" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">c) Efficiency</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q2" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">d) Capacity</span>
                                                                                                                                                    </label>
                                                                                                                                                </div>
                                                                                                                                                <div className="md:pl-9">
                                                                                                                                                    <details className="group/details">
                                                                                                                                                        <summary className="list-none cursor-pointer inline-block bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md">Reveal Solution</summary>
                                                                                                                                                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-900">
                                                                                                                                                            <strong className="text-base">Answer: b) Throughput</strong>
                                                                                                                                                            <div className="mt-2 text-green-800 opacity-90 border-t border-green-200 pt-2"><strong>Explanation:</strong> Throughput is a standard measure of system performance indicating how much work is accomplished over a specific timeframe.</div>
                                                                                                                                                        </div>
                                                                                                                                                    </details>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>

                                                                                                                                        {/*  Q3  */}
                                                                                                                                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:border-accent-400 transition-all">
                                                                                                                                            <div className="p-6 md:p-8">
                                                                                                                                                <h5 className="font-bold text-secondary text-lg mb-6 font-merriweather leading-snug flex gap-3">
                                                                                                                                                    <span className="text-accent-500 shrink-0">Q3.</span>
                                                                                                                                                    <span>The state of a process is defined by:</span>
                                                                                                                                                </h5>
                                                                                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 md:pl-9">
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q3" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">a) the final activity of the process</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q3" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">b) the activity just executed by the process</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q3" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">c) the activity to next be executed</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q3" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">d) the current activity of the process</span>
                                                                                                                                                    </label>
                                                                                                                                                </div>
                                                                                                                                                <div className="md:pl-9">
                                                                                                                                                    <details className="group/details">
                                                                                                                                                        <summary className="list-none cursor-pointer inline-block bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md">Reveal Solution</summary>
                                                                                                                                                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-900">
                                                                                                                                                            <strong className="text-base">Answer: d) the current activity of the process</strong>
                                                                                                                                                            <div className="mt-2 text-green-800 opacity-90 border-t border-green-200 pt-2"><strong>Explanation:</strong> Process state (e.g., ready, running, waiting) is determined strictly by its current execution activity.</div>
                                                                                                                                                        </div>
                                                                                                                                                    </details>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>

                                                                                                                                        {/*  Q4  */}
                                                                                                                                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:border-accent-400 transition-all">
                                                                                                                                            <div className="p-6 md:p-8">
                                                                                                                                                <h5 className="font-bold text-secondary text-lg mb-6 font-merriweather leading-snug flex gap-3">
                                                                                                                                                    <span className="text-accent-500 shrink-0">Q4.</span>
                                                                                                                                                    <span>Which of the following is NOT the state of a process?</span>
                                                                                                                                                </h5>
                                                                                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 md:pl-9">
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q4" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">a) New</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q4" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">b) Old</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q4" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">c) Waiting</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q4" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">d) Running</span>
                                                                                                                                                    </label>
                                                                                                                                                </div>
                                                                                                                                                <div className="md:pl-9">
                                                                                                                                                    <details className="group/details">
                                                                                                                                                        <summary className="list-none cursor-pointer inline-block bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md">Reveal Solution</summary>
                                                                                                                                                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-900">
                                                                                                                                                            <strong className="text-base">Answer: b) Old</strong>
                                                                                                                                                            <div className="mt-2 text-green-800 opacity-90 border-t border-green-200 pt-2"><strong>Explanation:</strong> The 5 standard process states are New, Ready, Running, Waiting (Blocked), and Terminated.</div>
                                                                                                                                                        </div>
                                                                                                                                                    </details>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>

                                                                                                                                        {/*  Q5  */}
                                                                                                                                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:border-accent-400 transition-all">
                                                                                                                                            <div className="p-6 md:p-8">
                                                                                                                                                <h5 className="font-bold text-secondary text-lg mb-6 font-merriweather leading-snug flex gap-3">
                                                                                                                                                    <span className="text-accent-500 shrink-0">Q5.</span>
                                                                                                                                                    <span>What is a Process Control Block?</span>
                                                                                                                                                </h5>
                                                                                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 md:pl-9">
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q5" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">a) Process type variable</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q5" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">b) Data Structure</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q5" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">c) A secondary storage section</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q5" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">d) A Block in memory</span>
                                                                                                                                                    </label>
                                                                                                                                                </div>
                                                                                                                                                <div className="md:pl-9">
                                                                                                                                                    <details className="group/details">
                                                                                                                                                        <summary className="list-none cursor-pointer inline-block bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md">Reveal Solution</summary>
                                                                                                                                                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-900">
                                                                                                                                                            <strong className="text-base">Answer: b) Data Structure</strong>
                                                                                                                                                            <div className="mt-2 text-green-800 opacity-90 border-t border-green-200 pt-2"><strong>Explanation:</strong> The PCB is a specialized data structure used by the OS to store execution context regarding a process.</div>
                                                                                                                                                        </div>
                                                                                                                                                    </details>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>

                                                                                                                                        {/*  Q6  */}
                                                                                                                                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:border-accent-400 transition-all">
                                                                                                                                            <div className="p-6 md:p-8">
                                                                                                                                                <h5 className="font-bold text-secondary text-lg mb-6 font-merriweather leading-snug flex gap-3">
                                                                                                                                                    <span className="text-accent-500 shrink-0">Q6.</span>
                                                                                                                                                    <span>The entry of all the PCBs of the current processes is strictly managed in the:</span>
                                                                                                                                                </h5>
                                                                                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 md:pl-9">
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q6" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">a) Process Register</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q6" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">b) Program Counter</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q6" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">c) Process Table</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q6" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">d) Process Unit</span>
                                                                                                                                                    </label>
                                                                                                                                                </div>
                                                                                                                                                <div className="md:pl-9">
                                                                                                                                                    <details className="group/details">
                                                                                                                                                        <summary className="list-none cursor-pointer inline-block bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md">Reveal Solution</summary>
                                                                                                                                                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-900">
                                                                                                                                                            <strong className="text-base">Answer: c) Process Table</strong>
                                                                                                                                                            <div className="mt-2 text-green-800 opacity-90 border-t border-green-200 pt-2"><strong>Explanation:</strong> The OS maintains a global Process Table, which is essentially an array or linked list of all current PCBs.</div>
                                                                                                                                                        </div>
                                                                                                                                                    </details>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>

                                                                                                                                        {/*  Q7  */}
                                                                                                                                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:border-accent-400 transition-all">
                                                                                                                                            <div className="p-6 md:p-8">
                                                                                                                                                <h5 className="font-bold text-secondary text-lg mb-6 font-merriweather leading-snug flex gap-3">
                                                                                                                                                    <span className="text-accent-500 shrink-0">Q7.</span>
                                                                                                                                                    <span>What exactly defines the "Degree of Multiprogramming"?</span>
                                                                                                                                                </h5>
                                                                                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 md:pl-9">
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q7" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">a) number of processes executed per unit time</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q7" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">b) number of processes in the ready queue</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q7" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">c) number of processes in the I/O queue</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q7" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">d) number of processes currently in memory</span>
                                                                                                                                                    </label>
                                                                                                                                                </div>
                                                                                                                                                <div className="md:pl-9">
                                                                                                                                                    <details className="group/details">
                                                                                                                                                        <summary className="list-none cursor-pointer inline-block bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md">Reveal Solution</summary>
                                                                                                                                                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-900">
                                                                                                                                                            <strong className="text-base">Answer: d) number of processes currently in memory</strong>
                                                                                                                                                            <div className="mt-2 text-green-800 opacity-90 border-t border-green-200 pt-2"><strong>Explanation:</strong> It represents how many active processes are loaded in the main memory simultaneously. This is directly controlled by the Long-Term Scheduler.</div>
                                                                                                                                                        </div>
                                                                                                                                                    </details>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>

                                                                                                                                        {/*  Q8  */}
                                                                                                                                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:border-accent-400 transition-all">
                                                                                                                                            <div className="p-6 md:p-8">
                                                                                                                                                <h5 className="font-bold text-secondary text-lg mb-6 font-merriweather leading-snug flex gap-3">
                                                                                                                                                    <span className="text-accent-500 shrink-0">Q8.</span>
                                                                                                                                                    <span>A single thread of control allows the process to perform:</span>
                                                                                                                                                </h5>
                                                                                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 md:pl-9">
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q8" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">a) only one task at a time</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q8" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">b) multiple tasks at a time</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q8" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">c) only two tasks at a time</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q8" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">d) all of the mentioned</span>
                                                                                                                                                    </label>
                                                                                                                                                </div>
                                                                                                                                                <div className="md:pl-9">
                                                                                                                                                    <details className="group/details">
                                                                                                                                                        <summary className="list-none cursor-pointer inline-block bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md">Reveal Solution</summary>
                                                                                                                                                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-900">
                                                                                                                                                            <strong className="text-base">Answer: a) only one task at a time</strong>
                                                                                                                                                            <div className="mt-2 text-green-800 opacity-90 border-t border-green-200 pt-2"><strong>Explanation:</strong> Without multithreading, a standard process executes sequentially down a single execution path. Multi-core execution requires multiple threads.</div>
                                                                                                                                                        </div>
                                                                                                                                                    </details>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>

                                                                                                                                        {/*  Q9  */}
                                                                                                                                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:border-accent-400 transition-all">
                                                                                                                                            <div className="p-6 md:p-8">
                                                                                                                                                <h5 className="font-bold text-secondary text-lg mb-6 font-merriweather leading-snug flex gap-3">
                                                                                                                                                    <span className="text-accent-500 shrink-0">Q9.</span>
                                                                                                                                                    <span>What is the primary objective of multiprogramming?</span>
                                                                                                                                                </h5>
                                                                                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 md:pl-9">
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q9" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">a) Have a process running at all time</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q9" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">b) Have multiple programs waiting in a queue</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q9" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">c) To increase CPU utilization</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q9" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">d) None of the mentioned</span>
                                                                                                                                                    </label>
                                                                                                                                                </div>
                                                                                                                                                <div className="md:pl-9">
                                                                                                                                                    <details className="group/details">
                                                                                                                                                        <summary className="list-none cursor-pointer inline-block bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md">Reveal Solution</summary>
                                                                                                                                                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-900">
                                                                                                                                                            <strong className="text-base">Answer: c) To increase CPU utilization</strong>
                                                                                                                                                            <div className="mt-2 text-green-800 opacity-90 border-t border-green-200 pt-2"><strong>Explanation:</strong> By keeping multiple jobs in memory, the OS ensures the CPU is never idle while a process waits for I/O operations to complete.</div>
                                                                                                                                                        </div>
                                                                                                                                                    </details>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>

                                                                                                                                        {/*  Q10: Race Condition  */}
                                                                                                                                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:border-accent-400 transition-all">
                                                                                                                                            <div className="p-6 md:p-8">
                                                                                                                                                <h5 className="font-bold text-secondary text-lg mb-6 font-merriweather leading-snug flex gap-3">
                                                                                                                                                    <span className="text-accent-500 shrink-0">Q10.</span>
                                                                                                                                                    <span>The situation where several processes access and manipulate shared data concurrently, and the final value depends on execution order is called:</span>
                                                                                                                                                </h5>
                                                                                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 md:pl-9">
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q10" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">a) Data consistency</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q10" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">b) Race condition</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q10" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">c) Aging</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q10" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">d) Starvation</span>
                                                                                                                                                    </label>
                                                                                                                                                </div>
                                                                                                                                                <div className="md:pl-9">
                                                                                                                                                    <details className="group/details">
                                                                                                                                                        <summary className="list-none cursor-pointer inline-block bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md">Reveal Solution</summary>
                                                                                                                                                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-900">
                                                                                                                                                            <strong className="text-base">Answer: b) Race condition</strong>
                                                                                                                                                            <div className="mt-2 text-green-800 opacity-90 border-t border-green-200 pt-2"><strong>Explanation:</strong> Without mutual exclusion mechanisms, concurrent access leads to unpredictable, order-dependent results.</div>
                                                                                                                                                        </div>
                                                                                                                                                    </details>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>

                                                                                                                                        {/*  Q11: Peterson's Solution  */}
                                                                                                                                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:border-accent-400 transition-all">
                                                                                                                                            <div className="p-6 md:p-8">
                                                                                                                                                <h5 className="font-bold text-secondary text-lg mb-6 font-merriweather leading-snug flex gap-3">
                                                                                                                                                    <span className="text-accent-500 shrink-0">Q11.</span>
                                                                                                                                                    <span>A minimum of ____ variable(s) is/are required to be shared between processes to solve the critical section problem using Peterson's solution.</span>
                                                                                                                                                </h5>
                                                                                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 md:pl-9">
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q11" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">a) One</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q11" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">b) Two</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q11" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">c) Three</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q11" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">d) Four</span>
                                                                                                                                                    </label>
                                                                                                                                                </div>
                                                                                                                                                <div className="md:pl-9">
                                                                                                                                                    <details className="group/details">
                                                                                                                                                        <summary className="list-none cursor-pointer inline-block bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md">Reveal Solution</summary>
                                                                                                                                                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-900">
                                                                                                                                                            <strong className="text-base">Answer: c) Three</strong>
                                                                                                                                                            <div className="mt-2 text-green-800 opacity-90 border-t border-green-200 pt-2"><strong>Explanation:</strong> Peterson's solution mathematically requires a boolean <code>flag</code> array of size 2, and one integer <code>turn</code> variable. Total = 3 shared variables.</div>
                                                                                                                                                        </div>
                                                                                                                                                    </details>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>

                                                                                                                                        {/*  Q12: Process Termination  */}
                                                                                                                                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:border-accent-400 transition-all">
                                                                                                                                            <div className="p-6 md:p-8">
                                                                                                                                                <h5 className="font-bold text-secondary text-lg mb-6 font-merriweather leading-snug flex gap-3">
                                                                                                                                                    <span className="text-accent-500 shrink-0">Q12.</span>
                                                                                                                                                    <span>What will strictly happen when a process terminates?</span>
                                                                                                                                                </h5>
                                                                                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 md:pl-9">
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q12" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">a) It is removed from all queues</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q12" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">b) It is removed from all, but the job queue</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q12" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">c) Its process control block is de-allocated</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q12" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">d) Its process control block is never de-allocated</span>
                                                                                                                                                    </label>
                                                                                                                                                </div>
                                                                                                                                                <div className="md:pl-9">
                                                                                                                                                    <details className="group/details">
                                                                                                                                                        <summary className="list-none cursor-pointer inline-block bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md">Reveal Solution</summary>
                                                                                                                                                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-900">
                                                                                                                                                            <strong className="text-base">Answer: c) Its process control block is de-allocated</strong>
                                                                                                                                                            <div className="mt-2 text-green-800 opacity-90 border-t border-green-200 pt-2"><strong>Explanation:</strong> A process's entire existence in the OS is tracked by its PCB. Upon final termination, the OS reclaims all resources, including freeing the memory space occupied by the PCB itself.</div>
                                                                                                                                                        </div>
                                                                                                                                                    </details>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>

                                                                                                                                        {/*  NEW: Extracted from Lecture 06 MCQs  */}
                                                                                                                                        {/*  Q13: Sync Levels  */}
                                                                                                                                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:border-accent-400 transition-all">
                                                                                                                                            <div className="p-6 md:p-8">
                                                                                                                                                <h5 className="font-bold text-secondary text-lg mb-6 font-merriweather leading-snug flex gap-3">
                                                                                                                                                    <span className="text-accent-500 shrink-0">Q13.</span>
                                                                                                                                                    <span>Process synchronization can be done on:</span>
                                                                                                                                                </h5>
                                                                                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 md:pl-9">
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q13" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">a) hardware level</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q13" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">b) software level</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q13" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium border-l-4 border-accent-400 pl-2">c) both hardware and software level</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q13" className="w-4 h-4 text-accent-500 accent-accent-500" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">d) none of the mentioned</span>
                                                                                                                                                    </label>
                                                                                                                                                </div>
                                                                                                                                                <div className="md:pl-9">
                                                                                                                                                    <details className="group/details">
                                                                                                                                                        <summary className="list-none cursor-pointer inline-block bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md">Reveal Solution</summary>
                                                                                                                                                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-900">
                                                                                                                                                            <strong className="text-base">Answer: c) both hardware and software level</strong>
                                                                                                                                                            <div className="mt-2 text-green-800 opacity-90 border-t border-green-200 pt-2"><strong>Explanation:</strong> Synchronization is solved via Software (Peterson's Solution), Hardware (Test and Set Lock / Disabling Interrupts), and OS constructs (Semaphores).</div>
                                                                                                                                                        </div>
                                                                                                                                                    </details>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>

                                                                                                                                        {/*  Q14: Bounded Waiting  */}
                                                                                                                                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:border-accent-400 transition-all">
                                                                                                                                            <div className="p-6 md:p-8">
                                                                                                                                                <h5 className="font-bold text-secondary text-lg mb-6 font-merriweather leading-snug flex gap-3">
                                                                                                                                                    <span className="text-accent-500 shrink-0">Q14.</span>
                                                                                                                                                    <span>Bounded waiting implies that there exists a bound on the number of times a process is allowed to enter its critical section:</span>
                                                                                                                                                </h5>
                                                                                                                                                <div className="grid grid-cols-1 gap-3 mb-6 md:pl-9">
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q14" className="w-4 h-4 text-accent-500 accent-accent-500 shrink-0" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">a) after a process has made a request to enter its critical section and before the request is granted</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q14" className="w-4 h-4 text-accent-500 accent-accent-500 shrink-0" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">b) when another process is in its critical section</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q14" className="w-4 h-4 text-accent-500 accent-accent-500 shrink-0" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">c) before a process has made a request to enter its critical section</span>
                                                                                                                                                    </label>
                                                                                                                                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-sky-50 hover:border-sky-200 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent-500">
                                                                                                                                                        <input type="radio" name="q14" className="w-4 h-4 text-accent-500 accent-accent-500 shrink-0" />
                                                                                                                                                            <span className="text-sm text-slate-700 font-medium">d) none of the mentioned</span>
                                                                                                                                                    </label>
                                                                                                                                                </div>
                                                                                                                                                <div className="md:pl-9">
                                                                                                                                                    <details className="group/details">
                                                                                                                                                        <summary className="list-none cursor-pointer inline-block bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors shadow-md">Reveal Solution</summary>
                                                                                                                                                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-900">
                                                                                                                                                            <strong className="text-base">Answer: a) after a process has made a request...</strong>
                                                                                                                                                            <div className="mt-2 text-green-800 opacity-90 border-t border-green-200 pt-2"><strong>Explanation:</strong> This ensures that no single process is infinitely delayed (starved) while other processes continuously cut in line to enter their critical sections.</div>
                                                                                                                                                        </div>
                                                                                                                                                    </details>
                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        </div>

                                                                                                                                    </div>
                                                                                                                                </section>

                                                                                                                            </main>

                                                                                                                            <footer className="bg-white py-10 text-center text-sm border-t border-slate-200">
                                                                                                                                <p className="text-slate-500 font-semibold">Compiled for academic excellence & competitive mastery.</p>
                                                                                                                                <p className="mt-2 text-slate-400">© BPSC CS Academic Taskforce.</p>
                                                                                                                            </footer>

                                                                                                                            {/*  Reveal Animations Script  */}
        </div>
    );
};

export default OperatingSystem;
