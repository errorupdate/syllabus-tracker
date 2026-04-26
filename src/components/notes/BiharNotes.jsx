import React, { useState, useEffect, useRef } from 'react';
import {
    BookOpen, MapPin, Users, History, HelpCircle,
    Menu, X, CheckCircle2, XCircle, Clock,
    Landmark, Shield, Leaf, Activity, ChevronRight,
    BookMarked, PenTool, Globe, UserCheck, Target,
    Droplets, GraduationCap, AlertCircle, Scroll, Flame, Newspaper
} from 'lucide-react';

// --- Extensive Data Constants Extracted from Lecture 01-05 & Deep Dives ---

const DEMOGRAPHICS = [
    { label: 'Total Districts', value: '38', icon: <MapPin className="text-blue-500" /> },
    { label: 'Population Rank', value: '3rd in India', subtitle: 'After UP & Maharashtra', icon: <Users className="text-emerald-500" /> },
    { label: 'Population Density', value: '1106 / sq km', subtitle: 'Highest in India', icon: <Activity className="text-rose-500" /> },
    { label: 'Geography', value: 'Landlocked', subtitle: 'Nepal (N), UP (W), WB (E), Jharkhand (S)', icon: <Globe className="text-purple-500" /> }
];

const LEGISLATURE = [
    { label: 'Vidhan Sabha (Assembly)', value: '243 Seats', sub: '38 seats reserved for SC candidates.' },
    { label: 'Vidhan Parishad (Council)', value: '75 Seats', sub: 'Upper House. First meeting held on Jan 20, 1913.' },
    { label: 'Lok Sabha', value: '40 Seats', sub: 'Lower House of Parliament.' },
    { label: 'Rajya Sabha', value: '16 Seats', sub: 'Upper House of Parliament.' },
    { label: 'Panchayati Raj', value: '50% Quota', sub: 'In 2006, Bihar became the first state to give 50% reservation to women.' },
];

const STATE_SYMBOLS = [
    { label: 'State Animal', value: 'Gaur (Mithun) / Ox', icon: '🐃' },
    { label: 'State Bird', value: 'House Sparrow', icon: '🐦' },
    { label: 'State Flower', value: 'Kachnar', icon: '🌸' },
    { label: 'State Tree', value: 'Peepal', icon: '🌳' },
    { label: 'State Fish', value: 'Mangur', icon: '🐟' },
    { label: 'State Emblem', value: 'Bodhi Tree', icon: '🌿' }
];

const ANCIENT_KINGDOMS = [
    { name: 'Magadha', capital: 'Rajgir (Girivraj) → Pataliputra', founder: 'Bimbisara (Haryanka Dynasty)', details: 'The most powerful Mahajanapada. Key rulers: Ajatashatru, Mahapadma Nanda. Known for military use of elephants.' },
    { name: 'Maurya Empire', capital: 'Pataliputra', founder: 'Chandragupta Maurya', details: 'Established after overthrowing Nandas. Ashoka the Great expanded it to cover most of the Indian subcontinent. Built Sanchi Stupa and Pillars.' },
    { name: 'Gupta Empire', capital: 'Pataliputra', founder: 'Sri Gupta', details: 'The Golden Age of India. Key rulers: Samudragupta (Napoleon of India), Chandragupta II (Vikramaditya). Great advancements in science, math (Aryabhata), and literature.' }
];

const RIVERS_AND_DIVISIONS = [
    { name: 'North Bihar Rivers', details: 'Ganga, Ghaghara, Gandak, Burhi Gandak, Bagmati, Kamla, Kosi (Sorrow of Bihar), Mahananda. Prone to flooding.' },
    { name: 'South Bihar Rivers', details: 'Sone, Punpun, Falgu (Niranjana), Karmnasa, Kiul. Mostly rain-fed and originate from southern plateau.' },
    { name: 'Administrative Divisions (9)', details: 'Patna, Tirhut, Saran, Darbhanga, Kosi, Purnia, Bhagalpur, Munger, Magadh.' }
];

const FOLK_ARTS = [
    { name: 'Madhubani (Mithila) Painting', region: 'Mithila Region', details: 'Features geometric patterns, no empty spaces, primarily mythological themes. GI Tag 2010. Traditionally painted by women on mud walls.' },
    { name: 'Manjusha Art', region: 'Anga (Bhagalpur)', details: 'Sequential scroll/box painting known as Snake Paintings (Bihula-Bishahari folklore). Uniquely uses three colors: Pink, Green, and Yellow.' },
    { name: 'Tikuli Art', region: 'Patna', details: '800-year-old tradition. Vibrant, glossy glass/MDF craft inspired by "Bindi". Historically involved melting glass and gold foil embellishments.' }
];

const CENSUS_2011 = [
    { label: 'Highest Literacy', value: 'Rohtas (73.37%)', sub: 'Rohtas also has highest Male & Female literacy.', icon: <BookOpen className="text-emerald-500" /> },
    { label: 'Lowest Literacy', value: 'Purnia (51.08%)', sub: 'Saharsa has lowest female literacy.', icon: <BookOpen className="text-rose-500" /> },
    { label: 'Highest Sex Ratio', value: 'Gopalganj (1021)', sub: 'Females per 1000 males.', icon: <Users className="text-indigo-500" /> },
    { label: 'Lowest Sex Ratio', value: 'Munger (876)', sub: 'Females per 1000 males.', icon: <Users className="text-rose-500" /> },
    { label: 'Highest Density', value: 'Sheohar (1882)', sub: 'Persons per sq. km.', icon: <MapPin className="text-purple-500" /> },
    { label: 'Lowest Density', value: 'Kaimur (488)', sub: 'Persons per sq. km.', icon: <MapPin className="text-amber-500" /> },
    { label: 'Highest Population', value: 'Patna', sub: 'Most populous district.', icon: <Activity className="text-blue-500" /> },
    { label: 'Highest Growth Rate', value: 'Madhepura', sub: 'Decadal growth (2001-2011).', icon: <Activity className="text-teal-500" /> }
];

const MINERALS_INDUSTRIES = [
    { name: 'Mica (Abhrak)', region: 'Nawada, Jamui, Gaya', details: 'Used in electrical industries.' },
    { name: 'Gold (Swarna)', region: 'Karmatiya (Jamui)', details: 'Largest gold reserve in India (as per recent GSI survey).' },
    { name: 'Limestone (Chuna Patthar)', region: 'Rohtas, Kaimur', details: 'Found in Vindhyan rocks. Crucial for the cement industry (Dalmia Nagar).' },
    { name: 'Pyrites (Mools)', region: 'Amjhore (Rohtas)', details: 'Bihar holds 95% of India’s pyrite reserves. Used for sulfuric acid.' },
    { name: 'Oil Refinery', region: 'Barauni (Begusarai)', details: 'Established with Soviet Union collaboration in 1964.' },
];

