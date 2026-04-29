import React, { useState } from 'react';
import {
    BookOpen, Map, Anchor, Swords, Lightbulb,
    CheckCircle2, ChevronRight, AlertTriangle,
    Clock, Target, Compass, Award, Info, ScrollText,
    Ship, TrendingUp, BookOpenCheck, ShieldAlert
} from 'lucide-react';

export const POWERS_DATA = [
    {
        id: 'portuguese',
        name: "1. The Portuguese",
        timeline: "1498 - 1961",
        subtitle: "The Pioneers of the Sea Route",
        bg: "bg-green-50",
        border: "border-green-200",
        btnColor: "bg-green-100 text-green-700 hover:bg-green-200",
        icon: '⚓', // Changed from component to string for easier indexing if needed, but keeping original for now if I can
        people: [
            { name: "Francisco de Almeida", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Retrato_de_D._Francisco_de_Almeida_%28ap%C3%B3s_1545%29_-_Autor_desconhecido.png/500px-Retrato_de_D._Francisco_de_Almeida_%28ap%C3%B3s_1545%29_-_Autor_desconhecido.png" },
            { name: "Alfonso de Albuquerque", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Retrato_de_Afonso_de_Albuquerque_%28ap%C3%B3s_1545%29_-_Autor_desconhecido.png/500px-Retrato_de_Afonso_de_Albuquerque_%28ap%C3%B3s_1545%29_-_Autor_desconhecido.png" }
        ],
        places: [
            { name: "Goa", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Front_Elevation_of_Basilica_of_Bom_Jesus.jpg/500px-Front_Elevation_of_Basilica_of_Bom_Jesus.jpg" }
        ],
        summary: [
            "Vasco da Gama reached Calicut (Kerala) in 1498, guided by Abdul Majid. Welcomed by local ruler Zamorin.",
            "First Factory: Established in Cochin in 1500.",
            "Francisco de Almeida: First Governor, introduced the 'Blue Water Policy'.",
            "Alfonso de Albuquerque: Captured Goa in 1510."
        ],
        detailed: [
            "Deep Context: Vasco da Gama's voyage yielded a profit 60 times the cost of the entire expedition, triggering the European rush to India.",
            "Blue Water Policy (Cartaze System): Almeida believed the Portuguese should master the Indian Ocean rather than build fortresses on land. They forced other ships to buy passes (Cartazes) to sail.",
            "Alfonso de Albuquerque (Real Founder): He acquired Goa from the Sultan of Bijapur in 1510. He also abolished Sati in Portuguese territories and encouraged his men to marry local women to build a permanent population.",
            "Reason for Decline: Religious intolerance, discovery of Brazil (which diverted their attention), and the rise of superior English and Dutch navies. Their naval supremacy was permanently broken by the English at the Battle of Swally (1612).",
            "They were the 'First to Arrive' (1498) and 'Last to Leave' (Operation Vijay, 1961 to liberate Goa)."
        ]
    },
    {
        id: 'dutch',
        name: "2. The Dutch",
        timeline: "1605 - 1759",
        subtitle: "The Spice Island Focus",
        bg: "bg-orange-50",
        border: "border-orange-200",
        btnColor: "bg-orange-100 text-orange-700 hover:bg-orange-200",
        icon: '🧭',
        summary: [
            "Dutch East India Company (VOC) formed in 1602.",
            "First Factory: Masulipatnam (Andhra Pradesh) in 1605.",
            "Main Trade Centers: Pulicat, Nagapattinam, Cochin, Surat.",
            "Decline: Defeated decisively by the English in the Battle of Bedara (1759)."
        ],
        detailed: [
            "Core Objective: Unlike other powers, the Dutch were more interested in the 'Spice Islands' of Indonesia (Java, Sumatra, Borneo) than in India.",
            "Role of India: They used India primarily as a trading corridor—buying Indian textiles (cotton) to exchange for spices in Indonesia. They made Indian textiles a premier export commodity.",
            "The Amboyna Massacre (1623): The Dutch killed several English merchants in Indonesia, which led to a bitter rivalry and an eventual compromise where the British left Indonesia to the Dutch, and the Dutch left India to the British.",
            "Final Blow: The Battle of Bedara (also known as Battle of Chinsura) in 1759, where Robert Clive completely crushed Dutch military power in India."
        ]
    },
    {
        id: 'english',
        name: "3. The English",
        timeline: "1600 - 1947",
        subtitle: "The Ultimate Victors",
        bg: "bg-blue-50",
        border: "border-blue-200",
        btnColor: "bg-blue-100 text-blue-700 hover:bg-blue-200",
        icon: '🏆',
        people: [
            { name: "Robert Clive", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Robert_Clive%2C_1st_Baron_Clive_by_Nathaniel_Dance%2C_%28later_Sir_Nathaniel_Dance-Holland%2C_Bt%29.jpg/500px-Robert_Clive%2C_1st_Baron_Clive_by_Nathaniel_Dance%2C_%28later_Sir_Nathaniel_Dance-Holland%2C_Bt%29.jpg" }
        ],
        summary: [
            "British East India Company formed by Royal Charter on Dec 31, 1600.",
            "First Factories: Masulipatnam (1611) and Surat (1612/1613).",
            "1615: Sir Thomas Roe secured trading rights from Jahangir.",
            "Gradually transitioned from traders to rulers after the Battles of Plassey (1757) and Buxar (1764)."
        ],
        detailed: [
            "Initial Struggle: Captain William Hawkins visited Jahangir's court in 1608 but failed to get permission for a factory at Surat due to Portuguese opposition.",
            "The Turning Point (1612): Captain Best defeated the Portuguese fleet at the Battle of Swally. Impressed by British naval might, Jahangir granted permission to establish a factory at Surat.",
            "The Magna Carta (1717): Mughal Emperor Farrukhsiyar issued a 'Farman' granting the Company immense privileges, including duty-free trade in Bengal, which immensely boosted their power.",
            "Strategic Centers: They established three highly fortified presidencies: Fort St. George (Madras), Bombay (received as dowry from the Portuguese to King Charles II), and Fort William (Calcutta).",
            "The Shift to Power: The Battle of Plassey (1757) against Nawab Siraj-ud-Daulah made them the masters of Bengal, providing them the immense wealth needed to conquer the rest of India."
        ]
    },
    {
        id: 'danes',
        id: 'danes',
        name: "4. The Danes",
        timeline: "1616 - 1845",
        subtitle: "The Short-Lived Traders",
        bg: "bg-teal-50",
        border: "border-teal-200",
        btnColor: "bg-teal-100 text-teal-700 hover:bg-teal-200",
        icon: '🚢',
        summary: [
            "Danish East India Company formed in 1616.",
            "First Factory: Tranquebar (Tamil Nadu) in 1620.",
            "Main Center: Serampore (Bengal) established in 1676.",
            "Eventually sold all their settlements to the British in 1845."
        ],
        detailed: [
            "Primary Focus: Unlike other powers, the Danes were more interested in missionary activities rather than building a vast commercial empire.",
            "Serampore Mission: Their headquarters in Bengal (Serampore) became a major center for the printing press and education in India.",
            "The Exit: Finding it difficult to compete with the massive British and French operations, they sold all their Indian properties to the British government in 1845 for 1.25 million rupees."
        ]
    },
    {
        id: 'french',
        name: "5. The French",
        timeline: "1664 - 1793",
        subtitle: "The Formidable Rivals",
        bg: "bg-red-50",
        border: "border-red-200",
        btnColor: "bg-red-100 text-red-700 hover:bg-red-200",
        icon: '🗺️',
        people: [
            { name: "Joseph François Dupleix", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Joseph_Francois_Dupleix.jpg/500px-Joseph_Francois_Dupleix.jpg" }
        ],
        places: [
            { name: "Pondicherry", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Pondicherry-Rock_beach_aerial_view.jpg/500px-Pondicherry-Rock_beach_aerial_view.jpg" }
        ],
        summary: [
            "French East India Company established in 1664 by Colbert.",
            "First Factory: Surat (1668) by Francois Caron.",
            "Main Centers: Pondicherry, Mahe, Karaikal, Chandernagore.",
            "Decline: Lost the Carnatic Wars to the British; final defeat at Wandiwash (1760)."
        ],
        detailed: [
            "Nature of Company: Unlike the British company which was a private enterprise, the French company was heavily state-controlled and dependent on the French monarchy, which led to bureaucratic delays and poor finances.",
            "Joseph François Dupleix: The greatest French Governor in India. He was the first European to understand that the internal fighting among Indian princes could be exploited. He originated the concept of the 'Subsidiary Alliance' (later perfected by Lord Wellesley).",
            "The Carnatic Wars (1746-1763): A series of three wars fought between the English and French in South India for supremacy.",
            "The End of the Dream: In the Third Carnatic War, the British forces under Sir Eyre Coote decisively defeated the French under Comte de Lally at the Battle of Wandiwash (1760). The French were restricted to small enclaves like Pondicherry and forbidden from maintaining standing armies."
        ]
    }
];

const App = () => {
    const [activeTab, setActiveTab] = useState('notes');
    const [expandedPower, setExpandedPower] = useState(null);

    const tabs = [
        { id: 'notes', label: 'Detailed Notes & Infographics', icon: <BookOpen className="w-5 h-5" /> },
        { id: 'strategy', label: 'BPSC Master Strategy', icon: <Target className="w-5 h-5" /> }
    ];

    const powersData = POWERS_DATA;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
            {/* Header */}
            <header className="bg-indigo-900 text-white shadow-lg sticky top-0 z-30 border-b border-indigo-700">
                <div className="w-full px-4 md:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight flex items-center">
                                <Ship className="w-8 h-8 mr-3 text-indigo-300" />
                                Advent of Europeans
                            </h1>
                            <p className="text-indigo-200 mt-1 font-medium text-sm md:text-base ml-11">Historical Timeline & Strategy for BPSC TRE 4.0</p>
                        </div>
                        <div className="mt-4 md:mt-0 bg-indigo-950 px-5 py-2.5 rounded-full border border-indigo-500 shadow-inner flex items-center space-x-2">
                            <Target className="w-5 h-5 text-yellow-400" />
                            <span className="font-bold text-yellow-400 tracking-wider text-sm">BPSC MASTERCLASS</span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="w-full px-4 md:px-8">
                    <div className="flex space-x-2 overflow-x-auto no-scrollbar pt-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-6 py-3 font-bold rounded-t-xl transition-all duration-200 whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-slate-50 text-indigo-900 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'
                                        : 'bg-indigo-800 text-indigo-200 hover:bg-indigo-700'
                                    }`}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="w-full px-4 md:px-8 py-8">

                {/* TAB 1: DETAILED NOTES & INFOGRAPHICS */}
                {activeTab === 'notes' && (
                    <div className="space-y-12 animate-fadeIn">

                        {/* INFOGRAPHIC 1: The Ottoman Blockade & The Need for a New Route */}
                        <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
                            <h2 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center">
                                <GlobeIcon className="w-8 h-8 mr-3 text-indigo-600" />
                                Why find a new sea route? (The Ottoman Blockade)
                            </h2>

                            <div className="bg-slate-900 rounded-2xl p-6 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between text-white shadow-xl">
                                {/* Background Decor */}
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-slate-900 to-black pointer-events-none"></div>

                                {/* Europe Side */}
                                <div className="text-center z-10 w-full md:w-1/4 mb-6 md:mb-0">
                                    <div className="bg-indigo-600/30 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center border border-indigo-400 mb-3">
                                        <Map className="w-10 h-10 text-indigo-300" />
                                    </div>
                                    <h3 className="font-bold text-lg">Europe</h3>
                                    <p className="text-xs text-indigo-200 mt-2">Needed spices to preserve meat during harsh winters.</p>
                                </div>

                                {/* The Blockade */}
                                <div className="flex flex-col items-center justify-center z-10 w-full md:w-2/4 px-4 relative">
                                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-red-500 to-emerald-500 -z-10 -translate-y-1/2 opacity-50 hidden md:block"></div>

                                    <div className="bg-red-500 p-3 rounded-xl shadow-lg border-2 border-red-700 flex flex-col items-center text-center animate-pulse">
                                        <ShieldAlert className="w-8 h-8 text-white mb-1" />
                                        <span className="font-bold text-sm uppercase tracking-wider">1453: Ottoman Blockade</span>
                                    </div>
                                    <p className="text-xs text-slate-300 text-center mt-4 max-w-xs">
                                        The Ottoman Empire captured Constantinople, blocking the old land trade routes and charging exorbitant taxes.
                                    </p>
                                </div>

                                {/* India Side */}
                                <div className="text-center z-10 w-full md:w-1/4 mt-6 md:mt-0">
                                    <div className="bg-emerald-600/30 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center border border-emerald-400 mb-3">
                                        <Anchor className="w-10 h-10 text-emerald-300" />
                                    </div>
                                    <h3 className="font-bold text-lg">India (The East)</h3>
                                    <p className="text-xs text-emerald-200 mt-2">Source of "Black Gold" (Pepper) and rich textiles.</p>
                                </div>
                            </div>

                            {/* The Solution Route Infographic */}
                            <div className="mt-8 bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                                <h3 className="font-bold text-indigo-900 mb-4">The Solution: The Oceanic Route</h3>
                                <div className="flex flex-col md:flex-row items-stretch gap-4">
                                    <div className="flex-1 bg-white p-5 rounded-xl border border-indigo-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-start gap-3">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Bartolomeu_Dias%2C_South_Africa_House_%28cut%29.JPG/500px-Bartolomeu_Dias%2C_South_Africa_House_%28cut%29.JPG" alt="Bartholomew Diaz" className="w-12 h-12 rounded-full object-cover border border-indigo-200" />
                                            <div>
                                                <h4 className="font-bold text-sm text-slate-800">1487: Bartholomew Diaz</h4>
                                                <p className="text-xs text-slate-600">Reached the southern tip of Africa.</p>
                                            </div>
                                        </div>
                                        <div className="relative h-28 rounded-lg overflow-hidden group">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Playa_Dias%2C_Cape_Point%2C_Sud%C3%A1frica%2C_2018-07-23%2C_DD_103.jpg/500px-Playa_Dias%2C_Cape_Point%2C_Sud%C3%A1frica%2C_2018-07-23%2C_DD_103.jpg" alt="Cape of Good Hope" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                                                <span className="text-white text-xs font-bold flex items-center"><Map className="w-3 h-3 mr-1" /> Cape of Good Hope</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex items-center justify-center">
                                        <ChevronRight className="w-8 h-8 text-indigo-300" />
                                    </div>
                                    <div className="flex-1 bg-white p-5 rounded-xl border border-indigo-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-start gap-3">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ignoto_portoghese%2C_ritratto_di_un_cavaliere_dell%27ordine_di_cristo%2C_1525-50_ca._02.jpg/500px-Ignoto_portoghese%2C_ritratto_di_un_cavaliere_dell%27ordine_di_cristo%2C_1525-50_ca._02.jpg" alt="Vasco da Gama" className="w-12 h-12 rounded-full object-cover border border-emerald-200" />
                                            <div>
                                                <h4 className="font-bold text-sm text-slate-800">1498: Vasco da Gama</h4>
                                                <p className="text-xs text-slate-600">Rounded the Cape and reached India.</p>
                                            </div>
                                        </div>
                                        <div className="relative h-28 rounded-lg overflow-hidden group">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Kozhikode_beach_kites.jpg/500px-Kozhikode_beach_kites.jpg" alt="Calicut" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                                                <span className="text-white text-xs font-bold flex items-center"><Anchor className="w-3 h-3 mr-1" /> Calicut, India</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                            {/* Trick Card */}
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-indigo-100 flex flex-col justify-center relative overflow-hidden group hover:shadow-md transition-all">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
                                    <Lightbulb className="w-32 h-32 text-indigo-900 -mt-8 -mr-8" />
                                </div>
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1.5 rounded-full w-max mb-6 inline-flex items-center shadow-sm">
                                    <Lightbulb className="w-3.5 h-3.5 mr-1.5" /> BPSC Pro Trick
                                </span>
                                <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Order of Arrival</h3>
                                <p className="text-indigo-600 text-xl italic font-bold mb-6">"Please Don't Enter First, Dad!"</p>
                                <div className="space-y-3 text-sm text-slate-600 relative z-10 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <p><strong className="text-slate-800 text-base">P</strong>ortuguese ➔ <strong className="text-slate-800 text-base">D</strong>utch</p>
                                    <p><strong className="text-slate-800 text-base">E</strong>nglish ➔ <strong className="text-slate-800 text-base">F</strong>rench</p>
                                    <p className="text-xs text-slate-400 mt-2 italic">*Danes (Dad) arrived before French.</p>
                                </div>
                            </div>

                            {/* Concept 1: Factory Setup Master Table */}
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                                    <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                                        <Map className="w-5 h-5 mr-2" />
                                        Ultimate Table: First Factories & Headquarters
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left border-collapse min-w-[600px]">
                                            <thead>
                                                <tr className="bg-slate-100 text-slate-700 uppercase text-xs tracking-wider">
                                                    <th className="p-4 border font-bold rounded-tl-lg">European Power</th>
                                                    <th className="p-4 border font-bold">First Factory (Year)</th>
                                                    <th className="p-4 border font-bold">Early Headquarters</th>
                                                    <th className="p-4 border font-bold rounded-tr-lg">Key Founders / Governors</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                <tr className="hover:bg-slate-50 transition-colors">
                                                    <td className="p-4 font-bold text-green-700 flex items-center gap-2"><Anchor className="w-4 h-4" /> Portuguese</td>
                                                    <td className="p-4 text-slate-600">Cochin (1500)</td>
                                                    <td className="p-4 text-slate-600">Cochin, later shifted to Goa (1530)</td>
                                                    <td className="p-4 text-slate-600">Vasco da Gama, Almeida, Albuquerque</td>
                                                </tr>
                                                <tr className="hover:bg-slate-50 transition-colors">
                                                    <td className="p-4 font-bold text-orange-700 flex items-center gap-2"><Compass className="w-4 h-4" /> Dutch</td>
                                                    <td className="p-4 text-slate-600">Masulipatnam (1605)</td>
                                                    <td className="p-4 text-slate-600">Pulicat, later shifted to Nagapattinam</td>
                                                    <td className="p-4 text-slate-600">Cornelius Houtman (early explorer)</td>
                                                </tr>
                                                <tr className="hover:bg-slate-50 transition-colors">
                                                    <td className="p-4 font-bold text-blue-700 flex items-center gap-2"><Award className="w-4 h-4" /> English</td>
                                                    <td className="p-4 text-slate-600">Masulipatnam (1611) / Surat (1613 permanent)</td>
                                                    <td className="p-4 text-slate-600">Surat, later shifted to Bombay & Calcutta</td>
                                                    <td className="p-4 text-slate-600">Thomas Roe, Robert Clive</td>
                                                </tr>
                                                <tr className="hover:bg-slate-50 transition-colors">
                                                    <td className="p-4 font-bold text-teal-700 flex items-center gap-2"><Ship className="w-4 h-4" /> Danes</td>
                                                    <td className="p-4 text-slate-600">Tranquebar (1620)</td>
                                                    <td className="p-4 text-slate-600">Serampore (Bengal)</td>
                                                    <td className="p-4 text-slate-600">N/A (Missionary Focus)</td>
                                                </tr>
                                                <tr className="hover:bg-slate-50 transition-colors">
                                                    <td className="p-4 font-bold text-red-700 flex items-center gap-2"><Map className="w-4 h-4" /> French</td>
                                                    <td className="p-4 text-slate-600">Surat (1668)</td>
                                                    <td className="p-4 text-slate-600">Pondicherry</td>
                                                    <td className="p-4 text-slate-600">Colbert, Francois Caron, Dupleix</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                        {/* The 4 Powers - Expandable Deep Dives */}
                        <h2 className="text-2xl font-extrabold text-slate-800 mt-12 mb-6 flex items-center">
                            <ScrollText className="w-6 h-6 mr-3 text-indigo-600" />
                            Chronology & Analysis of European Powers
                        </h2>

                        <div className="relative border-l-4 border-indigo-200 ml-4 md:ml-8 space-y-12 pb-8 mt-8">
                            {powersData.map((power) => (
                                <div key={power.id} id={`power-${power.id}`} className="relative pl-8 md:pl-12 group scroll-mt-40">
                                    {/* Timeline Node Icon */}
                                    <div className={`absolute -left-[22px] md:-left-[24px] top-4 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ring-4 ring-white shadow-md z-10 transition-transform group-hover:scale-110 ${power.bg} border-2 border-white`}>
                                        {power.icon}
                                    </div>
                                    
                                    {/* The Card */}
                                    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all duration-300 hover:shadow-md ${power.border}`}>
                                        {/* Card Header */}
                                        <div className={`p-6 ${power.bg}`}>
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center space-x-4">
                                                    <div>
                                                    <h3 className="text-xl font-extrabold text-slate-900">{power.name}</h3>
                                                    <p className="text-sm font-semibold text-slate-600">{power.subtitle}</p>
                                                </div>
                                            </div>
                                            <span className="bg-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border text-slate-700">
                                                {power.timeline}
                                            </span>
                                        </div>

                                        {/* Summary Points */}
                                        <ul className="space-y-3 mt-4">
                                            {power.summary.map((point, i) => (
                                                <li key={i} className="flex items-start">
                                                    <ChevronRight className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0 mt-0.5" />
                                                    <span className="text-slate-700 text-sm leading-relaxed">{point}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Toggle Details Button */}
                                        <button
                                            onClick={() => setExpandedPower(expandedPower === power.id ? null : power.id)}
                                            className={`mt-6 w-full py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center justify-center space-x-2 ${power.btnColor}`}
                                        >
                                            <span>{expandedPower === power.id ? "Hide Detailed Analysis" : "Read Detailed Analysis"}</span>
                                            <Info className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Expandable Detailed Content */}
                                    {expandedPower === power.id && (
                                        <div className="p-6 bg-white border-t border-slate-100 animate-fadeIn">
                                            <h4 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-wider">In-Depth Historical Context</h4>
                                            
                                            {/* Render People and Places if they exist */}
                                            {(power.people || power.places) && (
                                                <div className="flex flex-wrap gap-4 mb-6">
                                                    {power.people && power.people.map((person, idx) => (
                                                        <div key={`person-${idx}`} className="flex items-center gap-3 bg-slate-50 p-2 pr-4 rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                                            <img src={person.url} alt={person.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                                                            <span className="text-sm font-bold text-slate-700">{person.name}</span>
                                                        </div>
                                                    ))}
                                                    {power.places && power.places.map((place, idx) => (
                                                        <div key={`place-${idx}`} className="flex items-center gap-3 bg-slate-50 p-2 pr-4 rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                                            <img src={place.url} alt={place.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                                                            <span className="text-sm font-bold text-slate-700">{place.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <ul className="space-y-4">
                                                {power.detailed.map((detail, i) => {
                                                    const [heading, ...rest] = detail.split(': ');
                                                    return (
                                                        <li key={i} className="text-sm text-slate-600 leading-relaxed border-l-2 border-slate-200 pl-4">
                                                            {rest.length > 0 ? (
                                                                <>
                                                                    <strong className="text-slate-800 block mb-1">{heading}:</strong>
                                                                    {rest.join(': ')}
                                                                </>
                                                            ) : (
                                                                detail
                                                            )}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                    </div>
                                </div>
                            ))}
                        </div>

                                {/* Concept 2: The Decisive Battles Infographic List */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                    <h3 className="text-xl font-bold text-indigo-800 mb-6 flex items-center border-b pb-3">
                                        <Swords className="w-5 h-5 mr-2" />
                                        The Decisive Battles Timeline (BPSC Favorite)
                                    </h3>
                                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-slate-300 before:to-transparent">

                                        {/* Battle 1 */}
                                        <div id="battle-1612" className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active scroll-mt-40">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-red-100 text-red-700 font-extrabold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-xs z-10 ring-2 ring-red-200">
                                                1612
                                            </div>
                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border-l-4 border-l-red-500 border border-slate-100 shadow-md transition-transform hover:-translate-y-1">
                                                <h4 className="font-bold text-slate-800">Battle of Swally</h4>
                                                <p className="text-xs text-slate-500 mt-2"><strong className="text-red-600">English vs Portuguese:</strong> English victory ended Portuguese naval supremacy and allowed English to set up permanently in Surat.</p>
                                            </div>
                                        </div>

                                        {/* Battle 2 */}
                                        <div id="battle-1759" className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active scroll-mt-40">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-orange-100 text-orange-700 font-extrabold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-xs z-10 ring-2 ring-orange-200">
                                                1759
                                            </div>
                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border-l-4 border-l-orange-500 border border-slate-100 shadow-md transition-transform hover:-translate-y-1">
                                                <h4 className="font-bold text-slate-800">Battle of Bedara (Chinsura)</h4>
                                                <p className="text-xs text-slate-500 mt-2"><strong className="text-orange-600">English vs Dutch:</strong> English victory forced the Dutch to completely abandon their Indian ambitions and focus on Indonesia.</p>
                                            </div>
                                        </div>

                                        {/* Battle 3 */}
                                        <div id="battle-1760" className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active scroll-mt-40">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-700 font-extrabold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-xs z-10 ring-2 ring-blue-200">
                                                1760
                                            </div>
                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border-l-4 border-l-blue-500 border border-slate-100 shadow-md transition-transform hover:-translate-y-1">
                                                <h4 className="font-bold text-slate-800">Battle of Wandiwash</h4>
                                                <p className="text-xs text-slate-500 mt-2"><strong className="text-blue-600">English vs French:</strong> Part of the 3rd Carnatic War. English victory decisively ended French imperial dreams in India.</p>
                                            </div>
                                        </div>

                                        {/* Battle 4 */}
                                        <div id="battle-1764" className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active scroll-mt-40">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-purple-100 text-purple-700 font-extrabold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-xs z-10 ring-2 ring-purple-200">
                                                1764
                                            </div>
                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border-l-4 border-l-purple-500 border border-slate-100 shadow-md transition-transform hover:-translate-y-1">
                                                <h4 className="font-bold text-slate-800">Battle of Buxar (Bihar)</h4>
                                                <p className="text-xs text-slate-500 mt-2"><strong className="text-purple-600">English vs Combined Forces:</strong> Highly important for BPSC. Hector Munro defeated Mir Qasim, Shuja-ud-Daula, and Shah Alam II, securing Diwani rights for Bengal, Bihar, and Orissa via the Treaty of Allahabad (1765).</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                        {/* INFOGRAPHIC 2: Why British Succeeded */}
                        <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-indigo-900 text-white p-8 md:p-10 rounded-3xl shadow-xl mt-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 opacity-10">
                                <TrendingUp className="w-96 h-96 -mt-20 -mr-20" />
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-3xl font-extrabold mb-2">
                                    The Blueprint of British Supremacy
                                </h2>
                                <p className="text-indigo-200 mb-8">Why did the East India Company defeat both Indian rulers and European rivals?</p>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {/* Pillar 1 */}
                                    <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                                        <div className="bg-indigo-500/30 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-indigo-400/50">
                                            <Anchor className="w-6 h-6 text-indigo-300" />
                                        </div>
                                        <h3 className="font-bold text-lg mb-3 text-indigo-100">Naval & Financial Superiority</h3>
                                        <p className="text-sm text-slate-300 leading-relaxed">
                                            The British Royal Navy was arguably the best in the world. Furthermore, the EIC was a private shareholder company, highly profitable and backed by the Bank of England, unlike the state-reliant French company.
                                        </p>
                                    </div>

                                    {/* Pillar 2 */}
                                    <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors relative">
                                        <div className="bg-emerald-500/30 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-emerald-400/50">
                                            <Map className="w-6 h-6 text-emerald-300" />
                                        </div>
                                        <h3 className="font-bold text-lg mb-3 text-emerald-100">Strategic Settlements</h3>
                                        <p className="text-sm text-slate-300 leading-relaxed">
                                            The British secured three major coastal presidencies: Calcutta, Madras, and Bombay. If they lost a land battle in the interior, they could retreat to the coast and get reinforcements by sea.
                                        </p>
                                    </div>

                                    {/* Pillar 3 */}
                                    <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                                        <div className="bg-rose-500/30 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 border border-rose-400/50">
                                            <Swords className="w-6 h-6 text-rose-300" />
                                        </div>
                                        <h3 className="font-bold text-lg mb-3 text-rose-100">War-Treaty-War Policy</h3>
                                        <p className="text-sm text-slate-300 leading-relaxed">
                                            Instead of fighting everywhere at once, they fought one enemy, signed a treaty to buy time/resources, and then attacked again when stronger. They mastered the art of "Divide and Rule".
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* THEMES 1-4: EXPANDED CONTEXT */}
                        <section className="bg-slate-100 p-8 md:p-10 rounded-3xl shadow-inner border border-slate-200 mt-12 relative">
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-8 flex items-center">
                                <ScrollText className="w-8 h-8 mr-4 text-indigo-600" />
                                Key Historical Themes & Reforms
                            </h2>
                            <p className="text-slate-600 mb-8">
                                These four themes are frequently tested in BPSC examinations. While some details overlap with the timeline above, this section provides a focused, thematic review.
                            </p>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Theme 1 */}
                                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                    <h3 className="text-xl font-bold text-indigo-900 mb-4 flex items-center border-b pb-3 border-slate-100 relative z-10">
                                        <Ship className="w-6 h-6 mr-3 text-indigo-500" />
                                        Theme 1: Advent of Europeans
                                    </h3>
                                    <ul className="space-y-4 text-sm text-slate-600 relative z-10">
                                        <li className="flex items-start"><ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-indigo-400 shrink-0" /><span><strong>Discovery:</strong> Vasco da Gama (Portuguese) reached Calicut in 1498, received by Zamorin.</span></li>
                                        <li className="flex items-start"><ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-indigo-400 shrink-0" /><span><strong>Chronology:</strong> Portuguese (1498) → Dutch (1605) → English (1608/13) → Danes (1620) → French (1664).</span></li>
                                        <li className="flex items-start"><ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-indigo-400 shrink-0" /><span><strong>First Factories:</strong> Portuguese (Cochin 1503), English (Surat 1613), Dutch (Masulipatnam 1605), French (Surat 1668).</span></li>
                                        <li className="flex items-start"><ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-indigo-400 shrink-0" /><span><strong>Battle of Swally (1612):</strong> Captain Thomas Best defeated Portuguese near Surat, securing a farman from Jahangir.</span></li>
                                    </ul>
                                </div>

                                {/* Theme 2 */}
                                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                    <h3 className="text-xl font-bold text-purple-900 mb-4 flex items-center border-b pb-3 border-slate-100 relative z-10">
                                        <Swords className="w-6 h-6 mr-3 text-purple-500" />
                                        Theme 2: Battle of Buxar (1764)
                                    </h3>
                                    <ul className="space-y-4 text-sm text-slate-600 relative z-10">
                                        <li className="flex items-start"><ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-purple-400 shrink-0" /><span><strong>Geography:</strong> Fought in Buxar, Bihar on the banks of the Ganges River. Highly critical for BPSC.</span></li>
                                        <li className="flex items-start"><ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-purple-400 shrink-0" /><span><strong>Trick Question:</strong> The Nawab of Bengal during the battle was <strong>Mir Jafar</strong> (Mir Qasim had been deposed).</span></li>
                                        <li className="flex items-start"><ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-purple-400 shrink-0" /><span><strong>Outcome:</strong> Major Hector Munro defeated Mir Qasim, Shuja-ud-Daula (Awadh), and Shah Alam II (Mughal).</span></li>
                                        <li className="flex items-start"><ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-purple-400 shrink-0" /><span><strong>Treaty of Allahabad (1765):</strong> Lord Clive secured Diwani Rights of Bengal, Bihar, and Odisha, making the EIC a territorial power.</span></li>
                                    </ul>
                                </div>

                                {/* Theme 3 */}
                                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                    <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center border-b pb-3 border-slate-100 relative z-10">
                                        <BookOpenCheck className="w-6 h-6 mr-3 text-emerald-500" />
                                        Theme 3: Education Under British Rule
                                    </h3>
                                    <ul className="space-y-4 text-sm text-slate-600 relative z-10">
                                        <li className="flex items-start"><ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-emerald-400 shrink-0" /><span><strong>Calcutta Madrasa (1781):</strong> Established by Warren Hastings for the study of Islamic law and Arabic.</span></li>
                                        <li className="flex items-start"><ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-emerald-400 shrink-0" /><span><strong>Asiatic Society (1784):</strong> Founded by Sir William Jones in Calcutta for Oriental research.</span></li>
                                        <li className="flex items-start"><ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-emerald-400 shrink-0" /><span><strong>Sanskrit College (1791):</strong> Established in Benaras by Jonathan Duncan to help British judges understand Hindu laws.</span></li>
                                        <li className="flex items-start"><ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-emerald-400 shrink-0" /><span><strong>Hindu College (1817):</strong> Established in Calcutta by David Hare & Raja Ram Mohan Roy for Western education.</span></li>
                                        <li className="flex items-start"><ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-emerald-400 shrink-0" /><span><strong>Indian Universities Act (1904):</strong> Under Viceroy Lord Curzon (based on Raleigh Commission) to increase government control over universities and curb nationalism.</span></li>
                                    </ul>
                                </div>

                                {/* Theme 4 */}
                                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                                    <h3 className="text-xl font-bold text-rose-900 mb-4 flex items-center border-b pb-3 border-slate-100 relative z-10">
                                        <ShieldAlert className="w-6 h-6 mr-3 text-rose-500" />
                                        Theme 4: Legal & Admin Reforms
                                    </h3>
                                    <ul className="space-y-4 text-sm text-slate-600 relative z-10">
                                        <li className="flex items-start"><ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-rose-400 shrink-0" /><span><strong>Abolition of Slavery (1843):</strong> Legally prohibited in India by the Indian Slavery Act (Act V of 1843) under Lord Ellenborough.</span></li>
                                        <li className="flex items-start"><ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-rose-400 shrink-0" /><span><strong>Indian Penal Code (IPC):</strong> Drafted by the First Law Commission chaired by Lord Macaulay in 1834. Enacted in 1860, came into force in 1862.</span></li>
                                        <li className="flex items-start"><ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-rose-400 shrink-0" /><span><strong>Criminal Procedure Code (CrPC):</strong> First enacted in 1861 and came into force in 1862, creating a standardized procedure for administering criminal law.</span></li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* TAB 2: EXTREMELY DETAILED BPSC STRATEGY */}
                {activeTab === 'strategy' && (
                    <div className="space-y-12 animate-fadeIn">

                        {/* Strategy Banner */}
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                                <div className="bg-white/20 p-4 rounded-full border border-white/30 shrink-0">
                                    <Target className="w-12 h-12 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-extrabold mb-2">BPSC TRE 4.0 Pro-Strategy</h2>
                                    <p className="text-amber-50 leading-relaxed">
                                        Modern History is the <strong>highest-yielding section</strong> in the BPSC General Studies paper (approx 15-20 questions). The "Advent of Europeans" is the foundation. BPSC strictly tests <strong>factual accuracy, chronology, and exact geographic locations.</strong>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Recommended Booklist Banner */}
                        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm mb-8">
                            <div className="flex items-center space-x-4 shrink-0">
                                <div className="bg-indigo-600 p-3 rounded-xl shadow-md text-white">
                                    <BookOpen className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-indigo-900">Recommended Booklist</h4>
                                    <p className="text-sm text-indigo-700">Official sources for BPSC TRE Modern History</p>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-wrap gap-3 md:justify-end">
                                <span className="bg-white border border-indigo-200 text-indigo-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm flex items-center">
                                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> SCERT Bihar Board (Class 8)
                                </span>
                                <span className="bg-white border border-indigo-200 text-indigo-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm flex items-center">
                                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Lucent's General Knowledge
                                </span>
                                <span className="bg-white border border-indigo-200 text-indigo-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm flex items-center">
                                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Spectrum (Chapters 1-3)
                                </span>
                            </div>
                        </div>

                            {/* How they frame questions */}
                            <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center">
                                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center border-b border-slate-100 pb-4">
                                    <Target className="w-6 h-6 mr-3 text-rose-500" />
                                    How BPSC Frames Questions
                                </h3>
                                <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:border-indigo-300 transition-colors group">
                                        <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm mb-4 text-indigo-600 group-hover:scale-110 transition-transform">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <strong className="text-slate-800 block mb-2 text-lg">1. Chronology</strong>
                                        <p className="text-sm text-slate-600 leading-relaxed">"Arrange the establishment of factories in chronological order."</p>
                                    </div>
                                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:border-emerald-300 transition-colors group">
                                        <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm mb-4 text-emerald-600 group-hover:scale-110 transition-transform">
                                            <Map className="w-6 h-6" />
                                        </div>
                                        <strong className="text-slate-800 block mb-2 text-lg">2. Match Location</strong>
                                        <p className="text-sm text-slate-600 leading-relaxed">"Match the European Power with their First Factory location."</p>
                                    </div>
                                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:border-rose-300 transition-colors group">
                                        <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm mb-4 text-rose-600 group-hover:scale-110 transition-transform">
                                            <Swords className="w-6 h-6" />
                                        </div>
                                        <strong className="text-slate-800 block mb-2 text-lg">3. Decisive Battles</strong>
                                        <p className="text-sm text-slate-600 leading-relaxed">"Which battle ended the Dutch power in India?"</p>
                                    </div>
                                </div>
                            </div>

                        {/* Concept 3: Fact Traps (Full width at bottom) */}
                        <div className="bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-800 text-white mt-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-20">
                                <AlertTriangle className="w-32 h-32 text-amber-500" />
                            </div>
                            <h3 className="text-2xl font-extrabold text-amber-400 mb-6 flex items-center relative z-10">
                                <CheckCircle2 className="w-6 h-6 mr-3" />
                                BPSC Fact Traps (Avoid losing marks here!)
                            </h3>
                            <div className="grid md:grid-cols-3 gap-6 relative z-10">
                                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                                    <span className="text-red-400 font-bold block mb-2">Trap 1: The Cape Discovery</span>
                                    <p className="text-sm text-slate-300">
                                        Students think Vasco da Gama discovered the Cape of Good Hope. <strong>Truth:</strong> Bartholomew Diaz discovered it in 1487. Vasco da Gama just used it in 1498.
                                    </p>
                                </div>
                                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                                    <span className="text-red-400 font-bold block mb-2">Trap 2: EIC Formation</span>
                                    <p className="text-sm text-slate-300">
                                        Students assume the British formed the EIC after reaching India. <strong>Truth:</strong> It was formed in London on Dec 31, 1600, <em>before</em> Hawkins arrived in 1608.
                                    </p>
                                </div>
                                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                                    <span className="text-red-400 font-bold block mb-2">Trap 3: First to Arrive</span>
                                    <p className="text-sm text-slate-300">
                                        Students confuse French and Portuguese. <strong>Truth:</strong> The French were the LAST to arrive (1664). The Portuguese were the FIRST (1498).
                                    </p>
                                </div>
                                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                                    <span className="text-emerald-400 font-bold block mb-2">Trap 4: Portuguese Firsts</span>
                                    <p className="text-sm text-slate-300">
                                        Who brought the <strong>printing press, potato, tobacco, and cashew</strong> to India? It was the <strong>Portuguese</strong>, not the British!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

// Dummy icon to represent a globe
const GlobeIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);

export default App;