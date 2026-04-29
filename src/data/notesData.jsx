import React from 'react';
import { 
    MapPin, Users, Activity, BookOpen, 
    Anchor, Compass, Award, Ship, Map, 
    Swords, ScrollText, BookOpenCheck, ShieldAlert,
    Clock, Target, Lightbulb, TrendingUp, Info
} from 'lucide-react';

// --- BIHAR NOTES DATA ---
export const BIHAR_DEMOGRAPHICS = [
    { label: 'Total Districts', value: '38', icon: <MapPin className="text-blue-500" /> },
    { label: 'Population Rank', value: '3rd in India', subtitle: 'After UP & Maharashtra', icon: <Users className="text-emerald-500" /> },
    { label: 'Population Density', value: '1106 / sq km', subtitle: 'Highest in India', icon: <Activity className="text-rose-500" /> },
    { label: 'Area', value: '94,163 sq km', subtitle: '12th largest state', icon: <MapPin className="text-blue-500" /> },
];

export const BIHAR_LEGISLATURE = [
    { label: 'Vidhan Sabha (Assembly)', value: '243 Seats', sub: '38 seats reserved for SC candidates.' },
    { label: 'Vidhan Parishad (Council)', value: '75 Seats', sub: 'Upper House. First meeting held on Jan 20, 1913.' },
    { label: 'Lok Sabha', value: '40 Seats', sub: 'Lower House of Parliament.' },
    { label: 'Panchayati Raj', value: '50% Quota', sub: 'In 2006, Bihar became the first state to give 50% reservation to women.' },
];

export const BIHAR_STATE_SYMBOLS = [
    { label: 'State Animal', value: 'Gaur (Mithun) / Ox', icon: '🐃' },
    { label: 'State Bird', value: 'House Sparrow', icon: '🐦' },
    { label: 'State Flower', value: 'Kachnar', icon: '🌸' },
    { label: 'State Tree', value: 'Peepal', icon: '🌳' },
    { label: 'State Emblem', value: 'Bodhi Tree', icon: '🌿' }
];

export const BIHAR_ANCIENT_KINGDOMS = [
    { name: 'Magadha', capital: 'Rajgir (Girivraj) → Pataliputra', founder: 'Bimbisara (Haryanka Dynasty)', details: 'The most powerful Mahajanapada. Key rulers: Ajatashatru, Mahapadma Nanda. Known for military use of elephants.' },
    { name: 'Maurya Empire', capital: 'Pataliputra', founder: 'Chandragupta Maurya', details: 'Established after overthrowing Nandas. Ashoka the Great expanded it to cover most of the Indian subcontinent. Built Sanchi Stupa and Pillars.' },
    { name: 'Gupta Empire', capital: 'Pataliputra', founder: 'Sri Gupta', details: 'The Golden Age of India. Key rulers: Samudragupta (Napoleon of India), Chandragupta II (Vikramaditya). Great advancements in science, math (Aryabhata), and literature.' }
];

export const BIHAR_RIVERS = [
    { name: 'North Bihar Rivers', details: 'Ganga, Ghaghara, Gandak, Burhi Gandak, Bagmati, Kamla, Kosi (Sorrow of Bihar), Mahananda. Prone to flooding.' },
    { name: 'South Bihar Rivers', details: 'Sone, Punpun, Falgu (Niranjana), Karmnasa, Kiul. Mostly rain-fed and originate from southern plateau.' },
    { name: 'Administrative Divisions (9)', details: 'Patna, Tirhut, Saran, Darbhanga, Kosi, Purnia, Bhagalpur, Munger, Magadh.' }
];

export const BIHAR_FOLK_ARTS = [
    { name: 'Madhubani (Mithila) Painting', region: 'Mithila Region', details: 'Features geometric patterns, no empty spaces, primarily mythological themes. GI Tag 2010. Traditionally painted by women on mud walls.' },
    { name: 'Manjusha Art', region: 'Anga (Bhagalpur)', details: 'Sequential scroll/box painting known as Snake Paintings (Bihula-Bishahari folklore). Uniquely uses three colors: Pink, Green, and Yellow.' },
    { name: 'Tikuli Art', region: 'Patna', details: '800-year-old tradition. Vibrant, glossy glass/MDF craft inspired by "Bindi". Historically involved melting glass and gold foil embellishments.' }
];

