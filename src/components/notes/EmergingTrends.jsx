import React from 'react';

const EmergingTrends = () => {
    return (
        <div className="text-slate-800 antialiased font-sans w-full bg-[#f8fafc] min-h-screen pt-8 pb-16">
            {/* Header Section */}
                                <header className="w-full px-4 sm:px-6 lg:px-8 text-center mb-12 py-10 glass-card rounded-3xl relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-800 via-blue-500 to-emerald-600"></div>
                                    <div className="inline-block bg-blue-100 text-blue-800 font-bold px-4 py-1 rounded-full text-sm mb-4 tracking-wider uppercase">
                                        BPSC TRE 4.0 • Computer Science
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 px-4">
                                        Mastering <span className="gradient-text">Emerging Trends</span>
                                    </h1>
                                    <p className="text-lg text-slate-600 max-w-2xl mx-auto px-4 font-medium mb-4">
                                        An advanced, NCERT-aligned academic study guide focusing on Artificial Intelligence, Big Data, IoT, and Cloud Computing.
                                    </p>
                                    <div className="inline-block bg-amber-100 text-amber-800 font-bold px-4 py-2 rounded-lg text-sm border border-amber-300 shadow-sm animate-pulse">
                                        ★ Includes exclusive insights directly from the perspective of a BPSC Question Setter ★
                                    </div>
                                </header>

                                <main className="w-full px-4 sm:px-6 lg:px-8 space-y-12">

                                    {/* MODULE 1: Artificial Intelligence & Future Tech */}
                                    <section className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-2xl p-6 md:p-10 border-t-4 border-t-purple-600 hover-lift">
                                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-800 mb-6 flex items-center">
                                            <span className="bg-purple-100 text-purple-700 w-10 h-10 rounded-full flex items-center justify-center mr-4 text-xl">1</span>
                                            Artificial Intelligence & Future Tech
                                        </h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800 mb-3 border-b-2 border-purple-200 pb-2">Core Definition</h3>
                                                <p className="text-slate-700 leading-relaxed mb-4">
                                                    <strong className="text-purple-700">Artificial Intelligence (AI)</strong> occurs when human intelligence is fundamentally embedded into machines via technological frameworks. It is the simulation of human intelligence processes by computer systems.
                                                </p>
                                                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                                                    <h4 className="font-bold text-purple-800 mb-2">The Spectrum of Immersive Tech:</h4>
                                                    <ul className="space-y-2">
                                                        <li className="flex items-start"><span className="text-purple-500 mr-2">✦</span> <strong>Natural Language Processing (NLP):</strong> Bridging human-computer interaction.</li>
                                                        <li className="flex items-start"><span className="text-purple-500 mr-2">✦</span> <strong>Immersive Experience:</strong> Engaging multiple human senses.</li>
                                                        <li className="flex items-start"><span className="text-purple-500 mr-2">✦</span> <strong>Virtual Reality (VR):</strong> Complete digital immersion.</li>
                                                        <li className="flex items-start"><span className="text-purple-500 mr-2">✦</span> <strong>Augmented Reality (AR):</strong> Digital overlays on the physical world.</li>
                                                        <li className="flex items-start"><span className="text-purple-500 mr-2">✦</span> <strong>Robotics:</strong> Physical automation guided by intelligence.</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 relative overflow-hidden">
                                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-200 rounded-full opacity-50"></div>
                                                <h3 className="text-xl font-bold text-slate-800 mb-4 relative z-10">Case Study: Generative AI (ChatGPT)</h3>
                                                <p className="text-sm text-slate-600 mb-4 relative z-10 italic">"Please make a roadmap to score full marks in Exam."</p>

                                                <div className="space-y-3 relative z-10">
                                                    <div className="flex items-center text-sm font-medium">
                                                        <div className="w-8 h-8 rounded bg-white border border-slate-300 flex items-center justify-center mr-3 font-bold text-purple-600">1</div>
                                                        <span><strong>Tokens:</strong> Breaking down input text into parsable pieces.</span>
                                                    </div>
                                                    <div className="flex items-center text-sm font-medium">
                                                        <div className="w-8 h-8 rounded bg-white border border-slate-300 flex items-center justify-center mr-3 font-bold text-purple-600">2</div>
                                                        <span><strong>Rethinking / Contextual Understanding:</strong> Processing semantic meaning.</span>
                                                    </div>
                                                    <div className="flex items-center text-sm font-medium">
                                                        <div className="w-8 h-8 rounded bg-white border border-slate-300 flex items-center justify-center mr-3 font-bold text-purple-600">3</div>
                                                        <span><strong>Knowledge Retrieval:</strong> Accessing pre-trained neural network weights.</span>
                                                    </div>
                                                    <div className="flex items-center text-sm font-medium">
                                                        <div className="w-8 h-8 rounded bg-white border border-slate-300 flex items-center justify-center mr-3 font-bold text-purple-600">4</div>
                                                        <span><strong>Response Generation:</strong> Predicting the most statistically probable output token by token.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 examiner-insight p-5 rounded-r-xl shadow-sm">
                                            <h3 className="text-lg font-bold text-amber-800 mb-2 flex items-center">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                                BPSC Question Setter's Insight
                                            </h3>
                                            <p className="text-sm text-slate-800 mb-2">As an examiner, I never ask direct definitions for AI anymore. Instead, I test the <strong>boundaries</strong> of immersive technologies.</p>
                                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                                <li><strong>AR vs VR:</strong> I will give a scenario: <em>"A mechanic uses smart glasses to see repair instructions overlaid on a tractor engine."</em> If you choose VR, you lose marks. It is <strong>Augmented Reality (AR)</strong> because the real world is still visible. VR completely blocks the real world.</li>
                                                <li><strong>Tokenization Sequence:</strong> For GenAI, I love asking to arrange the process in chronological order. Always remember: <strong>Tokenize ➔ Contextualize (Rethink) ➔ Retrieve Weights ➔ Generate</strong>.</li>
                                            </ul>
                                        </div>
                                    </section>

                                    {/* MODULE 2: Big Data */}
                                    <section className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-2xl p-6 md:p-10 border-t-4 border-t-blue-600 hover-lift">
                                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-800 mb-6 flex items-center">
                                            <span className="bg-blue-100 text-blue-700 w-10 h-10 rounded-full flex items-center justify-center mr-4 text-xl">2</span>
                                            The Big Data Paradigm
                                        </h2>

                                        <p className="text-lg text-slate-700 mb-6 italic text-center border-y border-slate-200 py-3 bg-slate-50/50">
                                            "Size Matters" in Data Architecture. Big Data involves data sets so large or complex that traditional data processing applications are inadequate.
                                        </p>

                                        {/* Data Size Infographic */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                                            <div className="bg-white p-5 rounded-xl border-2 border-slate-100 shadow-sm text-center relative hover:border-blue-300 transition-colors">
                                                <div className="text-blue-500 font-black text-4xl mb-2">&lt; 10GB</div>
                                                <h4 className="text-lg font-bold text-slate-800 uppercase tracking-widest">Small Data</h4>
                                                <div className="mt-4 pt-4 border-t border-slate-100 text-sm font-medium text-slate-600">
                                                    Excel, File System (Local Computer)
                                                </div>
                                            </div>

                                            <div className="bg-white p-5 rounded-xl border-2 border-slate-100 shadow-sm text-center relative hover:border-blue-400 transition-colors">
                                                <div className="text-blue-600 font-black text-3xl mb-2">10GB - 1TB</div>
                                                <h4 className="text-lg font-bold text-slate-800 uppercase tracking-widest">Medium Data</h4>
                                                <div className="mt-4 pt-4 border-t border-slate-100 text-sm font-medium text-slate-600">
                                                    Traditional DBMS (Hard Disk)
                                                </div>
                                            </div>

                                            <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200 shadow-md text-center relative transform hover:-translate-y-1 transition-all">
                                                <div className="text-blue-700 font-black text-4xl mb-2">&gt; 1TB</div>
                                                <h4 className="text-lg font-bold text-blue-800 uppercase tracking-widest">Big Data</h4>
                                                <div className="mt-4 pt-4 border-t border-blue-200 text-sm font-bold text-blue-800">
                                                    Hadoop, Distributed DBMS
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-800 mb-4 border-b-2 border-blue-200 pb-2">Characteristics: The 5 V's of Big Data</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
                                            <div className="bg-white p-3 rounded shadow-sm border border-slate-200">
                                                <div className="font-bold text-blue-700 text-lg mb-1">Volume</div>
                                                <div className="text-xs text-slate-500">Scale of data</div>
                                            </div>
                                            <div className="bg-white p-3 rounded shadow-sm border border-slate-200">
                                                <div className="font-bold text-blue-700 text-lg mb-1">Velocity</div>
                                                <div className="text-xs text-slate-500">Speed of generation</div>
                                            </div>
                                            <div className="bg-white p-3 rounded shadow-sm border border-slate-200 relative group">
                                                <div className="font-bold text-blue-700 text-lg mb-1">Variety</div>
                                                <div className="text-xs text-slate-500">Different forms</div>
                                                {/* Exam trap tooltip */}
                                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                                    Exam Trap: Sometimes misspelled as 'Varsity'
                                                </div>
                                            </div>
                                            <div className="bg-white p-3 rounded shadow-sm border border-slate-200">
                                                <div className="font-bold text-blue-700 text-lg mb-1">Veracity</div>
                                                <div className="text-xs text-slate-500">Not all data is useful (Reliability)</div>
                                            </div>
                                            <div className="bg-white p-3 rounded shadow-sm border border-slate-200 col-span-2 md:col-span-1">
                                                <div className="font-bold text-blue-700 text-lg mb-1">Value</div>
                                                <div className="text-xs text-slate-500">Business outcome</div>
                                            </div>
                                        </div>

                                        <div className="mt-8 examiner-insight p-5 rounded-r-xl shadow-sm">
                                            <h3 className="text-lg font-bold text-amber-800 mb-2 flex items-center">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                                BPSC Question Setter's Insight
                                            </h3>
                                            <p className="text-sm text-slate-800 mb-2">Big Data is a high-yield topic. Here is how I frame the trickiest questions:</p>
                                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                                <li><strong>The "Variety" Trap:</strong> I intentionally put "Varsity", "Validity", or "Volatility" in the options for the 5 V's. Only well-prepared students spot that <strong>Variety</strong> (meaning structured, unstructured, semi-structured data like JSON, video, text) is the correct answer.</li>
                                                <li><strong>Thresholds:</strong> When I ask for the technical threshold of Big Data, I'm looking for understanding that standard RDBMS tools fail. The magic number in many curriculums is <strong>&gt; 1TB</strong> requiring Distributed File Systems (like Hadoop/HDFS).</li>
                                            </ul>
                                        </div>
                                    </section>

                                    {/* MODULE 3: Internet of Things (IoT) */}
                                    <section className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-2xl p-6 md:p-10 border-t-4 border-t-emerald-500 hover-lift">
                                        <div className="flex justify-between items-start mb-6">
                                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-800 flex items-center">
                                                <span className="bg-emerald-100 text-emerald-700 w-10 h-10 rounded-full flex items-center justify-center mr-4 text-xl">3</span>
                                                Internet of Things (IoT)
                                            </h2>
                                            <div className="text-right">
                                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Term Coined By</span>
                                                <span className="text-lg font-bold text-emerald-700 border-b-2 border-emerald-300">Kevin Ashton</span>
                                                <p className="text-[10px] text-red-500 mt-1">*Exam Trap: Watch for 'Aston' in MCQs</p>
                                            </div>
                                        </div>

                                        <p className="text-slate-700 mb-8 leading-relaxed">
                                            <strong>Definition:</strong> IoT refers to the network of physical everyday objects embedded with electronics, software, and sensors connected to the internet, enabling them to collect and exchange data autonomously.
                                        </p>

                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                            {/* Ecosystem Architecture */}
                                            <div className="lg:col-span-1">
                                                <h3 className="text-lg font-bold text-slate-800 mb-4">IoT Ecosystem Architecture</h3>
                                                <div className="flex flex-col space-y-8 mt-6">

                                                    <div className="layer-box bg-white p-4 rounded-lg border-2 border-emerald-400 shadow-md text-center z-10 relative">
                                                        <div className="absolute -left-3 -top-3 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                                                        <h4 className="font-bold text-emerald-800 text-lg">Application Layer</h4>
                                                        <p className="text-xs text-slate-600 mt-2">Delivers application-specific services to users. Defines deployment use-cases.</p>
                                                    </div>

                                                    <div className="layer-box bg-white p-4 rounded-lg border-2 border-blue-400 shadow-md text-center z-10 relative">
                                                        <div className="absolute -left-3 -top-3 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                                                        <h4 className="font-bold text-blue-800 text-lg">Network Layer</h4>
                                                        <p className="text-xs text-slate-600 mt-2">Connects smart things, network devices, and servers. Transmits/processes sensor data.</p>
                                                    </div>

                                                    <div className="layer-box bg-white p-4 rounded-lg border-2 border-orange-400 shadow-md text-center z-10 relative">
                                                        <div className="absolute -left-3 -top-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                                                        <h4 className="font-bold text-orange-800 text-lg">Perception Layer</h4>
                                                        <p className="text-xs text-slate-600 mt-2">Sensors gather environmental info. Identifies physical parameters/objects.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Features & Applications */}
                                            <div className="lg:col-span-2 space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                                        <h3 className="text-md font-bold text-slate-800 mb-3 uppercase tracking-wider text-emerald-700">IoT Benefits</h3>
                                                        <ul className="space-y-2 text-sm text-slate-700">
                                                            <li className="flex items-center">✓ Efficient resource utilization</li>
                                                            <li className="flex items-center">✓ Minimizing human effort</li>
                                                            <li className="flex items-center">✓ Saves time</li>
                                                            <li className="flex items-center">✓ Development of AI through IoT data</li>
                                                            <li className="flex items-center">✓ Improved security matrices</li>
                                                        </ul>
                                                    </div>

                                                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                                        <h3 className="text-md font-bold text-slate-800 mb-3 uppercase tracking-wider text-emerald-700">Sensors</h3>
                                                        <p className="text-xs text-slate-600 mb-3 pb-2 border-b border-slate-200">
                                                            Translates physical stimuli (temp, sound) into electrical signals sent to cloud/microcontrollers.
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            <span className="bg-white border border-slate-300 text-xs px-2 py-1 rounded shadow-sm text-slate-700 font-medium">Temperature</span>
                                                            <span className="bg-white border border-slate-300 text-xs px-2 py-1 rounded shadow-sm text-slate-700 font-medium">Humidity</span>
                                                            <span className="bg-white border border-slate-300 text-xs px-2 py-1 rounded shadow-sm text-slate-700 font-medium">Proximity</span>
                                                            <span className="bg-white border border-slate-300 text-xs px-2 py-1 rounded shadow-sm text-slate-700 font-medium">Level</span>
                                                            <span className="bg-white border border-slate-300 text-xs px-2 py-1 rounded shadow-sm text-slate-700 font-medium">Gyroscope</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Communication Models Visual Guide */}
                                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mt-6">
                                                    <h3 className="text-md font-bold text-slate-800 mb-4 border-b pb-2 uppercase tracking-wider">IoT Communication Models</h3>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="border border-slate-200 rounded p-3 bg-slate-50">
                                                            <div className="font-bold text-sm text-emerald-700 mb-1">1. Request-Response</div>
                                                            <div className="text-xs text-slate-600 flex justify-between items-center">
                                                                <span>Client</span> <span>⇄</span> <span>Server</span>
                                                            </div>
                                                        </div>

                                                        <div className="border border-slate-200 rounded p-3 bg-slate-50">
                                                            <div className="font-bold text-sm text-emerald-700 mb-1">2. Publisher-Subscriber</div>
                                                            <div className="text-xs text-slate-600 flex justify-between items-center">
                                                                <span>Publisher</span> <span className="mx-1">→ Topic (Broker) →</span> <span>Subscribers</span>
                                                            </div>
                                                        </div>

                                                        <div className="border border-slate-200 rounded p-3 bg-slate-50">
                                                            <div className="font-bold text-sm text-emerald-700 mb-1">3. Push-Pull</div>
                                                            <div className="text-xs text-slate-600 flex justify-between items-center">
                                                                <span>Sender (Push)</span> <span className="mx-1">→ Queue →</span> <span>Receiver (Pull)</span>
                                                            </div>
                                                        </div>

                                                        <div className="border border-slate-200 rounded p-3 bg-slate-50">
                                                            <div className="font-bold text-sm text-emerald-700 mb-1">4. Exclusive Pair Model</div>
                                                            <div className="text-xs text-slate-600 flex justify-between items-center">
                                                                <span>Client</span> <span className="mx-1 border-t border-dashed w-full block border-slate-400 text-center">TCP Connection</span> <span>Server</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* REST vs Web Sockets Grid */}
                                                    <div className="mt-4 pt-4 border-t border-slate-200">
                                                        <h4 className="font-bold text-sm text-slate-800 mb-2">Protocol Paradigms</h4>
                                                        <table className="w-full text-sm text-left border-collapse">
                                                            <thead>
                                                                <tr className="bg-slate-100">
                                                                    <th className="p-2 border border-slate-300 font-bold">Feature</th>
                                                                    <th className="p-2 border border-slate-300 font-bold text-blue-700">REST API</th>
                                                                    <th className="p-2 border border-slate-300 font-bold text-orange-700">WebSockets</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td className="p-2 border border-slate-300 font-medium">State Management</td>
                                                                    <td className="p-2 border border-slate-300 bg-red-50 text-red-700 font-semibold">Stateless</td>
                                                                    <td className="p-2 border border-slate-300 bg-green-50 text-green-700 font-semibold">Stateful</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="p-2 border border-slate-300 font-medium">Communication Flow</td>
                                                                    <td className="p-2 border border-slate-300">Not Full Duplex (Half)</td>
                                                                    <td className="p-2 border border-slate-300">Full Duplex (Bi-directional)</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 examiner-insight p-5 rounded-r-xl shadow-sm">
                                            <h3 className="text-lg font-bold text-amber-800 mb-2 flex items-center">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                                BPSC Question Setter's Insight
                                            </h3>
                                            <p className="text-sm text-slate-800 mb-2">My favorite area to test deep conceptual clarity is IoT protocols and layers.</p>
                                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                                <li><strong>Layer Matching:</strong> I will test if you know where the actual "hardware sensing" happens. It is ALWAYS the <strong>Perception Layer</strong>. If a question mentions a "Gyroscope on a smart tractor", mark Perception Layer.</li>
                                                <li><strong>REST vs WebSockets Discriminator:</strong> This separates top 1% candidates. I'll frame it: <em>"A live stock market IoT ticker needs continuous two-way communication without repeatedly opening connections. Which protocol is best?"</em> If you pick REST, you fail. REST is stateless and half-duplex. The answer is <strong>WebSockets</strong> (Stateful, Full-Duplex).</li>
                                            </ul>
                                        </div>
                                    </section>

                                    {/* MODULE 4: Cloud Computing */}
                                    <section className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-2xl p-6 md:p-10 border-t-4 border-t-sky-500 hover-lift">
                                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-800 mb-6 flex items-center">
                                            <span className="bg-sky-100 text-sky-700 w-10 h-10 rounded-full flex items-center justify-center mr-4 text-xl">4</span>
                                            Cloud Computing Architecture
                                        </h2>

                                        <div className="flex flex-col md:flex-row gap-8">
                                            {/* Service Models Matrix */}
                                            <div className="md:w-3/5">
                                                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">As-a-Service Models</h3>
                                                <div className="space-y-4">
                                                    <div className="bg-white p-4 rounded shadow-sm border-l-4 border-l-gray-800 flex justify-between items-center">
                                                        <div>
                                                            <h4 className="font-black text-gray-800 text-lg">IaaS</h4>
                                                            <span className="text-xs text-gray-500 uppercase tracking-widest block mt-1">Infrastructure</span>
                                                        </div>
                                                        <div className="text-right text-sm font-medium text-gray-700">
                                                            Amazon EC2<br />Google Compute Engine
                                                        </div>
                                                    </div>

                                                    <div className="bg-white p-4 rounded shadow-sm border-l-4 border-l-blue-600 flex justify-between items-center">
                                                        <div>
                                                            <h4 className="font-black text-blue-700 text-lg">PaaS</h4>
                                                            <span className="text-xs text-blue-500 uppercase tracking-widest block mt-1">Platform</span>
                                                        </div>
                                                        <div className="text-right text-sm font-medium text-gray-700">
                                                            Microsoft Azure<br />AWS (Elastic Beanstalk)
                                                        </div>
                                                    </div>

                                                    <div className="bg-white p-4 rounded shadow-sm border-l-4 border-l-orange-500 flex justify-between items-center">
                                                        <div>
                                                            <h4 className="font-black text-orange-600 text-lg">SaaS</h4>
                                                            <span className="text-xs text-orange-500 uppercase tracking-widest block mt-1">Software</span>
                                                        </div>
                                                        <div className="text-right text-sm font-medium text-gray-700">
                                                            Salesforce<br />Dropbox
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Cloud Characteristics */}
                                            <div className="md:w-2/5 bg-slate-50 p-6 rounded-xl border border-slate-200">
                                                <h3 className="text-lg font-bold text-slate-800 mb-4">Core Cloud Benefits</h3>
                                                <ul className="space-y-3">
                                                    <li className="flex items-center font-medium text-slate-700"><span className="bg-sky-500 w-2 h-2 rounded-full mr-3 block"></span> Scalability</li>
                                                    <li className="flex items-center font-medium text-slate-700"><span className="bg-sky-500 w-2 h-2 rounded-full mr-3 block"></span> Automatic Upgrades</li>
                                                    <li className="flex items-center font-medium text-slate-700"><span className="bg-sky-500 w-2 h-2 rounded-full mr-3 block"></span> Robust Backup</li>
                                                    <li className="flex items-center font-medium text-slate-700"><span className="bg-sky-500 w-2 h-2 rounded-full mr-3 block"></span> Cost Effective</li>
                                                    <li className="flex items-center font-medium text-slate-700"><span className="bg-sky-500 w-2 h-2 rounded-full mr-3 block"></span> Enhanced Security</li>
                                                    <li className="flex items-center font-medium text-slate-700"><span className="bg-sky-500 w-2 h-2 rounded-full mr-3 block"></span> Centralized Management</li>
                                                </ul>

                                                <div className="mt-6 pt-4 border-t border-slate-300 text-xs text-slate-500 text-center font-mono">
                                                    [Client GUI] ➔ [Internet] ➔ [Server Side: App/Service/Storage]
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 examiner-insight p-5 rounded-r-xl shadow-sm">
                                            <h3 className="text-lg font-bold text-amber-800 mb-2 flex items-center">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                                BPSC Question Setter's Insight
                                            </h3>
                                            <p className="text-sm text-slate-800 mb-2">In Cloud Computing, I test "Responsibility and Control".</p>
                                            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                                <li><strong>IaaS (Infrastructure):</strong> Question pattern: <em>"If you are renting raw servers and installing your own Linux OS..."</em> That's IaaS. You control the OS.</li>
                                                <li><strong>PaaS (Platform):</strong> Question pattern: <em>"If you just deploy your Python code and the provider handles the OS and servers..."</em> That's PaaS. You control the Application.</li>
                                                <li><strong>SaaS (Software):</strong> Question pattern: <em>"Using a pre-built CRM like Salesforce or Dropbox."</em> That's SaaS. You control only your Data/Files.</li>
                                            </ul>
                                        </div>
                                    </section>


                                    {/* BPSC EXAM STRATEGY SECTION */}
                                    <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden mt-16 text-white border border-slate-700">
                                        {/* Decorative Elements */}
                                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full border-4 border-white/10"></div>
                                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full border-4 border-white/10"></div>

                                        <div className="relative z-10">
                                            <div className="inline-block bg-amber-500 text-slate-900 font-black px-4 py-1 rounded mb-4 text-sm tracking-widest uppercase">
                                                Guaranteed Marks
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">BPSC Mastery Cheatsheet</h2>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                                {/* The Bihar Connect */}
                                                <div className="bg-white/10 rounded-xl p-5 border border-white/20 backdrop-blur-sm">
                                                    <h3 className="text-xl font-bold text-amber-500 mb-3 flex items-center">
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                                        The Bihar Connect (Contextual MCQ)
                                                    </h3>
                                                    <p className="text-sm text-slate-200 leading-relaxed mb-3">
                                                        BPSC often frames theoretical tech questions within state-level initiatives. If a question asks about <span className="font-bold text-white bg-slate-700 px-1 rounded">"Smart Agriculture"</span> or <span className="font-bold text-white bg-slate-700 px-1 rounded">"Soil Health Monitoring"</span> in Bihar, the underlying technology is <strong>IoT (Internet of Things) utilizing Perception Layer Sensors</strong>. If the question relates to the State Caste Census database, it relates to <strong>Big Data (Hadoop)</strong> due to Volume and Variety.
                                                    </p>
                                                </div>

                                                {/* Exam Traps */}
                                                <div className="bg-red-900/40 rounded-xl p-5 border border-red-500/30 backdrop-blur-sm">
                                                    <h3 className="text-xl font-bold text-red-300 mb-3 flex items-center">
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                                        Exam Traps & Distractors
                                                    </h3>
                                                    <ul className="text-sm text-slate-300 space-y-2">
                                                        <li><strong className="text-white">Trap 1:</strong> The name of the IoT pioneer is <span className="text-green-400 font-bold">Kevin Ashton</span>. Question setters often use "Kevin Aston" as option A to trap hasty candidates.</li>
                                                        <li><strong className="text-white">Trap 2:</strong> In the 5 V's of Big Data, look out for "Varsity" printed instead of <span className="text-green-400 font-bold">Variety</span>. Mark 'Variety' as the true standard component.</li>
                                                        <li><strong className="text-white">Trap 3:</strong> Do not confuse REST with WebSockets. <strong>REST = Stateless</strong>. <strong>WebSockets = Stateful</strong>.</li>
                                                    </ul>
                                                </div>

                                                {/* Match the Following Matrix */}
                                                <div className="col-span-1 md:col-span-2 bg-slate-800/80 rounded-xl p-5 border border-slate-600/50 backdrop-blur-sm">
                                                    <h3 className="text-xl font-bold text-slate-50 mb-4">Match-the-Following Matrix (Guaranteed Format)</h3>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-300">
                                                        <div className="border-r border-slate-600 pr-2">
                                                            <span className="text-amber-500 block mb-1 font-bold">Layer ➔ Hardware</span>
                                                            Perception Layer ➔ Sensors
                                                        </div>
                                                        <div className="border-r border-slate-600 px-2">
                                                            <span className="text-amber-500 block mb-1 font-bold">Model ➔ Protocol</span>
                                                            Exclusive Pair ➔ TCP
                                                        </div>
                                                        <div className="border-r border-slate-600 px-2">
                                                            <span className="text-amber-500 block mb-1 font-bold">Size ➔ Tech</span>
                                                            &gt; 1TB ➔ Hadoop (Big Data)
                                                        </div>
                                                        <div className="px-2">
                                                            <span className="text-amber-500 block mb-1 font-bold">Cloud ➔ Example</span>
                                                            PaaS ➔ Microsoft Azure
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* MCQ Trigger Words */}
                                                <div className="col-span-1 md:col-span-2 mt-2">
                                                    <h3 className="text-lg font-bold text-slate-300 mb-2 uppercase tracking-wider text-sm">Rapid Fire: MCQ Trigger Words</h3>
                                                    <div className="flex flex-wrap gap-2 text-sm">
                                                        <span className="bg-blue-900/50 text-blue-200 px-3 py-1 rounded-full border border-blue-700/50">"Physical objects" ➔ IoT</span>
                                                        <span className="bg-purple-900/50 text-purple-200 px-3 py-1 rounded-full border border-purple-700/50">"Human intelligence embedded" ➔ AI</span>
                                                        <span className="bg-emerald-900/50 text-emerald-200 px-3 py-1 rounded-full border border-emerald-700/50">"Half Duplex" ➔ REST</span>
                                                        <span className="bg-orange-900/50 text-orange-200 px-3 py-1 rounded-full border border-orange-700/50">"Predicting probable token" ➔ ChatGPT/GenAI</span>
                                                    </div>
                                                </div>

                                                {/* Assertion-Reasoning Mastery */}
                                                <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-amber-900/40 to-orange-900/40 rounded-xl p-5 border border-amber-500/30 backdrop-blur-sm mt-4">
                                                    <h3 className="text-xl font-bold text-amber-300 mb-3 flex items-center">
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                                        The "Assertion-Reasoning" Discriminator
                                                    </h3>
                                                    <p className="text-sm text-slate-200 mb-3">As examiners, we use A-R questions to test deep logic. Here is a leaked pattern for how we construct them:</p>
                                                    <div className="bg-black/30 p-4 rounded text-sm text-slate-300">
                                                        <p className="mb-2"><strong className="text-amber-400">Assertion (A):</strong> WebSockets are preferred over REST APIs for real-time multiplayer gaming architectures.</p>
                                                        <p className="mb-3"><strong className="text-amber-400">Reason (R):</strong> REST is stateful and allows full-duplex continuous communication.</p>
                                                        <p><strong className="text-white">Setter's Solution:</strong> <em>Assertion is True, but Reason is False.</em> We flip the properties of REST and WebSockets in the Reason statement. Real BPSC candidates will spot that REST is actually stateless/half-duplex, making the Reason demonstrably false.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Footer */}
                                    <footer className="text-center py-8 text-slate-500 text-sm">
                                        <p>Generated for BPSC TRE 4.0 Preparation • Strict alignment with NCERT & Higher Secondary Computer Science Curriculum.</p>
                                    </footer>

                                </main>
        </div>
    );
};

export default EmergingTrends;
