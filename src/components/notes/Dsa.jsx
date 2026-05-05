import React, { useEffect, useState } from 'react';

const Dsa = () => {
    const [activeSection, setActiveSection] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const navItems = [
        { id: 'basics', label: 'Basics', icon: '🔢' },
        { id: 'complexity', label: 'Complexity', icon: '⏱️' },
        { id: 'arrays-linkedlists', label: 'Arrays & Lists', icon: '🔗' },
        { id: 'expressions-masterclass', label: 'Stacks', icon: '📚' },
        { id: 'queues-masterclass', label: 'Queues', icon: '🚶' },
        { id: 'trees-masterclass', label: 'Trees', icon: '🌳' },
        { id: 'complexity-table', label: 'Complexity Table', icon: '📊' },
        { id: 'numericals', label: 'Numericals', icon: '🧮' },
        { id: 'mcq-practice', label: 'MCQs', icon: '✅' },
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
        // Scroll-reveal animation observer
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

        document.querySelectorAll('.os-reveal, .fade-in-section, .reveal').forEach(el => observer.observe(el));

        // Active section tracking
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
        <div className="text-slate-800 dark:text-slate-200 antialiased font-sans w-full min-h-screen">
            {/* ═══ STICKY GLASS HEADER ═══ */}
            <header className={`os-glass-header fixed top-0 w-full z-50 text-white py-3 px-4 md:px-6 ${isScrolled ? 'scrolled' : ''}`}>
                <div className="w-full mx-auto flex justify-between items-center px-2 lg:px-4">
                    {/* Brand */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-teal-500/25">
                            DSA
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-sm font-bold tracking-wide leading-none">Computer Science</h1>
                            <p className="text-[11px] text-slate-400 font-medium mt-0.5">BPSC TRE 4.0</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
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

                    {/* Mobile Hamburger */}
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

                {/* Mobile Nav Dropdown */}
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
                {/* Animated decorative orbs */}
                <div className="absolute top-16 right-[10%] w-72 h-72 bg-teal-400/10 rounded-full blur-3xl animate-os-float pointer-events-none"></div>
                <div className="absolute bottom-10 left-[5%] w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl animate-os-float-delayed pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="w-full mx-auto relative z-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-slate-300">BPSC TRE 4.0 — Complete DSA Masterclass</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                        Data Structures
                        <br />
                        <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
                            &amp; Algorithms
                        </span>
                        <span className="os-cursor"></span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10 font-jakarta">
                        Master problem solving, time complexities, and core data structures — engineered for maximum yield on your competitive exam.
                    </p>

                    {/* CTA Row */}
                    <div className="flex flex-wrap gap-4 items-center mb-12">
                        <a href="#basics" onClick={(e) => scrollToSection(e, 'basics')} className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-base font-bold px-8 py-4 rounded-xl shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all duration-300 group os-pulse-glow">
                            Start Learning
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </a>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2 text-slate-400">
                            <span className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-400 text-base">📚</span>
                            <span><strong className="text-white">6</strong> Lectures</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <span className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 text-base">📈</span>
                            <span><strong className="text-white">100%</strong> Yield Guarantee</span>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 os-scroll-indicator hidden md:block">
                        <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                </div>
            </section>

            <main className="w-full mx-auto pb-16 px-4 sm:px-6 lg:px-8 space-y-24 pt-16">

                                    {/*  SECTION 1: Algorithm Basics &amp; Control Flow  */}
                                    <section id="basics" className="glass-card p-6 md:p-10 rounded-3xl fade-in-section dark:bg-slate-800">
                                        <div className="flex items-center mb-8 border-b-2 border-slate-200 dark:border-slate-700 pb-4">
                                            <span className="bg-primary text-white text-xl md:text-2xl font-serif font-bold w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl mr-4 shrink-0 shadow-md">1</span>
                                            <h2 className="font-serif text-2xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">Algorithm Basics &amp; Python Control Flow</h2>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                                            {/*  Python Loops  */}
                                            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                                <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-4 group-hover:text-primary transition-colors">Python Loop Structures</h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Loops control the repetitive execution of code (crucial for traversing data structures).</p>

                                                <div className="space-y-4">
                                                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-300 transition-colors">
                                                        <strong className="text-indigo-700 dark:text-indigo-400 block mb-1">While Loop</strong>
                                                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Runs as long as a condition is true. Best when exact iteration count is unknown.</p>
                                                        <code className="text-xs bg-slate-800 text-slate-200 p-2 rounded block hover:bg-slate-900 transition-colors">count = 0<br />while(count &lt; 10): count++</code>
                                                    </div>
                                                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-300 transition-colors">
                                                        <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">For Loop</strong>
                                                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Iterates over sequences (arrays/lists). Use <code className="font-bold bg-slate-200 dark:bg-slate-700 px-1 hover:bg-slate-300 transition-colors">range(start, end, step)</code>.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/*  Prime Number Algorithm Optimization  */}
                                            <div className="bg-blue-50 dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-blue-200 dark:border-blue-900 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-bl-lg transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">ALGORITHM OPTIMIZATION</div>
                                                <h3 className="font-bold text-xl text-blue-900 dark:text-blue-300 mb-4">Prime Number Check</h3>
                                                <p className="text-sm text-slate-700 dark:text-slate-400 mb-4">Instead of checking divisibility up to <code className="bg-white dark:bg-slate-800 px-1 font-bold shadow-sm">n-1</code>, a highly optimized algorithm only checks up to the integer square root of <code className="bg-white dark:bg-slate-800 px-1 font-bold shadow-sm">n</code>.</p>

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
                                    <section id="complexity" className="glass-card p-6 md:p-10 rounded-3xl border-t-4 border-t-rose-500 fade-in-section dark:bg-slate-800">
                                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">2. Asymptotic Notations &amp; Complexity</h2>
                                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-8 font-medium">Mathematical tools used to describe an algorithm's Time (CPU operations) and Space (Memory) efficiency as the input size n grows.</p>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
                                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group cursor-default">
                                                <div className="text-4xl font-black text-rose-600 dark:text-rose-400 mb-2 group-hover:scale-110 transition-transform inline-block">O(n)</div>
                                                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Big-O Notation</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 uppercase font-bold bg-rose-50 dark:bg-rose-900/20 py-1 rounded group-hover:bg-rose-100 transition-colors">Worst Case Scenario</p>
                                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Defines the maximum possible time an algorithm could take (Upper Bound).</p>
                                            </div>
                                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group cursor-default">
                                                <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-110 transition-transform inline-block">&Omega;(n)</div>
                                                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Omega Notation</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 uppercase font-bold bg-emerald-50 dark:bg-emerald-900/20 py-1 rounded group-hover:bg-emerald-100 transition-colors">Best Case Scenario</p>
                                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Defines the minimum possible time an algorithm could take (Lower Bound).</p>
                                            </div>
                                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group cursor-default">
                                                <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform inline-block">&Theta;(n)</div>
                                                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Theta Notation</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 uppercase font-bold bg-blue-50 dark:bg-blue-900/20 py-1 rounded group-hover:bg-blue-100 transition-colors">Average Case Scenario</p>
                                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Provides a tight bound when best and worst cases converge.</p>
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
                                    <section id="arrays-linkedlists" className="glass-card p-6 md:p-10 rounded-3xl border-t-4 border-t-blue-500 fade-in-section dark:bg-slate-800">
                                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">3. Linear Data Structures: Arrays &amp; Linked Lists</h2>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                                            {/*  Arrays  */}
                                            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                                <div className="absolute top-0 right-0 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-[10px] md:text-xs font-bold px-3 py-1 rounded-bl-lg">STATIC MEMORY</div>
                                                <h3 className="font-bold text-xl md:text-2xl text-slate-800 dark:text-slate-100 mb-4">Array Architecture</h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Homogeneous, contiguous memory. Allows <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono text-emerald-600 dark:text-emerald-400 shadow-sm">O(1)</code> random access but suffers from <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono text-rose-600 dark:text-rose-400 shadow-sm">O(n)</code> insertion shifting.</p>
                                                <div className="mb-6 transform group-hover:scale-[1.02] transition-transform duration-300 origin-left">
                                                    <strong className="text-sm block mb-2 text-slate-700 dark:text-slate-300">Address Calculation Formula (1D):</strong>
                                                    <div className="bg-slate-900 text-green-400 p-3 rounded-lg font-mono text-xs md:text-sm shadow-inner overflow-x-auto-custom whitespace-nowrap border-l-4 border-green-400">
                                                        Addr = Base_Addr + (Index &times; Size_of_Datatype)
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-900 rounded-lg shadow-sm hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors duration-300">
                                                    <strong className="text-red-800 dark:text-red-300 text-sm font-bold block mb-1 flex items-center">
                                                        <svg className="w-4 h-4 mr-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                                                        BPSC Trap Alert: Array Size
                                                    </strong>
                                                    <p className="text-xs text-red-700 dark:text-red-200">If an array is declared as <code>int arr[15]</code> and integer size is 4 bytes, total memory allocated is <b className="bg-white/50 dark:bg-slate-800 px-1 rounded">15 &times; 4 = 60 bytes</b>. The index ranges exactly from <b className="bg-white/50 dark:bg-slate-800 px-1 rounded">0 to 14</b>.</p>
                                                </div>
                                            </div>

                                            {/*  Linked Lists  */}
                                            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                                <div className="absolute top-0 right-0 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-[10px] md:text-xs font-bold px-3 py-1 rounded-bl-lg">DYNAMIC MEMORY</div>
                                                <h3 className="font-bold text-xl md:text-2xl text-slate-800 dark:text-slate-100 mb-4">Linked Lists</h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Nodes scattered in memory, connected via pointers. Provides <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono text-emerald-600 dark:text-emerald-400 shadow-sm">O(1)</code> insertion/deletion but <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono text-rose-600 dark:text-rose-400 shadow-sm">O(n)</code> for access.</p>

                                                <strong className="text-sm block mb-3 text-slate-700 dark:text-slate-300">Singly Linked List Memory Trace:</strong>
                                                <div className="flex items-center space-x-2 overflow-x-auto-custom pb-4 py-2 pl-2 -ml-2">
                                                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-6 px-1 shrink-0 animate-bounce">HEAD<br />&darr;</div>
                                                    <div className="ll-node"><div className="ll-data">A</div><div className="ll-next">*</div></div>
                                                    <span className="text-slate-400 font-black shrink-0 animate-pulse">&rarr;</span>
                                                    <div className="ll-node"><div className="ll-data">B</div><div className="ll-next">null</div></div>
                                                    <span className="text-slate-500 font-bold text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded shrink-0 shadow-sm border border-slate-200 dark:border-slate-700">NULL</span>
                                                </div>

                                                <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 rounded-lg shadow-sm hover:border-emerald-300 transition-colors duration-300">
                                                    <strong className="text-emerald-800 dark:text-emerald-300 text-sm font-bold block mb-2 border-b border-emerald-200/50 pb-1">Insertion Logic (Pseudo-code)</strong>
                                                    <p className="text-xs text-slate-700 dark:text-slate-300 font-mono leading-relaxed">
                                                        1. new_node = memory_alloc()<br />
                                                        2. new_node.data = value<br />
                                                        3. new_node.next = head<br />
                                                        4. head = new_node
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    
                                    {/* ═══ SECTION 4: Stacks & Recursion ═══ */}
                                    <section id="expressions-masterclass" className="glass-card p-6 md:p-10 rounded-3xl border-t-4 border-t-purple-500 fade-in-section dark:bg-slate-800">
                                        <div className="flex items-center mb-8 border-b-2 border-slate-200 dark:border-slate-700 pb-4">
                                            <span className="bg-purple-600 text-white text-xl md:text-2xl font-serif font-bold w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl mr-4 shrink-0 shadow-md">4</span>
                                            <h2 className="font-serif text-2xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">Stacks &amp; Recursion</h2>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                                            {/* Stack Fundamentals */}
                                            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                                <div className="absolute top-0 right-0 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-[10px] md:text-xs font-bold px-3 py-1 rounded-bl-lg">LIFO</div>
                                                <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-4">Stack Fundamentals</h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">A linear data structure following <strong>LIFO (Last In First Out)</strong>. Real-life examples: pile of plates, undo feature in editors.</p>
                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center gap-3 p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-100 dark:border-purple-800">
                                                        <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">Push</span>
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">Insert element at the top</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-100 dark:border-purple-800">
                                                        <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">Pop</span>
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">Remove element from the top</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-100 dark:border-purple-800">
                                                        <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">Peek</span>
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">View the top element without removing</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-100 dark:border-purple-800">
                                                        <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">isEmpty</span>
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">Check if stack is empty</span>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 text-xs">
                                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
                                                        <strong className="text-blue-800 dark:text-blue-300 block mb-1">Array Implementation</strong>
                                                        <span className="text-slate-600 dark:text-slate-400">Uses array + top index. Fixed size.</span>
                                                    </div>
                                                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-100 dark:border-emerald-800">
                                                        <strong className="text-emerald-800 dark:text-emerald-300 block mb-1">Linked List Implementation</strong>
                                                        <span className="text-slate-600 dark:text-slate-400">Uses nodes with pointers. Dynamic size.</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expression Conversion */}
                                            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                                <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-4">Expression Conversion (Stack Application)</h3>
                                                <div className="space-y-4">
                                                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                                                        <strong className="text-amber-800 dark:text-amber-300 block mb-2">Infix → Postfix Steps:</strong>
                                                        <ol className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-decimal ml-4">
                                                            <li>Scan from left to right</li>
                                                            <li>If operand, add to output</li>
                                                            <li>If operator, pop higher precedence from stack</li>
                                                            <li>Push current operator</li>
                                                        </ol>
                                                    </div>
                                                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                                                        <strong className="text-indigo-800 dark:text-indigo-300 block mb-2">Infix → Prefix Steps:</strong>
                                                        <ol className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-decimal ml-4">
                                                            <li>Reverse the infix expression</li>
                                                            <li>Swap parentheses: ( ↔ )</li>
                                                            <li>Convert to postfix</li>
                                                            <li>Reverse result → Prefix</li>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Recursion */}
                                        <div className="mt-8 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                            <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-4">Recursion</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">A programming technique where a function calls itself to solve a problem by breaking it down into smaller, similar subproblems.</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl border border-rose-200 dark:border-rose-800 text-center">
                                                    <strong className="text-rose-800 dark:text-rose-300 block mb-1 text-sm">Base Case</strong>
                                                    <p className="text-xs text-slate-600 dark:text-slate-400">Condition to stop recursion (e.g., n==0 in factorial)</p>
                                                </div>
                                                <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl border border-sky-200 dark:border-sky-800 text-center">
                                                    <strong className="text-sky-800 dark:text-sky-300 block mb-1 text-sm">Recursive Case</strong>
                                                    <p className="text-xs text-slate-600 dark:text-slate-400">Function calls itself with a smaller problem</p>
                                                </div>
                                                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-200 dark:border-violet-800 text-center">
                                                    <strong className="text-violet-800 dark:text-violet-300 block mb-1 text-sm">Call Stack</strong>
                                                    <p className="text-xs text-slate-600 dark:text-slate-400">Each call added to stack until base case reached</p>
                                                </div>
                                                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800 text-center">
                                                    <strong className="text-teal-800 dark:text-teal-300 block mb-1 text-sm">Unwinding</strong>
                                                    <p className="text-xs text-slate-600 dark:text-slate-400">Stack resolves backwards once base case is met</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Advantages / Disadvantages */}
                                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                                                <strong className="text-emerald-800 dark:text-emerald-300 block mb-2">✅ Stack Advantages</strong>
                                                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-disc ml-4">
                                                    <li>Easy to implement</li>
                                                    <li>Used in function calls and expression evaluation</li>
                                                    <li>Manages memory for recursive calls</li>
                                                </ul>
                                            </div>
                                            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                                                <strong className="text-red-800 dark:text-red-300 block mb-2">❌ Stack Disadvantages</strong>
                                                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-disc ml-4">
                                                    <li>Limited size in array implementation</li>
                                                    <li>Can cause stack overflow</li>
                                                    <li>Complex to implement in some cases</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </section>


                                    {/* ═══ SECTION 5: Queues ═══ */}
                                    <section id="queues-masterclass" className="glass-card p-6 md:p-10 rounded-3xl border-t-4 border-t-orange-500 fade-in-section dark:bg-slate-800">
                                        <div className="flex items-center mb-8 border-b-2 border-slate-200 dark:border-slate-700 pb-4">
                                            <span className="bg-orange-600 text-white text-xl md:text-2xl font-serif font-bold w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl mr-4 shrink-0 shadow-md">5</span>
                                            <h2 className="font-serif text-2xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">Queues</h2>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                                            {/* Queue Fundamentals */}
                                            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                                <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-4">Queue Fundamentals</h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">A linear data structure following <strong>FIFO (First In First Out)</strong>. Elements inserted at rear, removed from front.</p>
                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center gap-3 p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg border border-orange-100 dark:border-orange-800">
                                                        <span className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">Enqueue</span>
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">Insert element at the rear</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg border border-orange-100 dark:border-orange-800">
                                                        <span className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">Dequeue</span>
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">Remove element from the front</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg border border-orange-100 dark:border-orange-800">
                                                        <span className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">Front/Rear</span>
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">Index of first/last element</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 p-2 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-100 dark:border-red-800">
                                                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">Overflow/Underflow</span>
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">Insert when full / Delete when empty</span>
                                                    </div>
                                                </div>
                                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                                    <strong className="text-blue-800 dark:text-blue-300 text-sm block mb-1">Uses:</strong>
                                                    <p className="text-xs text-slate-600 dark:text-slate-400">CPU &amp; Disk Scheduling, Printer Spooling, Web Server Requests, BFS in Graphs</p>
                                                </div>
                                            </div>

                                            {/* Circular Queue */}
                                            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                                <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-4">Circular Queue</h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">A queue where the last position connects back to the first. <strong>Solves space wastage</strong> in linear queues.</p>
                                                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4 shadow-inner border-l-4 border-green-400">
                                                    rear = (rear + 1) % size
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                                                        <strong className="text-emerald-800 dark:text-emerald-300 text-xs block mb-1">✅ Advantages</strong>
                                                        <p className="text-xs text-slate-600 dark:text-slate-400">Efficient memory usage. Ideal for fixed-size buffers.</p>
                                                    </div>
                                                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                                        <strong className="text-red-800 dark:text-red-300 text-xs block mb-1">❌ Linear Queue Limitation</strong>
                                                        <p className="text-xs text-slate-600 dark:text-slate-400">Fixed size, inefficient space due to unused front space.</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                                    <strong className="text-red-800 dark:text-red-300 text-sm flex items-center gap-1 mb-1">⚠️ BPSC Trap</strong>
                                                    <p className="text-xs text-slate-700 dark:text-slate-300">If question says "solves memory wastage" or mentions "(rear+1) % size" → Answer is always <strong>Circular Queue</strong></p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>


                                    {/* ═══ SECTION 6: Trees, BST & AVL ═══ */}
                                    <section id="trees-masterclass" className="glass-card p-6 md:p-10 rounded-3xl border-t-4 border-t-green-500 fade-in-section dark:bg-slate-800">
                                        <div className="flex items-center mb-8 border-b-2 border-slate-200 dark:border-slate-700 pb-4">
                                            <span className="bg-green-600 text-white text-xl md:text-2xl font-serif font-bold w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl mr-4 shrink-0 shadow-md">6</span>
                                            <h2 className="font-serif text-2xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">Trees, BST &amp; AVL Trees</h2>
                                        </div>

                                        {/* Tree Terminology */}
                                        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
                                            <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-4">Tree Terminology</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Non-linear data structure. A tree with <strong>N nodes</strong> has exactly <strong>N-1 edges</strong>.</p>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center"><strong className="text-green-800 dark:text-green-300 block">Root Node</strong><span className="text-slate-600 dark:text-slate-400">Top-most node, origin of tree</span></div>
                                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center"><strong className="text-green-800 dark:text-green-300 block">Edge</strong><span className="text-slate-600 dark:text-slate-400">Connection between two nodes</span></div>
                                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center"><strong className="text-green-800 dark:text-green-300 block">Parent</strong><span className="text-slate-600 dark:text-slate-400">Node with children</span></div>
                                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center"><strong className="text-green-800 dark:text-green-300 block">Child</strong><span className="text-slate-600 dark:text-slate-400">Descends from parent</span></div>
                                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center"><strong className="text-green-800 dark:text-green-300 block">Leaf Node</strong><span className="text-slate-600 dark:text-slate-400">No children (degree 0)</span></div>
                                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center"><strong className="text-green-800 dark:text-green-300 block">Internal Node</strong><span className="text-slate-600 dark:text-slate-400">At least one child</span></div>
                                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center"><strong className="text-green-800 dark:text-green-300 block">Degree</strong><span className="text-slate-600 dark:text-slate-400">Number of children</span></div>
                                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center"><strong className="text-green-800 dark:text-green-300 block">Level/Depth</strong><span className="text-slate-600 dark:text-slate-400">Steps from root (root=0)</span></div>
                                            </div>
                                        </div>

                                        {/* Binary Tree Types */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                                <h4 className="font-bold text-sm text-green-700 dark:text-green-400 mb-2">Strictly Binary Tree</h4>
                                                <p className="text-xs text-slate-600 dark:text-slate-400">All nodes have degree 0 or 2 (never 1). With N leaves → <strong className="text-slate-800 dark:text-slate-200">2N-1 nodes</strong></p>
                                            </div>
                                            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                                <h4 className="font-bold text-sm text-green-700 dark:text-green-400 mb-2">Complete Binary Tree</h4>
                                                <p className="text-xs text-slate-600 dark:text-slate-400">All leaves at level d. Has <strong className="text-slate-800 dark:text-slate-200">2<sup>d</sup> nodes at depth d</strong> and 2<sup>d</sup>-1 non-leaf nodes</p>
                                            </div>
                                            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                                <h4 className="font-bold text-sm text-green-700 dark:text-green-400 mb-2">Almost Complete Binary Tree</h4>
                                                <p className="text-xs text-slate-600 dark:text-slate-400">For a right child, there is always a left child, but left child may not have right child</p>
                                            </div>
                                        </div>

                                        {/* Tree Traversal */}
                                        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
                                            <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-4">Tree Traversal</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 text-center">
                                                    <strong className="text-amber-800 dark:text-amber-300 block mb-1">Pre-order</strong>
                                                    <code className="text-sm font-mono text-slate-700 dark:text-slate-300">&lt;root&gt;&lt;left&gt;&lt;right&gt;</code>
                                                </div>
                                                <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl border border-sky-200 dark:border-sky-800 text-center">
                                                    <strong className="text-sky-800 dark:text-sky-300 block mb-1">In-order</strong>
                                                    <code className="text-sm font-mono text-slate-700 dark:text-slate-300">&lt;left&gt;&lt;root&gt;&lt;right&gt;</code>
                                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">BST in-order → sorted sequence</p>
                                                </div>
                                                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-200 dark:border-violet-800 text-center">
                                                    <strong className="text-violet-800 dark:text-violet-300 block mb-1">Post-order</strong>
                                                    <code className="text-sm font-mono text-slate-700 dark:text-slate-300">&lt;left&gt;&lt;right&gt;&lt;root&gt;</code>
                                                </div>
                                            </div>
                                        </div>

                                        {/* BST & AVL */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                                <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-3">Binary Search Tree (BST)</h3>
                                                <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
                                                    <li>• Left subtree keys &lt; node key</li>
                                                    <li>• Right subtree keys &gt; node key</li>
                                                    <li>• No duplicate keys</li>
                                                    <li>• In-order traversal → sorted sequence</li>
                                                </ul>
                                                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                                                    <table className="w-full text-xs border-collapse">
                                                        <thead><tr className="bg-slate-100 dark:bg-slate-800"><th className="p-2 text-left text-slate-800 dark:text-slate-200">Op</th><th className="p-2 text-slate-800 dark:text-slate-200">Average</th><th className="p-2 text-slate-800 dark:text-slate-200">Worst</th></tr></thead>
                                                        <tbody className="text-slate-700 dark:text-slate-300">
                                                            <tr className="border-t border-slate-200 dark:border-slate-700"><td className="p-2">Search</td><td className="p-2 text-emerald-600 dark:text-emerald-400">O(log n)</td><td className="p-2 text-red-600 dark:text-red-400">O(n)</td></tr>
                                                            <tr className="border-t border-slate-200 dark:border-slate-700"><td className="p-2">Insert</td><td className="p-2 text-emerald-600 dark:text-emerald-400">O(log n)</td><td className="p-2 text-red-600 dark:text-red-400">O(n)</td></tr>
                                                            <tr className="border-t border-slate-200 dark:border-slate-700"><td className="p-2">Delete</td><td className="p-2 text-emerald-600 dark:text-emerald-400">O(log n)</td><td className="p-2 text-red-600 dark:text-red-400">O(n)</td></tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                                <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-3">AVL Trees (Self-Balancing BST)</h3>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3"><strong>Balance Factor = Height(left) - Height(right)</strong>. Must be -1, 0, or +1.</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Guarantees <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded font-mono text-emerald-600 dark:text-emerald-400">O(log n)</code> for search, insert, delete.</p>
                                                <strong className="text-sm text-slate-800 dark:text-slate-200 block mb-2">Rotation Cases:</strong>
                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <div className="p-2 bg-sky-50 dark:bg-sky-900/20 rounded border border-sky-200 dark:border-sky-800 text-center"><strong className="text-sky-800 dark:text-sky-300">LL Case</strong><br/><span className="text-slate-600 dark:text-slate-400">Right Rotation</span></div>
                                                    <div className="p-2 bg-sky-50 dark:bg-sky-900/20 rounded border border-sky-200 dark:border-sky-800 text-center"><strong className="text-sky-800 dark:text-sky-300">RR Case</strong><br/><span className="text-slate-600 dark:text-slate-400">Left Rotation</span></div>
                                                    <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800 text-center"><strong className="text-amber-800 dark:text-amber-300">LR Case</strong><br/><span className="text-slate-600 dark:text-slate-400">Left + Right Rotation</span></div>
                                                    <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800 text-center"><strong className="text-amber-800 dark:text-amber-300">RL Case</strong><br/><span className="text-slate-600 dark:text-slate-400">Right + Left Rotation</span></div>
                                                </div>
                                                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                                    <strong className="text-red-800 dark:text-red-300 text-xs">⚠️ BPSC Trap:</strong>
                                                    <span className="text-xs text-slate-700 dark:text-slate-300"> BST worst-case is O(n) not O(log n). If data inserted in sorted order, BST degrades to linked list!</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tree Applications */}
                                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                                            <strong className="text-blue-800 dark:text-blue-300 text-sm block mb-2">🌳 Tree Applications</strong>
                                            <p className="text-xs text-slate-700 dark:text-slate-300">Directory structures, arithmetic expressions, 3D game rendering, router tables, compression algorithms (.jpeg, .mp3)</p>
                                        </div>
                                    </section>


                                    {/* ═══ SECTION 7: Complexity Overview Table ═══ */}
                                    <section id="complexity-table" className="glass-card p-6 md:p-10 rounded-3xl border-t-4 border-t-cyan-500 fade-in-section dark:bg-slate-800">
                                        <div className="flex items-center mb-8 border-b-2 border-slate-200 dark:border-slate-700 pb-4">
                                            <span className="bg-cyan-600 text-white text-xl md:text-2xl font-serif font-bold w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl mr-4 shrink-0 shadow-md">7</span>
                                            <h2 className="font-serif text-2xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">Data Structure Complexity Table</h2>
                                        </div>
                                        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                            <table className="w-full text-xs md:text-sm border-collapse min-w-[600px]">
                                                <thead>
                                                    <tr className="bg-slate-100 dark:bg-slate-800">
                                                        <th className="p-3 text-left font-bold text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-slate-700">Data Structure</th>
                                                        <th className="p-3 font-bold text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-slate-700">Access</th>
                                                        <th className="p-3 font-bold text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-slate-700">Insert</th>
                                                        <th className="p-3 font-bold text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-slate-700">Delete</th>
                                                        <th className="p-3 font-bold text-slate-800 dark:text-slate-200">Use Case</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td className="p-3 font-bold border-r border-slate-200 dark:border-slate-700">Array</td><td className="p-3 text-center text-emerald-600 dark:text-emerald-400 border-r border-slate-200 dark:border-slate-700">O(1)</td><td className="p-3 text-center text-red-600 dark:text-red-400 border-r border-slate-200 dark:border-slate-700">O(n)</td><td className="p-3 text-center text-red-600 dark:text-red-400 border-r border-slate-200 dark:border-slate-700">O(n)</td><td className="p-3">Random access, fixed size</td></tr>
                                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td className="p-3 font-bold border-r border-slate-200 dark:border-slate-700">Linked List</td><td className="p-3 text-center text-red-600 dark:text-red-400 border-r border-slate-200 dark:border-slate-700">O(n)</td><td className="p-3 text-center text-emerald-600 dark:text-emerald-400 border-r border-slate-200 dark:border-slate-700">O(1)/O(n)</td><td className="p-3 text-center text-emerald-600 dark:text-emerald-400 border-r border-slate-200 dark:border-slate-700">O(1)/O(n)</td><td className="p-3">Dynamic size, insertion-heavy</td></tr>
                                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td className="p-3 font-bold border-r border-slate-200 dark:border-slate-700">Stack</td><td className="p-3 text-center text-emerald-600 dark:text-emerald-400 border-r border-slate-200 dark:border-slate-700">O(1)</td><td className="p-3 text-center text-emerald-600 dark:text-emerald-400 border-r border-slate-200 dark:border-slate-700">O(1)</td><td className="p-3 text-center text-emerald-600 dark:text-emerald-400 border-r border-slate-200 dark:border-slate-700">O(1)</td><td className="p-3">Recursion, parsing</td></tr>
                                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td className="p-3 font-bold border-r border-slate-200 dark:border-slate-700">Queue</td><td className="p-3 text-center text-emerald-600 dark:text-emerald-400 border-r border-slate-200 dark:border-slate-700">O(1)</td><td className="p-3 text-center text-emerald-600 dark:text-emerald-400 border-r border-slate-200 dark:border-slate-700">O(1)</td><td className="p-3 text-center text-emerald-600 dark:text-emerald-400 border-r border-slate-200 dark:border-slate-700">O(1)</td><td className="p-3">Task scheduling</td></tr>
                                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td className="p-3 font-bold border-r border-slate-200 dark:border-slate-700">Hash Table</td><td className="p-3 text-center text-emerald-600 dark:text-emerald-400 border-r border-slate-200 dark:border-slate-700">O(1)</td><td className="p-3 text-center text-emerald-600 dark:text-emerald-400 border-r border-slate-200 dark:border-slate-700">O(1)</td><td className="p-3 text-center text-emerald-600 dark:text-emerald-400 border-r border-slate-200 dark:border-slate-700">O(1)</td><td className="p-3">Fast lookup by key</td></tr>
                                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td className="p-3 font-bold border-r border-slate-200 dark:border-slate-700">BST</td><td className="p-3 text-center text-amber-600 dark:text-amber-400 border-r border-slate-200 dark:border-slate-700">O(log n)</td><td className="p-3 text-center text-amber-600 dark:text-amber-400 border-r border-slate-200 dark:border-slate-700">O(log n)</td><td className="p-3 text-center text-amber-600 dark:text-amber-400 border-r border-slate-200 dark:border-slate-700">O(log n)</td><td className="p-3">Sorted data, hierarchy</td></tr>
                                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td className="p-3 font-bold border-r border-slate-200 dark:border-slate-700">Heap</td><td className="p-3 text-center text-red-600 dark:text-red-400 border-r border-slate-200 dark:border-slate-700">O(n)</td><td className="p-3 text-center text-amber-600 dark:text-amber-400 border-r border-slate-200 dark:border-slate-700">O(log n)</td><td className="p-3 text-center text-amber-600 dark:text-amber-400 border-r border-slate-200 dark:border-slate-700">O(log n)</td><td className="p-3">Priority handling</td></tr>
                                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50"><td className="p-3 font-bold border-r border-slate-200 dark:border-slate-700">Trie</td><td className="p-3 text-center text-amber-600 dark:text-amber-400 border-r border-slate-200 dark:border-slate-700">O(L)</td><td className="p-3 text-center text-amber-600 dark:text-amber-400 border-r border-slate-200 dark:border-slate-700">O(L)</td><td className="p-3 text-center text-amber-600 dark:text-amber-400 border-r border-slate-200 dark:border-slate-700">O(L)</td><td className="p-3">Prefix search</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>


{/* ═══ SECTION: BPSC Numerical Practice ═══ */}
                                    <section id="numericals" className="glass-card p-6 md:p-10 rounded-3xl border-t-4 border-t-indigo-500 fade-in-section dark:bg-slate-800">
                                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-8">BPSC Numerical Practice Problems</h2>
                                        <div className="space-y-8">

                                            {/* Numerical 1: Infix to Postfix Stack Trace */}
                                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                                                <div className="bg-slate-100 dark:bg-slate-800 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                                                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Type 1: Infix to Postfix Stack Trace</h3>
                                                </div>
                                                <div className="p-6">
                                                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg font-mono text-xs md:text-sm border border-slate-200 dark:border-slate-700 overflow-x-auto shadow-inner">
                                                        <table className="w-full text-left border-collapse">
                                                            <thead>
                                                                <tr className="border-b border-slate-300 dark:border-slate-600"><th className="py-2 text-slate-800 dark:text-slate-200">Token</th><th className="py-2 text-slate-800 dark:text-slate-200">Action</th><th className="py-2 text-slate-800 dark:text-slate-200">Stack Status</th><th className="py-2 text-slate-800 dark:text-slate-200">Size</th></tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                                                                <tr className="hover:bg-white dark:hover:bg-slate-700 transition-colors"><td className="py-1">4</td><td>Out</td><td className="text-slate-400">[]</td><td>0</td></tr>
                                                                <tr className="hover:bg-white dark:hover:bg-slate-700 transition-colors"><td className="py-1">+</td><td>Push</td><td>[+]</td><td>1</td></tr>
                                                                <tr className="hover:bg-white dark:hover:bg-slate-700 transition-colors"><td className="py-1">3</td><td>Out</td><td>[+]</td><td>1</td></tr>
                                                                <tr className="hover:bg-white dark:hover:bg-slate-700 transition-colors"><td className="py-1">*</td><td>Push</td><td>[+, *]</td><td>2</td></tr>
                                                                <tr className="hover:bg-white dark:hover:bg-slate-700 transition-colors"><td className="py-1">(</td><td>Push</td><td>[+, *, (]</td><td>3</td></tr>
                                                                <tr className="hover:bg-white dark:hover:bg-slate-700 transition-colors"><td className="py-1">6</td><td>Out</td><td>[+, *, (]</td><td>3</td></tr>
                                                                <tr className="bg-rose-50/80 dark:bg-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors shadow-sm"><td className="py-2 text-rose-700 dark:text-rose-400 font-bold">*</td><td className="text-rose-700 dark:text-rose-400 font-bold">Push</td><td className="text-rose-700 dark:text-rose-400 font-bold">[+, *, (, *]</td><td className="text-rose-700 dark:text-rose-400 font-bold flex items-center"><span className="w-2 h-2 rounded-full bg-rose-500 mr-2 animate-pulse"></span>4 (MAX)</td></tr>
                                                                <tr className="hover:bg-white dark:hover:bg-slate-700 transition-colors"><td className="py-1">3</td><td>Out</td><td>[+, *, (, *]</td><td>4</td></tr>
                                                                <tr className="hover:bg-white dark:hover:bg-slate-700 transition-colors"><td className="py-1">-</td><td>Pop *, Push -</td><td>[+, *, (, -]</td><td>4</td></tr>
                                                                <tr className="hover:bg-white dark:hover:bg-slate-700 transition-colors"><td className="py-1">12</td><td>Out</td><td>[+, *, (, -]</td><td>4</td></tr>
                                                                <tr className="hover:bg-white dark:hover:bg-slate-700 transition-colors"><td className="py-1">)</td><td>Pop -</td><td>[+, *]</td><td>2</td></tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            {/*  Numerical 2: Arrays  */}
                                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                                                <div className="bg-slate-100 dark:bg-slate-800 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Type 2: Array Memory Address Calculation</h3>
                                                </div>
                                                <div className="p-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        <div className="hover:transform hover:-translate-y-1 transition-transform">
                                                            <h4 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                                                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 shadow-sm border border-blue-200 dark:border-blue-700">A</span>
                                                                1D Array Address
                                                            </h4>
                                                            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-3 italic">"Given an integer array <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 shadow-sm rounded">arr</code> with base address 1000. Find the memory address of <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 shadow-sm rounded">arr[3]</code>. (Assume int = 4 bytes)."</p>
                                                            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg font-mono text-xs md:text-sm border border-slate-200 dark:border-slate-700 shadow-inner">
                                                                <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold block mb-1">Formula: Base + (Index &times; Size)</span>
                                                                <span className="text-slate-600 dark:text-slate-300 block">Step 1: 1000 + (3 &times; 4)</span>
                                                                <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-2 block border-t border-slate-200 dark:border-slate-700 pt-2 text-sm md:text-base">Answer: 1012</span>
                                                            </div>
                                                        </div>
                                                        <div className="hover:transform hover:-translate-y-1 transition-transform">
                                                            <h4 className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2 flex items-center">
                                                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-6 h-6 rounded-full inline-flex items-center justify-center mr-2 shadow-sm border border-blue-200 dark:border-blue-700">B</span>
                                                                2D Array Address (Row-Major)
                                                            </h4>
                                                            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 mb-3 italic">"A 2D array <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 shadow-sm rounded">a[5][4]</code> has base address 2000. Find the address of <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 shadow-sm rounded">a[1][2]</code>. (Assume int = 4 bytes)."</p>
                                                            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg font-mono text-xs md:text-sm border border-slate-200 dark:border-slate-700 overflow-x-auto-custom whitespace-nowrap shadow-inner">
                                                                <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold block mb-1">Formula: Base + [(i &times; columns) + j] &times; Size</span>
                                                                <span className="text-slate-600 dark:text-slate-300 block">Step 1: 2000 + [(1 &times; 4) + 2] &times; 4</span>
                                                                <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-2 block border-t border-slate-200 dark:border-slate-700 pt-2 text-sm md:text-base">Answer: 2024</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/*  Numerical 3: Postfix Evaluation  */}
                                            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                                                <div className="bg-slate-100 dark:bg-slate-800 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                                                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Type 3: Postfix Expression Evaluation</h3>
                                                </div>
                                                <div className="p-6">
                                                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 italic">"Evaluate the postfix expression: <code className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 text-base md:text-lg font-bold text-indigo-700 dark:text-indigo-400 shadow-sm rounded">6 3 2 4 + - *</code> using a Stack."</p>
                                                    <div className="overflow-x-auto-custom rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                                                        <table className="w-full text-left text-xs md:text-sm border-collapse min-w-[500px]">
                                                            <thead>
                                                                <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                                                    <th className="p-3 font-semibold border-r border-slate-200 dark:border-slate-700 w-1/5 text-slate-800 dark:text-slate-200">Token Read</th>
                                                                    <th className="p-3 font-semibold border-r border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">Action Taken</th>
                                                                    <th className="p-3 font-semibold w-1/4 text-slate-800 dark:text-slate-200">Stack State</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                                                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"><td className="p-3 font-mono font-bold text-center border-r border-slate-200 dark:border-slate-700 text-base">6</td><td className="p-3 border-r border-slate-200 dark:border-slate-700">Push to Stack.</td><td className="p-3 font-mono text-center font-semibold">[6]</td></tr>
                                                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"><td className="p-3 font-mono font-bold text-center border-r border-slate-200 dark:border-slate-700 text-base">3</td><td className="p-3 border-r border-slate-200 dark:border-slate-700">Push to Stack.</td><td className="p-3 font-mono text-center font-semibold">[6, 3]</td></tr>
                                                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"><td className="p-3 font-mono font-bold text-center border-r border-slate-200 dark:border-slate-700 text-base">2</td><td className="p-3 border-r border-slate-200 dark:border-slate-700">Push to Stack.</td><td className="p-3 font-mono text-center font-semibold">[6, 3, 2]</td></tr>
                                                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"><td className="p-3 font-mono font-bold text-center border-r border-slate-200 dark:border-slate-700 text-base">4</td><td className="p-3 border-r border-slate-200 dark:border-slate-700">Push to Stack.</td><td className="p-3 font-mono text-center font-semibold">[6, 3, 2, 4]</td></tr>
                                                                <tr className="bg-emerald-50/50 dark:bg-emerald-900/30 transition-colors"><td className="p-3 font-mono font-bold text-center text-emerald-700 dark:text-emerald-400 border-r border-slate-200 dark:border-slate-700 text-xl">+</td><td className="p-3 border-r border-slate-200 dark:border-slate-700">Pop 4 (op2), Pop 2 (op1). Math: <strong className="bg-emerald-100 dark:bg-emerald-900 px-1 rounded">2 + 4 = 6</strong>. Push 6.</td><td className="p-3 font-mono font-bold text-center text-emerald-800 dark:text-emerald-400">[6, 3, 6]</td></tr>
                                                                <tr className="bg-emerald-50/70 dark:bg-emerald-900/40 transition-colors"><td className="p-3 font-mono font-bold text-center text-emerald-700 dark:text-emerald-400 border-r border-slate-200 dark:border-slate-700 text-xl">-</td><td className="p-3 border-r border-slate-200 dark:border-slate-700">Pop 6 (op2), Pop 3 (op1). Math: <strong className="bg-emerald-100 dark:bg-emerald-900 px-1 rounded">3 - 6 = -3</strong>. Push -3.</td><td className="p-3 font-mono font-bold text-center text-emerald-800 dark:text-emerald-400">[6, -3]</td></tr>
                                                                <tr className="bg-emerald-100 dark:bg-emerald-900/60 transition-colors shadow-sm"><td className="p-3 font-mono font-bold text-center text-emerald-700 dark:text-emerald-400 border-r border-emerald-200 dark:border-emerald-700 text-xl">*</td><td className="p-3 border-r border-emerald-200 dark:border-emerald-700">Pop -3 (op2), Pop 6 (op1). Math: <strong className="bg-emerald-200 dark:bg-emerald-800 px-1 rounded">6 * (-3) = -18</strong>. Push -18.</td><td className="p-3 font-mono font-black text-center text-emerald-900 dark:text-emerald-300 text-base">[-18]</td></tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </section>

                                    
                                    {/* ═══ MCQ Practice Section ═══ */}
                                    <section id="mcq-practice" className="glass-card p-6 md:p-10 rounded-3xl border-t-4 border-t-yellow-500 fade-in-section dark:bg-slate-800">
                                        <div className="flex items-center mb-8 border-b-2 border-slate-200 dark:border-slate-700 pb-4">
                                            <span className="bg-yellow-600 text-white text-xl md:text-2xl font-serif font-bold w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl mr-4 shrink-0 shadow-md">✅</span>
                                            <h2 className="font-serif text-2xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">MCQ Practice (From Lecture Notes)</h2>
                                        </div>
                                        <div className="space-y-6">
                                            {/* Q1 */}
                                            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                                <p className="font-bold text-slate-800 dark:text-slate-100 mb-3">Q1. How many children does a binary tree node have?</p>
                                                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                                                    <span className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">a) 2</span>
                                                    <span className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">b) any number</span>
                                                    <span className="p-2 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-bold border-2 border-emerald-400">c) 0 or 1 or 2 ✓</span>
                                                    <span className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">d) 0 or 1</span>
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 italic">A binary tree node can have at most 2 children, but it can also have 0 (leaf) or 1 child.</p>
                                            </div>
                                            {/* Q2 */}
                                            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                                <p className="font-bold text-slate-800 dark:text-slate-100 mb-3">Q2. What is the disadvantage of implementing a tree using normal arrays?</p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-3">
                                                    <span className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">a) Difficulty knowing children nodes</span>
                                                    <span className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">b) Difficult finding parent node</span>
                                                    <span className="p-2 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-bold border-2 border-emerald-400">c) Must know max nodes before creation ✓</span>
                                                    <span className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">d) Difficult to implement</span>
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 italic">Array-based trees require pre-allocation of size, which means knowing the maximum number of nodes beforehand.</p>
                                            </div>
                                            {/* Q3 */}
                                            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                                <p className="font-bold text-slate-800 dark:text-slate-100 mb-3">Q3. What must be the ideal array size if tree height is 'L'?</p>
                                                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg border-2 border-emerald-400 text-center mb-2">
                                                    <strong className="text-emerald-800 dark:text-emerald-300 text-lg font-mono">2<sup>L</sup> - 1</strong>
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 italic">Maximum elements in a complete binary tree of height L is 2<sup>L</sup>-1. Array must accommodate worst case.</p>
                                            </div>
                                            {/* Q4 */}
                                            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                                <p className="font-bold text-slate-800 dark:text-slate-100 mb-3">Q4. Maximum number of children a binary tree node can have?</p>
                                                <div className="grid grid-cols-4 gap-2 text-sm mb-3">
                                                    <span className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-center">a) 0</span>
                                                    <span className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-center">b) 1</span>
                                                    <span className="p-2 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-bold border-2 border-emerald-400 text-center">c) 2 ✓</span>
                                                    <span className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-center">d) 3</span>
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 italic">By definition, a binary tree node can have at MOST 2 children (left and right).</p>
                                            </div>
                                            {/* Q5 */}
                                            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                                <p className="font-bold text-slate-800 dark:text-slate-100 mb-3">Q5. What does this code do?</p>
                                                <div className="bg-slate-900 text-green-400 p-3 rounded-lg font-mono text-xs mb-3 shadow-inner border-l-4 border-green-400">
                                                    func(root.left());<br/>
                                                    func(root.right());<br/>
                                                    print(root.data());
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                                                    <span className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">a) Preorder</span>
                                                    <span className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">b) Inorder</span>
                                                    <span className="p-2 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-bold border-2 border-emerald-400">c) Postorder ✓</span>
                                                    <span className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">d) Level order</span>
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 italic">The code processes left → right → root, which is the <strong>Post-order</strong> traversal pattern (&lt;left&gt;&lt;right&gt;&lt;root&gt;).</p>
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
                                                    <span className="px-3 py-1.5 bg-slate-800/80 border border-slate-600 rounded-md shadow-md hover:bg-slate-700 transition-colors cursor-default">"Balance Factor {"{-1, 0, 1}"}" = AVL Tree</span>
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
