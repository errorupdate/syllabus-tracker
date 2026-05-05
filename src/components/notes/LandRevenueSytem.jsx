import React, { useEffect, useState } from "react";
import { BookOpen, Map, Clock, Swords, CheckCircle2, Target, Lightbulb, Anchor, Compass, Award, Ship } from "lucide-react";

export default function LandRevenueSystem() {
    const [activeSection, setActiveSection] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const navItems = [
        { id: 'foundations', label: 'Foundations', icon: '🏛️' },
        { id: 'british', label: 'British Era', icon: '👑' },
        { id: 'bihar', label: 'Bihar Connect', icon: '🌾' },
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
        <div className="antialiased min-h-screen bg-[#f4f7f6] text-slate-800 font-sans pb-10">
            <style>{`
                .hero-pattern {
                    background-color: #0f172a;
                    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e293b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                }
                .glass-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
                }
                .hover-lift {transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease; }
                .hover-lift:hover {transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
                .fraction {display: inline-flex; flex-direction: column; text-align: center; vertical-align: middle; line-height: 1.2; font-weight: bold; }
                .fraction span:first-child {border-bottom: 2px solid currentColor; padding-bottom: 1px; }
                .fraction span:last-child {padding-top: 1px; }
            `}</style>
            
            {/* ═══ STICKY GLASS HEADER ═══ */}
            <header className={`os-glass-header fixed top-0 w-full z-50 text-white py-3 px-4 md:px-6 ${isScrolled ? 'scrolled' : ''}`}>
                <div className="w-full mx-auto flex justify-between items-center px-2 lg:px-4">
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-red-500/25">
                            HS
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-sm font-bold tracking-wide leading-none">Land Revenue</h1>
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
                        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
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
                <div className="absolute top-16 right-[10%] w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-os-float pointer-events-none"></div>
                <div className="absolute bottom-10 left-[5%] w-56 h-56 bg-red-500/10 rounded-full blur-3xl animate-os-float-delayed pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="w-full mx-auto relative z-10 lg:px-8">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-slate-300">BPSC TRE 4.0 — History Module</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                        Land Revenue
                        <br />
                        <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                            Systems in India
                        </span>
                        <span className="os-cursor"></span>
                    </h2>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10 font-jakarta">
                        A definitive deep-dive into agrarian policies, explicitly curated to secure maximum marks in the BPSC Teacher Recruitment Examination.
                    </p>

                    <div className="flex flex-wrap gap-4 items-center mb-12">
                        <a href="#foundations" onClick={(e) => scrollToSection(e, 'foundations')} className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-500 text-white text-base font-bold px-8 py-4 rounded-xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-1 transition-all duration-300 group os-pulse-glow">
                            Start Learning
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </a>
                    </div>

                    <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                            <span className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400 text-base">📖</span>
                            <span><strong className="text-white">Historical</strong> Context</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <span className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center text-red-400 text-base">⚡</span>
                            <span><strong className="text-white">BPSC</strong> Exam Insights</span>
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 os-scroll-indicator hidden md:block">
                        <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                </div>
            </section>

            <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 space-y-24">

                            {/*  Section 1: Foundations  */}
                            <section id="foundations" className="scroll-mt-32 os-reveal glass-card rounded-2xl p-8 md:p-12">
                                <div className="mb-8 border-b border-slate-200 pb-4">
                                    <h2 className="text-3xl font-bold text-slate-800">I. The Genesis of Land Revenue</h2>
                                    <p className="text-slate-500 mt-2 font-sans text-lg">Understanding the administrative evolution before British intervention.</p>
                                </div>

                                <p className="mb-8 text-lg text-slate-700 leading-relaxed font-sans">
                                    Historically, India has been an <strong>Agrarian Economy</strong>. The primary source of state income was the tax extracted from agricultural produce. A fair, proportional tax system was essential; without it, peasants faced extreme hardship and anxiety.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8">
                                    {/*  Ancient  */}
                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200 hover-lift relative overflow-hidden">
                                        <div className="absolute -right-6 -bottom-6 opacity-5 text-9xl">🏛️</div>
                                        <h3 className="text-2xl font-bold text-amber-900 mb-4 flex items-center gap-3">
                                            <span className="bg-amber-200 text-amber-800 p-2 rounded-lg text-sm">Phase 1</span>
                                            Ancient Era
                                        </h3>
                                        <ul className="space-y-4 font-sans text-amber-900/80">
                                            <li className="flex items-start">
                                                <div className="bg-amber-500 text-white rounded-full p-1 mt-1 mr-3"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                                <div><strong className="text-amber-900">Mauryan Period:</strong> Revenue collected directly from crown-owned lands was specifically termed <strong>"Sita"</strong>. Private land tax was known as <em>Bhaga</em> (usually 1/6th of produce). Mentioned extensively in Kautilya's <em>Arthashastra</em>, where the <em>Samaharta</em> was the chief revenue collector.</div>
                                            </li>
                                            <li className="flex items-start">
                                                <div className="bg-amber-500 text-white rounded-full p-1 mt-1 mr-3"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                                <div><strong className="text-amber-900">Gupta Period:</strong> Land revenue remained the backbone of the empire. Tax on cultivators was called <em>Udranga</em> (regular tax) and <em>Uparikara</em> (extra tax). The system became more decentralized compared to the Mauryas.</div>
                                            </li>
                                        </ul>
                                    </div>

                                    {/*  Mughal  */}
                                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-200 hover-lift relative overflow-hidden">
                                        <div className="absolute -right-6 -bottom-6 opacity-5 text-9xl">👑</div>
                                        <h3 className="text-2xl font-bold text-emerald-900 mb-4 flex items-center gap-3">
                                            <span className="bg-emerald-200 text-emerald-800 p-2 rounded-lg text-sm">Phase 2</span>
                                            Mughal Era (Akbar)
                                        </h3>
                                        <div className="bg-emerald-800/5 p-4 rounded-lg mb-4 border border-emerald-800/10">
                                            <p className="text-sm font-sans text-emerald-800">Mastermind: <strong>Raja Todar Mal</strong> (Finance Minister)</p>
                                        </div>
                                        <ul className="space-y-3 font-sans text-sm text-emerald-900/80">
                                            <li className="flex items-start">
                                                <span className="text-emerald-500 mr-2 font-bold">➔</span>
                                                <div><strong>Zabt System:</strong> A highly scientific method of uniform land measurement using standardized bamboo poles (<em>Jarib</em>) joined by iron rings.</div>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-emerald-500 mr-2 font-bold">➔</span>
                                                <div><strong>Land Classification:</strong> Land was divided into 4 types based on fertility: <em>Polaj</em> (cultivated annually), <em>Parauti</em> (fallow 1-2 years), <em>Chachar</em> (fallow 3-4 years), and <em>Banjar</em> (uncultivated 5+ years).</div>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-emerald-500 mr-2 font-bold">➔</span>
                                                <div><strong>Dahshala System:</strong> Introduced in 1580. Tax was fixed at one-third (1/3) of the average yield of the previous 10 years, payable generally in cash (<em>Dastur</em>).</div>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-emerald-500 mr-2 font-bold">➔</span>
                                                <div><strong>Panchsala:</strong> A 5-year fixed tax system.</div>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-emerald-500 mr-2 font-bold">➔</span>
                                                <div><strong>Jagirdari System:</strong> Military officials (Jagirdars) were granted land rights to collect tax in lieu of cash salaries.</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/*  Section 2: British Expansion  */}
                            <section id="british" className="scroll-mt-32 os-reveal">
                                <div className="mb-10 text-center">
                                    <span className="text-red-600 font-bold tracking-wider uppercase text-sm font-sans bg-red-100 px-3 py-1 rounded-full">Colonial Exploitation</span>
                                    <h2 className="text-4xl font-bold text-slate-800 mt-4">II. The British Revenue Policies</h2>
                                    <p className="text-slate-500 mt-4 w-full mx-auto font-sans">Following the Grant of Diwani (1765) after the Battle of Buxar, the British East India Company shifted from traders to extractors. Their sole objective was maximizing agricultural surplus to fund their wars, administrative machinery, and massive export trade (the "Drain of Wealth").</p>
                                </div>

                                {/*  The Precursor  */}
                                <div className="w-full bg-slate-800 text-white rounded-2xl p-6 shadow-lg mb-12 flex flex-col md:flex-row items-center justify-between border-l-4 border-amber-400">
                                    <div className="mb-4 md:mb-0">
                                        <span className="text-xs text-amber-400 uppercase tracking-widest font-bold font-sans">First British Attempt (1772)</span>
                                        <h4 className="text-2xl font-bold font-serif">Ijardari System (Farming System)</h4>
                                        <p className="text-slate-300 font-sans mt-2 text-sm leading-relaxed max-w-2xl">A harsh system where the right to collect revenue was auctioned to the highest bidder for a period of 5 years (later reduced to 1 year). It was disastrous because the contractors (Banias) had no permanent interest in the land and ruthlessly exploited peasants to extract maximum profit during their short tenure.</p>
                                    </div>
                                    <div className="text-left md:text-right bg-slate-900 p-4 rounded-xl border border-slate-700">
                                        <p className="text-sm font-sans text-slate-400">Introduced By</p>
                                        <p className="text-lg font-bold">Warren Hastings</p>
                                    </div>
                                </div>

                                {/*  The 3 Pillars  */}
                                <div className="grid lg:grid-cols-3 gap-8">

                                    {/*  Permanent Settlement  */}
                                    <div className="glass-card p-8 rounded-2xl border-t-8 border-t-red-500 hover-lift flex flex-col">
                                        <h3 className="text-2xl font-bold text-slate-800 mb-1">Permanent Settlement</h3>
                                        <p className="text-red-600 font-medium text-sm font-sans mb-4 uppercase tracking-wider">(Zamindari / Istamrari System)</p>

                                        <p className="text-sm text-slate-600 mb-6 font-sans leading-relaxed"><strong>Why?</strong> The British wanted a guaranteed, fixed, and stable income without the administrative headache of assessing individual farmers. They created a new class of loyal Zamindars to act as a buffer between the state and the peasants.</p>

                                        <div className="bg-red-50 rounded-xl p-5 mb-6 border border-red-100 relative">
                                            <div className="flex justify-between items-center text-sm font-bold font-sans mb-4 text-slate-700">
                                                <span>Farmer</span>
                                                <span className="text-red-400">➔</span>
                                                <span>Zamindar (Owner)</span>
                                                <span className="text-red-400">➔</span>
                                                <span className="text-red-700">EIC</span>
                                            </div>

                                            <div className="flex items-center justify-between mt-4 p-3 bg-white rounded-lg shadow-sm border border-red-50">
                                                <div className="text-center w-1/2">
                                                    <p className="text-[10px] font-bold text-slate-500 font-sans uppercase mb-1">British Share</p>
                                                    <div className="text-xl text-red-600"><span className="fraction"><span>10</span><span>11</span></span></div>
                                                    <p className="text-[10px] text-slate-400 mt-1">approx 89%</p>
                                                </div>
                                                <div className="w-px h-12 bg-red-200"></div>
                                                <div className="text-center w-1/2">
                                                    <p className="text-[10px] font-bold text-slate-500 font-sans uppercase mb-1">Zamindar Share</p>
                                                    <div className="text-xl text-slate-700"><span className="fraction"><span>1</span><span>11</span></span></div>
                                                    <p className="text-[10px] text-slate-400 mt-1">approx 11%</p>
                                                </div>
                                            </div>
                                        </div>

                                        <ul className="text-sm space-y-3 font-sans text-slate-700 flex-grow">
                                            <li className="flex justify-between border-b border-slate-100 pb-2"><strong>Year:</strong> <span>1793</span></li>
                                            <li className="flex justify-between border-b border-slate-100 pb-2"><strong>Architects:</strong> <span>Cornwallis & John Shore</span></li>
                                            <li className="flex justify-between border-b border-slate-100 pb-2"><strong>Coverage:</strong> <span className="text-right text-red-600 font-bold">19% of British India</span></li>
                                            <li className="flex justify-between border-b border-slate-100 pb-2"><strong>Regions:</strong> <span className="text-right text-xs">Bengal, Bihar, Odisha, Varanasi, N. Karnataka</span></li>
                                            <li className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                                                <strong className="text-red-600 block mb-1">🔥 Sunset Law (1794):</strong>
                                                If the Zamindar failed to deposit revenue by sunset of a specified date, the estate was auctioned. This ruthless rule birthed <strong>Absentee Landlordism</strong>, as Zamindars moved to cities and sent harsh agents to exploit farmers.
                                            </li>
                                        </ul>
                                    </div>

                                    {/*  Ryotwari Settlement  */}
                                    <div className="glass-card p-8 rounded-2xl border-t-8 border-t-emerald-500 hover-lift flex flex-col">
                                        <h3 className="text-2xl font-bold text-slate-800 mb-1">Ryotwari System</h3>
                                        <p className="text-emerald-600 font-medium text-sm font-sans mb-4 uppercase tracking-wider">(Direct Peasant System)</p>

                                        <p className="text-sm text-slate-600 mb-6 font-sans leading-relaxed"><strong>Why?</strong> In South/West India, there were no traditional Zamindars. Alexander Reed recommended bypassing intermediaries and dealing directly with the actual tiller (Ryot).</p>

                                        <div className="bg-emerald-50 rounded-xl p-5 mb-6 border border-emerald-100 text-center relative h-[148px] flex flex-col justify-center">
                                            <p className="text-xs text-emerald-800 font-bold mb-3 uppercase tracking-wider">No Intermediaries</p>
                                            <div className="flex justify-around items-center text-sm font-bold font-sans text-slate-700">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-3xl mb-1">👨‍🌾</span>
                                                    <span>Ryot (Farmer)</span>
                                                </div>
                                                <div className="flex flex-col items-center text-emerald-500">
                                                    <span>Direct Pay</span>
                                                    <span>━━━━➔</span>
                                                    <span className="text-[10px] mt-1 bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Up to 50-60% Tax</span>
                                                </div>
                                                <div className="flex flex-col items-center text-emerald-700">
                                                    <span className="text-3xl mb-1">🏢</span>
                                                    <span>EIC</span>
                                                </div>
                                            </div>
                                        </div>

                                        <ul className="text-sm space-y-3 font-sans text-slate-700 flex-grow">
                                            <li className="flex justify-between border-b border-slate-100 pb-2"><strong>Year:</strong> <span>1792 (Baramahal), 1820 (Madras)</span></li>
                                            <li className="flex justify-between border-b border-slate-100 pb-2"><strong>Architects:</strong> <span>Thomas Munro & A. Reed</span></li>
                                            <li className="flex justify-between border-b border-slate-100 pb-2"><strong>Coverage:</strong> <span className="text-right text-emerald-600 font-bold">51% of British India</span></li>
                                            <li className="flex justify-between border-b border-slate-100 pb-2"><strong>Regions:</strong> <span className="text-right text-xs">Madras, Bombay, Assam, East Bengal, Coorg</span></li>
                                            <li className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                                                <strong className="text-emerald-600 block mb-1">💡 The Trap:</strong>
                                                The farmer was given ownership rights (Patta), but the tax was arbitrarily assessed and mercilessly collected. Unable to pay, farmers lost lands to <strong>Moneylenders (Mahajans)</strong>, sparking peasant revolts like the Deccan Riots.
                                            </li>
                                        </ul>
                                    </div>

                                    {/*  Mahalwari Settlement  */}
                                    <div className="glass-card p-8 rounded-2xl border-t-8 border-t-purple-500 hover-lift flex flex-col">
                                        <h3 className="text-2xl font-bold text-slate-800 mb-1">Mahalwari System</h3>
                                        <p className="text-purple-600 font-medium text-sm font-sans mb-4 uppercase tracking-wider">(Village Unit System)</p>

                                        <p className="text-sm text-slate-600 mb-6 font-sans leading-relaxed"><strong>Why?</strong> A hybrid system for the North. The basic unit of assessment was the 'Mahal' (village/estate). The village community collectively owned the land and was jointly responsible for tax.</p>

                                        <div className="bg-purple-50 rounded-xl p-5 mb-6 border border-purple-100 h-[148px] flex flex-col justify-center">
                                            <div className="flex justify-between items-center text-sm font-bold font-sans text-slate-700">
                                                <div className="text-center">
                                                    <span className="text-2xl mb-1 block">🏘️</span>
                                                    <span>Mahal<br/>(Community)</span>
                                                </div>
                                                <span className="text-purple-400 flex flex-col items-center">
                                                    <span className="text-[10px] text-purple-600 mb-1">Collects</span>
                                                    <span>➔</span>
                                                </span>
                                                <div className="text-center">
                                                    <span className="text-2xl mb-1 block">👳</span>
                                                    <span>Lambardar<br/>(Headman)</span>
                                                </div>
                                                <span className="text-purple-400 flex flex-col items-center">
                                                    <span className="text-[10px] text-purple-600 mb-1">Pays</span>
                                                    <span>➔</span>
                                                </span>
                                                <div className="text-center text-purple-700">
                                                    <span className="text-2xl mb-1 block">🏢</span>
                                                    <span>EIC</span>
                                                </div>
                                            </div>
                                        </div>

                                        <ul className="text-sm space-y-3 font-sans text-slate-700 flex-grow">
                                            <li className="flex justify-between border-b border-slate-100 pb-2"><strong>Year:</strong> <span>1822 (Revised 1833 by Bentinck)</span></li>
                                            <li className="flex justify-between border-b border-slate-100 pb-2"><strong>Architects:</strong> <span className="text-right">Holt Mackenzie & RM Bird</span></li>
                                            <li className="flex justify-between border-b border-slate-100 pb-2"><strong>Coverage:</strong> <span className="text-right text-purple-600 font-bold">30% of British India</span></li>
                                            <li className="flex justify-between border-b border-slate-100 pb-2"><strong>Regions:</strong> <span className="text-right text-xs">NW Province, Central Prov, Punjab, Ganga Valley</span></li>
                                            <li className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                                                <strong className="text-purple-600 block mb-1">⚖️ Key Features:</strong>
                                                Tax was periodically revised (not permanent). It destroyed traditional village autonomy. Heavy assessments led to widespread land alienation, fueling anger that erupted in the 1857 Revolt.
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                                {/*  Minor Regional Systems  */}
                                <div className="mt-10 w-full bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col sm:flex-row justify-around items-center gap-6 shadow-inner font-sans">
                                    <div className="text-center w-full">
                                        <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Regional Concept</span>
                                        <span className="block text-indigo-900 font-bold text-xl mb-1">Taluqdari System</span>
                                        <span className="text-sm text-slate-600">Predominant in the <strong>Awadh (Oudh)</strong> Region</span>
                                    </div>
                                    <div className="hidden sm:block w-px h-16 bg-slate-300"></div>
                                    <div className="text-center w-full">
                                        <span className="block text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Regional Concept</span>
                                        <span className="block text-indigo-900 font-bold text-xl mb-1">Malguzari System</span>
                                        <span className="text-sm text-slate-600">Predominant in the <strong>Maratha</strong> (South-West) Region</span>
                                    </div>
                                </div>
                            </section>

                            {/*  Section 3: Bihar Deep Dive (Tinkathia)  */}
                            <section id="bihar" className="scroll-mt-32 os-reveal">
                                <div className="bg-[#0a2540] rounded-3xl shadow-2xl overflow-hidden text-white relative">
                                    {/*  Decorative background elements  */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>

                                    <div className="p-8 md:p-12 lg:p-16 relative z-10">
                                        <div className="flex flex-col md:flex-row gap-12 items-center">
                                            <div className="flex-1">
                                                <div className="inline-flex items-center gap-2 px-4 py-1 bg-amber-400 text-slate-900 font-bold rounded-full text-xs mb-6 uppercase tracking-widest font-sans">
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900"></span>
                                                    </span>
                                                    BPSC High Yield Topic
                                                </div>
                                                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">The Tinkathia System & Champaran</h2>

                                                <p className="text-blue-100 text-lg mb-6 leading-relaxed font-sans font-light">
                                                    European planters ruthlessly exploited Bihari peasants by mandating the cultivation of Indigo (Neel), a cash crop required for the textile industries in Europe. This commercial farming devastated soil fertility, leading to severe famines and systemic poverty.
                                                </p>
                                                
                                                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 mb-6 backdrop-blur-sm">
                                                    <h4 className="font-bold text-amber-400 mb-2 text-sm">The Catalyst for Revolt</h4>
                                                    <p className="text-sm text-slate-300">By the late 1890s, synthetic dye (German dye) was invented, making natural indigo unprofitable. Planters began closing factories, but they refused to release farmers from their contracts unless they paid massive, illegal compensations called <strong>Tawan</strong> (lump sum) and <strong>Sharahbeshi</strong> (rent enhancement).</p>
                                                </div>

                                                <div className="space-y-4 font-sans">
                                                    <div className="bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-md">
                                                        <h4 className="font-bold text-amber-300 mb-2 flex items-center gap-2">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                                            The Mathematical Trap (3/20 Rule)
                                                        </h4>
                                                        <p className="text-sm text-blue-50 leading-relaxed">Farmers were legally bound to grow indigo on <strong>3 Kathas</strong> out of every <strong>20 Kathas</strong> of their land. Note: 20 Kathas equal 1 Bigha (or 1 Bissa).</p>
                                                    </div>
                                                    <div className="bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-md">
                                                        <h4 className="font-bold text-amber-300 mb-2 flex items-center gap-2">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                                                            Literary Evidence
                                                        </h4>
                                                        <p className="text-sm text-blue-50 leading-relaxed">The brutal reality of this agrarian crisis was immortalized in the famous Bengali play <strong>"Neel Darpan"</strong>, authored by <strong>Deen Bandhu Mitra</strong>.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/*  Visual Representation  */}
                                            <div className="flex-1 w-full max-w-sm mx-auto">
                                                <div className="bg-white p-6 rounded-2xl text-slate-800 shadow-xl transform rotate-1 hover:rotate-0 transition duration-300">
                                                    <h4 className="text-center font-bold mb-4 text-slate-800 font-sans border-b border-slate-100 pb-2">Visualizing 1 Bigha (20 Kathas)</h4>
                                                    <div className="grid grid-cols-5 gap-1.5 mb-4 p-2 bg-slate-50 rounded-lg">
                                                        {/*  3 Indigo Kathas  */}
                                                        <div className="aspect-square bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold shadow-inner" title="Indigo (Neel)">NEEL</div>
                                                        <div className="aspect-square bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold shadow-inner" title="Indigo (Neel)">NEEL</div>
                                                        <div className="aspect-square bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold shadow-inner" title="Indigo (Neel)">NEEL</div>
                                                        {/*  17 Normal Kathas  */}
                                                        <div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div><div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div>
                                                        <div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div><div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div>
                                                        <div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div><div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div>
                                                        <div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div><div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div>
                                                        <div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div><div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div>
                                                        <div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div><div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div>
                                                        <div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div><div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div>
                                                        <div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div><div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div>
                                                        <div className="aspect-square bg-amber-200/60 border border-amber-300/50 rounded"></div>
                                                    </div>
                                                    <p className="text-xs text-center text-slate-500 font-medium font-sans bg-slate-100 p-2 rounded">3 Blue boxes forced out of 20 total boxes.</p>

                                                    <div className="mt-5 border-t border-slate-100 pt-4 font-sans text-center">
                                                        <h5 className="font-bold text-teal-700 mb-1">Champaran Satyagraha (1917)</h5>
                                                        <p className="text-xs text-slate-600 leading-tight"><strong>Rajkumar Shukla</strong> met Gandhi at the 1916 INC Lucknow Session to report the plight. Gandhi's first civil disobedience in India forced the government to form the <em>Champaran Agrarian Committee</em> (with Gandhi as a member). Tinkathia was abolished, and planters were forced to refund <strong>25%</strong> of the illegal dues.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/*  Section 4: Exam Strategy Matrix  */}
                            <section id="strategy" className="scroll-mt-32 os-reveal">
                                <div className="mb-10 border-l-4 border-slate-800 pl-4">
                                    <h2 className="text-3xl font-bold text-slate-800">Mastery Cheatsheet: BPSC Exam Strategy</h2>
                                    <p className="text-slate-500 mt-2 font-sans">High-probability question patterns to secure your marks, specifically tailored for BPSC TRE 4.0.</p>
                                </div>

                                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 font-sans">
                                    {/*  Strategy 1: Match-the-Following  */}
                                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
                                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                                        </div>
                                        <h3 className="font-bold text-lg mb-3 text-slate-800 border-b border-slate-100 pb-2">1. The "Match-the-Following" Matrix</h3>
                                        <p className="text-sm text-slate-500 mb-3">Memorize these exact triads (System + Creator + Region):</p>
                                        <ul className="text-sm space-y-3 text-slate-600">
                                            <li className="flex justify-between items-center"><span className="font-medium text-slate-800">Bengal & Bihar</span> <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded text-xs">Cornwallis (Zamindari)</span></li>
                                            <li className="flex justify-between items-center"><span className="font-medium text-slate-800">Madras / South India</span> <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs">Munro (Ryotwari)</span></li>
                                            <li className="flex justify-between items-center"><span className="font-medium text-slate-800">Punjab / North-West</span> <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-xs">Mackenzie (Mahalwari)</span></li>
                                            <li className="flex justify-between items-center"><span className="font-medium text-slate-800">Awadh (Oudh)</span> <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-xs">Taluqdari</span></li>
                                        </ul>
                                    </div>

                                    {/*  Strategy 2: Keywords  */}
                                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
                                        <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                        </div>
                                        <h3 className="font-bold text-lg mb-3 text-slate-800 border-b border-slate-100 pb-2">2. MCQ "Trigger Words"</h3>
                                        <p className="text-sm text-slate-500 mb-3">Train your eyes for these keywords in exam questions:</p>
                                        <ul className="text-sm space-y-3 text-slate-600 mt-3">
                                            <li className="flex flex-col"><span className="font-bold text-slate-800">"Sunset Law" (Suryast Kanoon)</span> <span>➔ <strong>Permanent Settlement</strong> (Never Ryotwari)</span></li>
                                            <li className="flex flex-col"><span className="font-bold text-slate-800">"Mahal" or Estate</span> <span>➔ <strong>Mahalwari</strong> (Village Headman)</span></li>
                                            <li className="flex flex-col"><span className="font-bold text-slate-800">"Sita"</span> <span>➔ <strong>Mauryan Empire</strong> (Crown-owned lands)</span></li>
                                            <li className="flex flex-col"><span className="font-bold text-slate-800">"Dahshala" / "Zabt"</span> <span>➔ <strong>Raja Todar Mal / Akbar</strong> (10-year yield)</span></li>
                                        </ul>
                                    </div>

                                    {/*  Strategy 3: BPSC Traps  */}
                                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
                                        <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center mb-4">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                        </div>
                                        <h3 className="font-bold text-lg mb-3 text-slate-800 border-b border-slate-100 pb-2">3. Exam Traps & Minute Details</h3>
                                        <div className="space-y-3 mt-3 text-sm">
                                            <div className="p-3 bg-rose-50 rounded border border-rose-100 text-slate-700">
                                                <strong className="text-rose-800">The Warren Hastings Trap:</strong> Examiners often put Hastings next to "Permanent Settlement" to confuse you. Hastings started the <strong>Ijardari System (1772)</strong>. Cornwallis did the Permanent Settlement.
                                            </div>
                                            <div className="p-3 bg-slate-50 rounded border border-slate-100 text-slate-700">
                                                <strong>The Revenue Split Trap:</strong> EIC kept <strong>10/11</strong> parts; the Zamindar kept exactly <strong>1/11</strong> part.
                                            </div>
                                            <div className="p-3 bg-slate-50 rounded border border-slate-100 text-slate-700">
                                                <strong>The Ownership Trap:</strong> In the Permanent Settlement, the legal owner of the land was the <strong>Zamindar</strong>, not the farmer.
                                            </div>
                                        </div>
                                    </div>

                                    {/*  Strategy 4: Bihar Connect Summary  */}
                                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
                                        <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-4">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </div>
                                        <h3 className="font-bold text-lg mb-3 text-slate-800 border-b border-slate-100 pb-2">4. The "Bihar Connect" Q&A</h3>
                                        <p className="text-sm text-slate-500 mb-3">Guaranteed marks if you memorize these ripple effects:</p>
                                        <div className="space-y-2 mt-3 text-sm text-slate-700">
                                            <p><strong>Q:</strong> What was the exact ratio of Tinkathia?</p>
                                            <p className="mb-3 text-teal-700 font-medium"><strong>A:</strong> 3/20 (3 Kathas per 1 Bigha).</p>

                                            <p><strong>Q:</strong> Who invited Gandhi to Champaran, and where?</p>
                                            <p className="mb-3 text-teal-700 font-medium"><strong>A:</strong> Rajkumar Shukla, at the 1916 INC Lucknow Session.</p>

                                            <p><strong>Q:</strong> What was the compensation refund percentage?</p>
                                            <p className="mb-3 text-teal-700 font-medium"><strong>A:</strong> 25% of the illegal dues (Tawan/Sharahbeshi).</p>
                                            
                                            <p><strong>Q:</strong> Which system was dominant in Bihar?</p>
                                            <p className="text-teal-700 font-medium"><strong>A:</strong> The Permanent Settlement (Zamindari).</p>
                                        </div>
                                    </div>
                                </div>

                                {/*  How to Revise Box  */}
                                <div className="mt-8 bg-slate-800 rounded-xl p-6 md:p-8 flex items-center gap-6 shadow-lg text-white">
                                    <div className="hidden md:flex w-16 h-16 bg-slate-700 rounded-full items-center justify-center text-3xl shrink-0">
                                        📝
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold font-serif mb-2 text-amber-400">How to Revise This Before the Exam</h3>
                                        <p className="text-slate-300 font-sans text-sm leading-relaxed">
                                            <strong>Do not read paragraphs.</strong> Create a blank table on a piece of paper with four columns: <span className="bg-slate-700 px-1.5 py-0.5 rounded text-white text-xs">System Name</span>, <span className="bg-slate-700 px-1.5 py-0.5 rounded text-white text-xs">Year</span>, <span className="bg-slate-700 px-1.5 py-0.5 rounded text-white text-xs">Founder</span>, and <span className="bg-slate-700 px-1.5 py-0.5 rounded text-white text-xs">Key Feature/Region</span>. Try to fill it entirely from memory. If you can write out Zabt, Ijardari, Permanent, Ryotwari, Mahalwari, and Tinkathia without looking, you are 100% prepared.
                                        </p>
                                    </div>
                                </div>
                            </section>

                        </main>

                        <footer className="bg-white border-t border-slate-200 py-10 mt-12 text-center font-sans">
                            <div className="w-full mx-auto px-6">
                                <h4 className="text-xl font-bold text-slate-800 tracking-tight">Educational Excellence Portal</h4>
                                <p className="text-slate-500 text-sm mt-2 mb-6">Comprehensive Study Material • Documented for Academic Precision</p>
                                <div className="h-px w-24 bg-slate-200 mx-auto mb-6"></div>
                                <p className="text-xs text-slate-400">Optimized for Competitive Examinations.</p>
                            </div>
                        </footer>

                    
    </div>
  );
}