const AGRICULTURE_GI_TAGS = [
    { name: 'Zardalu Mango', region: 'Bhagalpur', type: 'Fruit (GI Tag)' },
    { name: 'Shahi Litchi', region: 'Muzaffarpur', type: 'Fruit (GI Tag)' },
    { name: 'Magahi Paan', region: 'Magadh Region (Nawada, Gaya)', type: 'Betel Leaf (GI Tag)' },
    { name: 'Katarni Rice', region: 'Bhagalpur, Banka', type: 'Grain (GI Tag)' },
    { name: 'Makhana (Fox Nut)', region: 'Mithilanchal (Darbhanga, Madhubani)', type: 'Aquatic Crop (GI Tag - Mithila Makhana)' },
    { name: 'Major Soil Types', region: 'North/South Bihar', type: 'Soil', details: 'Bhangar (Old Alluvium), Khadar (New Alluvium), Balsundari (North Bihar), Tal (South of Ganga).' }
];

const WILDLIFE_SANCTUARIES = [
    { name: 'Valmiki National Park', region: 'West Champaran', type: 'National Park / Tiger Reserve' },
    { name: 'Kanwar Lake Bird Sanctuary', region: 'Begusarai', type: 'Ramsar Site (Oxbow lake)' },
    { name: 'Bhimbandh Wildlife Sanctuary', region: 'Munger', type: 'Sanctuary (known for hot springs)' },
    { name: 'Nagi-Nakti Dam', region: 'Jamui', type: 'Bird Sanctuary' },
    { name: 'Gautam Buddha Sanctuary', region: 'Gaya', type: 'Sanctuary' }
];

const TIMELINE = [
    { year: '527 BCE', title: 'Nirvana of Mahavira', desc: 'Lord Mahavira attained Nirvana at Pawapuri at age 72 on Kartik Krishna Amavasya.' },
    { year: '1541', title: 'Patna Capital Restored', desc: 'Sher Shah Suri made Patna the provincial capital (originally made capital by Udayin in ancient times).' },
    { year: '1592', title: 'Exile of Yusuf Shah Chak', desc: 'The last Muslim ruler of the Kashmir Valley was exiled by Akbar and buried in Biswak, Nalanda.' },
    { year: '1632', title: 'First European Factory', desc: 'The Dutch established the first factory in Patna (Northern building of Patna College) trading in Calico, China, Saltpeter (Shoraa), and Opium.' },
    { year: '1793', title: 'Permanent Settlement', desc: 'Zamindari system introduced by Lord Cornwallis. (Later systems: Ryotwari by Thomas Munro, Mahalwari by Holt Mackenzie).' },
    { year: '1830s', title: 'Wahabi Movement', desc: 'Patna city emerged as the primary center of the Wahabi movement.' },
    { year: '1855-56', title: 'Santhal Rebellion', desc: 'Santhals declared their own independent government in the Bhagalpur-Rajmahal area.' },
    { year: '1866-67', title: 'Indigo Cultivators Revolt', desc: 'Major rebellion by indigo farmers erupted in the regions of Champaran, Muzaffarpur, and Darbhanga.' },
    { year: '1885', title: 'Bengal Tenancy Act', desc: 'Accepted the rights of tenants on land in Bengal and Bihar.' },
    { year: '1906', title: 'Bihar Students Conference', desc: 'Founded by Dr. Rajendra Prasad in Patna College hall. Preceded the BPCC.' },
    { year: '1908', title: 'Chhotanagpur Tenancy Act', desc: 'Prohibited the practice of "Beth Begari" (forced, unpaid labor) protecting tribal rights.' },
    { year: '1912', title: 'Creation of Bihar Province', desc: 'Separated from the Bengal Presidency on March 22 (celebrated as Bihar Day). Movement led by Sachchidanand Sinha.' },
    { year: '1912', title: 'First INC Session in Bihar', desc: 'The 27th session of the INC was held in Bankipore, Patna. Presided over by R.N. Mudholkar.' },
    { year: '1916', title: 'Patna High Court', desc: 'The Patna High Court was officially established.' },
    { year: '1923', title: 'Swaraj Dal', desc: 'Swaraj Dal in Bihar was formed under the leadership of Shri Krishna Singh.' },
    { year: '1929', title: 'Bihar Provincial Kisan Sabha', desc: 'Formed by Swami Sahajanand Saraswati to mobilize peasant grievances. Official formation at Sonepur Fair.' },
    { year: '1931', title: 'Bihar Socialist Party', desc: 'Formed by Phoolan Prasad Verma and Jayaprakash Narayan.' },
    { year: '1936', title: 'Separation of Orissa', desc: 'Orissa was formally separated from Bihar on April 1, under the Govt of India Act 1935.' },
];

const REVOLT_1857 = [
    { location: 'Rohini (Deoghar)', date: '7th June 1857', desc: 'Uprising in the 32nd Infantry.' },
    { location: 'Patna', date: '3rd July 1857', desc: 'Led by bookseller Pir Ali.' },
    { location: 'Muzaffarpur', date: '25th July 1857', desc: 'Irregular cavalry rebellion.' },
    { location: 'Jagdishpur (Arrah)', date: '25th July 1857', desc: 'Kunwar Singh leads the revolt.' },
];

const EDUCATIONAL_TIMELINES = [
    { name: 'Patna University', date: 'Oct 1, 1917' },
    { name: 'IIT Patna', date: 'Aug 6, 2008' },
    { name: 'Nalanda Univ. (Re-established)', date: 'Nov 25, 2010' },
];

const BPSC_CATCHES = [
    {
        title: 'The 1632 Dutch Factory Controversy:',
        desc: 'Standard historians (e.g., Jadunath Sarkar) debate this, but always choose 1632 CE for the Dutch establishing a factory in Patna (Northern wing of Patna College) per the BPSC answer key.'
    },
    {
        title: 'Premier vs. Chief Minister:',
        desc: 'Before 1950, the head was the "Premier". Mohammad Yunus was technically the first Premier for a few months, but Shri Krishna Singh is legally recognized as the first Chief Minister.'
    },
    {
        title: 'BPCC President Trap:',
        desc: 'While Mazharul Haque was the first president of the reorganized BPCC in 1921, Syed Ali Imam presided over the very first Provincial Conference in 1908.'
    },
];

