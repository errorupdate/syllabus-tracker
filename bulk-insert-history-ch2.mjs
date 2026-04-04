import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbgQW6j9PioZbxhylDFr0N_MNEjZP_ajo",
  authDomain: "bpsc-tracker-sync.firebaseapp.com",
  projectId: "bpsc-tracker-sync",
  storageBucket: "bpsc-tracker-sync.firebasestorage.app",
  messagingSenderId: "158025253878",
  appId: "1:158025253878:web:984bf251396b05b8af3dd7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SUBJECT_ID  = "general-paper";
const TOPIC_ID    = "gp-t7";
const CHAPTER_ID  = "gp-t7-ch2";

const questions = [
  {
    text: "Which British company was given the diwani rights of Bengal after the Battle of Plassey?",
    optA: "British Indian Company",
    optB: "East India Company",
    optC: "Imperial Company",
    correctAnswer: "optB",
    explanation: "The East India Company obtained the Diwani rights (revenue collection) following their military successes in Bengal. This shifted the Company's role from a simple trading entity to a significant political and financial power.",
  },
  {
    text: "In which year did the Battle of Buxar take place?",
    optA: "1764",
    optB: "1777",
    optC: "1857",
    correctAnswer: "optA",
    explanation: "The Battle of Buxar was fought on October 22, 1764, between the British and a combined Indian alliance. It was a decisive victory that solidified British influence over Northern India.",
  },
  {
    text: "Who was the Nawab of Bengal during the Battle of Buxar?",
    optA: "Mir Qasim",
    optB: "Mir Jafar",
    optC: "Shuja-ud-Daula",
    correctAnswer: "optA",
    explanation: "Mir Qasim was the Nawab who challenged British authority over trade duties, leading to the conflict. He formed an alliance with the Nawab of Awadh and the Mughal Emperor to fight the Company.",
  },
  {
    text: "Who led the British forces in the Battle of Buxar?",
    optA: "Robert Clive",
    optB: "Hector Munro",
    optC: "Warren Hastings",
    correctAnswer: "optB",
    explanation: "Major Hector Munro commanded the British East India Company's troops during this specific battle. His disciplined leadership allowed a smaller force to defeat the much larger allied Indian army.",
  },
  {
    text: "Who was the Governor-General of British India during the Battle of Buxar?",
    optA: "Warren Hastings",
    optB: "Robert Clive",
    optC: "Henry Vansittart",
    correctAnswer: "optC",
    explanation: "Henry Vansittart served as the Governor of Bengal from 1760 to 1764, covering the period of the battle. Note that the official title 'Governor-General' was not created until the Regulating Act of 1773.",
  },
  {
    text: "What was the outcome of the Battle of Buxar?",
    optA: "British Victory",
    optB: "Victory of Nawabs",
    optC: "The battle ended in a draw",
    correctAnswer: "optA",
    explanation: "The battle resulted in a definitive victory for the British East India Company. This win forced the Mughal Emperor to sign the Treaty of Allahabad, granting the British vast territorial and financial rights.",
  },
  {
    text: "How long did the Battle of Buxar last?",
    optA: "1 day",
    optB: "5 days",
    optC: "2 days",
    correctAnswer: "optC",
    explanation: "The active engagement of the Battle of Buxar took place over two days, starting on October 22, 1764. The British forces successfully overwhelmed the opposition in this short but high-stakes encounter.",
  },
  {
    text: "Buxar is located in which of the following states?",
    optA: "Bihar",
    optB: "Haryana",
    optC: "Punjab",
    correctAnswer: "optA",
    explanation: "Buxar is a historic city situated on the banks of the Ganges in the modern-day state of Bihar. It serves as a key geographical point near the border of Uttar Pradesh.",
  },
  {
    text: "Which river was near the Battle of Buxar?",
    optA: "Ganges",
    optB: "Yamuna",
    optC: "Saryu",
    correctAnswer: "optA",
    explanation: "The battle was fought near the banks of the Ganges (Ganga) river. This strategic location was vital for transport and military positioning during the 18th century.",
  },
  {
    text: "Who was the last Governor of Bengal appointed by the Mughal ruler?",
    optA: "Murshid Kuli Khan",
    optB: "Robert Clive",
    optC: "Warren Hastings",
    correctAnswer: "optA",
    explanation: "Murshid Quli Khan was the final governor officially appointed by the Mughal Emperor Farrukhsiyar in 1717. After his tenure, the governorship became a hereditary position for the Nawabs of Bengal.",
  },
  {
    text: "Which of the following treaties was signed after the Battle of Buxar?",
    optA: "Treaty of Allahabad",
    optB: "Treaty of Purandar",
    optC: "Treaty of Salbai",
    correctAnswer: "optA",
    explanation: "The Treaty of Allahabad (1765) was signed by Lord Clive and the Mughal Emperor Shah Alam II. It officially granted the British the Diwani rights for Bengal, Bihar, and Odisha.",
  },
  {
    text: "Which was the first educational center established by the East India Company?",
    optA: "Calcutta Madrasa",
    optB: "Asiatic Society",
    optC: "Fort William College",
    correctAnswer: "optA",
    explanation: "Warren Hastings established the Calcutta Madrasa in 1781 to support the study of Muslim law and Arabic. It was the very first educational institution founded by the British administration in India.",
  },
  {
    text: "The Sanskrit College for the study of Hindu Laws and philosophies was established by:",
    optA: "Jonathan Duncan",
    optB: "Richard Wellesley",
    optC: "William Jones",
    correctAnswer: "optA",
    explanation: "Jonathan Duncan founded the Sanskrit College at Varanasi in 1791. The goal was to preserve and study Hindu laws and literature to aid in British judicial administration.",
  },
  {
    text: "Which among the following was the first college for western education in India?",
    optA: "Fort William College",
    optB: "Asiatic Society of Oriental Learning",
    optC: "Benaras Sanskrit College",
    correctAnswer: "optA",
    explanation: "Founded in 1800, Fort William College in Calcutta was the first to provide a structured curriculum including western subjects. It was primarily used to train British civil servants in Indian languages and administrative practices.",
  },
  {
    text: "Who founded the 'Asiatic Society of Bengal' in 1784?",
    optA: "William Jones",
    optB: "Max Muller",
    optC: "Charles Wilkins",
    correctAnswer: "optA",
    explanation: "Sir William Jones founded the society to promote the study of Asian culture, history, and languages. His work led to significant breakthroughs in the understanding of the shared roots of Indo-European languages.",
  },
  {
    text: "In which year was The Indian University Act introduced in India?",
    optA: "1904",
    optB: "1889",
    optC: "1908",
    correctAnswer: "optA",
    explanation: "Introduced by Lord Curzon in 1904, this act aimed to increase government control over Indian universities. It followed the recommendations of the Raleigh Commission to 'reform' higher education standards.",
  },
  {
    text: "Who among the following abolished district Faujdari Courts and established a court at Calcutta and Murshidabad?",
    optA: "Lord Cornwallis",
    optB: "William Bentinck",
    optC: "JS Mill",
    correctAnswer: "optA",
    explanation: "As part of the Cornwallis Code of 1793, Lord Cornwallis replaced local criminal courts with Circuit Courts presided over by British judges. This move was intended to centralize and westernize the legal system.",
  },
  {
    text: "The Indian Penal Code came into force in the year:",
    optA: "1862",
    optB: "1856",
    optC: "1888",
    correctAnswer: "optA",
    explanation: "While the IPC was drafted in 1860 by Lord Macaulay's commission, it officially became operational on January 1, 1862. It provided a unified criminal code for all of British India.",
  },
  {
    text: "When was the Criminal Procedure Code (CrPC) introduced in India?",
    optA: "1861",
    optB: "1851",
    optC: "1890",
    correctAnswer: "optA",
    explanation: "The first CrPC was enacted in 1861 to establish uniform procedures for criminal investigations and trials. It worked alongside the IPC to standardize the delivery of justice.",
  },
  {
    text: "Which act prohibited Slavery in India?",
    optA: "Indian Slavery Act 1843",
    optB: "Societies Registration Act 1860",
    optC: "Indian Contract Act 1872",
    correctAnswer: "optA",
    explanation: "The Indian Slavery Act of 1843, signed by Lord Ellenborough, abolished the legal status of slavery across British India. It prohibited the sale of persons and ensured that claims to 'slaves' would no longer be recognized in court.",
  },
];

async function insertAll() {
  const col = collection(db, "questionBank-v2");
  let count = 0;
  for (const q of questions) {
    await addDoc(col, {
      subjectId:     SUBJECT_ID,
      topicId:       TOPIC_ID,
      chapterId:     CHAPTER_ID,
      text:          q.text,
      optA:          q.optA,
      optB:          q.optB,
      optC:          q.optC,
      optD:          "More than one of the above",
      optE:          "None of these",
      correctAnswer: q.correctAnswer,
      explanation:   q.explanation,
      createdAt:     Date.now(),
    });
    count++;
    console.log(`✅ [${count}/20] ${q.text.slice(0, 65)}…`);
  }
  console.log(`\n🎉 Done! ${count} questions inserted into History CH-2 (यूरोपियों का आगमन).`);
  process.exit(0);
}

insertAll().catch(err => { console.error("❌ Error:", err); process.exit(1); });