export const BIHAR_CENSUS_2011 = [
    { label: 'Highest Literacy', value: 'Rohtas (73.37%)', sub: 'Rohtas also has highest Male & Female literacy.', icon: <BookOpen className="text-emerald-500" /> },
    { label: 'Lowest Literacy', value: 'Purnia (51.08%)', sub: 'Saharsa has lowest female literacy.', icon: <BookOpen className="text-rose-500" /> },
    { label: 'Highest Sex Ratio', value: 'Gopalganj (1021)', sub: 'Females per 1000 males.', icon: <Users className="text-indigo-500" /> },
    { label: 'Lowest Sex Ratio', value: 'Munger (876)', sub: 'Females per 1000 males.', icon: <Users className="text-rose-500" /> },
    { label: 'Highest Growth Rate', value: 'Madhepura', sub: 'Decadal growth (2001-2011).', icon: <Activity className="text-teal-500" /> }
];

export const BIHAR_MINERALS = [
    { name: 'Mica (Abhrak)', region: 'Nawada, Jamui, Gaya', details: 'Used in electrical industries.' },
    { name: 'Gold (Swarna)', region: 'Karmatiya (Jamui)', details: 'Largest gold reserve in India (as per recent GSI survey).' },
    { name: 'Limestone (Chuna Patthar)', region: 'Rohtas, Kaimur', details: 'Found in Vindhyan rocks. Crucial for the cement industry (Dalmia Nagar).' },
    { name: 'Oil Refinery', region: 'Barauni (Begusarai)', details: 'Established with Soviet Union collaboration in 1964.' },
];

export const BIHAR_TIMELINE = [
    { year: '563 BCE', title: 'Birth of Gautam Buddha', desc: 'Siddhartha Gautama was born in Lumbini (now Nepal) on Vaishakh Purnima to King Suddhodana and Queen Mayadevi of the Shakya clan.' },
    { year: '528 BCE', title: 'Enlightenment of Buddha', desc: 'Attained Supreme Enlightenment (Sambodhi) under the Bodhi Tree at Bodh Gaya (Bihar) on Vaishakh Purnima at age 35.' },
    { year: '527 BCE', title: 'Nirvana of Mahavira', desc: 'Lord Mahavira attained Nirvana at Pawapuri at age 72 on Kartik Krishna Amavasya.' },
    { year: '1764', title: 'Battle of Buxar', desc: 'British defeated combined forces. Led to Treaty of Allahabad (1765) giving Diwani rights of Bihar, Bengal, and Odisha.' },
    { year: '1857', title: 'Revolt of 1857', desc: 'Led by Babu Kunwar Singh of Jagdispur. Fierce resistance in Bihar.' },
    { year: '1912', title: 'Bihar Separation', desc: 'Bihar was separated from Bengal Presidency on March 22, 1912.' },
    { year: '1917', title: 'Champaran Satyagraha', desc: 'Gandhis first movement in India against the Tinkathia system.' },
    { year: '1936', title: 'Separation of Orissa', desc: 'Orissa was formally separated from Bihar on April 1, under the Govt of India Act 1935.' },
];

