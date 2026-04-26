const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'notes', 'TribalMovements.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove max width constraints to stretch the layout
content = content.replace(/max-w-6xl mx-auto/g, 'w-full px-4 sm:px-6 lg:px-8');

// 2. Expand Santhal Rebellion
let santhalOld = `                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Leaders:</span> <span className="text-slate-600">Sidhu and Kanhu Murmu (along with sisters Phulo and Jhano).</span></p>
                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Region:</span> <span className="text-slate-600">Rajmahal Hills (Jharkhand, Bihar, Odisha, West Bengal). Area was known as <em>Damin-i-Koh</em>.</span></p>
                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Core Causes:</span> <span className="text-slate-600">Massive exploitation by moneylenders (Mahajans), corrupt police, and Zamindars backed by the British government. Deep resentment against <em>Dikus</em> (outsiders).</span></p>
                                                <div className="mt-4 pt-4 border-t border-slate-200">
                                                    <p className="font-bold text-slate-800 mb-1">Historical Outcome:</p>
                                                    <p className="text-slate-600">The revolt was brutally crushed using martial law, but it forced the British to recognize tribal sovereignty, leading to the creation of the independent <strong>Santhal Pargana</strong> district to pacify them.</p>
                                                </div>`;

let santhalNew = `                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Leaders:</span> <span className="text-slate-600">Sidhu, Kanhu, Chand, and Bhairav Murmu (ably supported by their sisters Phulo and Jhano).</span></p>
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
                                                </div>`;

content = content.replace(santhalOld, santhalNew);


// 3. Expand Munda Rebellion
let mundaOld = `                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Leader:</span> <span className="text-slate-600">Birsa Munda (Revered as 'Dharti Aaba' or Father of the Earth). Influenced initially by Guru Anand Pandey.</span></p>
                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Region:</span> <span className="text-slate-600">Chotanagpur Plateau, Jharkhand.</span></p>
                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Core Causes:</span> <span className="text-slate-600">Destruction of the traditional <em>Khuntkatti</em> (joint landholding) system by British revenue policies. Imposition of <em>Begar</em> (forced/bonded labor) and interference by Christian missionaries.</span></p>
                                                <div className="mt-4 pt-4 border-t border-slate-200">
                                                    <p className="font-bold text-slate-800 mb-1">Historical Outcome:</p>
                                                    <p className="text-slate-600">Suppressed by forces. Birsa Munda was arrested and died in jail (1900). However, it resulted in landmark tribal land reforms, specifically the passing of the <strong>Chotanagpur Tenancy Act (1908)</strong>, restricting land transfer to non-tribals.</p>
                                                </div>`;

let mundaNew = `                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Leader:</span> <span className="text-slate-600">Birsa Munda (Revered as <em>'Dharti Aaba'</em> - Father of the Earth). Initiated the Birsait sect, drawing from both Hinduism (Guru Anand Pandey) and Christianity (missionary schools).</span></p>
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
                                                </div>`;
content = content.replace(mundaOld, mundaNew);


// 4. Expand Kol Rebellion
let kolOld = `                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Key Leaders:</span> <span className="text-slate-600">Buddhu Bhagat, Joa Bhagat (Deep dive addition for exams).</span></p>
                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Region:</span> <span className="text-slate-600">Chotanagpur, Jharkhand (Singhbhum, Ranchi, Palamu).</span></p>
                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Core Causes:</span> <span className="text-slate-600">Large-scale transfer of land from Kol headmen to outside farmers (Sikh and Muslim commercial farmers) facilitated by British Zamindari policies.</span></p>
                                                <div className="mt-4 pt-4 border-t border-slate-200">
                                                    <p className="font-bold text-slate-800 mb-1">Historical Outcome:</p>
                                                    <p className="text-slate-600">The rebellion was heavily crushed by British troops, but it forced British officials to acknowledge the systemic grievances, leading to minor administrative adjustments in the region.</p>
                                                </div>`;

