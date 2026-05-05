import React, { useEffect, useState } from 'react';

const DevelopmentOfEducation = () => {
    const [activeSection, setActiveSection] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const navItems = [
        { id: 'pre-british', label: 'Pre-British', icon: '📜' },
        { id: 'british', label: 'British Era', icon: '🏛️' },
        { id: 'commissions', label: 'Commissions', icon: '⚖️' },
        { id: 'nationalist', label: 'Nationalist', icon: '🇮🇳' },
        { id: 'post-independence', label: 'Post-Ind', icon: '📈' },
        { id: 'strategy', label: 'Strategy', icon: '🎯' },
    ];

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', `#${id}`);
        }
    };

    useEffect(() => {
        const observerOptions = { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.08 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    const children = entry.target.querySelectorAll('.os-stagger');
                    children.forEach((child, i) => {
                        child.style.transitionDelay = `${i * 0.08}s`;
                        child.classList.add('is-visible');
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.os-reveal').forEach(el => observer.observe(el));

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0 });

        document.querySelectorAll('section[id]').forEach(el => sectionObserver.observe(el));

        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            observer.disconnect();
            sectionObserver.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="font-sans text-slate-800 antialiased leading-relaxed w-full bg-[#f8fafc] min-h-screen">
            {/* ═══ STICKY GLASS HEADER ═══ */}
            <header className={`os-glass-header fixed top-0 w-full z-50 text-white py-3 px-4 md:px-6 ${isScrolled ? 'scrolled' : ''}`}>
                <div className="w-full mx-auto flex justify-between items-center px-2 lg:px-4">
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-rose-500/25">
                            EDU
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-sm font-bold tracking-wide leading-none">History of Education</h1>
                            <p className="text-[11px] text-slate-400 font-medium mt-0.5">BPSC TRE 4.0</p>
                        </div>
                    </div>

                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map(item => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                className={`os-nav-pill os-focus-ring ${activeSection === item.id ? 'os-nav-pill-active' : ''}`}
                                onClick={(e) => {
                                    scrollToSection(e, item.id);
                                    setMobileNavOpen(false);
                                }}
                            >
                                <span className="mr-1.5 text-xs">{item.icon}</span>
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <button
                        className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                        onClick={() => setMobileNavOpen(!mobileNavOpen)}
                        aria-label="Toggle navigation"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileNavOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </div>

                {mobileNavOpen && (
                    <div className="lg:hidden mt-3 pb-3 border-t border-white/10 pt-3">
                        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
                            {navItems.map(item => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-white/10 transition-colors text-center"
                                    onClick={(e) => {
                                        scrollToSection(e, item.id);
                                        setMobileNavOpen(false);
                                    }}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="text-[11px] font-medium text-slate-300">{item.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            {/* ═══ HERO SECTION ═══ */}
            <section className="os-hero-gradient os-grid-pattern pt-28 pb-20 md:pt-36 md:pb-28 px-4 sm:px-6 lg:px-8 relative">
                <div className="absolute top-16 right-[10%] w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-os-float pointer-events-none"></div>
                <div className="absolute bottom-10 left-[5%] w-56 h-56 bg-rose-500/10 rounded-full blur-3xl animate-os-float-delayed pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="w-full mx-auto relative z-10 lg:px-8">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-slate-300">BPSC TRE 4.0 — Exclusive Study Material</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                        Development of
                        <br />
                        <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                            Education in India
                        </span>
                        <span className="os-cursor"></span>
                    </h2>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10 font-jakarta">
                        A comprehensive, deeply researched module mapping the evolution from indigenous Gurukuls to Modern Education Policies, specifically curated for Bihar Teacher Recruitment Examinations.
                    </p>

                    <div className="flex flex-wrap gap-4 items-center mb-12">
                        <a href="#pre-british" onClick={(e) => scrollToSection(e, 'pre-british')} className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-rose-600 text-white text-base font-bold px-8 py-4 rounded-xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-1 transition-all duration-300 group os-pulse-glow">
                            Start Learning
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </a>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                            <span className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400 text-base">📚</span>
                            <span><strong className="text-white">5</strong> Eras Covered</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <span className="w-8 h-8 rounded-lg bg-rose-500/15 flex items-center justify-center text-rose-400 text-base">⚡</span>
                            <span><strong className="text-white">Exam</strong> Traps Decoded</span>
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 os-scroll-indicator hidden md:block">
                        <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                </div>
            </section>

            <main className="w-full mx-auto pb-16 px-4 sm:px-6 lg:px-8 xl:px-12 space-y-24 pt-16">

                                    {/*  Phase 1: Pre-British Era  */}
                                    <section id="pre-british" className="scroll-mt-32 os-reveal">
                                        <h2 className="font-merriweather text-3xl font-bold text-slate-900 mb-8 border-b-4 border-teal-500 pb-2 inline-block">1. The Pre-British Indigenous System</h2>
                                        <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-2xl p-8 hover:shadow-2xl transition-shadow duration-300">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div>
                                                    <h3 className="text-xl font-bold text-teal-900 mb-4 flex items-center gap-2">
                                                        <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                                                        Structural Framework
                                                    </h3>
                                                    <ul className="space-y-3 text-slate-700">
                                                        <li><strong className="text-slate-900">Ancient Period:</strong> Centered around the <em>Gurukul</em>, <em>Ashrama</em>, and <em>Tol</em> systems. Deeply rooted in religious, philosophical, and moral instruction (focus on Vedas, Upanishads, logic, and statecraft).</li>
                                                        <li><strong className="text-slate-900">Medieval Period:</strong> Introduction and integration of <em>Madrasas</em> (higher learning focusing on theology, law, Arabic/Persian literature) and <em>Maktabs</em> (primary education attached to mosques).</li>
                                                        <li><strong className="text-slate-900">Pedagogy:</strong> Education was fundamentally religious and practical, passed down largely through oral traditions before manuscripts became widespread. Rote learning was common, but critical debates (Shastrartha) were also encouraged at higher levels.</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
                                                    <h4 className="font-bold text-amber-900 mb-2">🌱 Socio-Economic Integration</h4>
                                                    <p className="text-slate-700 text-sm">
                                                        <strong>Crucial Historical Detail:</strong> Before the rigid British academic calendar, Indian education was inherently flexible and integrated with the agrarian economy. Students were taught throughout the year, but <strong>schools would halt during crop harvesting time</strong>. Children were sent to the fields to assist their families, seamlessly blending formal education with practical economic survival.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/*  Phase 2: British Intervention  */}
                                    <section id="british" className="mb-16 scroll-mt-32 os-reveal">
                                        <h2 className="font-merriweather text-3xl font-bold text-slate-900 mb-8 border-b-4 border-teal-500 pb-2 inline-block">2. The British Intervention & Early Policies</h2>

                                        <div className="relative border-l-2 border-teal-200 ml-3 md:ml-6 pl-8 pb-4 space-y-12">

                                            {/*  Event 1  */}
                                            <div className="relative">
                                                <div className="w-4 h-4 bg-teal-700 rounded-full absolute -left-[9px] top-6 border-[3px] border-white shadow-[0_0_0_3px_#ccfbf1]"></div>
                                                <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-xl p-6 md:p-8">
                                                    <div className="flex flex-wrap items-center gap-4 mb-4">
                                                        <span className="bg-teal-900 text-slate-50 px-4 py-1 rounded font-bold text-lg">1813</span>
                                                        <h3 className="text-2xl font-bold text-slate-900">The Charter Act</h3>
                                                    </div>
                                                    <p className="mb-4 text-slate-700">The British East India Company officially accepted responsibility for the education of Indians for the very first time.</p>
                                                    <div className="bg-slate-100 p-4 rounded-lg flex items-start gap-4">
                                                        <div className="bg-green-100 text-emerald-400 p-2 rounded-full font-bold">₹1 Lakh</div>
                                                        <p className="text-sm text-slate-600"><strong>The Budget:</strong> An annual sum of ₹1,00,000 was allocated for the "revival and improvement of literature" and the "promotion of knowledge of the sciences." <br /><span className="italic text-red-400">Deep Dive:</span> This amount remained unspent for years due to the infamous <strong>Orientalist-Anglicist Controversy</strong> (H.T. Prinsep advocating for traditional Indian learning vs. T.B. Macaulay advocating for Western learning). This Act also formally allowed <strong>Christian Missionaries</strong> to enter India to promote moral and religious improvements.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/*  Event 2  */}
                                            <div className="relative">
                                                <div className="w-4 h-4 bg-teal-700 rounded-full absolute -left-[9px] top-6 border-[3px] border-white shadow-[0_0_0_3px_#ccfbf1]"></div>
                                                <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-xl p-6 md:p-8">
                                                    <div className="flex flex-wrap items-center gap-4 mb-4">
                                                        <span className="bg-teal-900 text-slate-50 px-4 py-1 rounded font-bold text-lg">1835</span>
                                                        <h3 className="text-2xl font-bold text-slate-900">Macaulay's Minute</h3>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                                        <div>
                                                            <p className="mb-4 text-slate-700">Drafted by <strong>Lord Thomas Babington Macaulay</strong> and enacted under Governor-General <strong>Lord William Bentinck</strong> on <strong>March 7, 1835</strong>. It decisively settled the debate in favor of the Anglicists.</p>
                                                            <ul className="list-disc ml-5 text-slate-700 space-y-2 mb-4">
                                                                <li>English became the official medium of higher education and government administration.</li>
                                                                <li>Stopped the printing of oriental texts to fund English education.</li>
                                                                <li>Primary unspoken motive: To produce a cheap supply of lower-level clerical staff (Babus) to run the vast EIC administration.</li>
                                                                <li>Supported by progressive Indians like <strong>Raja Ram Mohan Roy</strong>, who is often called the <span className="bg-yellow-200 text-yellow-800 px-1">"Father of Modern Education in India"</span> for championing Western scientific education.</li>
                                                            </ul>
                                                        </div>
                                                        <div className="bg-white p-6 rounded-xl shadow-inner border border-slate-200">
                                                            <h4 className="text-center font-bold text-slate-800 mb-2">Visual Concept: Downward Filtration Theory</h4>
                                                            <div className="flex flex-col items-center gap-1 my-5">
                                                                <div className="text-white text-center p-2 rounded text-sm font-semibold transition-all duration-300 hover:scale-105 w-[30%] bg-gradient-to-br from-teal-700 to-teal-900">Elite Indians (Educated in English)</div>
                                                                <div className="text-teal-800 font-bold">↓ Filters Down ↓</div>
                                                                <div className="text-white text-center p-2 rounded text-sm font-semibold transition-all duration-300 hover:scale-105 w-[60%] bg-gradient-to-br from-teal-500 to-teal-700">Middle Class / Teachers</div>
                                                                <div className="text-teal-800 font-bold">↓ Filters Down ↓</div>
                                                                <div className="text-center p-2 rounded text-sm font-semibold transition-all duration-300 hover:scale-105 w-[90%] bg-gradient-to-br from-teal-300 to-teal-500 text-teal-900">The Masses (Vernacular)</div>
                                                            </div>
                                                            <p className="text-xs text-center text-slate-600 mt-2">The British aimed to create a class of Indians "blood and color, but English in taste, in opinions, in morals, and in intellect."</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/*  Event 3  */}
                                            <div className="relative">
                                                <div className="w-4 h-4 bg-teal-700 rounded-full absolute -left-[9px] top-6 border-[3px] border-white shadow-[0_0_0_3px_#ccfbf1]"></div>
                                                <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-xl p-6 md:p-8 border-l-4 border-teal-500">
                                                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                                        <div className="flex items-center gap-4">
                                                            <span className="bg-teal-900 text-slate-50 px-4 py-1 rounded font-bold text-lg">1854</span>
                                                            <h3 className="text-2xl font-bold text-slate-900">Wood's Dispatch</h3>
                                                        </div>
                                                        <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-bold border border-teal-200">⭐ Magna Carta of Indian Education</span>
                                                    </div>
                                                    <p className="mb-4 text-slate-700">Drafted by <strong>Charles Wood</strong> (President of the Board of Control) during the tenure of Governor-General <strong>Lord Dalhousie</strong>. It was the first comprehensive plan for the spread of education in India.</p>

                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center">
                                                            <h4 className="font-bold text-slate-800">Primary</h4>
                                                            <p className="text-sm text-slate-600">Vernacular Languages (Gram Panchayats)</p>
                                                        </div>
                                                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center">
                                                            <h4 className="font-bold text-slate-800">Secondary</h4>
                                                            <p className="text-sm text-slate-600">Anglo-Vernacular (High Schools)</p>
                                                        </div>
                                                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center">
                                                            <h4 className="font-bold text-slate-800">Higher Ed</h4>
                                                            <p className="text-sm text-slate-600">English Medium (Universities)</p>
                                                        </div>
                                                    </div>

                                                    <ul className="list-disc ml-5 text-slate-700 space-y-2 mb-6 text-sm">
                                                        <li>Establishment of the <strong>Department of Public Instruction (DPI)</strong> in all five major provinces.</li>
                                                        <li>Introduction of the <strong>Grants-in-Aid</strong> system to encourage private enterprise in education.</li>
                                                        <li>Strong backing for female education (e.g., support for J.E.D. Bethune's school for girls).</li>
                                                        <li>Focus on secular education and the creation of teacher training institutions.</li>
                                                    </ul>

                                                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                                                        <p className="text-sm text-slate-700">
                                                            <strong>Exam Focus Date - 1857:</strong> Following the dispatch's recommendations, the first three universities were established in <strong>Calcutta, Bombay, and Madras in 1857</strong> (modeled heavily after London University). <br /><span className="font-bold text-red-400">BPSC Trap:</span> While Wood's Dispatch came under Dalhousie (1854), the universities were actually established during the tenure of Viceroy <strong>Lord Canning</strong> (1857).
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </section>

                                    {/*  Phase 3: Major Reforms Grid  */}
                                    <section id="commissions" className="mb-16 scroll-mt-32 os-reveal">
                                        <h2 className="font-merriweather text-3xl font-bold text-slate-900 mb-8 border-b-4 border-teal-500 pb-2 inline-block">3. Major Commissions & Institutional Reforms</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            {/*  Hunter  */}
                                            <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-xl p-6 hover:-translate-y-1 transition-transform duration-300">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-xl font-bold text-teal-900">Hunter Commission</h3>
                                                    <span className="font-bold text-slate-600">1882</span>
                                                </div>
                                                <p className="text-sm text-slate-600 mb-4">Appointed by <strong>Lord Ripon</strong> and chaired by <strong>W.W. Hunter</strong> to review the progress since Wood's Dispatch (ignored universities, focused on primary/secondary).</p>
                                                <ul className="text-sm text-slate-700 list-disc ml-4 space-y-1">
                                                    <li>Strong emphasis on the expansion of <strong>Primary Education</strong> using vernacular languages.</li>
                                                    <li>Recommended transferring control of primary education to newly formed Municipal and Local District Boards.</li>
                                                    <li>Secondary education bifurcated: <strong>Literary</strong> (for university) and <strong>Vocational</strong> (for commercial careers).</li>
                                                    <li>Special emphasis on Female Education. Punjab (1882) & Allahabad (1887) universities were established post-report.</li>
                                                </ul>
                                            </div>

                                            {/*  Raleigh  */}
                                            <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-xl p-6 hover:-translate-y-1 transition-transform duration-300">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-xl font-bold text-teal-900">Universities Act</h3>
                                                    <span className="font-bold text-slate-600">1904</span>
                                                </div>
                                                <p className="text-sm text-slate-600 mb-4">Based on the recommendations of the <strong>Raleigh Commission</strong> (1902), enacted under <strong>Lord Curzon</strong>. Included Indian members Syed Mahmud and Gurudas Banerjee.</p>
                                                <ul className="text-sm text-slate-700 list-disc ml-4 space-y-1">
                                                    <li>Aimed ostensibly at reforming higher education and promoting research/study over mere examinations.</li>
                                                    <li>Actually designed to tighten government control over universities to curb rising nationalist sentiments among students.</li>
                                                    <li>Reduced the number of elected fellows in universities; government gained veto power over Senate regulations.</li>
                                                    <li>Introduced far stricter conditions for the affiliation of private colleges.</li>
                                                </ul>
                                            </div>

                                            {/*  Sadler  */}
                                            <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-xl p-6 hover:-translate-y-1 transition-transform duration-300">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-xl font-bold text-teal-900">Sadler Commission</h3>
                                                    <span className="font-bold text-slate-600">1917</span>
                                                </div>
                                                <p className="text-sm text-slate-600 mb-4">Appointed under <strong>Lord Chelmsford</strong> (Also known as Calcutta University Commission). Chaired by Dr. M.E. Sadler with Indians Dr. Ashutosh Mukherjee and Dr. Ziauddin Ahmed.</p>
                                                <ul className="text-sm text-slate-700 list-disc ml-4 space-y-1">
                                                    <li>Foreshadowed the 10+2+3 system; stated university education cannot improve without improving secondary education.</li>
                                                    <li>Recommended a strict <strong>12-year school course</strong> before university admission.</li>
                                                    <li>Creation of a separate Board of Secondary and Intermediate Education.</li>
                                                    <li>Encouraged establishing unitary, residential-teaching universities (like Aligarh, Banaras, Patna, Lucknow).</li>
                                                </ul>
                                            </div>

                                            {/*  Sargent  */}
                                            <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-xl p-6 hover:-translate-y-1 transition-transform duration-300">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-xl font-bold text-teal-900">Sargent Plan</h3>
                                                    <span className="font-bold text-slate-600">1944</span>
                                                </div>
                                                <p className="text-sm text-slate-600 mb-4">Drafted by <strong>John Sargent</strong>, initiated by <strong>CABE</strong> (Central Advisory Board of Education).</p>
                                                <ul className="text-sm text-slate-700 list-disc ml-4 space-y-1">
                                                    <li>Blueprint for the education system of independent India.</li>
                                                    <li>Aim: To make primary education completely free and compulsory for ages 6-11 within <strong>40 years</strong>.</li>
                                                    <li>Proposed pre-primary education (3-6 years) and high school education (11-17 years) for selected students.</li>
                                                    <li>Recommended the abolition of the intermediate course and liquidation of adult illiteracy within 20 years.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </section>

                                    {/*  Phase 4: Nationalist Education  */}
                                    <section id="nationalist" className="mb-16 scroll-mt-32 os-reveal">
                                        <h2 className="font-merriweather text-3xl font-bold text-slate-900 mb-8 border-b-4 border-teal-500 pb-2 inline-block">4. Freedom Struggle & Nationalist Education</h2>
                                        <div className="bg-white shadow-xl shadow-slate-200/50 border border-slate-200 rounded-2xl p-8 bg-gradient-to-br from-white to-orange-50">
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div>
                                                    <div className="mb-6">
                                                        <h3 className="text-lg font-bold text-slate-900">Rabindranath Tagore</h3>
                                                        <p className="text-slate-700 mt-2">Established <strong>Visva-Bharati University</strong> in 1921. (Origins traced back to Shantiniketan conceptualized around 1901). Focused on learning in harmony with nature, breaking classroom walls, and merging Indian traditions with global cultures.</p>
                                                    </div>
                                                    <div className="mb-6">
                                                        <h3 className="text-lg font-bold text-slate-900">Mahatma Gandhi (1920s)</h3>
                                                        <p className="text-slate-700 mt-2">During the Non-Cooperation Movement, championed alternative nationalist institutions like <strong>Gujarat Vidyapith</strong>, <strong>Kashi Vidyapith</strong>, and <strong>Jamia Millia Islamia</strong> (1920) to boycott British colleges and promote indigenous curriculum.</p>
                                                    </div>
                                                </div>

                                                <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-sm flex flex-col justify-center">
                                                    <h3 className="text-xl font-black text-orange-700 border-b pb-2 mb-4">Nai Talim / Wardha Scheme (1937)</h3>
                                                    <p className="text-slate-700 text-sm mb-3">Conceived by Mahatma Gandhi in his newspaper <em>Harijan</em> and detailed by the <strong>Zakir Husain Committee</strong>. Also known as the <strong>Basic Education Scheme</strong>.</p>
                                                    <ul className="space-y-2 text-sm text-slate-800 font-medium">
                                                        <li className="flex items-center gap-2">✓ Free and compulsory education for 7 years (ages 7 to 14).</li>
                                                        <li className="flex items-center gap-2">✓ Mother tongue as the absolute medium of instruction.</li>
                                                        <li className="flex items-center gap-2">✓ Education centered around manual/productive work (handicrafts, spinning, agriculture).</li>
                                                        <li className="flex items-center gap-2">✓ Self-supporting aspect through the sale of crafted goods to fund teachers' salaries.</li>
                                                        <li className="flex items-center gap-2 text-red-400 mt-2 text-xs">Note: Could not be fully implemented due to the resignation of Congress ministries in 1939 and WWII.</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/*  Phase 5: Post-Independence Era  */}
                                    <section id="post-independence" className="mb-16 scroll-mt-32 os-reveal">
                                        <h2 className="font-merriweather text-3xl font-bold text-slate-900 mb-8 border-b-4 border-teal-500 pb-2 inline-block">5. Post-Independence Commissions</h2>
                                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-teal-900 text-slate-50">
                                                        <th className="p-4 border-b border-teal-200/50 font-bold">Year</th>
                                                        <th className="p-4 border-b border-teal-200/50 font-bold">Commission Name</th>
                                                        <th className="p-4 border-b border-teal-200/50 font-bold">Key Focus / Output</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-slate-700">
                                                    <tr className="hover:bg-slate-50 transition-colors">
                                                        <td className="p-4 border-b font-bold text-teal-800">1948</td>
                                                        <td className="p-4 border-b font-bold">Radhakrishnan Commission</td>
                                                        <td className="p-4 border-b">University Education Commission. Focused on massive reforms inside higher education. <strong>Key Outcome:</strong> Recommended the establishment of the <strong>University Grants Commission (UGC)</strong> (set up in 1953) to regulate and fund universities.</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-50 transition-colors">
                                                        <td className="p-4 border-b font-bold text-teal-800">1952</td>
                                                        <td className="p-4 border-b font-bold">Mudaliar Commission</td>
                                                        <td className="p-4 border-b">Secondary Education Commission (Dr. A. Lakshmanaswami Mudaliar). Structured high school education. Recommended <strong>Multipurpose Schools</strong>, diversification of courses, and vocational training to reduce pressure on universities.</td>
                                                    </tr>
                                                    <tr className="hover:bg-slate-50 transition-colors">
                                                        <td className="p-4 border-b font-bold text-teal-800">1964-66</td>
                                                        <td className="p-4 border-b font-bold">Kothari Commission</td>
                                                        <td className="p-4 border-b">Comprehensive review (Dr. D.S. Kothari). Proposed the <strong>Common-School System</strong> and standard 10+2+3 educational structure nationwide. Recommended spending <strong>6% of the national income (GDP)</strong> on education and introduced the <strong>Three-Language Formula</strong>.</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                            <div className="bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-bold shadow-md">First Education Policy: 1968</div>
                                            <div className="bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-bold shadow-md">Second Education Policy: 1986</div>
                                            <div className="bg-slate-800 text-white px-6 py-3 rounded-full text-sm font-bold shadow-md">Third Education Policy: 2020</div>
                                        </div>
                                    </section>

                                    {/*  MANDATORY SECTION: BPSC Exam Strategy  */}
                                    <section id="strategy" className="mt-20 pt-10 border-t-4 border-dashed border-slate-300 scroll-mt-32 os-reveal">
                                        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                                            {/*  Decorative background circles  */}
                                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                                            <div className="relative z-10">
                                                <h2 className="font-merriweather text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 mb-8 text-center uppercase tracking-widest">
                                                    BPSC TRE 4.0 Mastery Cheatsheet
                                                </h2>

                                                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                                                    {/*  The Bihar Connect  */}
                                                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                                                        <h3 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                                                            📍 The Bihar Connect
                                                        </h3>
                                                        <p className="text-slate-300 text-sm mb-3">Questions combining broader history with Bihar are extremely high-yield for BPSC.</p>
                                                        <ul className="space-y-3">
                                                            <li className="flex items-start gap-3">
                                                                <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">1917</span>
                                                                <span className="text-sm">The same year as the Sadler Commission, <strong>Patna University</strong> was established (First university in Bihar).</span>
                                                            </li>
                                                            <li className="flex items-start gap-3">
                                                                <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">1921</span>
                                                                <span className="text-sm">In parallel to Gandhi's Jamia/Gujarat Vidyapith, the <strong>Bihar Vidyapeeth</strong> was inaugurated at Sadaqat Ashram, Patna, by Gandhi ji to support national education.</span>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    {/*  Exam Traps  */}
                                                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                                                        <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                                                            ⚠️ Exam Traps (Avoid these!)
                                                        </h3>
                                                        <ul className="space-y-4 text-sm text-slate-200">
                                                            <li className="bg-red-500/20 p-3 rounded border border-red-500/30">
                                                                <strong className="text-white">Trap 1:</strong> Confusing <em>Raleigh</em> Commission (1902 - Curzon - Universities Act) with <em>Radhakrishnan</em> Commission (1948 - Independent India - University Ed).
                                                            </li>
                                                            <li className="bg-red-500/20 p-3 rounded border border-red-500/30">
                                                                <strong className="text-white">Trap 2:</strong> When asked "Under whose tenure were the 1857 universities established?" students blindly tick Dalhousie because of Wood's Dispatch. The correct answer is <strong>Lord Canning</strong>.
                                                            </li>
                                                            <li className="bg-red-500/20 p-3 rounded border border-red-500/30">
                                                                <strong className="text-white">Trap 3:</strong> "Father of Modern Western Education in India" usually points to Macaulay/Bentinck systemically, but BPSC options often feature <strong>Raja Ram Mohan Roy</strong> for his ideological championing of it. Read the question nuance carefully!
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/*  Match the following Matrix  */}
                                                <div className="mb-8 bg-slate-800 rounded-2xl overflow-hidden border border-slate-200">
                                                    <div className="bg-slate-700 p-4 text-center font-bold text-lg text-teal-900">MCQ Trigger Word Matrix</div>
                                                    <div className="grid grid-cols-3 text-sm">
                                                        <div className="p-4 border-b border-r border-slate-200 font-bold text-slate-300">See This Keyword...</div>
                                                        <div className="p-4 border-b border-r border-slate-200 font-bold text-slate-300">...Instantly Think Of</div>
                                                        <div className="p-4 border-b border-slate-200 font-bold text-slate-300">Associated Figure</div>

                                                        <div className="p-4 border-b border-r border-slate-200 text-yellow-200">"Magna Carta"</div>
                                                        <div className="p-4 border-b border-r border-slate-200">Wood's Dispatch (1854)</div>
                                                        <div className="p-4 border-b border-slate-200">Charles Wood / Dalhousie</div>

                                                        <div className="p-4 border-b border-r border-slate-200 text-yellow-200">"Local Boards / Municipal"</div>
                                                        <div className="p-4 border-b border-r border-slate-200">Hunter Commission (1882)</div>
                                                        <div className="p-4 border-b border-slate-200">Lord Ripon</div>

                                                        <div className="p-4 border-b border-r border-slate-200 text-yellow-200">"Vocational / Handicraft"</div>
                                                        <div className="p-4 border-b border-r border-slate-200">Nai Talim / Basic Ed. (1937)</div>
                                                        <div className="p-4 border-b border-slate-200">M. Gandhi / Zakir Husain</div>

                                                        <div className="p-4 border-r border-slate-200 text-yellow-200">"Common-School System"</div>
                                                        <div className="p-4 border-r border-slate-200">Kothari Commission (1964)</div>
                                                        <div className="p-4 border-slate-600">D.S. Kothari</div>
                                                    </div>
                                                </div>

                                                {/*  Revision Trick  */}
                                                <div className="bg-gradient-to-r from-teal-900 to-slate-800 rounded-2xl p-6 border border-teal-500/50 text-center">
                                                    <h3 className="text-xl font-bold text-white mb-2 flex justify-center items-center gap-2">🧠 Active Recall Revision Trick</h3>
                                                    <p className="text-slate-300 text-sm max-w-3xl mx-auto">
                                                        Memorize the chronological flow using the <strong>Viceroy-Commission Link</strong> trick:<br /><br />
                                                            <span className="bg-slate-900 text-teal-300 px-3 py-1 rounded border border-slate-700 font-mono text-xs inline-block m-1">1835: Bentinck (Macaulay)</span> ➔
                                                            <span className="bg-slate-900 text-teal-300 px-3 py-1 rounded border border-slate-700 font-mono text-xs inline-block m-1">1854: Dalhousie (Wood's)</span> ➔
                                                            <span className="bg-slate-900 text-teal-300 px-3 py-1 rounded border border-slate-700 font-mono text-xs inline-block m-1">1882: Ripon (Hunter)</span> ➔
                                                            <span className="bg-slate-900 text-teal-300 px-3 py-1 rounded border border-slate-700 font-mono text-xs inline-block m-1">1904: Curzon (Raleigh)</span>
                                                        </p>
                                                        </div>

                                                </div>
                                            </div>
                                    </section>

                                    {/*  Footer  */}
                                    <footer className="mt-16 text-center text-slate-600 text-sm">
                                        <p>Designed for academic excellence. BPSC TRE 4.0 Preparation Module.</p>
                                    </footer>

                                </main>
            </div>
    );
};

export default DevelopmentOfEducation;