const PERSONALITIES = [
    { name: 'Sri Krishna Singh (Shri Babu)', title: 'First Chief Minister', desc: 'Architect of Modern Bihar & "Bihar Kesari". Abolished Zamindari system. Led Dalits into Baidyanath Dham temple. Established HEC Ranchi & Barauni Refinery.', img: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Shri_Krishna_Singh_2016_stamp_of_India.jpg', initials: 'SK' },
    { name: 'Sachchidanand Sinha', title: 'Creator of Modern Bihar', desc: 'Led the movement for a separate province which resulted in the creation of Bihar in 1912.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Portrait_of_Dr._Sachchidananda_Sinha.jpg/500px-Portrait_of_Dr._Sachchidananda_Sinha.jpg', initials: 'SS' },
    { name: 'Swami Sahajanand Saraswati', title: 'Kisan Pran (Life of Peasants)', desc: 'Founded Bihar Provincial Kisan Sabha. Famous slogan: "Latth Hamara Zindabad". Published radical journal "Hunkar".', img: 'https://ui-avatars.com/api/?name=Swami+Sahajanand&background=f59e0b&color=fff&size=256', initials: 'SS' },
    { name: 'Birsa Munda', title: 'Tribal Leader', desc: 'Led the Munda Rebellion against "Dikus". His guru was Anand Pandey. Tragically passed away in jail due to cholera.', img: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Birsa_Munda%2C_photograph_in_Roy_%281912-72%29.JPG', initials: 'BM' },
    { name: 'Rajkumar Shukla', title: 'Champaran Catalyst', desc: 'Resident of Murli Bharhwa village. He personally invited Mahatma Gandhi to Champaran.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Raj_Kumar_Shukla_2000_stamp_of_India.jpg/500px-Raj_Kumar_Shukla_2000_stamp_of_India.jpg', initials: 'RS' },
    { name: 'Pir Muhammad Munis', title: 'Writer & Activist', desc: 'Wrote under pseudonyms like "Dukhi", "Dukhi Atma", and "Dukhi Hriday" to highlight farmers\' plight.', img: 'https://ui-avatars.com/api/?name=Pir+Muhammad+Munis&background=10b981&color=fff&size=256', initials: 'PM' },
    { name: 'Ustad Bismillah Khan', title: 'Shehnai Maestro', desc: 'Born in Dumraon, Bihar. Elevated the Shehnai to classical concert stages worldwide.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Bismillah_Khan.jpg/500px-Bismillah_Khan.jpg', initials: 'BK' },
];

const QUIZ_QUESTIONS = [
    { q: "Where is the place of salvation of Mahavir ji located?", options: ["Maner", "Rajgir", "Pawapuri (Apapapuri)", "Jalan Fort"], ans: 2 },
    { q: "According to BPSC, which company established its factory in Patna in the year 1632?", options: ["British", "Dutch", "Portuguese", "French"], ans: 1 },
    { q: "Who established a branch of Anushilan Samiti in Patna in 1913?", options: ["Revati Nag", "Yadunath Sarkar", "Sachindranath Sanyal", "Majrul Haq"], ans: 2 },
    { q: "Who formed the Bihar Provincial Kisan Sabha in 1929?", options: ["Swami Sahajanand Saraswati", "Ram Sundar Singh", "Ganga Sharan Sinha", "Ramanand Mishra"], ans: 0 },
    { q: "When was Patna High Court established?", options: ["1916", "1917", "1918", "1921"], ans: 0 },
    { q: "Identify the area where the Santhals declared their government in 1855-56:", options: ["Munger-Bhagalpur", "Bhagalpur-Rajmahal", "Gaya-Munger", "Shahabad-Gaya"], ans: 1 },
    { q: "Which sequence correctly represents the 1857 rebellion outbreak in Bihar?", options: ["Patna, Muzaffarpur, Rohini, Jagdishpur", "Rohini, Patna, Muzaffarpur, Jagdishpur", "Muzaffarpur, Patna, Jagdishpur, Rohini"], ans: 1 },
    { q: "Who wrote under pseudonyms like 'Dukhi', 'Dukhi Atma' to highlight farmers' issues?", options: ["Pir Muhammad Munis", "Rajendra Prasad", "Sahajanand Saraswati", "S.N. Sinha"], ans: 0 },
    { q: "Basically the word 'Bihar' translates to-", options: ["Buddhist monastery (Vihara)", "Land of angels", "Arya Pradesh", "Region of greenery"], ans: 0 },
    { q: "How many seats are reserved for Scheduled Caste candidates in Bihar Assembly?", options: ["38", "40", "44", "46"], ans: 0 },
    { q: "Who was the guru of Birsa Munda?", options: ["Swami Sahajanand", "Anand Pandey", "Janna Bhagat", "M.N. Roy"], ans: 1 },
    { q: "Who invited Gandhiji to Champaran?", options: ["Rajendra Prasad", "Rajkumar Shukla", "Mazharul Haq", "Krishna Sahay"], ans: 1 },
    { q: "Who led the Salt Satyagraha in Bhagalpur?", options: ["Shri Krishna Singh", "Mahadevlal Saraf", "Kumar Mishra", "Satyanarayan"], ans: 1 },
    { q: "In the 1830s, Patna was the primary center of which movement?", options: ["Sanyasi", "Godkhari", "Munda", "Wahabi"], ans: 3 },
    { q: "The 1908 Chhotanagpur Tenancy Act prohibited:", options: ["Forest usage", "Burning forests", "Beth Begari (Forced Labor)", "Khutkatti System"], ans: 2 },
    { q: "Which Sufi sect did Saint Sharfuddin Maneri belong to?", options: ["Chishti", "Suhrawardi", "Firdausi", "Kubrawi"], ans: 2 },
    { q: "Which river is known as the 'Sorrow of Bihar'?", options: ["Gandak", "Kosi", "Bagmati", "Kamla"], ans: 1 },
    { q: "Manjusha Art is primarily associated with which region of Bihar?", options: ["Mithila", "Magadh", "Anga (Bhagalpur)", "Bhojpur"], ans: 2 },
    { q: "Which folk art of Bihar is also known as 'Snake Painting'?", options: ["Madhubani", "Tikuli", "Patna Kalam", "Manjusha"], ans: 3 },
    { q: "What is the State Animal of Bihar?", options: ["Tiger", "Gaur (Mithun)", "Elephant", "Rhinoceros"], ans: 1 },
    { q: "Who was the founder of the Maurya Empire in Bihar?", options: ["Bimbisara", "Ashoka", "Chandragupta Maurya", "Ajatashatru"], ans: 2 },
    { q: "Which ancient kingdom's capital was Rajgir (Girivraj) before moving to Pataliputra?", options: ["Kosala", "Vatsa", "Magadha", "Anga"], ans: 2 },
    { q: "How many administrative divisions does Bihar have?", options: ["7", "8", "9", "38"], ans: 2 },
    { q: "The Tikuli Art of Patna is inspired by which everyday item?", options: ["Bangles", "Bindi", "Sari", "Earthen Pots"], ans: 1 },
    { q: "Which of these is a South Bihar river?", options: ["Burhi Gandak", "Kosi", "Mahananda", "Punpun"], ans: 3 },
    { q: "During whose reign was the 'Golden Age of India' centered around Pataliputra?", options: ["Haryanka Dynasty", "Maurya Empire", "Gupta Empire", "Nanda Dynasty"], ans: 2 },
    { q: "According to Census 2011, which district of Bihar has the highest literacy rate?", options: ["Patna", "Rohtas", "Munger", "Aurangabad"], ans: 1 },
    { q: "Where is the Valmiki National Park located?", options: ["East Champaran", "West Champaran", "Kaimur", "Rohtas"], ans: 1 },
    { q: "Which district holds 95% of India's Pyrite reserves (Amjhore)?", options: ["Gaya", "Jamui", "Rohtas", "Banka"], ans: 2 },
    { q: "Katarni Rice and Zardalu Mango, which received GI Tags, are primarily associated with:", options: ["Muzaffarpur", "Bhagalpur", "Darbhanga", "Patna"], ans: 1 },
    { q: "Which district has the highest population density in Bihar as per Census 2011?", options: ["Patna", "Darbhanga", "Sheohar", "Begusarai"], ans: 2 },
];

// --- Profile Card Component ---
const ProfileCard = ({ person }) => {
    const [imgError, setImgError] = useState(!person.img);

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-amber-300 hover:shadow-md transition-all flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-4 rounded-full overflow-hidden bg-amber-100 flex items-center justify-center border-4 border-amber-50 shrink-0">
                {imgError ? (
                    <span className="text-2xl font-black text-amber-600 tracking-wider">{person.initials}</span>
                ) : (
                    <img
                        src={person.img}
                        alt={person.name}
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                    />
                )}
            </div>
            <h3 className="font-bold text-xl text-slate-800">{person.name}</h3>
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mt-2 mb-3 bg-amber-50 px-3 py-1 rounded-full">{person.title}</p>
            <p className="text-slate-600 text-sm leading-relaxed">{person.desc}</p>
        </div>
    );
};

// --- Interactive Quiz Component ---
const QuizQuestion = ({ questionNumber, question, options, correctIndex }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isRevealed, setIsRevealed] = useState(false);

    const handleSelect = (index) => {
        if (!isRevealed) {
            setSelectedOption(index);
            setIsRevealed(true);
        }
    };

    return (
        <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-sm mb-6 transition-all hover:shadow-md relative overflow-hidden">
            <h3 className="font-bold text-base md:text-lg text-slate-800 mb-4 leading-snug pr-12">
                {questionNumber}. {question}
            </h3>
            <div className="space-y-3">
                {options.map((option, index) => {
                    let buttonClass = "w-full text-left p-3 md:p-4 rounded-lg border text-slate-700 transition-all text-sm md:text-base font-medium ";
                    let icon = null;

                    if (!isRevealed) {
                        buttonClass += "border-slate-200 hover:border-indigo-400 hover:bg-indigo-50";
                    } else {
                        if (index === correctIndex) {
                            buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-800";
                            icon = <CheckCircle2 className="text-emerald-600 inline ml-2 shrink-0" size={18} />;
                        } else if (index === selectedOption) {
                            buttonClass += "border-rose-500 bg-rose-50 text-rose-800";
                            icon = <XCircle className="text-rose-600 inline ml-2 shrink-0" size={18} />;
                        } else {
                            buttonClass += "border-slate-100 bg-slate-50 opacity-50";
                        }
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleSelect(index)}
                            disabled={isRevealed}
                            className={buttonClass + " flex justify-between items-center"}
                        >
                            <span>{option}</span>
                            {icon}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

// --- Main Application ---
export default function BiharNotes({ embedded = false }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('overview');
    const timelineRef = useRef(null);
    const [timelineProgress, setTimelineProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current) return;
            const rect = timelineRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const top = rect.top;
            const height = rect.height;
            // trigger point: how far down the screen the "fill" happens (55% down the viewport)
            const triggerPoint = windowHeight * 0.55;
            let progress = ((triggerPoint - top) / height) * 100;
            progress = Math.max(0, Math.min(100, progress));
            setTimelineProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        setTimeout(handleScroll, 100);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: 'overview', title: 'Overview', icon: <BookOpen size={16} /> },
        { id: 'bpsc-tre', title: 'TRE Focus', icon: <Target size={16} /> },
        { id: 'geo-admin', title: 'Geo & Admin', icon: <MapPin size={16} /> },
        { id: 'economy-flora', title: 'Econ & Flora', icon: <Leaf size={16} /> },
        { id: 'ancient-heritage', title: 'Heritage', icon: <Scroll size={16} /> },
        { id: 'timeline', title: 'Timeline', icon: <Clock size={16} /> },
        { id: 'movements', title: 'Movements', icon: <History size={16} /> },
        { id: 'personalities', title: 'Eminent', icon: <UserCheck size={16} /> },
        { id: 'culture-health', title: 'Culture', icon: <Activity size={16} /> },
        { id: 'quiz', title: 'Quiz', icon: <HelpCircle size={16} /> },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
            setIsMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -60% 0px' }
        );

        navLinks.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className={`${embedded ? '' : 'min-h-screen'} bg-[#f8fafc] font-sans text-slate-800`}>

            {/* Navbar (Fixed Top) — hidden when embedded inside the app */}
            {!embedded && <nav className="fixed top-0 left-0 w-full bg-slate-900 text-slate-300 z-50 shadow-xl border-b border-slate-800 transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">

                        {/* Logo area */}
                        <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('overview')}>
                            <Landmark className="text-indigo-400" size={28} />
                            <div>
                                <h1 className="text-white font-bold text-lg md:text-xl leading-none">Bihar Special</h1>
                                <p className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase mt-0.5">Master Guide</p>
                            </div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden xl:flex xl:items-center overflow-x-auto">
                            <div className="flex space-x-1">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-all text-sm font-medium whitespace-nowrap
                      ${activeSection === link.id
                                                ? 'bg-indigo-600 text-white shadow-md'
                                                : 'hover:bg-slate-800 hover:text-white'
                                            }`}
                                    >
                                        <span className={activeSection === link.id ? 'text-white' : (link.id === 'bpsc-tre' ? 'text-rose-400' : 'text-indigo-400')}>
                                            {link.icon}
                                        </span>
                                        {link.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="xl:hidden flex items-center gap-4">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
                            >
                                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMobileMenuOpen && (
                    <div className="xl:hidden bg-slate-900 border-t border-slate-800 shadow-2xl absolute w-full left-0">
                        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 max-h-[75vh] overflow-y-auto custom-scrollbar">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all text-left text-base font-medium
                    ${activeSection === link.id
                                            ? 'bg-indigo-600 text-white shadow-md'
                                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                        }`}
                                >
                                    <span className={activeSection === link.id ? 'text-white' : (link.id === 'bpsc-tre' ? 'text-rose-400' : 'text-indigo-400')}>
                                        {link.icon}
                                    </span>
                                    {link.title}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>}

            {/* Main Content Area */}
            <main className={`w-full p-4 sm:p-6 md:p-8 lg:p-10 ${embedded ? 'pt-4' : 'pt-24 md:pt-32'} space-y-16`}>

                {/* Header Section */}
                <header id="overview" className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 relative overflow-hidden scroll-mt-28 md:scroll-mt-32">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-full -z-10 opacity-60"></div>

                    <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
                        Comprehensive Study Material
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                        Bihar Special: <br className="hidden md:block" /> Detailed Notes
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl max-w-2xl leading-relaxed">
                        An exhaustive, integrated guide covering the geography, administration, historical timelines, modern movements, and culture of Bihar. Contains minute high-yield details tailored for BPSC TRE 4.0.
                    </p>
                </header>

                {/* EXAM FOCUS: BPSC TRE 4.0 */}
                <section id="bpsc-tre" className="scroll-mt-28 md:scroll-mt-32">
                    <div className="bg-gradient-to-br from-rose-600 to-rose-800 rounded-3xl p-8 md:p-10 shadow-lg text-white relative overflow-hidden">
                        <Target className="absolute -bottom-10 -right-10 text-rose-900 opacity-30 w-72 h-72" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6 border-b border-rose-500/50 pb-4">
                                <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
                                    <AlertCircle size={28} className="text-rose-100" />
                                </div>
                                <h2 className="text-3xl font-extrabold tracking-tight">BPSC TRE 4.0 High-Yield Facts & Catches</h2>
                            </div>

                            <p className="text-rose-100 mb-8 text-lg">Minute details, "traps", and official BPSC answer keys mapped directly from deep notes:</p>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Historical Traps - Mapped */}
                                <div className="bg-rose-900/40 backdrop-blur-sm p-6 rounded-2xl border border-rose-500/30">
                                    <h3 className="font-bold text-xl text-white mb-4 flex items-center gap-2">
                                        <Flame size={20} className="text-rose-300" /> Official BPSC "Catches"
                                    </h3>
                                    <ul className="space-y-4 text-sm leading-relaxed text-rose-100">
                                        {BPSC_CATCHES.map((item, index) => (
                                            <li key={index} className={index !== BPSC_CATCHES.length - 1 ? "border-b border-rose-700/50 pb-3" : ""}>
                                                <strong className="text-white block mb-1">{item.title}</strong>
                                                {item.desc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Geography, Education & Current Affairs */}
                                <div className="space-y-6">
                                    <div className="bg-rose-900/40 backdrop-blur-sm p-6 rounded-2xl border border-rose-500/30">
                                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                                            <GraduationCap size={18} className="text-rose-300" /> Educational Timelines
                                        </h3>
                                        <ul className="space-y-2 text-sm text-rose-100 mt-4">
                                            {EDUCATIONAL_TIMELINES.map((edu, index) => (
                                                <li key={index} className="flex justify-between items-center border-b border-rose-700/50 pb-2 mb-2 last:border-0 last:mb-0 last:pb-0">
                                                    <span>{edu.name}</span>
                                                    <span className="font-mono bg-rose-100 text-rose-900 px-2 py-0.5 rounded font-bold text-xs">{edu.date}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-rose-900/40 backdrop-blur-sm p-6 rounded-2xl border border-rose-500/30">
                                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                                            <Droplets size={18} className="text-rose-300" /> Geography & Current Context
                                        </h3>
                                        <p className="text-rose-100 text-sm leading-relaxed mb-3">
                                            The Ganga River strictly flows from <strong className="text-white border-b border-rose-400">West to East</strong> across the state.
                                        </p>
                                        <p className="text-rose-100 text-sm leading-relaxed border-t border-rose-700/50 pt-3">
                                            <strong>Current Affairs (2026):</strong> In a major political shift, <strong>Samrat Choudhary</strong> was sworn in as Chief Minister on April 15, 2026, marking the first time a BJP leader has held the top post following Nitish Kumar's resignation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 1. Geography & Administration */}
                <section id="geo-admin" className="scroll-mt-28 md:scroll-mt-32">
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                        <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600 shadow-sm">
                            <MapPin size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Geography & Administration</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {DEMOGRAPHICS.map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                <div className="mb-4">{stat.icon}</div>
                                <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
                                <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                                {stat.subtitle && <p className="text-xs text-slate-500 mt-2 font-medium leading-snug">{stat.subtitle}</p>}
                            </div>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-4 mt-10 flex items-center gap-2">
                        <Shield className="text-blue-500" size={20} /> State Symbols
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                        {STATE_SYMBOLS.map((sym, i) => (
                            <div key={i} className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-2xl shadow-sm border border-blue-100 flex flex-col items-center text-center hover:shadow-md transition-all hover:-translate-y-1">
                                <span className="text-3xl mb-2">{sym.icon}</span>
                                <p className="text-xs text-blue-600 font-bold uppercase mb-1">{sym.label}</p>
                                <p className="text-sm font-bold text-slate-800">{sym.value}</p>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-4 mt-10 flex items-center gap-2">
                        <Droplets className="text-blue-500" size={20} /> Rivers & Administrative Divisions
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-12">
                        {RIVERS_AND_DIVISIONS.map((item, i) => (
                            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors">
                                <p className="font-bold text-blue-900 mb-2">{item.name}</p>
                                <p className="text-sm text-slate-600 leading-relaxed">{item.details}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-indigo-900 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-center">
                            <Shield className="absolute -bottom-8 -right-8 text-indigo-800 opacity-40 w-64 h-64" />
                            <h3 className="text-2xl font-bold mb-6 text-indigo-100 flex items-center gap-3">
                                <Users size={24} /> Bicameral Legislature
                            </h3>
                            <div className="space-y-3 relative z-10">
                                {LEGISLATURE.map((leg, i) => (
                                    <div key={i} className="flex justify-between items-center bg-indigo-800/60 p-4 rounded-xl backdrop-blur-sm border border-indigo-700/50 hover:bg-indigo-700/60 transition-colors">
                                        <p className="font-bold text-sm md:text-base text-white">{leg.label}</p>
                                        <span className="font-mono bg-indigo-950/80 px-3 py-1 rounded-lg text-indigo-200 font-semibold shadow-sm text-sm">{leg.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-5 border-b pb-3 flex items-center gap-2">
                                <BookOpen className="text-blue-500" size={20} /> Etymology & Terminology
                            </h3>
                            <p className="text-slate-700 leading-relaxed mb-4">
                                The word <strong>"Bihar"</strong> is fundamentally derived from the ancient word <strong>"Vihara"</strong>, meaning a Buddhist monastery.
                            </p>
                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                                <h4 className="font-bold text-blue-900 mb-3">Historical Land Systems & Regions</h4>
                                <ul className="text-sm text-blue-800 space-y-3">
                                    <li className="leading-relaxed">
                                        • <strong>Permanent Settlement (Zamindari):</strong> Introduced by Lord Cornwallis in 1793.<br />
                                        <span className="ml-3 opacity-90">📍 <em>Regions:</em> Bihar, Bengal, Odisha, and Varanasi (UP).</span>
                                    </li>
                                    <li className="leading-relaxed">
                                        • <strong>Ryotwari System:</strong> Introduced by Thomas Munro and Alexander Read (1820).<br />
                                        <span className="ml-3 opacity-90">📍 <em>Regions:</em> Madras, Bombay, and parts of Assam & Coorg.</span>
                                    </li>
                                    <li className="leading-relaxed">
                                        • <strong>Mahalwari System:</strong> Spearheaded by Holt Mackenzie (1822).<br />
                                        <span className="ml-3 opacity-90">📍 <em>Regions:</em> North-Western Provinces, Punjab, and Central Provinces.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 1.2 Economy, Census & Geography Deep Dive */}
                <section id="economy-flora" className="scroll-mt-28 md:scroll-mt-32">
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                        <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600 shadow-sm">
                            <Leaf size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Economy, Census 2011 & Flora/Fauna</h2>
                    </div>

                    {/* Census 2011 Grid */}
                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Users className="text-emerald-500" size={20} /> Census 2011 Highlights (BPSC High-Yield)
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {CENSUS_2011.map((stat, i) => (
                                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                                    <div className="mb-3">{stat.icon}</div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                                    <p className="text-lg font-bold text-slate-800">{stat.value}</p>
                                    {stat.sub && <p className="text-xs text-slate-500 mt-2 font-medium leading-snug">{stat.sub}</p>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Minerals & GI Tags */}
                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                        <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 shadow-sm">
                            <h3 className="text-xl font-bold text-emerald-900 mb-5 flex items-center gap-2 border-b border-emerald-200 pb-3">
                                <Activity className="text-emerald-600" size={20} /> Minerals & Industries
                            </h3>
                            <ul className="space-y-4">
                                {MINERALS_INDUSTRIES.map((min, i) => (
                                    <li key={i} className="bg-white p-4 rounded-xl shadow-sm border border-emerald-50">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="font-bold text-slate-800">{min.name}</p>
                                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold uppercase">{min.region}</span>
                                        </div>
                                        <p className="text-sm text-slate-600">{min.details}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-yellow-50 rounded-3xl p-8 border border-yellow-100 shadow-sm">
                            <h3 className="text-xl font-bold text-yellow-900 mb-5 flex items-center gap-2 border-b border-yellow-200 pb-3">
                                <Leaf className="text-yellow-600" size={20} /> Agriculture & GI Tags
                            </h3>
                            <ul className="space-y-4">
                                {AGRICULTURE_GI_TAGS.map((agri, i) => (
                                    <li key={i} className="bg-white p-4 rounded-xl shadow-sm border border-yellow-50">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="font-bold text-slate-800">{agri.name}</p>
                                            <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold uppercase">{agri.type}</span>
                                        </div>
                                        {agri.details ? <p className="text-sm text-slate-600 mt-1">{agri.details}</p> : <p className="text-sm text-slate-600 mt-1">Region: {agri.region}</p>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Wildlife */}
                    <div className="bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-800 text-white relative overflow-hidden mb-12">
                        <Globe className="absolute -top-10 -right-10 text-emerald-500/20 w-64 h-64" />
                        <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2 relative z-10">
                            <MapPin className="text-emerald-500" size={20} /> Wildlife Sanctuaries & National Parks
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                            {WILDLIFE_SANCTUARIES.map((park, i) => (
                                <div key={i} className="bg-slate-800/80 p-5 rounded-2xl border border-emerald-900/50 hover:border-emerald-500/50 transition-colors backdrop-blur-sm">
                                    <p className="font-bold text-white mb-1">{park.name}</p>
                                    <p className="text-xs text-emerald-300 font-bold uppercase tracking-wider mb-2">{park.type}</p>
                                    <p className="text-sm text-slate-400">📍 {park.region}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 1.5 Ancient & Religious Heritage */}
                <section id="ancient-heritage" className="scroll-mt-28 md:scroll-mt-32">
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                        <div className="bg-amber-100 p-2.5 rounded-xl text-amber-600 shadow-sm">
                            <Scroll size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Ancient & Religious Heritage</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Mahavira */}
                        <div className="bg-white rounded-3xl p-8 border border-amber-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-10"></div>
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl font-bold text-amber-900 flex flex-wrap items-center gap-2">
                                    Lord Mahavira <span className="text-sm font-normal bg-amber-100 text-amber-800 px-2 py-1 rounded">24th Tirthankar</span>
                                </h3>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Mahavira_11th_century.jpg" alt="Lord Mahavira" className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-amber-200 shadow-sm shrink-0 bg-amber-50 ml-4" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                            <div className="space-y-4">
                                <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                                    <p className="text-sm text-amber-800 font-bold uppercase mb-1">Mahaparinirvana</p>
                                    <p className="text-slate-700">Attained Nirvana in <strong>527 BCE</strong> at age 72 on Kartik Krishna Amavasya.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase">Location</p>
                                        <p className="font-medium text-slate-900">Pawapuri (Apapapuri)</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase">Temple Icon</p>
                                        <p className="font-medium text-slate-900">Jal Mandir</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase">Language</p>
                                        <p className="font-medium text-slate-900">Prakrit (Ardhamagadhi)</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase">Symbol</p>
                                        <p className="font-medium text-slate-900">Lion</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-amber-100">
                                    <p className="text-sm text-slate-700 mb-2"><strong>Five Vows (Mahavratas):</strong> Ahimsa, Satya, Asteya, Aparigraha, and <em>Brahmacharya</em> (added by Mahavira).</p>
                                    <p className="text-sm text-slate-700"><strong>Three Jewels (Triratna):</strong> Right Faith, Right Knowledge, Right Conduct.</p>
                                </div>
                            </div>
                        </div>

                        {/* Buddha */}
                        <div className="bg-white rounded-3xl p-8 border border-blue-200 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10"></div>
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl font-bold text-blue-900 flex flex-wrap items-center gap-2">
                                    Gautam Buddha <span className="text-sm font-normal bg-blue-100 text-blue-800 px-2 py-1 rounded">Enlightened One</span>
                                </h3>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Buddha_in_Sarnath_Museum_%28Dhammajak_Mutra%29.jpg" alt="Gautam Buddha" className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-blue-200 shadow-sm shrink-0 bg-blue-50 object-top ml-4" onError={(e) => e.target.style.display = 'none'} />
                            </div>
                            <div className="space-y-4">
                                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                    <p className="text-sm text-blue-800 font-bold uppercase mb-1">Mahaparinirvana</p>
                                    <p className="text-slate-700">Passed away at age 80 in a grove of Sal Trees on the bank of Hiranyavati River.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase">Location</p>
                                        <p className="font-medium text-slate-900">Kushinagar (Malla Republic)</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase">Final Meal</p>
                                        <p className="font-medium text-slate-900">Offered by Chunda</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-slate-500 font-bold uppercase">Last Words</p>
                                        <p className="font-medium text-slate-900 italic">"Appamadena sampadetha" (Be a light onto yourselves)</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-blue-100 space-y-2">
                                    <p className="text-sm text-slate-700"><strong>Mahaparinirvana Stupa:</strong> Contains 6.1m reclining Buddha (red sandstone).</p>
                                    <p className="text-sm text-slate-700"><strong>Rambhar Stupa:</strong> Exact cremation site.</p>
                                    <p className="text-sm text-slate-700"><strong>Matha Kuar Shrine:</strong> Colossal statue in 'Bhumiparsha Mudra'.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-200 shadow-sm">
                        <h3 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                            <Landmark className="text-amber-600" size={24} /> Ancient Kingdoms of Magadha
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {ANCIENT_KINGDOMS.map((kingdom, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 hover:border-amber-400 hover:shadow-md transition-all">
                                    <h4 className="font-bold text-lg text-slate-800 mb-2">{kingdom.name}</h4>
                                    <div className="space-y-2 text-sm text-slate-600 mb-4">
                                        <p><strong className="text-slate-800">Capital:</strong> {kingdom.capital}</p>
                                        <p><strong className="text-slate-800">Founder:</strong> {kingdom.founder}</p>
                                    </div>
                                    <p className="text-sm text-slate-700 leading-relaxed pt-4 border-t border-amber-50">{kingdom.details}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2. Historical Timeline */}
                <section id="timeline" className="scroll-mt-28 md:scroll-mt-32">
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                        <div className="bg-purple-100 p-2.5 rounded-xl text-purple-600 shadow-sm">
                            <Clock size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Detailed Historical Timeline</h2>
                    </div>

                    <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 overflow-hidden">
                        <div ref={timelineRef} className="relative ml-4 md:ml-6 space-y-10 pb-4">
                            {/* Background Line */}
                            <div className="absolute left-0 top-2 bottom-0 w-1 bg-slate-200 rounded-full -translate-x-1/2"></div>
                            
                            {/* Animated Progress Line */}
                            <div 
                                className="absolute left-0 top-2 w-1 bg-purple-600 rounded-full -translate-x-1/2 transition-all duration-300 ease-out shadow-sm shadow-purple-500/50"
                                style={{ height: `calc(${timelineProgress}% - 0.5rem)` }}
                            ></div>

                            {TIMELINE.map((item, i) => {
                                const isActive = timelineProgress > (i / (TIMELINE.length - 1)) * 100 - 5;
                                
                                return (
                                <div key={i} className="relative pl-8 md:pl-12 group">
                                    {/* The Connecting Dot */}
                                    <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full ring-4 ring-white transition-all duration-500 shadow-sm -translate-x-1/2
                                        ${isActive ? 'bg-purple-600 scale-110' : 'bg-slate-300'} 
                                        group-hover:scale-125 group-hover:bg-purple-600`}></div>
                                    
                                    <div className={`flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-2 transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-60 translate-x-2'}`}>
                                        <span className={`font-bold font-mono text-sm md:text-lg px-2 py-0.5 rounded-md inline-block w-max transition-colors duration-500 ${isActive ? 'text-purple-700 bg-purple-50' : 'text-slate-500 bg-slate-100'}`}>{item.year}</span>
                                        <h3 className={`text-xl font-bold transition-colors duration-500 ${isActive ? 'text-slate-800' : 'text-slate-600'}`}>{item.title}</h3>
                                    </div>
                                    <p className={`text-base leading-relaxed max-w-3xl transition-all duration-500 ${isActive ? 'text-slate-600 opacity-100' : 'text-slate-400 opacity-60'}`}>{item.desc}</p>
                                </div>
                            )})}
                        </div>
                    </div>
                </section>

                {/* 3. Modern History & Movements */}
                <section id="movements" className="scroll-mt-28 md:scroll-mt-32">
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                        <div className="bg-rose-100 p-2.5 rounded-xl text-rose-600 shadow-sm">
                            <History size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Movements, Sabhas & Revolts</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">

                        {/* 1857 Visual Route Map */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm col-span-1 md:col-span-2">
                            <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                                <MapPin className="text-rose-500" size={24} /> 1857 Revolt Route Map (Exact Dates)
                            </h3>
                            <p className="text-slate-500 text-sm mb-6 border-b pb-4">A geographic timeline showing the spread of the 1857 rebellion across Bihar.</p>

                            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-start mt-6 gap-8 md:gap-4 pb-4">
                                {/* Connecting Line mapped visually */}
                                <div className="absolute top-5 md:top-5 left-4 md:left-8 w-1 h-[calc(100%-2rem)] md:w-[calc(100%-4rem)] md:h-1 bg-rose-200 z-0 rounded"></div>

                                {REVOLT_1857.map((item, index) => (
                                    <div key={index} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-3 z-10 w-full md:w-1/4 group">
                                        <div className="w-10 h-10 rounded-full bg-white border-4 border-rose-500 text-rose-600 flex items-center justify-center font-bold text-sm shadow-md shrink-0 group-hover:scale-110 group-hover:bg-rose-50 transition-all">
                                            {index + 1}
                                        </div>
                                        <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl shadow-sm text-left md:text-center w-full group-hover:shadow-md transition-shadow">
                                            <p className="font-bold text-slate-800">{item.location}</p>
                                            <div className="flex items-center md:justify-center gap-1.5 mt-2 mb-2">
                                                <Clock size={14} className="text-rose-500" />
                                                <span className="text-rose-700 font-bold text-sm tracking-wide">{item.date}</span>
                                            </div>
                                            <p className="text-xs text-rose-800/80 leading-relaxed font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Congress & Conferences */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Users className="text-rose-500" size={24} /> Congress & Conferences
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold text-slate-800">Bihar Students' Conference (1906)</h4>
                                    <p className="text-slate-600 text-sm mt-1">First organization of its kind in India. Founded by Dr. Rajendra Prasad in Patna College hall. In 1920, shifted focus to support Non-Cooperation.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">Bihar Provincial Congress (BPCC)</h4>
                                    <p className="text-slate-600 text-sm mt-1">Formalized in 1908. First session in Patna presided by <strong>Syed Ali Imam</strong>. Second session in Bhagalpur by S. Sinha.</p>
                                </div>
                            </div>
                        </div>

                        {/* Peasant Movements */}
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Leaf className="text-rose-500" size={24} /> Kisan Sabhas & Satyagraha
                            </h3>
                            <div className="space-y-6 flex-1">
                                <div className="border-l-4 border-rose-400 pl-4 bg-rose-50/50 py-2 pr-2 rounded-r-xl">
                                    <h4 className="font-bold text-slate-800 text-lg">Swami Sahajanand Saraswati</h4>
                                    <p className="text-slate-700 text-sm mt-1">Known as <strong>Kisan Pran</strong>. Formed BPKS in 1929 at Sonepur Fair and AIKS in 1936. Famously coined the slogan: <em>"Latth Hamara Zindabad"</em> urging farmers to carry staffs for self-defense.</p>
                                </div>
                                <div className="border-l-4 border-rose-400 pl-4">
                                    <h4 className="font-bold text-slate-800 text-lg">Swami Vidyanand</h4>
                                    <p className="text-slate-600 text-sm mt-1">Actively led farmers in Darbhanga during the Non-Cooperation Movement (1920-22).</p>
                                </div>
                                <div className="border-l-4 border-rose-400 pl-4">
                                    <h4 className="font-bold text-slate-800 text-lg">Munger Kisan Sabha (1922-23)</h4>
                                    <p className="text-slate-600 text-sm mt-1">Established by Mohammad Zubair and Shri Krishna Singh.</p>
                                </div>
                                <div className="border-l-4 border-rose-400 pl-4">
                                    <h4 className="font-bold text-slate-800 text-lg">Bhagalpur Salt Satyagraha</h4>
                                    <p className="text-slate-600 text-sm mt-1">Successfully led by Mahadevlal Saraf.</p>
                                </div>
                            </div>
                        </div>

                        {/* Publications Deep Dive */}
                        <div className="bg-slate-900 rounded-3xl p-8 text-white md:col-span-2 shadow-lg relative overflow-hidden">
                            <Newspaper className="absolute -top-10 -right-10 text-slate-800 w-64 h-64 opacity-50" />
                            <h3 className="font-bold text-2xl text-rose-300 mb-8 border-b border-slate-700 pb-4 relative z-10">Radical Publications & Literature</h3>

                            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
                                    <div className="inline-block bg-rose-500/20 text-rose-300 px-2 py-1 rounded text-xs font-bold mb-3 uppercase tracking-wider">Banned Book</div>
                                    <h4 className="text-xl font-bold text-white mb-2">Desher Katha (1904)</h4>
                                    <p className="text-slate-400 text-sm mb-4">Written by <strong>Sakharam Ganesh Deuskar</strong> (translated to Hindi by Baburao Vishnu Paradkar). Banned by British in 1910.</p>
                                    <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-rose-500 pl-3 italic">
                                        A critique of economic exploitation and "hypnotic conquest" of the Indian mind. Sri Aurobindo credited Deuskar with first popularizing the term "Swaraj" here.
                                    </p>
                                </div>

                                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
                                    <div className="inline-block bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-bold mb-3 uppercase tracking-wider">Newspaper</div>
                                    <h4 className="text-xl font-bold text-white mb-2">The Searchlight (1918)</h4>
                                    <p className="text-slate-400 text-sm mb-4">Founded by Sachchidanand Sinha and Rajendra Prasad in English. Led the nationalist voice in Bihar.</p>
                                    <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-blue-500 pl-3">
                                        Most famous editor: <strong>Murli Manohar Prasad</strong> (faced contempt case by Chief Justice Sir Courtney Terrell in 1928-29). Launched Hindi counterpart <em>Pradeep</em> in 1947.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Eminent Personalities */}
                <section id="personalities" className="scroll-mt-28 md:scroll-mt-32">
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                        <div className="bg-amber-100 p-2.5 rounded-xl text-amber-600 shadow-sm">
                            <UserCheck size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Eminent Personalities</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {PERSONALITIES.map((person, i) => (
                            <div key={i}>
                                <ProfileCard person={person} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Culture & Health */}
                <section id="culture-health" className="scroll-mt-28 md:scroll-mt-32">
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                        <div className="bg-teal-100 p-2.5 rounded-xl text-teal-600 shadow-sm">
                            <Activity size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Culture, Health & Infrastructure</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Culture */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <BookMarked className="text-teal-500" size={24} /> Cultural Heritage
                            </h3>

                            {/* Images Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="relative h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Mahabodhi_Temple_Front_View.jpg" alt="Mahabodhi Temple" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => e.target.style.display = 'none'} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3"><span className="text-white text-xs font-bold leading-tight">Mahabodhi Temple<br /><span className="text-[10px] font-normal opacity-80">UNESCO Site</span></span></div>
                                </div>
                                <div className="relative h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/World_Peace_Pagoda%2C_Rajgir.jpg" alt="World Peace Stupa" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => e.target.style.display = 'none'} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3"><span className="text-white text-xs font-bold leading-tight">Peace Stupa (Rajgir)<br /><span className="text-[10px] font-normal opacity-80">120ft, Built by Japanese</span></span></div>
                                </div>
                            </div>

                            <ul className="space-y-6 flex-1">
                                <li className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                                        <Users className="text-teal-600" size={18} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-lg">Folk Dances</p>
                                        <p className="text-slate-600 mt-1">Jat-Jatin, Bidesia, and Jhijhiya are prominent traditional dances.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                                        <Scroll className="text-teal-600" size={18} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-lg">Sufism in Bihar</p>
                                        <p className="text-slate-600 mt-1">The highly revered saint <strong>Sharfuddin Maneri</strong> belonged to the Firdausi sect of Sufism.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                                        <PenTool className="text-teal-600" size={18} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-lg">Official Languages</p>
                                        <p className="text-slate-600 mt-1">Bihar was the first state to make <strong>Hindi</strong> its official language. <strong>Urdu</strong> is the recognized second official language.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Health & Infra */}
                        <div className="bg-teal-50 rounded-3xl p-8 border border-teal-100 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-2">
                                    <Activity className="text-teal-600" size={24} /> Agrarian & Health Facts
                                </h3>
                                <div className="space-y-4 mb-8">
                                    <div className="bg-white/80 rounded-2xl shadow-sm border border-teal-50 overflow-hidden flex flex-col md:flex-row group hover:shadow-md transition-shadow">
                                        <div className="w-full md:w-36 h-40 md:h-auto shrink-0 overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80" alt="Paddy Fields" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => e.target.style.display = 'none'} />
                                        </div>
                                        <div className="p-5">
                                            <h4 className="font-bold text-teal-800 text-lg mb-1">Paddy Fields & Vectors</h4>
                                            <p className="text-teal-900/80 text-sm leading-relaxed">As an agrarian state, stagnant water in paddy fields serves as breeding grounds for mosquitoes, contributing to <strong>Malaria, Dengue, and Chikungunya</strong>.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/80 rounded-2xl shadow-sm border border-teal-50 overflow-hidden flex flex-col md:flex-row group hover:shadow-md transition-shadow">
                                        <div className="w-full md:w-36 h-40 md:h-auto shrink-0 overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1596485802284-be4df39c1483?auto=format&fit=crop&w=400&q=80" alt="Litchi Orchards" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => e.target.style.display = 'none'} />
                                        </div>
                                        <div className="p-5">
                                            <h4 className="font-bold text-teal-800 text-lg mb-1">Litchi Orchards & AES</h4>
                                            <p className="text-teal-900/80 text-sm leading-relaxed">Acute Encephalitis Syndrome (AES), known as <strong>"Chamki Bukhar"</strong>, is linked to toxins in unripe Litchis affecting malnourished children, primarily around <strong>Muzaffarpur</strong>.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-teal-200 pt-6">
                                <h4 className="font-bold text-teal-900 mb-3">Infrastructure Fact</h4>
                                <p className="text-teal-800 text-sm">The historic <strong>Sher Shah Suri Marg</strong> (Grand Trunk Road / NH2) passes through Bihar, connecting Delhi to Kolkata. The <strong>JP Setu (Digha-Sonpur)</strong> is a major rail-road bridge.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 bg-gradient-to-br from-teal-900 to-slate-900 rounded-3xl p-8 shadow-lg border border-teal-800 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-800 rounded-bl-full -z-10 opacity-30"></div>
                        <h3 className="text-2xl font-bold text-teal-100 mb-6 flex items-center gap-2 relative z-10">
                            <PenTool className="text-teal-400" size={24} /> Folk Arts & Paintings
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6 relative z-10">
                            {FOLK_ARTS.map((art, i) => (
                                <div key={i} className="bg-slate-800/60 p-6 rounded-2xl border border-teal-700/50 hover:bg-slate-800 hover:border-teal-500/50 transition-all backdrop-blur-sm group">
                                    <h4 className="font-bold text-lg text-white mb-1 group-hover:text-teal-300 transition-colors">{art.name}</h4>
                                    <p className="text-teal-400 text-xs font-bold uppercase tracking-wide mb-3">{art.region}</p>
                                    <p className="text-slate-300 text-sm leading-relaxed">{art.details}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. Interactive Quiz */}
                <section id="quiz" className="scroll-mt-28 md:scroll-mt-32 mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-slate-200 pb-6 mb-8 mt-12">
                        <div className="flex items-center gap-4">
                            <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600 shadow-sm">
                                <HelpCircle size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Knowledge Check</h2>
                                <p className="text-slate-500 text-base mt-1 font-medium">Test your retention of the entire master guide.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md">
                                {QUIZ_QUESTIONS.length} Questions
                            </span>
                        </div>
                    </div>

                    {/* Render questions in a responsive 2-column masonry-like grid */}
                    <div className="columns-1 lg:columns-2 gap-8 space-y-8">
                        {QUIZ_QUESTIONS.map((q, i) => (
                            <div key={i} className="break-inside-avoid">
                                <QuizQuestion questionNumber={i + 1} question={q.q} options={q.options} correctIndex={q.ans} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-24 border-t border-slate-200 pt-10 pb-16 text-center text-slate-500 text-sm">
                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-indigo-100">
                        <Landmark className="text-indigo-500" size={28} />
                    </div>
                    <p className="font-extrabold text-slate-800 text-xl mb-2 tracking-tight">Bihar Special Master Guide</p>
                    <p className="font-medium text-slate-500 max-w-md mx-auto leading-relaxed">A comprehensive, fully responsive study material application compiled from extensive historical and geographical notes.</p>
                </footer>

            </main>
        </div>
    );
}