let kolNew = `                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Key Leaders:</span> <span className="text-slate-600">Buddhu Bhagat (killed with his family), Joa Bhagat, Madara Mahato, and Bindrai Manki.</span></p>
                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Region:</span> <span className="text-slate-600">Chotanagpur region covering Ranchi, Singhbhum, Hazaribagh, Palamu, and the western parts of Manbhum.</span></p>
                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Core Causes:</span> <span className="text-slate-600">The British transferred land administration to Hindu, Sikh, and Muslim <em>Thikadars</em> (contractors). These outsiders exacted heavy taxes (like tax on local brewing - Handia) and seized lands from Kol headmen (Mankis and Mundas). Widespread reports of honor violations against Kol women by outsiders sparked extreme outrage.</span></p>
                                                <div className="mt-4 pt-4 border-t border-slate-200">
                                                    <p className="font-bold text-slate-800 mb-1">Historical Course & Outcome:</p>
                                                    <p className="text-slate-600 text-sm">In 1831, the Kols adopted a scorched-earth policy, burning villages of Dikus (outsiders) and slaughtering landlords. It took large-scale British military deployment under Captain Wilkinson to crush the revolt by 1832. <strong>Result:</strong> Led to the creation of the <strong>South-West Frontier Agency</strong> to provide separate administrative control.</p>
                                                </div>`;
content = content.replace(kolOld, kolNew);


// 5. Expand Bhil Revolts
let bhilOld = `                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Leaders:</span> <span className="text-slate-600">Govind Guru, Tantya Bhil.</span></p>
                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Region:</span> <span className="text-slate-600">Khandesh, Dhar, Malwa (Spanning Rajasthan, Gujarat, Madhya Pradesh, Maharashtra).</span></p>
                                                <p className="flex items-start"><span className="font-bold w-24 shrink-0 text-slate-700">Core Causes:</span> <span className="text-slate-600">Agrarian hardships, exploitation by British officials and local landlords, and fear of British encroachment after the Maratha defeat.</span></p>
                                                <div className="mt-4 pt-4 border-t border-slate-200">
                                                    <p className="font-bold text-slate-800 mb-1">Historical Outcome:</p>
                                                    <p className="text-slate-600">Despite multiple uprisings being crushed by British military expeditions, the prolonged resistance laid the foundational blueprint for future tribal welfare and agrarian reforms in western India.</p>
                                                </div>`;
                                                
let bhilNew = `                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Leaders:</span> <span className="text-slate-600">Dashrath, Sewaram, Bhagoji Naik. Later led by <strong>Govind Guru</strong> (Bhagat Movement) and Motilal Tejawat (Eki Movement).</span></p>
                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Region:</span> <span className="text-slate-600">Khandesh region (Maharashtra), Dhar, Malwa, and southern Rajasthan (Mewar, Banswara).</span></p>
                                                <p className="flex items-start"><span className="font-bold w-28 shrink-0 text-slate-700">Core Causes:</span> <span className="text-slate-600">Famines, harsh land revenues, and the British pacification campaigns following the defeat of the Marathas (1818). Bhils feared total loss of forest rights. Later movements protested excessive <em>Lagaan</em> (taxes) and <em>Veth-Begar</em> (forced labor) in Rajputana princely states.</span></p>
                                                <div className="mt-4 pt-4 border-t border-slate-200">
                                                    <p className="font-bold text-slate-800 mb-1">Historical Course & Outcome:</p>
                                                    <p className="text-slate-600 text-sm">Initial revolts (1818-1831) were managed via military force and amnesty. In 1913, Govind Guru gathered Bhils at Mangarh Hill. British forces fired upon the peaceful gathering, killing over 1,500 Bhils (infamously known as the <strong>Mangarh Massacre</strong> or the Jallianwala Bagh of Rajasthan).</p>
                                                </div>`;
content = content.replace(bhilOld, bhilNew);

// Write changes
fs.writeFileSync(filePath, content, 'utf8');
console.log('Expanded content and adjusted layout constraints');
