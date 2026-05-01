// Last updated to fix ESLint whitespace and hydration nesting errors
import React, { useEffect } from 'react';

const Dsa = () => {
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
            {/*  Premium Header  */}
                                <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm animate__animated animate__fadeInDown">
                                    <div className="w-full px-4 md:px-8 lg:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div>
                                            <h1 className="font-serif text-3xl md:text-4xl font-black gradient-heading tracking-tight text-center md:text-left hover:scale-[1.02] transition-transform cursor-default">BPSC TRE 4.0 Apex Mastery</h1>
                                            <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest mt-1 text-center md:text-left">Complete DSA Syllabus (Lectures 01 - 06)</p>
                                        </div>
                                        <div className="px-5 py-2 bg-teal-50 border border-teal-200 text-teal-800 rounded-full text-sm font-bold shadow-inner flex items-center whitespace-nowrap animate-pulse-slow hover:bg-teal-100 transition-colors cursor-default">
                                            <svg className="w-4 h-4 mr-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                            100% Exam Yield Guarantee
                                        </div>
                                    </div>
                                </header>

                                <main className="w-full px-4 md:px-8 lg:px-12 py-8 md:py-12 space-y-12">

                                    {/*  SECTION 1: Algorithm Basics &amp; Control Flow  */}
                                    <section id="basics" className="glass-card p-6 md:p-10 rounded-3xl fade-in-section">
                                        <div className="flex items-center mb-8 border-b-2 border-slate-200 pb-4">
                                            <span className="bg-primary text-white text-xl md:text-2xl font-serif font-bold w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl mr-4 shrink-0 shadow-md">1</span>
                                            <h2 className="font-serif text-2xl md:text-4xl font-bold text-primary">Algorithm Basics &amp; Python Control Flow</h2>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                                            {/*  Python Loops  */}
                                            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                                <h3 className="font-bold text-xl text-slate-800 mb-4 group-hover:text-primary transition-colors">Python Loop Structures</h3>
                                                <p className="text-sm text-slate-600 mb-4">Loops control the repetitive execution of code (crucial for traversing data structures).</p>

                                                <div className="space-y-4">
                                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:border-indigo-300 transition-colors">
                                                        <strong className="text-indigo-700 block mb-1">While Loop</strong>
                                                        <p className="text-xs text-slate-600 mb-2">Runs as long as a condition is true. Best when exact iteration count is unknown.</p>
                                                        <code className="text-xs bg-slate-800 text-slate-200 p-2 rounded block hover:bg-slate-900 transition-colors">count = 0<br />while(count &lt; 10): count++</code>
                                                    </div>
                                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors">
                                                        <strong className="text-emerald-700 block mb-1">For Loop</strong>
                                                        <p className="text-xs text-slate-600 mb-2">Iterates over sequences (arrays/lists). Use <code className="font-bold bg-slate-200 px-1 hover:bg-slate-300 transition-colors">range(start, end, step)</code>.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/*  Prime Number Algorithm Optimization  */}
                                            <div className="bg-blue-50 p-6 md:p-8 rounded-2xl border border-blue-200 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-bl-lg transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">ALGORITHM OPTIMIZATION</div>
                                                <h3 className="font-bold text-xl text-blue-900 mb-4">Prime Number Check</h3>
                                                <p className="text-sm text-slate-700 mb-4">Instead of checking divisibility up to <code className="bg-white px-1 font-bold shadow-sm">n-1</code>, a highly optimized algorithm only checks up to the integer square root of <code className="bg-white px-1 font-bold shadow-sm">n</code>.</p>

                                                <pre className="code-block p-4 rounded-lg text-xs md:text-sm overflow-x-auto-custom shadow-inner">
                                                    num = 17
                                                    is_prime = True
                                                    if num &lt; 2: is_prime = False
                                                    else:
                                                    # Optimized: Check up to &radic;n
                                                    for i in range(2, int(num**0.5) + 1):
                                                    if num % i == 0:
                                                    is_prime = False
                                                    break
                                                    print(is_prime)</pre>
                                            </div>
                                        </div>
                                    </section>

                                    {/*  SECTION 2: Complexity Analysis  */}
                                    <section id="complexity" className="glass-card p-6 md:p-10 rounded-3xl border-t-4 border-t-rose-500 fade-in-section">
                                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">2. Asymptotic Notations &amp; Complexity</h2>
                                        <p className="text-sm md:text-base text-slate-600 mb-8 font-medium">Mathematical tools used to describe an algorithm's Time (CPU operations) and Space (Memory) efficiency as the input size n grows.</p>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
                                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group cursor-default">
                                                <div className="text-4xl font-black text-rose-600 mb-2 group-hover:scale-110 transition-transform inline-block">O(n)</div>
                                                <h4 className="font-bold text-slate-800 text-lg">Big-O Notation</h4>
                                                <p className="text-xs text-slate-500 mt-2 uppercase font-bold bg-rose-50 py-1 rounded group-hover:bg-rose-100 transition-colors">Worst Case Scenario</p>
                                                <p className="text-xs text-slate-600 mt-2">Defines the maximum possible time an algorithm could take (Upper Bound).</p>
                                            </div>
                                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group cursor-default">
                                                <div className="text-4xl font-black text-emerald-600 mb-2 group-hover:scale-110 transition-transform inline-block">&Omega;(n)</div>
                                                <h4 className="font-bold text-slate-800 text-lg">Omega Notation</h4>
                                                <p className="text-xs text-slate-500 mt-2 uppercase font-bold bg-emerald-50 py-1 rounded group-hover:bg-emerald-100 transition-colors">Best Case Scenario</p>
                                                <p className="text-xs text-slate-600 mt-2">Defines the minimum possible time an algorithm could take (Lower Bound).</p>
                                            </div>
                                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group cursor-default">
                                                <div className="text-4xl font-black text-blue-600 mb-2 group-hover:scale-110 transition-transform inline-block">&Theta;(n)</div>
                                                <h4 className="font-bold text-slate-800 text-lg">Theta Notation</h4>
                                                <p className="text-xs text-slate-500 mt-2 uppercase font-bold bg-blue-50 py-1 rounded group-hover:bg-blue-100 transition-colors">Average Case Scenario</p>
                                                <p className="text-xs text-slate-600 mt-2">Provides a tight bound when best and worst cases converge.</p>
                                            </div>
                                        </div>

                                        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center gap-6 hover:shadow-[0_10px_40px_rgba(15,23,42,0.3)] transition-shadow duration-300">
                                            <div className="flex-1">
                                                <h4 className="font-bold text-amber-400 text-lg mb-2 flex items-center">
                                                    <svg className="w-5 h-5 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                                    Mathematical Loop Mapping
                                                </h4>
                                                <p className="text-sm text-slate-300">In competitive exams, loops are mapped to mathematical series equations:</p>
                                                <ul className="text-sm space-y-3 mt-4 text-slate-400">
                                                    <li className="hover:text-white transition-colors duration-200"><span className="text-emerald-400 font-bold">O(1) Constant:</span> A simple assignment (e.g., x = 10).</li>
                                                    <li className="hover:text-white transition-colors duration-200"><span className="text-emerald-400 font-bold">O(n) Linear:</span> Maps to a straight line equation y = mx + c. A single loop from 1 to n.</li>
                                                    <li className="hover:text-white transition-colors duration-200"><span className="text-emerald-400 font-bold">O(n&sup2;) Quadratic:</span> Maps to a parabola y = kn&sup2;. Nested loops executing n &times; n times.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </section>

                                    {/*  SECTION 3: Linear Data Structures  */}
                                    <section id="arrays-linkedlists" className="glass-card p-6 md:p-10 rounded-3xl border-t-4 border-t-blue-500 fade-in-section">
                                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">3. Linear Data Structures: Arrays &amp; Linked Lists</h2>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                                            {/*  Arrays  */}
                                            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                                <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-[10px] md:text-xs font-bold px-3 py-1 rounded-bl-lg">STATIC MEMORY</div>
                                                <h3 className="font-bold text-xl md:text-2xl text-slate-800 mb-4">Array Architecture</h3>
                                                <p className="text-sm text-slate-600 mb-6">Homogeneous, contiguous memory. Allows <code className="bg-slate-100 px-1 rounded font-mono text-emerald-600 shadow-sm">O(1)</code> random access but suffers from <code className="bg-slate-100 px-1 rounded font-mono text-rose-600 shadow-sm">O(n)</code> insertion shifting.</p>
                                                <div className="mb-6 transform group-hover:scale-[1.02] transition-transform duration-300 origin-left">
                                                    <strong className="text-sm block mb-2 text-slate-700">Address Calculation Formula (1D):</strong>
                                                    <div className="bg-slate-900 text-green-400 p-3 rounded-lg font-mono text-xs md:text-sm shadow-inner overflow-x-auto-custom whitespace-nowrap border-l-4 border-green-400">
                                                        Addr = Base_Addr + (Index &times; Size_of_Datatype)
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-red-50 border border-red-100 rounded-lg shadow-sm hover:bg-red-100 transition-colors duration-300">
                                                    <strong className="text-red-800 text-sm font-bold block mb-1 flex items-center">
                                                        <svg className="w-4 h-4 mr-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                                        BPSC Trap Alert: Array Size
                                                    </strong>
                                                    <p className="text-xs text-red-700">If an array is declared as <code>int arr[15]</code> and integer size is 4 bytes, total memory allocated is <b className="bg-white/50 px-1 rounded">15 &times; 4 = 60 bytes</b>. The index ranges exactly from <b className="bg-white/50 px-1 rounded">0 to 14</b>.</p>
                                                </div>
                                            </div>

                                            {/*  Linked Lists  */}
                                            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                                <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-800 text-[10px] md:text-xs font-bold px-3 py-1 rounded-bl-lg">DYNAMIC MEMORY</div>
                                                <h3 className="font-bold text-xl md:text-2xl text-slate-800 mb-4">Linked Lists</h3>
                                                <p className="text-sm text-slate-600 mb-6">Nodes scattered in memory, connected via pointers. Provides <code className="bg-slate-100 px-1 rounded font-mono text-emerald-600 shadow-sm">O(1)</code> insertion/deletion but <code className="bg-slate-100 px-1 rounded font-mono text-rose-600 shadow-sm">O(n)</code> for access.</p>

                                                <strong className="text-sm block mb-3 text-slate-700">Singly Linked List Memory Trace:</strong>
                                                <div className="flex items-center space-x-2 overflow-x-auto-custom pb-4 py-2 pl-2 -ml-2">
                                                    <div className="text-xs font-bold text-indigo-600 mb-6 px-1 shrink-0 animate-bounce">HEAD<br />&darr;</div>
                                                    <div className="ll-node"><div className="ll-data">A</div><div className="ll-next">*</div></div>
                                                    <span className="text-slate-400 font-black shrink-0 animate-pulse">&rarr;</span>
                                                    <div className="ll-node"><div className="ll-data">B</div><div className="ll-next">null</div></div>
                                                    <span className="text-slate-500 font-bold text-sm bg-slate-100 px-2 py-1 rounded shrink-0 shadow-sm border border-slate-200">NULL</span>
                                                </div>

                                                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-lg shadow-sm hover:border-emerald-300 transition-colors duration-300">
                                                    <strong className="text-emerald-800 text-sm font-bold block mb-2 border-b border-emerald-200/50 pb-1">Insertion Logic (Pseudo-code)</strong>
                                                    <p className="text-xs text-slate-700 font-mono leading-relaxed">
                                                        1. new_node = memory_alloc()<br />
                            2. new_node-&gt;data = val<br />
                                                                <span className="bg-emerald-200/50 px-1 rounded">3. new_node-&gt;next = curr-&gt;next</span><br />
                                                                    <span className="bg-emerald-200/50 px-1 rounded">4. curr-&gt;next = new_node</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                </div>
                                            </section>

                                            {/*  SECTION 4: Masterclass - Expressions  */}
                                            <section id="expressions-masterclass" className="glass-card p-6 md:p-10 rounded-3xl border-t-4 border-t-indigo-600 fade-in-section">
                                                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">4. Masterclass: Notations &amp; Stacks</h2>
                                                <p className="text-sm md:text-base text-slate-600 mb-8 font-medium">Stacks (LIFO) track local variables during recursion and power mathematical expression parsers (Postfix/Prefix).</p>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                                    {/*  Infix  */}
                                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                                        <div className="font-bold text-slate-800 text-xl mb-1">Infix Notation</div>
                                                        <div className="text-xs font-semibold text-indigo-600 mb-4 bg-indigo-100 inline-block px-2 py-1 rounded shadow-sm">Operator BETWEEN Operands</div>
                                                        <code className="block bg-white p-4 rounded-lg border border-slate-200 font-bold text-center text-xl shadow-sm mb-4">A + B * C</code>
                                                        <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5 marker:text-indigo-400">
                                                            <li>Human-readable format.</li>
                                                            <li>Requires Brackets <code className="bg-slate-200 px-1 font-bold rounded shadow-sm">()</code>.</li>
                                                            <li>Complex Precedence rules.</li>
                                                        </ul>
                                                    </div>
                                                    {/*  Prefix  */}
                                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                                        <div className="font-bold text-slate-800 text-xl mb-1">Prefix (Polish)</div>
                                                        <div className="text-xs font-semibold text-rose-600 mb-4 bg-rose-100 inline-block px-2 py-1 rounded shadow-sm">Operator BEFORE Operands</div>
                                                        <code className="block bg-white p-4 rounded-lg border border-slate-200 font-bold text-center text-xl shadow-sm mb-4">+ A * B C</code>
                                                        <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5 marker:text-rose-400">
                                                            <li>Machine-friendly notation.</li>
                                                            <li>Evaluated right-to-left.</li>
                                                            <li>No brackets needed!</li>
                                                        </ul>
                                                    </div>
                                                    {/*  Postfix  */}
                                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 border-b-4 border-b-emerald-500 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                                                        <div className="absolute -right-6 -top-6 w-16 h-16 bg-emerald-100 rounded-full animate-pulse-slow"></div>
                                                        <div className="font-bold text-slate-800 text-xl mb-1 relative z-10">Postfix (Rev. Polish)</div>
                                                        <div className="text-xs font-semibold text-emerald-600 mb-4 bg-emerald-100 inline-block px-2 py-1 rounded shadow-sm relative z-10">Operator AFTER Operands</div>
                                                        <code className="block bg-white p-4 rounded-lg border border-emerald-200 font-bold text-center text-xl shadow-md mb-4 relative z-10">A B C * +</code>
                                                        <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5 marker:text-emerald-500 relative z-10">
                                                            <li><b className="text-emerald-700 bg-emerald-50 px-1 rounded">Highly favored in BPSC.</b></li>
                                                            <li>Evaluated left-to-right via Stack.</li>
                                                            <li>Push operands, operator pops two.</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/*  Conversion Algorithms Grid  */}
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                                                    {/*  Infix to Postfix Algorithm  */}
                                                    <div className="bg-indigo-50 rounded-2xl p-6 md:p-8 border border-indigo-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                                        <h3 className="font-bold text-xl md:text-2xl text-indigo-900 mb-3 flex items-center">
                                                            Conversion: Infix &rarr; Postfix
                                                        </h3>
                                                        <p className="text-sm text-slate-700 mb-4">Convert <code className="font-bold text-indigo-700 text-base bg-white px-1 shadow-sm rounded">A + B * C</code> using the <b>Golden Precedence Rule</b>: <br /><i>"Before pushing an operator, POP operators from the stack top that have <b>Greater or Equal (&ge;)</b> precedence. Then push."</i></p>

                                                        <div className="overflow-x-auto-custom bg-white rounded-xl border border-slate-200 shadow-sm">
                                                            <table className="w-full text-left text-sm border-collapse min-w-[500px]">
                                                                <thead>
                                                                    <tr className="bg-indigo-900 text-white">
                                                                        <th className="p-3 border-r border-indigo-700/50 w-1/5">Token Read</th>
                                                                        <th className="p-3 border-r border-indigo-700/50 w-1/5">Stack State</th>
                                                                        <th className="p-3 border-r border-indigo-700/50 w-1/4">Output String</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-slate-200">
                                                                    <tr className="hover:bg-indigo-50/50 transition-colors">
                                                                        <td className="p-3 font-bold text-lg text-center">A</td>
                                                                        <td className="p-3 font-mono text-slate-400 text-center">Empty</td>
                                                                        <td className="p-3 font-mono font-bold text-emerald-600">A</td>
                                                                    </tr>
                                                                    <tr className="hover:bg-indigo-50/50 transition-colors">
                                                                        <td className="p-3 font-bold text-lg text-center text-indigo-600">+</td>
                                                                        <td className="p-3 font-mono font-bold text-indigo-600 text-center">+</td>
                                                                        <td className="p-3 font-mono font-bold text-emerald-600">A</td>
                                                                    </tr>
                                                                    <tr className="hover:bg-indigo-50/50 transition-colors">
                                                                        <td className="p-3 font-bold text-lg text-center">B</td>
                                                                        <td className="p-3 font-mono font-bold text-indigo-600 text-center">+</td>
                                                                        <td className="p-3 font-mono font-bold text-emerald-600">A B</td>
                                                                    </tr>
                                                                    <tr className="bg-amber-50/50 hover:bg-amber-100/50 transition-colors">
                                                                        <td className="p-3 font-bold text-lg text-center text-indigo-600">*</td>
                                                                        <td className="p-3 font-mono font-bold text-indigo-600 text-center">+ *</td>
                                                                        <td className="p-3 font-mono font-bold text-emerald-600">A B <br /><span className="text-[10px] text-amber-700 italic font-sans bg-amber-100/50 px-1 rounded">* is &gt; +, safe to push</span></td>
                                                                    </tr>
                                                                    <tr className="hover:bg-indigo-50/50 transition-colors">
                                                                        <td className="p-3 font-bold text-lg text-center">C</td>
                                                                        <td className="p-3 font-mono font-bold text-indigo-600 text-center">+ *</td>
                                                                        <td className="p-3 font-mono font-bold text-emerald-600">A B C</td>
                                                                    </tr>
                                                                    <tr className="bg-indigo-100/50">
                                                                        <td className="p-3 font-bold italic text-slate-600 text-center text-xs">End</td>
                                                                        <td className="p-3 font-mono text-slate-400 text-center">Empty</td>
                                                                        <td className="p-3 font-mono font-black text-indigo-700 text-lg">A B C * +</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                    {/*  Call Stack Trace Visual &amp; Definitions  */}
                                                    <div className="flex-1 bg-slate-900 p-6 md:p-8 rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.4)] text-white w-full group transition-all duration-500 hover:shadow-[0_15px_40px_rgba(15,23,42,0.6)]">
                                                        <h3 className="font-bold text-amber-400 text-lg md:text-xl mb-4 border-b border-slate-700 pb-2 flex items-center">
                                                            <svg className="w-5 h-5 mr-2 shrink-0 group-hover:animate-spin" style={{animationDuration: '3s'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                                                            Recursion &amp; The Call Stack: factorial(3)
                                                        </h3>
                                                        <p className="text-xs md:text-sm text-slate-400 mb-6 leading-relaxed">Recursion pushes calls to the stack until the <span className="text-emerald-400 font-bold bg-emerald-900/30 px-1 rounded">Base Case</span> is met, then <span className="text-blue-300 font-bold bg-blue-900/30 px-1 rounded">Unwinds</span> backward.</p>

                                                        <div className="flex flex-col items-center space-y-2 font-mono text-[10px] md:text-xs">
                                                            <div className="bg-slate-800 border border-slate-600 px-4 py-2 rounded w-full max-w-[280px] flex justify-between relative hover:bg-slate-700 transition-colors cursor-default">
                                                                <span>factorial(3)</span> <span className="text-blue-400 animate-pulse">Wait...</span>
                                                            </div>
                                                            <div className="text-slate-500 animate-float" style={{animationDelay: '0s'}}>&uarr; (Pushed)</div>
                                                            <div className="bg-slate-800 border border-slate-600 px-4 py-2 rounded w-full max-w-[280px] flex justify-between hover:bg-slate-700 transition-colors cursor-default">
                                                                <span>3 * factorial(2)</span> <span className="text-blue-400 animate-pulse">Wait...</span>
                                                            </div>
                                                            <div className="text-slate-500 animate-float" style={{animationDelay: '0.5s'}}>&uarr; (Pushed)</div>
                                                            <div className="bg-slate-800 border border-slate-600 px-4 py-2 rounded w-full max-w-[280px] flex justify-between hover:bg-slate-700 transition-colors cursor-default">
                                                                <span>2 * factorial(1)</span> <span className="text-blue-400 animate-pulse">Wait...</span>
                                                            </div>
                                                            <div className="text-slate-500 animate-float" style={{animationDelay: '1s'}}>&uarr; (Pushed)</div>
                                                            <div className="bg-emerald-900 border border-emerald-500 text-emerald-300 px-4 py-3 rounded w-full max-w-[280px] text-center font-bold text-sm shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:scale-105 transition-transform cursor-default">
                                                                1 (Base Case Return)
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </section>

                                            {/*  SECTION 5: Masterclass - Queues  */}
                                            <section id="queues-masterclass" className="glass-card p-6 md:p-10 rounded-3xl border-t-4 border-t-teal-600 fade-in-section">
                                                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">5. Masterclass: Queues &amp; Circular Buffers</h2>
                                                <p className="text-sm md:text-base text-slate-600 mb-8 font-medium">FIFO (First In, First Out) architecture. Critical for OS task scheduling, print spooling, and Breadth-First Search (BFS) algorithms. Elements are exclusively inserted at the <code className="font-bold text-rose-600 bg-rose-50 px-1 rounded shadow-sm">REAR</code> and removed from the <code className="font-bold text-emerald-600 bg-emerald-50 px-1 rounded shadow-sm">FRONT</code>.</p>

                                                {/*  Core Operations &amp; State  */}
                                                <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm mb-8 hover:shadow-md transition-shadow duration-300">
                                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                                        <div className="flex-1 w-full">
                                                            <h3 className="font-bold text-slate-800 text-xl mb-4 border-b border-slate-200 pb-2">Queue Anatomy &amp; Initial State</h3>
                                                            <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg mb-4 shadow-sm hover:bg-teal-100/50 transition-colors">
                                                                <span className="text-xs font-bold text-teal-800 uppercase block mb-1 flex items-center">
                                                                    <svg className="w-4 h-4 mr-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                                    Crucial Exam Fact: Empty State
                                                                </span>
                                                                <p className="text-sm text-slate-700">When a queue is initially created (empty), both pointers are set to <code className="font-mono font-bold bg-white px-2 py-0.5 rounded text-rose-600 shadow-sm">-1</code>. Do NOT select 0 in MCQs.</p>
                                                            </div>
                                                            <ul className="space-y-3 text-sm text-slate-700">
                                                                <li className="flex items-center hover:translate-x-1 transition-transform cursor-default"><span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded text-xs mr-3 min-w-[90px] text-center shadow-sm">ENQUEUE</span> Inserts an item. Increments the <code className="font-mono px-1 font-bold">Rear</code> pointer.</li>
                                                                <li className="flex items-center hover:translate-x-1 transition-transform cursor-default"><span className="bg-rose-100 text-rose-800 font-bold px-2 py-1 rounded text-xs mr-3 min-w-[90px] text-center shadow-sm">DEQUEUE</span> Removes an item. Increments the <code className="font-mono px-1 font-bold">Front</code> pointer.</li>
                                                            </ul>
                                                        </div>

                                                        {/*  Algorithmic Conditions  */}
                                                        <div className="flex-1 w-full bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors duration-300">
                                                            <h4 className="font-bold text-indigo-900 text-sm uppercase tracking-wider mb-3">Algorithmic Overflow / Underflow</h4>
                                                            <div className="space-y-3 font-mono text-xs md:text-sm">
                                                                <div className="bg-rose-50/50 p-3 rounded border border-rose-100 hover:bg-rose-50 transition-colors">
                                                                    <span className="text-rose-800 font-bold block mb-1">// Overflow Condition (Linear)</span>
                                                                    if (Rear == MAX - 1):<br />&nbsp;&nbsp;print("Queue is Full")
                                                                </div>
                                                                <div className="bg-amber-50/50 p-3 rounded border border-amber-100 hover:bg-amber-50 transition-colors">
                                                                    <span className="text-amber-800 font-bold block mb-1">// Underflow Condition</span>
                                if (Front == -1) OR (Front &gt; Rear):<br />&nbsp;&nbsp;print("Queue is Empty")
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                    {/*  Linear Queue &amp; Memory Wastage  */}
                                                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                                        <div className="absolute top-0 right-0 bg-rose-100 text-rose-800 text-[10px] md:text-xs font-bold px-3 py-1 rounded-bl-lg transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">MAJOR FLAW</div>
                                                        <h3 className="font-bold text-xl text-slate-800 mb-4 group-hover:text-rose-800 transition-colors">Linear Queue &amp; Memory Wastage</h3>
                                                        <p className="text-sm text-slate-600 mb-4">In a linear queue, once <code className="font-mono text-rose-600 bg-rose-50 px-1 rounded">Rear</code> reaches the end of the array (<code className="font-mono bg-slate-100 px-1 rounded">MAX-1</code>), it reports an Overflow. <b>Even if elements have been dequeued</b>, that freed space cannot be reused!</p>

                                                        <div className="flex flex-col items-center justify-center py-4 overflow-x-auto-custom">
                                                            <span className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">Wastage Visualization</span>
                                                            <div className="flex items-end">
                                                                <div className="flex flex-col items-center mr-2">
                                                                    <span className="text-xs font-bold text-slate-400 mb-1">Index 0,1</span>
                                                                    <div className="queue-container bg-red-50/50 border-red-200 rounded-l shadow-inner">
                                                                        <div className="queue-cell bg-slate-200 text-slate-400 border-slate-300 opacity-50 relative overflow-hidden"><div className="absolute w-full h-0.5 bg-red-400 transform rotate-45"></div></div>
                                                                        <div className="queue-cell bg-slate-200 text-slate-400 border-slate-300 opacity-50 relative overflow-hidden"><div className="absolute w-full h-0.5 bg-red-400 transform rotate-45"></div></div>
                                                                    </div>
                                                                    <span className="text-[10px] font-bold text-red-500 mt-1 uppercase animate-pulse">Wasted Space!</span>
                                                                </div>
                                                                <div className="flex flex-col items-center">
                                                                    <span className="text-xs font-bold text-emerald-600 mb-1 whitespace-nowrap">FRONT</span>
                                                                    <div className="queue-container shadow-sm rounded-r border-l-0">
                                                                        <div className="queue-cell">22</div>
                                                                        <div className="queue-cell">9</div>
                                                                        <div className="queue-cell bg-rose-50 border-rose-400">45</div>
                                                                    </div>
                                                                    <span className="text-xs font-bold text-rose-600 mt-1 whitespace-nowrap">REAR (Max)</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/*  Circular Queue  */}
                                                    <div className="p-6 bg-gradient-to-br from-teal-900 to-slate-900 rounded-2xl shadow-lg text-white group hover:shadow-[0_10px_30px_rgba(15,118,110,0.3)] transition-all duration-300 transform hover:-translate-y-1">
                                                        <h3 className="font-bold text-xl text-teal-300 mb-4 flex items-center">
                                                            Circular Queue (Ring Buffer)
                                                            <svg className="w-5 h-5 ml-2 animate-spin-slow opacity-50 group-hover:opacity-100 transition-opacity" style={{animationDuration: '4s'}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                                        </h3>
                                                        <p className="text-sm text-slate-300 mb-6">Solves the linear queue memory wastage trap. By utilizing modulo arithmetic, the last position logically wraps around and connects back to the first available index (0).</p>

                                                        <div className="bg-black/40 p-5 rounded-xl font-mono text-xs md:text-sm border border-teal-500/30 overflow-x-auto-custom whitespace-nowrap shadow-inner group-hover:border-teal-500/50 transition-colors">
                                                            <span className="text-slate-400 block mb-1">// The Magic Wrap-Around Formula (Enqueue)</span>
                                                            <span className="text-amber-400">rear</span> = (<span className="text-amber-400">rear</span> + 1) <span className="text-rose-400 font-bold bg-rose-900/50 px-1 rounded">%</span> MAX_SIZE;
                                                            <br /><br />
                                                                <span className="text-slate-400 block mb-1">// Circular Overflow Condition</span>
                                                                <span className="text-slate-500 text-[10px] block mb-1">/* Queue is full if the next position of rear hits front */</span>
                                                                if ((rear + 1) <span className="font-bold text-rose-400 bg-rose-900/50 px-0.5 rounded">%</span> MAX_SIZE == front) {"{"} <br />
                        &nbsp;&nbsp;print("Circular Queue Overflow"); <br />
                        {"}"}
                    </div>

                    <div className="mt-6 bg-black/40 p-5 rounded-xl font-mono text-xs md:text-sm border border-teal-500/30 overflow-x-auto-custom whitespace-nowrap shadow-inner group-hover:border-teal-500/50 transition-colors">
                        <span className="text-teal-400 font-bold block mb-3 border-b border-teal-500/30 pb-2">Algorithm: Circular Queue Insertion (Enqueue)</span>
                        <span className="text-slate-300 block mb-3">procedure enqueue(value):</span>
                        
                        <span className="text-slate-500 block ml-4 hover:text-slate-300 transition-colors">// Step 1: Check for Overflow</span>
                        <span className="text-rose-300 block ml-4">if ((rear + 1) % MAX_SIZE == front):</span>
                        <span className="text-rose-300 block ml-8">print "Queue is Full"</span>
                        <span className="text-rose-300 block ml-8">return</span>
                        <br />
                        <span className="text-slate-500 block ml-4 hover:text-slate-300 transition-colors">// Step 2: Check if Queue is initially empty</span>
                        <span className="text-emerald-300 block ml-4">else if (front == -1 and rear == -1):</span>
                        <span className="text-emerald-300 block ml-8">front = 0</span>
                        <span className="text-emerald-300 block ml-8">rear = 0</span>
                        <br />
                        <span className="text-slate-500 block ml-4 hover:text-slate-300 transition-colors">// Step 3: Normal wrap-around increment</span>
                        <span className="text-amber-300 block ml-4">else:</span>
                        <span className="text-amber-300 block ml-8">rear = (rear + 1) % MAX_SIZE</span>
                        <br />
                        <span className="text-slate-500 block ml-4 hover:text-slate-300 transition-colors">// Step 4: Insert the element</span>
                        <span className="text-white font-bold block ml-4">queue[rear] = value</span>
                    </div>
                </div>
            </div>
        </section>

        {/*  SECTION 6: Masterclass - Trees &amp; Traversals  */}
                                                                <section id="trees-masterclass" className="glass-card p-6 md:p-10 rounded-3xl border-t-4 border-t-emerald-600 fade-in-section">
                                                                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">6. Masterclass: Trees &amp; Traversals</h2>
                                                                    <p className="text-sm md:text-base text-slate-600 mb-8 font-medium">Non-linear hierarchical storage. The traversal names (Pre, In, Post) refer to <b>when the ROOT node is visited</b>.</p>

                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                                                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                                                            <h3 className="font-bold text-emerald-800 text-xl mb-4">Tree Morphology Definitions</h3>
                                                                            <ul className="space-y-3 text-sm text-slate-700">
                                                                                <li className="hover:translate-x-1 transition-transform"><b className="text-slate-900">Edges Rule:</b> A tree with <code className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-1 rounded shadow-sm">N</code> nodes contains exactly <code className="font-mono text-xs bg-slate-100 px-1 font-bold text-rose-600 rounded shadow-sm">N - 1</code> edges.</li>
                                                                                <li className="hover:translate-x-1 transition-transform"><b className="text-slate-900">Strictly Binary Tree:</b> Every node has either exactly 0 or exactly 2 children. (Never 1).</li>
                                                                                <li className="hover:translate-x-1 transition-transform"><b className="text-slate-900">Binary Tree Max Children:</b> The maximum number of children a binary tree node can have is <b className="text-rose-600 bg-rose-50 px-1 rounded">2</b>.</li>
                                                                                <li className="hover:translate-x-1 transition-transform"><b className="text-slate-900">Complete Binary Tree:</b> All levels fully filled except possibly the last level, filled strictly left to right.</li>
                                                                            </ul>
                                                                        </div>

                                                                        <div className="bg-emerald-50 p-6 md:p-8 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
                                                                            <h3 className="font-bold text-emerald-900 text-xl mb-4">Array Implementation of Trees</h3>
                                                                            <p className="text-sm text-slate-700 mb-4">Trees can be mapped to Arrays. Root is at index 1. Left child = <code className="font-mono font-bold text-emerald-800 bg-white px-1 rounded shadow-sm">2*i</code>, Right child = <code className="font-mono font-bold text-emerald-800 bg-white px-1 rounded shadow-sm">2*i + 1</code>.</p>
                                                                            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:border-rose-200 transition-colors">
                                                                                <strong className="text-rose-800 text-sm font-bold block mb-2 flex items-center">
                                                                                    <svg className="w-4 h-4 mr-1 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                                                                    Major Disadvantages (Exam MCQs)
                                                                                </strong>
                                                                                <ul className="text-xs text-slate-600 list-disc pl-4 space-y-2">
                                                                                    <li>You <b className="text-rose-600 bg-rose-50 px-1 rounded">must know the max number of nodes possible before creation</b> of the tree.</li>
                                                                                    <li>The array for a tree of height 'L' must be explicitly allocated as size <code className="bg-slate-100 px-1 rounded font-bold border border-slate-200 text-rose-600 shadow-sm">2<sup>L</sup> - 1</code>, resulting in massive memory wastage for skewed trees.</li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/*  NEW ADDITION: Linked Implementation  */}
                                                                    <div className="bg-indigo-50 p-6 md:p-8 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow mb-10">
                                                                        <div className="flex flex-col lg:flex-row gap-8 items-center">
                                                                            <div className="flex-1">
                                                                                <h3 className="font-bold text-indigo-900 text-xl mb-4 flex items-center">
                                                                                    <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                                                                                    Linked (Dynamic) Implementation of Trees
                                                                                </h3>
                                                                                <p className="text-sm text-slate-700 mb-4">To overcome array disadvantages, trees are universally implemented using <strong>Pointers (Dynamic Memory Allocation)</strong>. A tree node consists of three parts: <code className="bg-white px-1 shadow-sm font-bold text-indigo-700 rounded">Data</code>, a pointer to the <code className="bg-white px-1 shadow-sm font-bold text-indigo-700 rounded">Left Child</code>, and a pointer to the <code className="bg-white px-1 shadow-sm font-bold text-indigo-700 rounded">Right Child</code>.</p>
                                                                                <div className="bg-white p-4 rounded-lg border border-indigo-200 shadow-sm">
                                                                                    <strong className="text-emerald-700 text-sm font-bold block mb-2">Key Exam Advantages:</strong>
                                                                                    <ul className="text-xs text-slate-600 list-disc pl-4 space-y-1">
                                                                                        <li>Memory is allocated exactly when needed (No wasted memory for skewed trees).</li>
                                                                                        <li>Tree size can grow dynamically without predefined maximum limits.</li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-1 w-full">
                                                                                <div className="bg-slate-900 rounded-xl p-5 shadow-inner border border-slate-700 group hover:border-indigo-500 transition-colors">
                                                                                    <span className="text-indigo-400 font-bold block mb-3 text-xs uppercase tracking-widest border-b border-slate-700 pb-2">C / C++ Struct Representation (From Notes)</span>
                                                                                    <pre className="font-mono text-sm text-slate-300 leading-relaxed overflow-x-auto-custom whitespace-nowrap">
                                                                                        <span className="text-rose-400">struct</span> <span className="text-amber-300">Node</span> {"{"}
                                                                                            <span className="text-blue-300">char</span> data;
                                                                                        <span className="text-amber-300">Node</span> *left;
                                                                                        <span className="text-amber-300">Node</span> *right;
{"}"};</pre>
                                                                                    <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-700">
                                                                                        <span className="text-emerald-400 font-bold">Exam Rule:</span> If a node has no children (Leaf Node), its <code className="text-white bg-slate-800 px-1 rounded">left</code> and <code className="text-white bg-slate-800 px-1 rounded">right</code> pointers are explicitly set to <code className="text-rose-400 font-bold bg-slate-800 px-1 rounded">NULL</code>.
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/*  Deep Dive: Tree Traversals  */}
                                                                    <div className="bg-slate-900 p-6 md:p-10 rounded-2xl border border-slate-700 text-white shadow-[0_10px_30px_rgba(15,23,42,0.4)] flex flex-col lg:flex-row gap-10 items-center hover:shadow-[0_15px_40px_rgba(15,23,42,0.5)] transition-shadow duration-300">

                                                                        {/*  Traversal Logic  */}
                                                                        <div className="flex-1 w-full space-y-6">
                                                                            <div className="mb-2 border-b border-slate-700 pb-4">
                                                                                <h3 className="font-bold text-amber-400 text-2xl flex items-center flex-wrap gap-2">
                                                                                    <span className="bg-amber-500 text-slate-900 px-2 py-1 rounded text-xs font-black tracking-widest shrink-0 shadow-sm">MASTERCLASS</span>
                                                                                    Traversal Mechanics
                                                                                </h3>
                                                                            </div>

                                                                            <div className="border-b border-slate-700 pb-4 group cursor-default">
                                                                                <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                                                                                    <span className="font-bold text-blue-400 text-lg md:text-xl group-hover:text-blue-300 transition-colors">Pre-Order (N L R)</span>
                                                                                    <span className="bg-slate-800 px-3 py-1 rounded border border-slate-600 font-mono text-[10px] md:text-xs shrink-0 shadow-inner group-hover:border-blue-500/50 transition-colors">Root &rarr; Left &rarr; Right</span>
                                                                                </div>
                                                                                <p className="text-xs md:text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">Used to create a clone/copy of the tree. <strong className="text-blue-300 bg-blue-900/30 px-1 rounded">Rule:</strong> The first element printed is ALWAYS the absolute Root of the tree.</p>
                                                                            </div>

                                                                            <div className="border-b border-slate-700 pb-4 group cursor-default">
                                                                                <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                                                                                    <span className="font-bold text-emerald-400 text-lg md:text-xl group-hover:text-emerald-300 transition-colors">In-Order (L N R)</span>
                                                                                    <span className="bg-slate-800 px-3 py-1 rounded border border-slate-600 font-mono text-[10px] md:text-xs shrink-0 shadow-inner group-hover:border-emerald-500/50 transition-colors">Left &rarr; Root &rarr; Right</span>
                                                                                </div>
                                                                                <p className="text-xs md:text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">Yields elements in sorted ascending order if the tree is a <b className="text-emerald-300 bg-emerald-900/30 px-1 rounded">Binary Search Tree (BST)</b>.</p>
                                                                            </div>

                                                                            <div className="pb-2 group cursor-default">
                                                                                <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                                                                                    <span className="font-bold text-rose-400 text-lg md:text-xl group-hover:text-rose-300 transition-colors">Post-Order (L R N)</span>
                                                                                    <span className="bg-slate-800 px-3 py-1 rounded border border-slate-600 font-mono text-[10px] md:text-xs shrink-0 shadow-inner group-hover:border-rose-500/50 transition-colors">Left &rarr; Right &rarr; Root</span>
                                                                                </div>
                                                                                <p className="text-xs md:text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">Used to delete a tree safely (children must be deleted before the parent). <strong className="text-rose-300 bg-rose-900/30 px-1 rounded">Rule:</strong> The last element is ALWAYS the absolute Root.</p>
                                                                            </div>

                                                                            {/*  NEW ADDITION: Recursive Implementation Pseudocode  */}
                                                                            <div className="mt-4 pt-4 border-t border-slate-700 group cursor-default">
                                                                                <h4 className="font-bold text-indigo-400 text-sm uppercase tracking-widest mb-3 flex items-center">
                                                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                                                                                    Implementation Code (Pre-Order)
                                                                                </h4>
                                                                                <div className="bg-black/50 p-4 rounded-lg font-mono text-[10px] md:text-xs text-slate-300 overflow-x-auto-custom border border-slate-700/50 shadow-inner group-hover:border-indigo-500/50 transition-colors">
                                                                                    <span className="text-rose-400">void</span> <span className="text-blue-300">Preorder</span>(<span className="text-amber-300">Node</span> *root) {"{"}
                                                                                        <span className="text-rose-400">if</span> (root == <span className="text-rose-400">NULL</span>) <span className="text-rose-400">return</span>; <span className="text-slate-500">// Base Case: Empty Node</span>

                                                                                    <span className="text-emerald-300">printf</span>(<span className="text-amber-200">"%c"</span>, root-&gt;data);  <span className="text-slate-500">// Step 1: Visit Root</span>
                                                                                    <span className="text-blue-300">Preorder</span>(root-&gt;left);    <span className="text-slate-500">// Step 2: Traverse Left Subtree</span>
                                                                                    <span className="text-blue-300">Preorder</span>(root-&gt;right);   <span className="text-slate-500">// Step 3: Traverse Right Subtree</span>
{"}"}
                                                                                </div>
                                                                                <p className="text-[10px] text-slate-400 mt-2 italic font-semibold">* <span className="text-amber-400">BPSC Tip:</span> Simply swap the order of these 3 lines to trivially implement In-Order or Post-Order.</p>
                                                                            </div>
                                                                        </div>

                                                                        {/*  Visual Tree Graphics using SVG  */}
                                                                        <div className="w-full lg:w-auto flex flex-col items-center bg-slate-800/80 p-6 md:p-8 rounded-xl border border-slate-600 shadow-inner">
                                                                            <h4 className="text-slate-300 font-bold mb-4 text-xs uppercase tracking-widest text-center flex items-center">
                                                                                <svg className="w-4 h-4 mr-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                                                                Traversal Visualization
                                                                            </h4>

                                                                            <div className="relative w-full max-w-[240px] aspect-square">
                                                                                <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0 z-0 drop-shadow-md" style={{stroke: '#64748b', strokeWidth: '2', fill: 'none', strokeDasharray: '1000', strokeDashoffset: '1000', animation: 'dash 2s ease-out forwards'}}>
                                                                                    <style dangerouslySetInnerHTML={{ __html: `
                                                                                        @keyframes dash {
                                                                                            to {stroke-dashoffset: 0; }
                                                                                        }
                                                                                    `}} />
                                                                                    <line x1="100" y1="30" x2="50" y2="90" />
                                                                                    <line x1="100" y1="30" x2="150" y2="90" />
                                                                                    <line x1="50" y1="90" x2="20" y2="160" />
                                                                                    <line x1="50" y1="90" x2="80" y2="160" />
                                                                                </svg>

                                                                                <div className="absolute w-full h-full z-10" style={{fontWeight: 'bold', color: '#0f172a', fontSize: '14px'}}>
                                                                                    <div className="absolute flex items-center justify-center w-10 h-10 bg-white rounded-full border-2 border-slate-700 shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 hover:bg-amber-100 transition-all cursor-default z-20" style={{left: '50%', top: '15%'}}>A</div>
                                                                                    <div className="absolute flex items-center justify-center w-10 h-10 bg-white rounded-full border-2 border-slate-700 shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 hover:bg-amber-100 transition-all cursor-default z-20" style={{left: '25%', top: '45%'}}>B</div>
                                                                                    <div className="absolute flex items-center justify-center w-10 h-10 bg-white rounded-full border-2 border-slate-700 shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 hover:bg-amber-100 transition-all cursor-default z-20" style={{left: '75%', top: '45%'}}>C</div>
                                                                                    <div className="absolute flex items-center justify-center w-8 h-8 bg-white rounded-full border-2 border-slate-700 shadow-lg transform -translate-x-1/2 -translate-y-1/2 text-xs hover:scale-125 hover:bg-amber-100 transition-all cursor-default z-20" style={{left: '10%', top: '80%'}}>D</div>
                                                                                    <div className="absolute flex items-center justify-center w-8 h-8 bg-white rounded-full border-2 border-slate-700 shadow-lg transform -translate-x-1/2 -translate-y-1/2 text-xs hover:scale-125 hover:bg-amber-100 transition-all cursor-default z-20" style={{left: '40%', top: '80%'}}>E</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="mt-4 space-y-2 w-full font-mono text-[10px] md:text-xs">
                                                                                <div className="bg-blue-900/40 border border-blue-700/50 py-2 px-3 rounded text-blue-200 hover:bg-blue-900/60 transition-colors shadow-inner">
                                                                                    <span className="font-bold text-white">Pre:</span> A &rarr; B &rarr; D &rarr; E &rarr; C
                                                                                </div>
                                                                                <div className="bg-emerald-900/40 border border-emerald-700/50 py-2 px-3 rounded text-emerald-200 hover:bg-emerald-900/60 transition-colors shadow-inner">
                                                                                    <span className="font-bold text-white">In:</span> D &rarr; B &rarr; E &rarr; A &rarr; C
                                                                                </div>
                                                                                <div className="bg-rose-900/40 border border-rose-700/50 py-2 px-3 rounded text-rose-200 hover:bg-rose-900/60 transition-colors shadow-inner">
                                                                                    <span className="font-bold text-white">Post:</span> D &rarr; E &rarr; B &rarr; C &rarr; A
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/*  Tree Conversion Algorithm  */}
                                                                    <div className="mt-10 bg-amber-50 rounded-2xl p-6 md:p-8 border border-amber-200 shadow-sm hover:shadow-md transition-shadow">
                                                                        <h3 className="font-bold text-xl md:text-2xl text-amber-900 mb-4 flex flex-col md:flex-row md:items-center gap-3">
                                                                            Tree Reconstruction &amp; Conversion
                                                                        </h3>
                                                                        <p className="text-sm text-slate-700 mb-6">In competitive exams, you are given two arrays (e.g., Pre-Order and In-Order) and asked to construct the tree or find the Post-Order. <b className="text-amber-800 bg-amber-200/50 px-1 rounded">Rule: You cannot build a unique tree without the In-Order sequence.</b></p>

                                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                                            {/*  Scenario A  */}
                                                                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-200 transition-colors group">
                                                                                <h4 className="font-bold text-blue-800 mb-4 text-lg border-b border-slate-200 pb-2 flex items-center">Pattern A: Pre-Order + In-Order</h4>
                                                                                <div className="space-y-3 mb-4">
                                                                                    <div className="bg-slate-50 p-3 rounded border border-slate-100 group-hover:bg-blue-50/30 transition-colors">
                                                                                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Pre-Order (Root First):</span>
                                                                                        <div className="font-mono font-bold text-blue-700 text-sm md:text-base"><span className="underline decoration-2 underline-offset-2 animate-pulse">A</span>, B, D, E, C, F, G</div>
                                                                                    </div>
                                                                                    <div className="bg-slate-50 p-3 rounded border border-slate-100 group-hover:bg-emerald-50/30 transition-colors">
                                                                                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">In-Order (Left-Root-Right):</span>
                                                                                        <div className="font-mono font-bold text-emerald-700 text-sm md:text-base">D, B, E, <span className="underline decoration-2 underline-offset-2 text-blue-700 animate-pulse">A</span>, F, C, G</div>
                                                                                    </div>
                                                                                </div>
                                                                                <ol className="list-decimal pl-5 space-y-2 text-xs md:text-sm text-slate-700 font-medium">
                                                                                    <li>The FIRST element in Pre-Order is the <b>Root</b> (<code className="font-bold text-blue-700 bg-blue-50 px-1 rounded shadow-sm">A</code>).</li>
                                                                                    <li>Locate <code className="font-bold">A</code> in the In-Order array.</li>
                                                                                    <li>Left of <code className="font-bold">A</code> in In-Order is the <span className="font-bold text-emerald-600">Left Subtree</span>: <code className="bg-slate-100 px-1 rounded border border-slate-200 shadow-sm">(D, B, E)</code>.</li>
                                                                                    <li>Right of <code className="font-bold">A</code> in In-Order is the <span className="font-bold text-emerald-600">Right Subtree</span>: <code className="bg-slate-100 px-1 rounded border border-slate-200 shadow-sm">(F, C, G)</code>.</li>
                                                                                    <li>Repeat process recursively!</li>
                                                                                </ol>
                                                                            </div>

                                                                            {/*  Scenario B  */}
                                                                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-rose-200 transition-colors group">
                                                                                <h4 className="font-bold text-rose-800 mb-4 text-lg border-b border-slate-200 pb-2 flex items-center">Pattern B: Post-Order + In-Order</h4>
                                                                                <div className="space-y-3 mb-4">
                                                                                    <div className="bg-slate-50 p-3 rounded border border-slate-100 group-hover:bg-rose-50/30 transition-colors">
                                                                                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Post-Order (Root Last):</span>
                                                                                        <div className="font-mono font-bold text-rose-700 text-sm md:text-base">D, E, B, F, G, C, <span className="underline decoration-2 underline-offset-2 animate-pulse">A</span></div>
                                                                                    </div>
                                                                                    <div className="bg-slate-50 p-3 rounded border border-slate-100 group-hover:bg-emerald-50/30 transition-colors">
                                                                                        <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">In-Order (Left-Root-Right):</span>
                                                                                        <div className="font-mono font-bold text-emerald-700 text-sm md:text-base">D, B, E, <span className="underline decoration-2 underline-offset-2 text-rose-700 animate-pulse">A</span>, F, C, G</div>
                                                                                    </div>
                                                                                </div>
                                                                                <ol className="list-decimal pl-5 space-y-2 text-xs md:text-sm text-slate-700 font-medium">
                                                                                    <li>The LAST element in Post-Order is the <b>Root</b> (<code className="font-bold text-rose-700 bg-rose-50 px-1 rounded shadow-sm">A</code>).</li>
                                                                                    <li>Locate <code className="font-bold">A</code> in the In-Order array.</li>
                                                                                    <li>Split exactly like Pattern A to determine Left and Right subtrees.</li>
                                                                                    <li>Evaluate recursively working backwards from the end of the Post-Order array.</li>
                                                                                </ol>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </section>

                                                                {/*  SECTION 7: Supreme Complexity Matrix  */}
                                                                <section id="complexities" className="glass-card p-6 md:p-10 rounded-3xl fade-in-section">
                                                                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6 border-b-2 border-slate-200 pb-2">7. The Supreme Complexity Matrix</h2>
                                                                    <div className="overflow-x-auto-custom rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                                                        <table className="w-full text-left border-collapse text-xs md:text-sm min-w-[700px]">
                                                                            <thead>
                                                                                <tr className="bg-slate-800 text-white">
                                                                                    <th className="p-3 md:p-4 font-bold">Data Structure</th>
                                                                                    <th className="p-3 md:p-4 font-bold">Access / Search</th>
                                                                                    <th className="p-3 md:p-4 font-bold">Insertion</th>
                                                                                    <th className="p-3 md:p-4 font-bold">Deletion</th>
                                                                                    <th className="p-3 md:p-4 font-bold">Defining Trait / Use Case</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody className="text-slate-700 bg-white divide-y divide-slate-100">
                                                                                <tr className="hover:bg-slate-50 transition-colors">
                                                                                    <td className="p-3 md:p-4 font-bold text-primary flex items-center"><span className="w-2 h-2 rounded-full bg-slate-400 mr-2"></span>Array</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-600 bg-emerald-50/30">O(1)</td>
                                                                                    <td className="p-3 md:p-4 font-mono text-rose-600 bg-rose-50/30">O(n)</td>
                                                                                    <td className="p-3 md:p-4 font-mono text-rose-600 bg-rose-50/30">O(n)</td>
                                                                                    <td className="p-3 md:p-4 text-xs">Static size, Random index access.</td>
                                                                                </tr>
                                                                                <tr className="hover:bg-slate-50 transition-colors">
                                                                                    <td className="p-3 md:p-4 font-bold text-primary flex items-center"><span className="w-2 h-2 rounded-full bg-slate-500 mr-2"></span>Linked List</td>
                                                                                    <td className="p-3 md:p-4 font-mono text-rose-600 bg-rose-50/30">O(n)</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-600 bg-emerald-50/30">O(1)*</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-600 bg-emerald-50/30">O(1)*</td>
                                                                                    <td className="p-3 md:p-4 text-xs">*If pointer position is known. Dynamic memory.</td>
                                                                                </tr>
                                                                                <tr className="hover:bg-indigo-50/50 transition-colors bg-indigo-50/30">
                                                                                    <td className="p-3 md:p-4 font-bold text-indigo-900 flex items-center"><span className="w-2 h-2 rounded-full bg-indigo-400 mr-2"></span>Stack</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-600 bg-emerald-50/30">O(1)</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-600 bg-emerald-50/30">O(1)</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-600 bg-emerald-50/30">O(1)</td>
                                                                                    <td className="p-3 md:p-4 text-xs font-semibold text-indigo-800">LIFO. Recursion, parsing.</td>
                                                                                </tr>
                                                                                <tr className="hover:bg-teal-50/50 transition-colors bg-teal-50/30">
                                                                                    <td className="p-3 md:p-4 font-bold text-teal-900 flex items-center"><span className="w-2 h-2 rounded-full bg-teal-400 mr-2"></span>Queue</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-600 bg-emerald-50/30">O(1)</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-600 bg-emerald-50/30">O(1)</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-600 bg-emerald-50/30">O(1)</td>
                                                                                    <td className="p-3 md:p-4 text-xs font-semibold text-teal-800">FIFO. Task scheduling.</td>
                                                                                </tr>
                                                                                <tr className="hover:bg-sky-50/50 transition-colors bg-sky-50/30">
                                                                                    <td className="p-3 md:p-4 font-bold text-sky-900 flex items-center"><span className="w-2 h-2 rounded-full bg-sky-400 mr-2"></span>Hash Table</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-600 bg-emerald-50/30">O(1)*</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-600 bg-emerald-50/30">O(1)*</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-600 bg-emerald-50/30">O(1)*</td>
                                                                                    <td className="p-3 md:p-4 text-xs font-semibold text-sky-800">Fast lookup by key.</td>
                                                                                </tr>
                                                                                <tr className="hover:bg-amber-50/50 transition-colors bg-amber-50/30">
                                                                                    <td className="p-3 md:p-4 font-bold text-amber-900 flex items-center"><span className="w-2 h-2 rounded-full bg-amber-400 mr-2"></span>Tree (BST - Avg)</td>
                                                                                    <td className="p-3 md:p-4 font-mono text-amber-700 bg-amber-50/30">O(log n)</td>
                                                                                    <td className="p-3 md:p-4 font-mono text-amber-700 bg-amber-50/30">O(log n)</td>
                                                                                    <td className="p-3 md:p-4 font-mono text-amber-700 bg-amber-50/30">O(log n)</td>
                                                                                    <td className="p-3 md:p-4 text-xs text-amber-900">Sorted data, hierarchy.</td>
                                                                                </tr>
                                                                                <tr className="hover:bg-rose-50/50 transition-colors bg-rose-50/30 border-l-4 border-l-rose-500">
                                                                                    <td className="p-3 md:p-4 font-bold text-rose-900 flex items-center"><span className="w-2 h-2 rounded-full bg-rose-400 mr-2 animate-pulse"></span>Tree (BST - Worst)</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-rose-600 bg-rose-50/30">O(n)</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-rose-600 bg-rose-50/30">O(n)</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-rose-600 bg-rose-50/30">O(n)</td>
                                                                                    <td className="p-3 md:p-4 text-xs text-rose-900 font-bold">Skewed tree degradation!</td>
                                                                                </tr>
                                                                                <tr className="hover:bg-emerald-50/50 transition-colors bg-emerald-50/50 border-l-4 border-l-emerald-500">
                                                                                    <td className="p-3 md:p-4 font-bold text-emerald-900 flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>AVL Tree</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-700 bg-emerald-50/30">O(log n)</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-700 bg-emerald-50/30">O(log n)</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-700 bg-emerald-50/30">O(log n)</td>
                                                                                    <td className="p-3 md:p-4 text-xs text-emerald-900 font-bold">Self-Balancing. Worst-case guarantee.</td>
                                                                                </tr>
                                                                                <tr className="hover:bg-orange-50/50 transition-colors bg-orange-50/50">
                                                                                    <td className="p-3 md:p-4 font-bold text-orange-900 flex items-center"><span className="w-2 h-2 rounded-full bg-orange-400 mr-2"></span>Heap</td>
                                                                                    <td className="p-3 md:p-4 font-mono text-orange-700 bg-orange-50/30">O(n)</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-600 bg-emerald-50/30">O(log n)</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-emerald-600 bg-emerald-50/30">O(log n)</td>
                                                                                    <td className="p-3 md:p-4 text-xs text-orange-900">Priority handling.</td>
                                                                                </tr>
                                                                                <tr className="hover:bg-purple-50/50 transition-colors bg-purple-50/50">
                                                                                    <td className="p-3 md:p-4 font-bold text-purple-900 flex items-center"><span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>Graph</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-purple-700 bg-purple-50/30">Varies</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-purple-700 bg-purple-50/30">Varies</td>
                                                                                    <td className="p-3 md:p-4 font-mono font-bold text-purple-700 bg-purple-50/30">Varies</td>
                                                                                    <td className="p-3 md:p-4 text-xs text-purple-900">Network modeling.</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </section>

                                                                {/*  SECTION 8: Master Numerical Problem Bank  */}
                                                                <section id="numericals" className="glass-card p-6 md:p-10 rounded-3xl border-t-4 border-t-amber-500 fade-in-section">
                                                                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">8. Master Numerical Problem Bank</h2>
                                                                    <p className="text-sm md:text-base text-slate-600 mb-8 font-medium">Step-by-step solutions to the exact numerical types frequently asked in BPSC TRE.</p>

                                                                    <div className="space-y-8">
                                                                        {/*  Stack Max Size TYPE A  */}
                                                                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                                                                            <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                                                                <h3 className="font-bold text-slate-800 text-lg">Type 1a: Stack Maximum Size Tracing</h3>
                                                                                <span className="text-[10px] md:text-xs font-bold bg-rose-100 text-rose-800 px-3 py-1 rounded-full w-fit flex items-center shadow-sm">
                                                                                    <span className="w-2 h-2 rounded-full bg-rose-500 mr-1 animate-pulse"></span>GUARANTEED QUESTION
                                                                                </span>
                                                                            </div>
                                                                            <div className="p-6">
                                                                                <p className="text-sm text-slate-700 mb-4 italic">"Consider the algorithm for determining whether a sequence of parentheses is balanced. The maximum number of parentheses that appear on the stack AT ANY ONE TIME for sequence: <code className="font-mono bg-slate-100 px-1 font-bold text-indigo-700 shadow-sm rounded">(()(())(()))</code>?"</p>

                                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                                    <div className="bg-slate-50 p-4 rounded-lg font-mono text-xs md:text-sm border border-slate-200 overflow-x-auto-custom shadow-inner hover:border-indigo-200 transition-colors">
                                                                                        <span className="text-slate-500 text-[10px] uppercase font-bold block mb-2 border-b border-slate-200 pb-1">Trace Stack Elements:</span>
                                                                                        1. Read ( &rarr; Stack: <strong className="text-indigo-600">(</strong> [Size 1]<br />
                                                                                            2. Read ( &rarr; Stack: <strong className="text-indigo-600">((</strong> [Size 2]<br />
                                                                                                3. Read ) &rarr; Stack: <strong className="text-indigo-600">(</strong> [Size 1]<br />
                                                                                                    4. Read ( &rarr; Stack: <strong className="text-indigo-600">((</strong> [Size 2]<br />
                                                                                                        5. Read ( &rarr; Stack: <strong className="text-indigo-600">(((</strong> [Size 3]<br />
                                                                                                            6. Read ) &rarr; Stack: <strong className="text-indigo-600">((</strong> [Size 2]<br />
                                                                                                                7. Read ) &rarr; Stack: <strong className="text-indigo-600">(</strong> [Size 1]<br />
                                                                                                                    8. Read ( &rarr; Stack: <strong className="text-indigo-600">((</strong> [Size 2]<br />
                                                                                                                        9. Read ( &rarr; Stack: <strong className="text-indigo-600">(((</strong> [Size 3]<br />
                                                                                                                            <div className="bg-rose-50 px-1 rounded transform hover:scale-[1.02] transition-transform origin-left w-fit">10. Read ( &rarr; Stack: <strong className="text-rose-600">((((</strong> [Size 4] ← MAX REACHED</div>
                                                                                                                        </div>
                                                                                                                        <div className="flex flex-col justify-center space-y-4">
                                                                                                                            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
                                                                                                                                <strong className="text-emerald-800 text-sm font-bold block mb-1">Final Answer</strong>
                                                                                                                                <p className="text-4xl font-black text-emerald-600 animate-pulse-slow drop-shadow-sm">4</p>
                                                                                                                                <p className="text-xs text-emerald-700 mt-2">The stack reached a peak size of 4 at step 10 before unwinding.</p>
                                                                                                                            </div>
                                                                                                                            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                                                                                                                <strong className="text-amber-800 text-sm font-bold block mb-1 flex items-center justify-center">
                                                                                                                                    <svg className="w-4 h-4 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                                                                                                                    Variation Trick (From PDF)
                                                                                                                                </strong>
                                                                                                                                <p className="text-xs text-amber-700">"Sequence contains 2 left parentheses and 3 right parentheses in some order. What is the max stack size?"<br /><br />The answer is exactly the number of Left Parentheses! Answer = <strong className="text-xl bg-amber-200/50 px-1 rounded">2</strong>.</p>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>

                                                                                                                {/*  Stack Max Size TYPE B  */}
                                                                                                                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                                                                                                                    <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                                                                                                        <h3 className="font-bold text-slate-800 text-lg">Type 1b: Infix to Postfix Max Stack Size</h3>
                                                                                                                    </div>
                                                                                                                    <div className="p-6">
                                                                                                                        <p className="text-sm text-slate-700 mb-4 italic">"Using the usual stack algorithm to convert infix to postfix notation, what is the maximum number of symbols on the stack at any one time during the conversion of: <code className="font-mono bg-slate-100 px-1 font-bold text-indigo-700 shadow-sm rounded">4+3*(6*3-12)</code>?"</p>

                                                                                                                        <div className="bg-slate-50 p-4 rounded-lg font-mono text-xs md:text-sm border border-slate-200 overflow-x-auto-custom shadow-inner hover:border-indigo-200 transition-colors">
                                                                                                                            <table className="w-full text-left border-collapse">
                                                                                                                                <thead>
                                                                                                                                    <tr className="border-b border-slate-300"><th className="py-2">Token</th><th className="py-2">Action</th><th className="py-2">Stack Status</th><th className="py-2">Size</th></tr>
                                                                                                                                </thead>
                                                                                                                                <tbody className="divide-y divide-slate-100">
                                                                                                                                    <tr className="hover:bg-white transition-colors"><td className="py-1">4</td><td>Out</td><td className="text-slate-400">[]</td><td>0</td></tr>
                                                                                                                                    <tr className="hover:bg-white transition-colors"><td className="py-1">+</td><td>Push</td><td>[+]</td><td>1</td></tr>
                                                                                                                                    <tr className="hover:bg-white transition-colors"><td className="py-1">3</td><td>Out</td><td>[+]</td><td>1</td></tr>
                                                                                                                                    <tr className="hover:bg-white transition-colors"><td className="py-1">*</td><td>Push</td><td>[+, *]</td><td>2</td></tr>
                                                                                                                                    <tr className="hover:bg-white transition-colors"><td className="py-1">(</td><td>Push</td><td>[+, *, (]</td><td>3</td></tr>
                                                                                                                                    <tr className="hover:bg-white transition-colors"><td className="py-1">6</td><td>Out</td><td>[+, *, (]</td><td>3</td></tr>
                                                                                                                                    <tr className="bg-rose-50/80 hover:bg-rose-100 transition-colors shadow-sm"><td className="py-2 text-rose-700 font-bold">*</td><td className="text-rose-700 font-bold">Push</td><td className="text-rose-700 font-bold">[+, *, (, *]</td><td className="text-rose-700 font-bold flex items-center"><span className="w-2 h-2 rounded-full bg-rose-500 mr-2 animate-pulse"></span>4 (MAX)</td></tr>
                                                                                                                                    <tr className="hover:bg-white transition-colors"><td className="py-1">3</td><td>Out</td><td>[+, *, (, *]</td><td>4</td></tr>
                                                                                                                                    <tr className="hover:bg-white transition-colors"><td className="py-1">-</td><td>Pop *, Push -</td><td>[+, *, (, -]</td><td>4</td></tr>
                                                                                                                                    <tr className="hover:bg-white transition-colors"><td className="py-1">12</td><td>Out</td><td>[+, *, (, -]</td><td>4</td></tr>
                                                                                                                                    <tr className="hover:bg-white transition-colors"><td className="py-1">)</td><td>Pop -</td><td>[+, *]</td><td>2</td></tr>
                                                                                                                                </tbody>
                                                                                                                            </table>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>

                                                                                                                {/*  Numerical 2: Arrays  */}
                                                                                                                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                                                                                                                    <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                                                                                                        <h3 className="font-bold text-slate-800 text-lg">Type 2: Array Memory Address Calculation</h3>
                                                                                                                    </div>
                                                                                                                    <div className="p-6">
                                                                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                                                                            <div className="hover:transform hover:-translate-y-1 transition-transform">
                                                                                                                                <h4 className="font-bold text-sm text-blue-700 mb-2 flex items-center">
                                                                                                                                    <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 shadow-sm border border-blue-200">A</span>
                                                                                                                                    1D Array Address
                                                                                                                                </h4>
                                                                                                                                <p className="text-xs md:text-sm text-slate-700 mb-3 italic">"Given an integer array <code className="font-mono bg-slate-100 px-1 shadow-sm rounded">arr</code> with base address 1000. Find the memory address of <code className="font-mono bg-slate-100 px-1 shadow-sm rounded">arr[3]</code>. (Assume int = 4 bytes)."</p>
                                                                                                                                <div className="bg-slate-50 p-4 rounded-lg font-mono text-xs md:text-sm border border-slate-200 shadow-inner">
                                                                                                                                    <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Formula: Base + (Index &times; Size)</span>
                                                                                                                                    <span className="text-slate-600 block">Step 1: 1000 + (3 &times; 4)</span>
                                                                                                                                    <span className="font-bold text-emerald-600 mt-2 block border-t border-slate-200 pt-2 text-sm md:text-base">Answer: 1012</span>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            <div className="hover:transform hover:-translate-y-1 transition-transform">
                                                                                                                                <h4 className="font-bold text-sm text-blue-700 mb-2 flex items-center">
                                                                                                                                    <span className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 shadow-sm border border-blue-200">B</span>
                                                                                                                                    2D Array Address (Row-Major)
                                                                                                                                </h4>
                                                                                                                                <p className="text-xs md:text-sm text-slate-700 mb-3 italic">"A 2D array <code className="font-mono bg-slate-100 px-1 shadow-sm rounded">a[5][4]</code> has base address 2000. Find the address of <code className="font-mono bg-slate-100 px-1 shadow-sm rounded">a[1][2]</code>. (Assume int = 4 bytes)."</p>
                                                                                                                                <div className="bg-slate-50 p-4 rounded-lg font-mono text-xs md:text-sm border border-slate-200 overflow-x-auto-custom whitespace-nowrap shadow-inner">
                                                                                                                                    <span className="text-slate-500 text-[10px] uppercase font-bold block mb-1">Formula: Base + [(i &times; columns) + j] &times; Size</span>
                                                                                                                                    <span className="text-slate-600 block">Step 1: 2000 + [(1 &times; 4) + 2] &times; 4</span>
                                                                                                                                    <span className="font-bold text-emerald-600 mt-2 block border-t border-slate-200 pt-2 text-sm md:text-base">Answer: 2024</span>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>

                                                                                                                {/*  Numerical 3: Postfix Evaluation  */}
                                                                                                                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                                                                                                                    <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                                                                                                        <h3 className="font-bold text-slate-800 text-lg">Type 3: Postfix Expression Evaluation</h3>
                                                                                                                    </div>
                                                                                                                    <div className="p-6">
                                                                                                                        <p className="text-sm text-slate-700 mb-4 italic">"Evaluate the postfix expression: <code className="font-mono bg-slate-100 px-2 py-1 text-base md:text-lg font-bold text-indigo-700 shadow-sm rounded">6 3 2 4 + - *</code> using a Stack."</p>
                                                                                                                        <div className="overflow-x-auto-custom rounded-lg border border-slate-200 shadow-sm">
                                                                                                                            <table className="w-full text-left text-xs md:text-sm border-collapse min-w-[500px]">
                                                                                                                                <thead>
                                                                                                                                    <tr className="bg-slate-50 border-b border-slate-200">
                                                                                                                                        <th className="p-3 font-semibold border-r border-slate-200 w-1/5">Token Read</th>
                                                                                                                                        <th className="p-3 font-semibold border-r border-slate-200">Action Taken</th>
                                                                                                                                        <th className="p-3 font-semibold w-1/4">Stack State</th>
                                                                                                                                    </tr>
                                                                                                                                </thead>
                                                                                                                                <tbody className="divide-y divide-slate-200">
                                                                                                                                    <tr className="hover:bg-slate-50 transition-colors"><td className="p-3 font-mono font-bold text-center border-r border-slate-200 text-base">6</td><td className="p-3 border-r border-slate-200">Push to Stack.</td><td className="p-3 font-mono text-center font-semibold">[6]</td></tr>
                                                                                                                                    <tr className="hover:bg-slate-50 transition-colors"><td className="p-3 font-mono font-bold text-center border-r border-slate-200 text-base">3</td><td className="p-3 border-r border-slate-200">Push to Stack.</td><td className="p-3 font-mono text-center font-semibold">[6, 3]</td></tr>
                                                                                                                                    <tr className="hover:bg-slate-50 transition-colors"><td className="p-3 font-mono font-bold text-center border-r border-slate-200 text-base">2</td><td className="p-3 border-r border-slate-200">Push to Stack.</td><td className="p-3 font-mono text-center font-semibold">[6, 3, 2]</td></tr>
                                                                                                                                    <tr className="hover:bg-slate-50 transition-colors"><td className="p-3 font-mono font-bold text-center border-r border-slate-200 text-base">4</td><td className="p-3 border-r border-slate-200">Push to Stack.</td><td className="p-3 font-mono text-center font-semibold">[6, 3, 2, 4]</td></tr>
                                                                                                                                    <tr className="bg-emerald-50/50 hover:bg-emerald-100/50 transition-colors"><td className="p-3 font-mono font-bold text-center text-emerald-700 border-r border-slate-200 text-xl">+</td><td className="p-3 border-r border-slate-200">Pop 4 (op2), Pop 2 (op1). Math: <strong className="bg-emerald-100 px-1 rounded">2 + 4 = 6</strong>. Push 6.</td><td className="p-3 font-mono font-bold text-center text-emerald-800">[6, 3, 6]</td></tr>
                                                                                                                                    <tr className="bg-emerald-50/70 hover:bg-emerald-100/70 transition-colors"><td className="p-3 font-mono font-bold text-center text-emerald-700 border-r border-slate-200 text-xl">-</td><td className="p-3 border-r border-slate-200">Pop 6 (op2), Pop 3 (op1). Math: <strong className="bg-emerald-100 px-1 rounded">3 - 6 = -3</strong>. Push -3.</td><td className="p-3 font-mono font-bold text-center text-emerald-800">[6, -3]</td></tr>
                                                                                                                                    <tr className="bg-emerald-100 hover:bg-emerald-200 transition-colors shadow-sm relative"><td className="p-3 font-mono font-bold text-center text-emerald-700 border-r border-emerald-200 text-xl">*</td><td className="p-3 border-r border-emerald-200">Pop -3 (op2), Pop 6 (op1). Math: <strong className="bg-emerald-200 px-1 rounded">6 * (-3) = -18</strong>. Push -18.</td><td className="p-3 font-mono font-black text-center text-emerald-900 text-base">[-18]</td></tr>
                                                                                                                                </tbody>
                                                                                                                            </table>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>

                                                                                                            </div>
                                                                                                        </section>

                                                                                                        {/*  SECTION 9: BPSC TRE 4.0 EXAM STRATEGY  */}
                                                                                                        <section id="strategy" className="bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CgkJPGcgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ij4KCQkJPHBhdGggZD0iTTAgNDBoNDBNNDAgMGgtNDBNMCAyMGg0ME0yMCAwdjQwIi8+CgkJPC9nPgoJPC9zdmc+')] bg-[#0f172a] text-white p-6 md:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden fade-in-section border border-slate-700">

                                                                                                            <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500 opacity-20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
                                                                                                            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>

                                                                                                            <h2 className="font-serif text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500 mb-8 uppercase tracking-wide relative z-10 text-center md:text-left drop-shadow-md">
                                                                                                                BPSC TRE 4.0: 100% Marks Cheatsheet
                                                                                                            </h2>

                                                                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">

                                                                                                                {/*  Match Matrix  */}
                                                                                                                <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300">
                                                                                                                    <h3 className="text-lg md:text-xl font-bold text-amber-300 mb-4 flex items-center border-b border-white/10 pb-3">
                                                                                                                        <svg className="w-5 h-5 mr-2 shrink-0 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                                                                                                                        Algorithm Match Matrix
                                                                                                                    </h3>
                                                                                                                    <ul className="text-xs md:text-sm space-y-3 text-slate-200">
                                                                                                                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-white/5 pb-2 hover:pl-2 transition-all"><span>Breadth First Search (BFS)</span> <span className="font-bold text-emerald-400 bg-emerald-900/40 px-2 py-1 rounded w-fit shadow-sm border border-emerald-800/50">&rarr; Queue</span></li>
                                                                                                                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-white/5 pb-2 hover:pl-2 transition-all"><span>Depth First Search / Recursion</span> <span className="font-bold text-emerald-400 bg-emerald-900/40 px-2 py-1 rounded w-fit shadow-sm border border-emerald-800/50">&rarr; Stack</span></li>
                                                                                                                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-white/5 pb-2 hover:pl-2 transition-all"><span>OS Scheduling / Spooling</span> <span className="font-bold text-emerald-400 bg-emerald-900/40 px-2 py-1 rounded w-fit shadow-sm border border-emerald-800/50">&rarr; Queue</span></li>
                                                                                                                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-white/5 pb-2 hover:pl-2 transition-all"><span>Sorted Output Sequence</span> <span className="font-bold text-emerald-400 bg-emerald-900/40 px-2 py-1 rounded w-fit shadow-sm border border-emerald-800/50">&rarr; BST (In-Order)</span></li>
                                                                                                                        <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 hover:pl-2 transition-all"><span>Compiler Syntax Analyzer</span> <span className="font-bold text-emerald-400 bg-emerald-900/40 px-2 py-1 rounded w-fit shadow-sm border border-emerald-800/50">&rarr; Stack</span></li>
                                                                                                                    </ul>
                                                                                                                </div>

                                                                                                                {/*  MCQ Trigger Words  */}
                                                                                                                <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300">
                                                                                                                    <h3 className="text-lg md:text-xl font-bold text-emerald-300 mb-4 border-b border-white/10 pb-3 flex items-center">
                                                                                                                        <svg className="w-5 h-5 mr-2 shrink-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                                                                                                        Guaranteed MCQ Triggers
                                                                                                                    </h3>
                                                                                                                    <div className="flex flex-wrap gap-2 text-[10px] md:text-xs font-medium">
                                                                                                                        <span className="px-3 py-1.5 bg-slate-800/80 border border-slate-600 rounded-md shadow-md hover:bg-slate-700 transition-colors cursor-default">"Solves memory wastage" = Circular Queue</span>
                                                                                                                        <span className="px-3 py-1.5 bg-slate-800/80 border border-slate-600 rounded-md shadow-md hover:bg-slate-700 transition-colors cursor-default">"(rear + 1) % size" = Circular Queue</span>
                                                                                                                        <span className="px-3 py-1.5 bg-slate-800/80 border border-slate-600 rounded-md shadow-md hover:bg-slate-700 transition-colors cursor-default">"Height L, Max Array Size" = 2<sup>L</sup> - 1</span>
                                                                                                                        <span className="px-3 py-1.5 bg-slate-800/80 border border-slate-600 rounded-md shadow-md hover:bg-slate-700 transition-colors cursor-default">"Degree 0" = Leaf Node</span>
                                                                                                                        <span className="px-3 py-1.5 bg-slate-800/80 border border-slate-600 rounded-md shadow-md hover:bg-slate-700 transition-colors cursor-default">"Balance Factor {-1, 0, 1}" = AVL Tree</span>
                                                                                                                        <span className="px-3 py-1.5 bg-slate-800/80 border border-slate-600 rounded-md shadow-md hover:bg-slate-700 transition-colors cursor-default">"Operator AFTER Operands" = Postfix</span>
                                                                                                                        <span className="px-3 py-1.5 bg-slate-800/80 border border-slate-600 rounded-md shadow-md hover:bg-slate-700 transition-colors cursor-default">"Operator BEFORE Operands" = Prefix</span>
                                                                                                                    </div>
                                                                                                                </div>

                                                                                                                {/*  Exam Traps (Highly Critical)  */}
                                                                                                                <div className="md:col-span-2 bg-rose-900/30 p-6 md:p-8 rounded-2xl backdrop-blur-md border border-rose-500/40 shadow-2xl hover:border-rose-500/60 transition-colors duration-300">
                                                                                                                    <h3 className="text-xl md:text-2xl font-bold text-rose-400 mb-6 flex items-center border-b border-rose-500/30 pb-3">
                                                                                                                        <svg className="w-6 h-6 mr-3 shrink-0 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                                                                                                        Fatal Exam Traps (Do Not Miss)
                                                                                                                    </h3>
                                                                                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-slate-200">
                                                                                                                        <ul className="space-y-5">
                                                                                                                            <li className="flex items-start group">
                                                                                                                                <span className="bg-rose-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">1</span>
                                                                                                                                <div><strong className="text-rose-300 block mb-1 text-base">The "NOT a Stack" Trap:</strong> If a question asks which is NOT an application of a Stack, look for <code className="bg-rose-950/80 px-1.5 py-0.5 font-mono text-xs border border-rose-800 rounded shadow-inner">"Data Transfer between two asynchronous processes"</code>. This is explicitly a Queue application!</div>
                                                                                                                            </li>
                                                                                                                            <li className="flex items-start group">
                                                                                                                                <span className="bg-rose-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">2</span>
                                                                                                                                <div><strong className="text-rose-300 block mb-1 text-base">The Array-Tree Size Trap:</strong> Trees implemented in arrays MUST allocate size for a complete tree even if sparse. Array size must be <code className="bg-rose-950/80 px-1.5 py-0.5 rounded text-rose-200 font-mono text-xs font-bold border border-rose-800 shadow-inner">2^L - 1</code>.</div>
                                                                                                                            </li>
                                                                                                                        </ul>
                                                                                                                        <ul className="space-y-5">
                                                                                                                            <li className="flex items-start group">
                                                                                                                                <span className="bg-rose-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">3</span>
                                                                                                                                <div><strong className="text-rose-300 block mb-1 text-base">The BST Degradation Trap:</strong> BPSC loves asking for the worst-case search time of a BST. It is NOT O(log n). If data is inserted in sorted order (1,2,3,4), it becomes a linked list. Worst-case is <code className="bg-rose-950/80 px-1.5 py-0.5 rounded text-rose-200 font-bold font-mono text-xs text-white border border-rose-800 shadow-inner">O(n)</code>.</div>
                                                                                                                            </li>
                                                                                                                            <li className="flex items-start group">
                                                                                                                                <span className="bg-rose-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">4</span>
                                                                                                                                <div><strong className="text-rose-300 block mb-1 text-base">The Postfix Math Trap:</strong> When popping from a stack to evaluate Postfix, the FIRST pop is <code>Op_2</code> and SECOND pop is <code>Op_1</code>. If evaluating <code>6 3 -</code>, it is <code className="text-rose-100 font-bold bg-rose-800 px-1.5 py-0.5 rounded shadow-inner">6 - 3</code>, NOT <code>3 - 6</code>.</div>
                                                                                                                            </li>
                                                                                                                        </ul>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </section>
                                                                                                        {/*  Footer  */}
                                                                                                        <footer className="text-center text-xs md:text-sm text-slate-500 pt-10 pb-6 font-medium border-t border-slate-200 mt-12 fade-in-section">
                                                                                                            <p>Engineered for BPSC TRE 4.0 Preparation &bull; Advanced Data Structures Syllabus</p>
                                                                                                            <p className="mt-2 opacity-75 flex items-center justify-center">
                                                                                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                                                                                Verify concepts via mathematical logic &amp; memory abstraction.
                                                                                                            </p>
                                                                                                        </footer>
                                                                                                    </main>
                                                                                                    {/*  Scroll Animation Script  */}
        </div>
    );
};
export default Dsa;
