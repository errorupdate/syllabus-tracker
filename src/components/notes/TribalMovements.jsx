import React from 'react';

const TribalMovements = () => {
    return (
        <div className="font-sans text-slate-800 antialiased leading-relaxed w-full bg-[#f8fafc] min-h-screen pt-8 pb-16">
            {/* Header Section */}
                                <header className="w-full px-4 sm:px-6 lg:px-8 mb-12 text-center pt-8">
                                    <div className="inline-block px-4 py-1 rounded-full bg-teal-100 text-teal-700 font-semibold text-sm mb-4 tracking-wider uppercase">
                                        BPSC TRE 4.0 Exclusive Study Module
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 leading-tight">
                                        Indian National Movement: <br /> <span className="text-teal-700">Tribal & Peasant Uprisings</span>
                                    </h1>
                                    <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                                        An in-depth analysis of subaltern resistance against British expansionism (1757 - 1857 & Beyond).
                                    </p>
                                </header>

                                {/* Context & Architecture Section */}
                                <section className="w-full px-4 sm:px-6 lg:px-8 mb-12">
                                    <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-2xl p-8 border-t-4 border-t-teal-500">
                                        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6 border-b pb-3">The Anatomy of Resistance (1757 - 1857)</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <p className="mb-4 text-slate-700">
                                                    Following the <strong>Battle of Plassey (1757)</strong>, the British East India Company initiated a century of rapid territorial and economic expansion. This aggressive phase profoundly disrupted traditional Indian socio-economic structures.
                                                </p>
                                                <p className="mb-4 text-slate-700">
                                                    The resistance did not start in 1857. For 100 years, isolated yet fierce rebellions were waged by localized groups whose survival was threatened by colonial administrative machinery.
                                                </p>
                                                <div className="bg-slate-50 rounded-lg p-4 mt-6 border border-slate-200">
                                                    <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">Key Affected Demographics:</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        <span className="px-3 py-1 bg-white border rounded shadow-sm text-sm font-medium">🌾 Peasants (Kisan)</span>
                                                        <span className="px-3 py-1 bg-white border rounded shadow-sm text-sm font-medium">🏹 Tribals (Adivasi)</span>
                                                        <span className="px-3 py-1 bg-white border rounded shadow-sm text-sm font-medium">🧵 Weavers (Bunkar)</span>
                                                        <span className="px-3 py-1 bg-white border rounded shadow-sm text-sm font-medium">👑 Local Kings</span>
                                                        <span className="px-3 py-1 bg-white border rounded shadow-sm text-sm font-medium">📿 Religious Groups</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Custom HTML Flowchart */}
                                            <div className="bg-slate-900 rounded-xl p-6 text-white flex flex-col justify-center relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

                                                <h3 className="font-serif font-bold text-xl mb-6 text-center z-10">The Mechanism of Exploitation</h3>

                                                <div className="flex flex-col items-center z-10 space-y-2">
                                                    <div className="bg-white/10 backdrop-blur px-4 py-2 rounded border border-white/20 w-full text-center text-sm font-medium">
                                                        British Revenue Demands & Forest Laws
                                                    </div>
                                                    <div className="text-teal-500 text-xl font-bold">↓</div>
                                                    <div className="bg-white/10 backdrop-blur px-4 py-2 rounded border border-white/20 w-full text-center text-sm font-medium">
                                                        Infiltration of 'Dikus' (Outsiders/Zamindars)
                                                    </div>
                                                    <div className="text-teal-500 text-xl font-bold">↓</div>
                                                    <div className="bg-white/10 backdrop-blur px-4 py-2 rounded border border-white/20 w-full text-center text-sm font-medium">
                                                        Loss of Traditional Lands & Bonded Labour
                                                    </div>
                                                    <div className="text-amber-600 text-xl font-bold">↓</div>
                                                    <div className="bg-amber-600/20 backdrop-blur px-4 py-2 rounded border border-amber-600 w-full text-center text-sm font-bold text-amber-100 shadow-[0_0_15px_rgba(217,119,6,0.5)]">
                                                        Armed Subaltern Uprising
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Conceptual Deep Dive Section */}
                                <section className="w-full px-4 sm:px-6 lg:px-8 mb-12">
                                    <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-2xl p-8 border-t-4 border-t-amber-600">
                                        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6 border-b pb-3">Conceptual Deep Dive: The Subaltern Framework</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {/* Concept 1 */}
                                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                                <h3 className="text-lg font-bold text-teal-700 mb-3">1. Breaking the "1857 Myth"</h3>
                                                <p className="text-sm text-slate-700 leading-relaxed">
                                                    Colonial history often suggests Indians passively accepted British rule until 1857. However, the century between Plassey (1757) and the Mutiny was marked by continuous, localized warfare. The frontline of this resistance was not held by elite kings, but by marginalized groups fighting for survival against severe economic disruption.
                                                </p>
                                            </div>

                                            {/* Concept 2 */}
                                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                                <h3 className="text-lg font-bold text-teal-700 mb-3">2. The Clash of Economies</h3>
                                                <p className="text-sm text-slate-700 leading-relaxed">
                                                    British capitalism demanded revenue in cash, destroying indigenous communal living (like <em>Khuntkatti</em>). When tribes couldn't pay, they fell prey to <em>Mahajans</em> (moneylenders). These outsiders, known collectively as <strong>"Dikus"</strong>, seized tribal lands. Early rebellions were violent outbursts aimed directly at these Dikus before targeting the British state.
                                                </p>
                                            </div>

                                            {/* Concept 3 */}
                                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                                <h3 className="text-lg font-bold text-teal-700 mb-3">3. The Geography of Resistance</h3>
                                                <ul className="text-sm text-slate-700 space-y-2 leading-relaxed">
                                                    <li><span className="font-bold text-slate-800">Chotanagpur Belt:</span> Agrarian and identity crises (Santhal, Munda) focused on keeping outsiders out.</li>
                                                    <li><span className="font-bold text-slate-800">Western Ghats:</span> Driven by the collapse of local employment and draconian forest laws (Bhil, Ramosi).</li>
                                                    <li><span className="font-bold text-slate-800">North-East:</span> Reactions to infrastructural imperialism and forced labor (Khasi).</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Major Movements Grid */}
                                <section className="w-full px-4 sm:px-6 lg:px-8 mb-16">
                                    <h2 className="text-3xl font-serif font-bold text-slate-800 mb-8 text-center">Chronicle of Major Tribal Uprisings</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">

                                        {/* Santhal Rebellion */}
                                        <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl border-l-4 border-l-red-500">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-2xl font-serif font-bold text-slate-900">Santhal Rebellion</h3>
                                                <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full">1855 - 1856</span>
                                            </div>
                                            <div className="space-y-3 text-sm">
                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Leaders:</span> <span className="text-slate-600">Sidhu, Kanhu, Chand, and Bhairav Murmu (ably supported by their sisters Phulo and Jhano).</span></p>
                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Region:</span> <span className="text-slate-600">Bhagalpur to Rajmahal Hills (Jharkhand, Bihar). The core area was known as <em>Damin-i-Koh</em> (Skirts of the Hills).</span></p>
                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Core Causes:</span> <span className="text-slate-600">
                                                    <ul className="list-disc ml-4 space-y-1 mt-1">
                                                        <li><strong>Economic Extortion:</strong> Bengali and Marwari moneylenders (Mahajans) charged exorbitant interest rates (50% to 500%), leading to debt bondage.</li>
                                                        <li><strong>Administrative Oppression:</strong> Corrupt local police (Darogas like Mahesh Datta) and British courts favored the rich Zamindars.</li>
                                                        <li><strong>Loss of Land:</strong> Santhals were reduced from land-owners to landless laborers on their own reclaimed lands. Deep resentment against <em>Dikus</em> (outsiders).</li>
                                                    </ul>
                                                </span></p>
                                                <div className="mt-4 pt-4 border-t border-slate-200">
                                                    <p className="font-bold text-slate-800 mb-1">Historical Course & Outcome:</p>
                                                    <p className="text-slate-600 text-sm">Began on June 30, 1855, at Bhognadih (Santhal Hul). Over 10,000 Santhals mobilized. The revolt was brutally crushed by Captain Alexander and Lt. Thomson using martial law (over 15,000 Santhals killed). <strong>Result:</strong> British recognized their distinct identity, creating the independent <strong>Santhal Pargana</strong> district and passing the Santhal Pargana Tenancy Act to restrict land alienation.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Munda Rebellion */}
                                        <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl border-l-4 border-l-teal-500">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-2xl font-serif font-bold text-slate-900">Munda Rebellion <br /><span className="text-sm font-sans font-normal text-slate-500">(Ulgulan / Great Tumult)</span></h3>
                                                <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">1899 - 1900</span>
                                            </div>
                                            <div className="space-y-3 text-sm">
                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Leader:</span> <span className="text-slate-600">Birsa Munda (Revered as <em>'Dharti Aaba'</em> - Father of the Earth). Initiated the Birsait sect, drawing from both Hinduism (Guru Anand Pandey) and Christianity (missionary schools).</span></p>
                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Region:</span> <span className="text-slate-600">Ranchi, Tamar, Khunti, and Bandgaon (Chotanagpur Plateau, Jharkhand).</span></p>
                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Core Causes:</span> <span className="text-slate-600">
                                                    <ul className="list-disc ml-4 space-y-1 mt-1">
                                                        <li><strong>Agrarian Breakdown:</strong> Destruction of the traditional <em>Khuntkatti</em> (joint tribal landholding) system by Zamindars and Thikadars (contractors).</li>
                                                        <li><strong>Forced Labor:</strong> Widespread imposition of <em>Beth Begari</em> (unpaid forced labor).</li>
                                                        <li><strong>Socio-Religious Crisis:</strong> Disillusionment with Christian missionaries who failed to help them recover lands. Birsa declared himself a divine messenger in 1895 to establish "Munda Raj".</li>
                                                    </ul>
                                                </span></p>
                                                <div className="mt-4 pt-4 border-t border-slate-200">
                                                    <p className="font-bold text-slate-800 mb-1">Historical Course & Outcome:</p>
                                                    <p className="text-slate-600 text-sm">The <em>Ulgulan</em> (Great Tumult) targeted police stations (like Khunti), churches, and landlords. Suppressed by Commissioner Forbes and Deputy Commissioner Streetfield. Birsa died of cholera in Ranchi jail on June 9, 1900. <strong>Result:</strong> Forced the monumental <strong>Chotanagpur Tenancy Act (1908)</strong>, banning forced labor and restricting transfer of tribal land to non-tribals.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Kol Rebellion */}
                                        <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl border-l-4 border-l-amber-500">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-2xl font-serif font-bold text-slate-900">Kol Rebellion</h3>
                                                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">1831 - 1832</span>
                                            </div>
                                            <div className="space-y-3 text-sm">
                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Key Leaders:</span> <span className="text-slate-600">Buddhu Bhagat (killed with his family), Joa Bhagat, Madara Mahato, and Bindrai Manki.</span></p>
                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Region:</span> <span className="text-slate-600">Chotanagpur region covering Ranchi, Singhbhum, Hazaribagh, Palamu, and the western parts of Manbhum.</span></p>
                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Core Causes:</span> <span className="text-slate-600">The British transferred land administration to Hindu, Sikh, and Muslim <em>Thikadars</em> (contractors). These outsiders exacted heavy taxes (like tax on local brewing - Handia) and seized lands from Kol headmen (Mankis and Mundas). Widespread reports of honor violations against Kol women by outsiders sparked extreme outrage.</span></p>
                                                <div className="mt-4 pt-4 border-t border-slate-200">
                                                    <p className="font-bold text-slate-800 mb-1">Historical Course & Outcome:</p>
                                                    <p className="text-slate-600 text-sm">In 1831, the Kols adopted a scorched-earth policy, burning villages of Dikus (outsiders) and slaughtering landlords. It took large-scale British military deployment under Captain Wilkinson to crush the revolt by 1832. <strong>Result:</strong> Led to the creation of the <strong>South-West Frontier Agency</strong> to provide separate administrative control.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bhil Revolts */}
                                        <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl border-l-4 border-l-indigo-500">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-2xl font-serif font-bold text-slate-900">Bhil Revolts</h3>
                                                <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full">1818 - 1847</span>
                                            </div>
                                            <div className="space-y-3 text-sm">
                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Leaders:</span> <span className="text-slate-600">Dashrath, Sewaram, Bhagoji Naik. Later led by <strong>Govind Guru</strong> (Bhagat Movement) and Motilal Tejawat (Eki Movement).</span></p>
                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Region:</span> <span className="text-slate-600">Khandesh region (Maharashtra), Dhar, Malwa, and southern Rajasthan (Mewar, Banswara).</span></p>
                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Core Causes:</span> <span className="text-slate-600">Famines, harsh land revenues, and the British pacification campaigns following the defeat of the Marathas (1818). Bhils feared total loss of forest rights. Later movements protested excessive <em>Lagaan</em> (taxes) and <em>Veth-Begar</em> (forced labor) in Rajputana princely states.</span></p>
                                                <div className="mt-4 pt-4 border-t border-slate-200">
                                                    <p className="font-bold text-slate-800 mb-1">Historical Course & Outcome:</p>
                                                    <p className="text-slate-600 text-sm">Initial revolts (1818-1831) were managed via military force and amnesty. In 1913, Govind Guru gathered Bhils at Mangarh Hill. British forces fired upon the peaceful gathering, killing over 1,500 Bhils (infamously known as the <strong>Mangarh Massacre</strong> or the Jallianwala Bagh of Rajasthan).</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ramosi Uprising & Tana Bhagat */}
                                        <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl border-l-4 border-l-pink-500">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-2xl font-serif font-bold text-slate-900">Ramosi Uprisings</h3>
                                                <span className="bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1 rounded-full">1822 & 1879-80</span>
                                            </div>
                                            <div className="space-y-3 text-sm mb-6">
                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Leaders:</span> <span className="text-slate-600">Chittar Singh (1822), Vasudev Balwant Phadke (1879).</span></p>
                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Region:</span> <span className="text-slate-600">Western Ghats, Maharashtra.</span></p>
                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Core Causes:</span> <span className="text-slate-600">Loss of livelihood post-Maratha fall, harsh tax policies, and famine-induced starvation neglected by the British.</span></p>
                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Outcome:</span> <span className="text-slate-600">Suppressed, but Vasudev Balwant Phadke's organization heavily inspired the early phase of the militant Swadeshi movement.</span></p>
                                            </div>

                                            <hr className="my-4 border-slate-200" />

                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-2xl font-serif font-bold text-slate-900">Tana Bhagat Movement</h3>
                                                    <span className="bg-pink-100 text-pink-800 text-xs font-bold px-3 py-1 rounded-full">1914 - 1919</span>
                                                </div>
                                                <div className="space-y-3 text-sm">
                                                    <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Leader:</span> <span className="text-slate-600">Jatra Oraon.</span></p>
                                                    <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Region:</span> <span className="text-slate-600">Chotanagpur, Jharkhand.</span></p>
                                                    <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Details:</span> <span className="text-slate-600">Began as a socio-religious reform movement among the Oraon tribe (focusing on monotheism, giving up meat/liquor). Shifted to opposing British taxes and Zamindars. Later merged into Gandhi's Non-Cooperation Movement.</span></p>
                                                </div>
                                        </div>

                                        {/* Khasi & Gond Rebellions */}
                                        <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl border-l-4 border-l-teal-500">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-2xl font-serif font-bold text-slate-900">Khasi Rebellion</h3>
                                                <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">1833</span>
                                            </div>
                                            <div className="space-y-3 text-sm mb-6">
                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Leader:</span> <span className="text-slate-600">U Tirot Sing.</span></p>
                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Region:</span> <span className="text-slate-600">Meghalaya (Garo, Khasi, Jaintia hills).</span></p>
                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Core Causes:</span> <span className="text-slate-600">British attempt to build a road linking Brahmaputra Valley to Sylhet, leading to forced conscription of local labor and administrative interference.</span></p>
                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Outcome:</span> <span className="text-slate-600">U Tirot Sing organized a fierce guerrilla war. He was eventually captured and exiled to Dhaka, but resistance cemented Khasi identity.</span></p>
                                            </div>

                                            <hr className="my-4 border-slate-200" />

                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-2xl font-serif font-bold text-slate-900">Gond Rebellion</h3>
                                                    <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">1910</span>
                                                </div>
                                                <div className="space-y-3 text-sm">
                                                    <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Region:</span> <span className="text-slate-600">Bastar, Chhattisgarh (Gondwana region).</span></p>
                                                    <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Core Causes:</span> <span className="text-slate-600">Strict British forest policies that banned shifting cultivation (Bewar) and restricted access to vital forest produce.</span></p>
                                                    <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Outcome:</span> <span className="text-slate-600">Rebellion suppressed, but forced the British administration to temporarily halt and reconsider their draconian forest policies.</span></p>
                                                </div>
                                        </div>

                                    </div>
                                </section>

                                {/* BPSC Mastery Cheatsheet Section */}
                                <section className="w-full px-4 sm:px-6 lg:px-8 mb-16">
                                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl text-white relative overflow-hidden">
                                        {/* Decorative Elements */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>

                                        <h2 className="text-3xl font-serif font-bold mb-2 flex items-center gap-3">
                                            <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                            BPSC TRE 4.0 Mastery Cheatsheet
                                        </h2>
                                        <p className="text-slate-300 mb-8 font-medium">Examiner's perspective: Focus on overlapping regions, precise terminology, and chronological traps.</p>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                            {/* The Bihar Connect */}
                                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
                                                <h3 className="text-xl font-bold text-amber-400 mb-4 border-b border-white/10 pb-2">🎯 The Bihar Connect (High Yield)</h3>
                                                <p className="text-sm text-slate-200 mb-3">Since Jharkhand was historically part of Bihar, movements in the Chotanagpur and Rajmahal regions are <strong>guaranteed questions</strong> in BPSC.</p>
                                                <ul className="space-y-2 text-sm text-slate-300">
                                                    <li className="flex gap-2"><span className="text-teal-500">✓</span> <strong>Santhal (1855):</strong> Rajmahal Hills / Damin-i-Koh</li>
                                                    <li className="flex gap-2"><span className="text-teal-500">✓</span> <strong>Munda (1899):</strong> Chotanagpur Plateau</li>
                                                    <li className="flex gap-2"><span className="text-teal-500">✓</span> <strong>Kol (1831):</strong> Chotanagpur (Singhbhum)</li>
                                                    <li className="flex gap-2"><span className="text-teal-500">✓</span> <strong>Tana Bhagat (1914):</strong> Oraon tribe, Chotanagpur</li>
                                                </ul>
                                            </div>

                                            {/* Match-The-Following Matrix */}
                                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
                                                <h3 className="text-xl font-bold text-emerald-400 mb-4 border-b border-white/10 pb-2">🧩 Match-The-Following Matrix</h3>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-sm text-left text-slate-300">
                                                        <thead className="text-xs text-white uppercase bg-white/10">
                                                            <tr>
                                                                <th className="px-3 py-2 rounded-tl">Tribe/Movement</th>
                                                                <th className="px-3 py-2">Leader</th>
                                                                <th className="px-3 py-2 rounded-tr">Core Keyword</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-white/10">
                                                            <tr><td className="px-3 py-2 font-medium text-white">Santhal</td><td className="px-3 py-2">Sidhu-Kanhu</td><td className="px-3 py-2">Damin-i-Koh</td></tr>
                                                            <tr><td className="px-3 py-2 font-medium text-white">Munda</td><td className="px-3 py-2">Birsa Munda</td><td className="px-3 py-2">Ulgulan / Khuntkatti</td></tr>
                                                            <tr><td className="px-3 py-2 font-medium text-white">Khasi</td><td className="px-3 py-2">U Tirot Sing</td><td className="px-3 py-2">Road Construction</td></tr>
                                                            <tr><td className="px-3 py-2 font-medium text-white">Ramosi</td><td className="px-3 py-2">V. B. Phadke</td><td className="px-3 py-2">Western Ghats</td></tr>
                                                            <tr><td className="px-3 py-2 font-medium text-white">Bhil</td><td className="px-3 py-2">Govind Guru</td><td className="px-3 py-2">Malwa/Khandesh</td></tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            {/* MCQ Trigger Words */}
                                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 lg:col-span-2">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-cyan-400 mb-2">⚡ MCQ Trigger Words</h3>
                                                        <ul className="text-sm space-y-1 text-slate-300">
                                                            <li><strong>"Diku"</strong> ➔ Outsiders/Exploiters</li>
                                                            <li><strong>"Ulgulan"</strong> ➔ Munda Rebellion</li>
                                                            <li><strong>"Begar"</strong> ➔ Bonded Labor</li>
                                                            <li><strong>"Khuntkatti"</strong> ➔ Munda Land System</li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-rose-400 mb-2">⚠️ Exam Traps</h3>
                                                        <ul className="text-sm space-y-1 text-slate-300">
                                                            <li><span className="text-white font-semibold">Trap 1:</span> Confusing <em>Santhal</em> (1855) with the 1857 Mutiny. Santhal happened <strong>just before</strong>.</li>
                                                            <li><span className="text-white font-semibold">Trap 2:</span> Confusing <em>Ramosi</em> (Maharashtra) with <em>Rampa</em> (Andhra - Alluri Sitarama Raju).</li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-violet-400 mb-2">🧠 Active Recall Trick</h3>
                                                        <div className="text-sm text-slate-300 bg-black/20 p-3 rounded">
                                                            <p>Use the mnemonic <strong>"SKM - Damin"</strong>:</p>
                                                            <p className="mt-1"><strong>S</strong>anthal ➔ <strong>K</strong>anhu/Sidhu ➔ <strong>M</strong>urmu in <strong>Damin</strong>-i-Koh.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Footer */}
                                <footer className="w-full px-4 sm:px-6 lg:px-8 text-center py-6 border-t border-slate-200 text-slate-500 text-sm">
                                    <p>Created for BPSC TRE 4.0 Preparation • Independent Academic Resource</p>
                                </footer>
        </div>
    );
};

export default TribalMovements;