export const BIHAR_PERSONALITIES = [
    { name: 'Sri Krishna Singh (Shri Babu)', title: 'First Chief Minister', desc: 'Architect of Modern Bihar & "Bihar Kesari". Abolished Zamindari system. Led Dalits into Baidyanath Dham temple. Established HEC Ranchi & Barauni Refinery.', img: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Shri_Krishna_Singh_2016_stamp_of_India.jpg', initials: 'SK' },
    { name: 'Sachchidanand Sinha', title: 'Creator of Modern Bihar', desc: 'Led the movement for a separate province which resulted in the creation of Bihar in 1912.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Portrait_of_Dr._Sachchidananda_Sinha.jpg/500px-Portrait_of_Dr._Sachchidananda_Sinha.jpg', initials: 'SS' },
    { name: 'Swami Sahajanand Saraswati', title: 'Kisan Pran (Life of Peasants)', desc: 'Founded Bihar Provincial Kisan Sabha. Famous slogan: "Latth Hamara Zindabad". Published radical journal "Hunkar".', img: 'https://ui-avatars.com/api/?name=Swami+Sahajanand&background=f59e0b&color=fff&size=256', initials: 'SS' },
    { name: 'Jai Prakash Narayan (JP)', title: 'Lok Nayak', desc: 'Hero of Quit India movement & leader of "Total Revolution" (Sampoorna Kranti) in 1974 against Indira Gandhi regime.', img: 'https://ui-avatars.com/api/?name=JP+Narayan&background=1e293b&color=fff&size=256', initials: 'JP' },
    { name: 'Birsa Munda', title: 'Tribal Leader', desc: 'Led the Munda Rebellion against "Dikus". His guru was Anand Pandey. Tragically passed away in jail due to cholera.', img: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Birsa_Munda%2C_photograph_in_Roy_%281912-72%29.JPG', initials: 'BM' },
    { name: 'Rajkumar Shukla', title: 'Champaran Catalyst', desc: 'Resident of Murli Bharhwa village. He personally invited Mahatma Gandhi to Champaran.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Raj_Kumar_Shukla_2000_stamp_of_India.jpg/500px-Raj_Kumar_Shukla_2000_stamp_of_India.jpg', initials: 'RS' },
    { name: 'Pir Muhammad Munis', title: 'Writer & Activist', desc: 'Wrote under pseudonyms like "Dukhi", "Dukhi Atma", and "Dukhi Hriday" to highlight farmers\' plight.', img: 'https://ui-avatars.com/api/?name=Pir+Muhammad+Munis&background=10b981&color=fff&size=256', initials: 'PM' },
    { name: 'Ustad Bismillah Khan', title: 'Shehnai Maestro', desc: 'Born in Dumraon, Bihar. Elevated the Shehnai to classical concert stages worldwide.', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Bismillah_Khan.jpg/500px-Bismillah_Khan.jpg', initials: 'BK' },
];

// --- EUROPEAN POWERS DATA ---
export const EUROPEAN_POWERS = [
    {
        id: 'portuguese',
        name: "Portuguese",
        timeline: "1498 - 1961",
        subtitle: "Pioneers of the Sea Route",
        summary: "First to arrive (1498) and last to leave (1961).",
        detailed: [
            "Vasco da Gama reached Calicut (1498).",
            "First Factory in Cochin (1500).",
            "Blue Water Policy introduced by Almeida.",
            "Captured Goa in 1510 (Albuquerque).",
            "Brought Printing Press, Potato, Tobacco, Cashew."
        ]
    },
    {
        id: 'dutch',
        name: "Dutch",
        timeline: "1605 - 1759",
        subtitle: "Spice Island Focus",
        summary: "Focused more on Indonesia. Defeated at Battle of Bedara (1759).",
        detailed: [
            "VOC formed in 1602.",
            "First Factory in Masulipatnam (1605).",
            "Patna factory established in 1632.",
            "Exited India after Battle of Bedara (1759)."
        ]
    },
    {
        id: 'english',
        name: "English",
        timeline: "1600 - 1947",
        subtitle: "Ultimate Victors",
        summary: "Transitioned from traders to rulers after Plassey (1757) and Buxar (1764).",
        detailed: [
            "EIC formed in 1600.",
            "First Factory in Masulipatnam (1611) and Surat (1613).",
            "Battle of Swally (1612) broke Portuguese naval power.",
            "Diwani rights of Bihar, Bengal, Odisha (1765)."
        ]
    },
    {
        id: 'french',
        name: "French",
        timeline: "1664 - 1793",
        subtitle: "Formidable Rivals",
        summary: "Last to arrive. Lost Carnatic Wars and Battle of Wandiwash (1760).",
        detailed: [
            "Company formed by Colbert (1664).",
            "First Factory in Surat (1668).",
            "Dupleix introduced Subsidiary Alliance concept.",
            "Confined to Pondicherry after Wandiwash (1760)."
        ]
    }
];

// --- TRIBAL MOVEMENTS DATA ---
export const TRIBAL_MOVEMENTS = [
    {
        name: "Santhal Rebellion (Hul)",
        year: "1855 - 1856",
        region: "Damin-i-Koh (Bhagalpur to Rajmahal)",
        leaders: "Sidhu, Kanhu, Chand, Bhairav",
        causes: "Exploitation by Dikus (outsiders), Mahajans (moneylenders), and high revenue demands.",
        outcome: "Formation of Santhal Parganas district and Tenancy Act."
    },
    {
        name: "Munda Rebellion (Ulgulan)",
        year: "1899 - 1900",
        region: "Chotanagpur Plateau (Ranchi, Khunti)",
        leaders: "Birsa Munda (Dharti Aaba)",
        causes: "Destruction of Khuntkatti system, forced labor (Beth Begari).",
        outcome: "Chotanagpur Tenancy Act (1908) banning forced labor."
    },
    {
        name: "Kol Rebellion",
        year: "1831 - 1832",
        region: "Singhbhum, Ranchi, Palamu",
        leaders: "Buddhu Bhagat, Joa Bhagat",
        causes: "Land transfer to Hindu/Muslim/Sikh Thikadars, heavy taxes (Handia tax).",
        outcome: "Creation of South-West Frontier Agency."
    },
    {
        name: "Tana Bhagat Movement",
        year: "1914 - 1919",
        region: "Chotanagpur",
        leaders: "Jatra Oraon",
        causes: "Socio-religious reform, opposition to British taxes.",
        outcome: "Merged with Gandhis Non-Cooperation Movement."
    }
];

// --- LAND REVENUE DATA ---
export const LAND_REVENUE_SYSTEMS = [
    {
        name: "Permanent Settlement (Zamindari)",
        year: "1793",
        architect: "Lord Cornwallis",
        region: "Bengal, Bihar, Odisha, Varanasi",
        details: "Zamindar was the owner. Revenue fixed forever. 10/11 to British, 1/11 to Zamindar. Sunset Law applied.",
        share: "19% of British India"
    },
    {
        name: "Ryotwari System",
        year: "1820",
        architect: "Thomas Munro, Alexander Reed",
        region: "Madras, Bombay, Assam",
        details: "Direct settlement with the peasant (Ryot). Peasant was the owner. Very high revenue (50-60%).",
        share: "51% of British India"
    },
    {
        name: "Mahalwari System",
        year: "1822 / 1833",
        architect: "Holt Mackenzie, RM Bird",
        region: "Punjab, North-West Province, Central India",
        details: "Settlement with the village community (Mahal). Joint responsibility for tax. Periodic revision.",
        share: "30% of British India"
    },
    {
        name: "Tinkathia System",
        region: "Champaran, Bihar",
        details: "Forced Indigo cultivation on 3/20th of land. Abolished after Champaran Satyagraha (1917).",
        catalyst: "Rajkumar Shukla invited Gandhi."
    }
];

// --- EMERGING TRENDS DATA ---
export const EMERGING_TRENDS = [
    {
        topic: "Artificial Intelligence (AI)",
        subtopics: ["NLP (Natural Language Processing)", "Machine Learning", "Generative AI", "Robotics"],
        concepts: "Simulating human intelligence in machines. Tokenization ➔ Context ➔ Weights ➔ Generation."
    },
    {
        topic: "Immersive Technologies",
        subtopics: ["Augmented Reality (AR)", "Virtual Reality (VR)"],
        diff: "AR overlays digital on real world; VR creates complete digital immersion."
    },
    {
        topic: "Big Data",
        characteristics: ["Volume", "Velocity", "Variety", "Veracity", "Value"],
        threshold: "> 1TB, requires Distributed Systems like Hadoop."
    },
    {
        topic: "Internet of Things (IoT)",
        layers: ["Perception (Sensors)", "Network (Transmission)", "Application (Service)"],
        pioneer: "Kevin Ashton",
        protocols: ["MQTT", "WebSockets (Stateful/Full Duplex)", "REST (Stateless/Half Duplex)"]
    },
    {
        topic: "Cloud Computing",
        models: ["IaaS (Infrastructure)", "PaaS (Platform)", "SaaS (Software)"],
        examples: ["AWS EC2 (IaaS)", "Azure (PaaS)", "Salesforce (SaaS)"]
    }
];
// --- ADDITIONAL BIHAR DATA (Centralized) ---
export const BIHAR_AGRICULTURE_GI = [
    { name: 'Zardalu Mango', region: 'Bhagalpur', type: 'Fruit (GI Tag)' },
    { name: 'Shahi Litchi', region: 'Muzaffarpur', type: 'Fruit (GI Tag)' },
    { name: 'Magahi Paan', region: 'Magadh Region (Nawada, Gaya)', type: 'Betel Leaf (GI Tag)' },
    { name: 'Katarni Rice', region: 'Bhagalpur, Banka', type: 'Grain (GI Tag)' },
    { name: 'Makhana (Fox Nut)', region: 'Mithilanchal (Darbhanga, Madhubani)', type: 'Aquatic Crop (GI Tag - Mithila Makhana)' },
    { name: 'Major Soil Types', region: 'North/South Bihar', type: 'Soil', details: 'Bhangar (Old Alluvium), Khadar (New Alluvium), Balsundari (North Bihar), Tal (South of Ganga).' }
];

export const BIHAR_WILDLIFE = [
    { name: 'Valmiki National Park', region: 'West Champaran', type: 'National Park / Tiger Reserve' },
    { name: 'Kanwar Lake Bird Sanctuary', region: 'Begusarai', type: 'Ramsar Site (Oxbow lake)' },
    { name: 'Bhimbandh Wildlife Sanctuary', region: 'Munger', type: 'Sanctuary (known for hot springs)' },
    { name: 'Nagi-Nakti Dam', region: 'Jamui', type: 'Bird Sanctuary' },
    { name: 'Gautam Buddha Sanctuary', region: 'Gaya', type: 'Sanctuary' }
];

export const BIHAR_MODERN_TIMELINE = [
    { year: '1916', title: 'Patna High Court', desc: 'The Patna High Court was officially established.' },
    { year: '1923', title: 'Swaraj Dal', desc: 'Swaraj Dal in Bihar was formed under the leadership of Shri Krishna Singh.' },
    { year: '1929', title: 'Bihar Provincial Kisan Sabha', desc: 'Formed by Swami Sahajanand Saraswati to mobilize peasant grievances. Official formation at Sonepur Fair.' },
    { year: '1931', title: 'Bihar Socialist Party', desc: 'Formed by Phoolan Prasad Verma and Jayaprakash Narayan.' },
    { year: '1936', title: 'Separation of Orissa', desc: 'Orissa was formally separated from Bihar on April 1, under the Govt of India Act 1935.' },
];

export const BIHAR_REVOLT_1857 = [
    { location: 'Rohini (Deoghar)', date: '7th June 1857', desc: 'Uprising in the 32nd Infantry.' },
    { location: 'Patna', date: '3rd July 1857', desc: 'Led by bookseller Pir Ali.' },
    { location: 'Muzaffarpur', date: '25th July 1857', desc: 'Irregular cavalry rebellion.' },
    { location: 'Jagdishpur (Arrah)', date: '25th July 1857', desc: 'Kunwar Singh leads the revolt.' },
];

export const BIHAR_EDUCATION_TIMELINE = [
    { name: 'Patna University', date: 'Oct 1, 1917' },
    { name: 'IIT Patna', date: 'Aug 6, 2008' },
    { name: 'Nalanda Univ. (Re-established)', date: 'Nov 25, 2010' },
];

export const BIHAR_BPSC_CATCHES = [
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
