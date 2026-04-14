export const STUDY_NOTES = {
  // AI-generated detailed study notes will be stored here.
  // The AI assistant will update this file whenever requested.
  
  "OOP Concepts": `
# 📚 Detailed Study Notes: Object-Oriented Programming (OOP) Concepts

*This guide provides a comprehensive overview of fundamental OOP principles, synthesized from your question bank.*

---

## 🏗️ Core Building Blocks
Object-Oriented Programming is built around real-world modeling. The two fundamental elements are classes and objects.

* **Class as a Blueprint:** A **class** is best defined as a blueprint or template for creating objects. It dictates the attributes (data) and behaviors (methods) the resulting objects will retain.
* **Objects as Instances:** **Objects** are runtime instances of classes. When you use the \`new\` keyword (in languages like C++ or Java), you dynamically allocate memory and instantiate an object from its class blueprint.

## 🛡️ The Pillars of OOP
There are specific principles that define the OOP paradigm, improving modularity and security.

* **Encapsulation & Information Hiding:** **Encapsulation** is the bundling of data (variables) and methods (functions) inside a single unit (the class). A key advantage of this is **information hiding**—ensuring that only essential information is visible to the outside world, usually achieved using access modifiers (like \`private\`).
* **Inheritance:** The main purpose of inheritance is to establish a parent-child relationship between classes. This promotes code reusability. A classic example of inheritance is **"Animal to Cat"**, since a Cat *is an* Animal.
* **The \`super\` Keyword:** When utilizing inheritance in Java (and similar languages), the **\`super\`** keyword is vital. It specifically refers to the superclass (parent class), allowing child classes to invoke parent constructors or overridden methods.

## 👻 Abstraction
Abstraction focuses on revealing only what is necessary while hiding underlying complexity.

* **Abstract Classes:** An **abstract class** is a class that *cannot* be instantiated on its own. It acts purely as a structural foundation for subclasses to inherit from.
* **Abstract Methods:** These are methods defined without a body implementation inside an abstract class. It forces any inheriting child class to legally fulfill the contract and provide the actual code body.
`,

  "Geography": `
# 📚 Detailed Study Notes: Indian Geography

*A synthesized reference guide to India's climate, geology, and regional geography based on your previous questions.*

---

## 🌦️ Climate & Monsoons
India's diverse climate shapes its agriculture and ecosystems. 

* **Trewartha's Classification:** According to Glenn Trewartha’s climate classification system, the majority of India experiences a **Subtropical monsoon climate**, characterized by intense seasonal rainfall and designated wet and dry periods.
* **Monsoon Withdrawal:** The southwest monsoon recedes gradually across the subcontinent. For the **Hyderabad** region, the normal date of withdrawal is generally around **15th October**.

## ⛰️ Topography & Geological History
India's landmass is ancient, possessing a highly varied topological structure formed over millions of years.

* **The Ancient Gondwana Land:** The **South Peninsular Upland** (the vast plateau region covering southern India) is one of the oldest landmasses on Earth. It was originally formed as a crucial part of the ancient supercontinent known as **Gondwana Land**.
* **The Malnad Region:** The term **'Malnad'** translates roughly to "land of hills." This region is heavily forested and is specifically associated with the **Karnataka Plateau**, encompassing the slopes of the Western Ghats.

## 🏭 Energy Infrastructure Geography
* **Thermal Power Projects (East to West):** Understanding the geographical distribution of major infrastructure is important. From East to West, major thermal power plants are arranged as follows: **Namrup** (Assam) ➡️ **Obra** (Eastern UP) ➡️ **Parichha** (Central UP/Jhansi) ➡️ **Kota** (Rajasthan).
`,
  
  "General Science (Biology)": `
# 📚 Detailed Study Notes: General Science (Biology)

*A synthesized overview of biological processes, botanical phenomena, and vertebrate anatomy derived from your question bank.*

---

## 🐍 Animal Anatomy & Physiology
* **Reptilian Digestion:** Unlike mammals, **snakes do not chew up their prey**. Their teeth are structured to point backward to grip prey securely so it can be swallowed whole. 
* **Mammalian Respiration:** In mammals, the primary muscle driving respiration is the diaphragm. During normal respiration (specifically inhalation), the **diaphragm contracts and becomes flattened**, expanding the chest cavity to pull air into the lungs.

## 🛡️ Human Immunology
* **The Body's Defense:** The most important cellular component associated with the body's adaptive immunity are **lymphocytes**. These specialized white blood cells (B cells and T cells) are responsible for identifying, remembering, and destroying invading pathogens.

## 🌱 Botany & Plant Physiology
* **Photoperiodism:** The phenomenon by which plants react physiologically to the length of day or night (affecting flowering and growth) is called **photoperiodism**. This groundbreaking discovery was made in the 1920s by scientists **Garner and Allard** during their experiments on tobacco plants.
`,

  "Digital Logic": `
# 📚 Detailed Study Notes: Digital Logic

*Comprehensive Study Notes*

---

## 1. Number Systems
Computers operate on binary data. Understanding various number systems is key to digital logic.
* **Binary (Base-2):** Consists of 0s and 1s. This is the native language of digital circuits.
* **Octal (Base-8):** Uses digits 0-7. Used as a shorthand for 3-bit binary strings.
* **Hexadecimal (Base-16):** Uses 0-9 and A-F. Widely used in memory addressing because a single hex digit maps perfectly to 4 bits (a nibble).
* **Conversions:** To convert decimal to binary, continuously divide by 2. To convert binary to decimal, sum the powers of 2 for every '1' bit.

## 2. Boolean Algebra
A mathematical system used for analyzing and simplifying digital logic circuits.
* **Basic Laws:**
  * **Commutative:** A + B = B + A  ||  A . B = B . A
  * **Associative:** (A + B) + C = A + (B + C)
  * **Distributive:** A . (B + C) = A.B + A.C
* **De Morgan's Theorems:** Crucial for simplifying expressions involving inverted (NOT) signals.
  1. (A + B)' = A' . B'  *(NOR is equivalent to Bubbled AND)*
  2. (A . B)' = A' + B'  *(NAND is equivalent to Bubbled OR)*

## 3. Logic Gates
The fundamental building blocks of all modern digital circuits.
* **Basic Gates:** AND, OR, NOT.
* **Universal Gates:** NAND and NOR. They are "universal" because any logical circuit can be constructed using *only* NAND gates or *only* NOR gates.
* **Special Gates:** XOR (Exclusive OR) outputs 1 only if inputs are different. XNOR outputs 1 only if inputs are the same. Parity generation heavily relies on XOR gates.

## 4. Combinational Circuits
Circuits where the output strictly depends on the *current* inputs at any given time. It contains no memory elements.
* **Multiplexer (MUX):** A "data selector". Connects multiple inputs to a single output line based on select lines.
* **De-Multiplexer (DEMUX):** Takes a single input and distributes it across multiple outputs.
* **Encoder:** Converts a set of active inputs into a coded (binary) output.
* **Decoder:** Converts binary information to one of $2^n$ unique outputs. Extracts data from memory addresses.
* **Half Adder & Full Adder:** Sums two and three binary bits, respectively. A full adder accounts for the 'carry' bit from previous operations.

## 5. Sequential Circuits
Circuits where the output depends on both the current input AND the *previous state* (memory).
* **Flip-Flops:** The basic memory element, capable of storing 1 bit of data. Examples include SR, D (Data/Delay), JK, and T (Toggle) flip-flops.
* **Registers:** A collection of flip-flops used to store multiple bits of data simultaneously. Shift registers can move data left or right.
* **Counters:** Specialized registers that go through a predetermined sequence of states upon the application of clock pulses (e.g., Ripple counters, Synchronous counters).
`,

  "Computer Organization and Architecture": `
# 📚 Detailed Study Notes: Computer Organization and Architecture

*Comprehensive Study Notes*

---

## 1. Central Processing Unit (CPU)
The brain of the computer that carries out instructions.
* **ALU (Arithmetic Logic Unit):** Performs mathematical calculations and logical operations.
* **CU (Control Unit):** Directs the operation of the processor. It controls communication and coordination between input/output devices and memory.
* **Registers:** Small, incredibly fast storage directly inside the CPU. Examples include Program Counter (PC), Instruction Register (IR), and Accumulator (ACC).

## 2. Memory Hierarchy
Designed to optimize access time while minimizing cost. From fastest/smallest to slowest/largest:
1. **CPU Registers:** Instant access.
2. **Cache Memory (L1, L2, L3):** Extremely fast SRAM positioned between the CPU and Main Memory to speed up data access.
3. **Main Memory (RAM):** Volatile DRAM. Must be constantly refreshed.
4. **Secondary Storage:** HDDs, SSDs. Non-volatile and highly massive in capacity.
* **Hit Ratio:** The percentage of times data is found in the Cache Memory rather than having to fetch it from RAM.

## 3. Instruction Cycle (Fetch-Decode-Execute)
The sequence of steps the CPU goes through to process an executing program.
* **Fetch:** Retrieves the next instruction from memory using the Program Counter.
* **Decode:** The Control Unit deciphers the instruction in the Instruction Register.
* **Execute:** The operation (compute, load, store) is performed by the ALU or other sub-system.

## 4. Pipelining
An architectural technique used to improve CPU throughput by allowing overlapping execution of multiple instructions.
* Like an assembly line, while one instruction is being Executed, the next is being Decoded, and the third is being Fetched.
* **Hazards:** Issues that prevent the pipeline from running flawlessly. Structural (resource conflict), Data (dependency), and Control (branching/jumps) hazards.

## 5. CPU Architecture Types
* **RISC (Reduced Instruction Set Computer):** Emphasizes simple, single-cycle, highly optimized instructions. Relies on software to combine simple instructions (e.g., ARM processors).
* **CISC (Complex Instruction Set Computer):** Contains complex instructions that can span multiple cycles. Emphasizes hardware over software (e.g., Intel x86 processors).
`,

  "Introduction to Python": `
# 📚 Detailed Study Notes: Introduction to Python

*Comprehensive Study Notes*

---

## 1. Python Basics
Python is an interpreted, high-level, dynamically-typed programming language known for its extreme readability.
* **Variables & Types:** Variables do not require explicit type declaration. Common types include \`int\`, \`float\`, \`str\`, and \`bool\`.
* **Dynamic Typing:** A variable can be assigned an integer and then reassigned to a string later without error.
* **Indentation:** Unlike C++ or Java that use \`{ }\` braces, Python strictly uses whitespace indentation to define code blocks.

## 2. Data Structures in Python
Python provides powerful built-in structures capable of holding mixed data types.
* **Lists:** Ordered, mutable (changeable) sequences. Denoted by \`[ ]\`.
* **Tuples:** Ordered, immutable (unchangeable) sequences. Denoted by \`( )\`. Great for fixed coordinates or constants.
* **Dictionaries (Dicts):** Unordered collections of key-value pairs. Keys must be unique and immutable. Denoted by \`{ }\`. Extremely fast data lookup.
* **Sets:** Unordered collections of unique elements. Useful for removing duplicates from lists or performing mathematical union/intersection. Denoted by \`{ }\` but without colons between pairs.

## 3. Control Flow & Loops
* **Conditionals:** \`if\`, \`elif\`, \`else\`. Python does not have a native \`switch\` statement (until Python 3.10's \`match-case\`).
* **Loops:**
  * \`for\` loops in Python act primarily as iterators over sequences (lists, strings, ranges).
  * \`while\` loops execute block code while a condition remains true.
  * \`break\` terminates loops completely, while \`continue\` skips the current iteration.

## 4. Functions & Modules
* **Def Function:** Functions are defined using the \`def\` keyword followed by the name and parameters.
* **Lambda Functions:** Small, anonymous, single-line inline functions created with the \`lambda\` keyword. Example: \`square = lambda x: x ** 2\`.
* **Modules:** Packages of pre-written code that can be imported to extend functionality using the \`import\` keyword (e.g., \`import math\`).
`,

  "Database Query using SQL": `
# 📚 Detailed Study Notes: Database Query using SQL

*Comprehensive Study Notes*

---

## 1. Querying Basics (DQL)
The \`SELECT\` statement forms the foundation of all Data Query Language (DQL) operations.
* **Basic Syntax:** \`SELECT column1, column2 FROM table_name;\`
* **Filtering with WHERE:** Filters rows based on conditions. e.g., \`WHERE age >= 18\`.
* **Operators:** 
  * Logical operators: \`AND\`, \`OR\`, \`NOT\`.
  * Pattern matching: \`LIKE\` (using \`%\` for multi-character wildcards and \`_\` for single-character wildcards).
  * Range checking: \`BETWEEN...AND\`.
  * List checking: \`IN (A, B, C)\`.

## 2. Sorting & Grouping
* **ORDER BY:** Sorts the resulting records in ascending (\`ASC\`) or descending (\`DESC\`) order.
* **GROUP BY:** Groups rows sharing identical values into summary rows (e.g., finding the total number of employees per department). Best used alongside aggregate functions.
* **HAVING:** The \`WHERE\` clause acts on individual rows, whereas the \`HAVING\` clause acts on massive grouped aggregates created by \`GROUP BY\`.

## 3. Aggregate Functions
Built-in mathematical functions used often with \`GROUP BY\`.
* \`COUNT()\`: Returns the number of rows.
* \`SUM()\`: Returns the total mathematical sum of a numeric column.
* \`AVG()\`: Returns the mathematical average.
* \`MIN()\` / \`MAX()\`: Return smallest and largest values respectively.

## 4. Multi-Table Operations (JOINs)
Foreign Keys allow joining separate tables together seamlessly to establish relationships.
* **INNER JOIN:** Returns records having matching values in both connecting tables.
* **LEFT JOIN:** Returns all records from the left table, and the matched records from the right table (unmatched cells fill with NULL).
* **RIGHT JOIN:** Returns all records from the right table, and matched records from the left.
* **FULL OUTER JOIN:** Returns all records when there is a match in either left or right table.

## 5. Data Modification (DML)
* **INSERT INTO:** Adds fresh new rows to a table. \`INSERT INTO table_name (c1, c2) VALUES (v1, v2);\`
* **UPDATE:** Modifies existing data. ALWAYS use a \`WHERE\` clause unless modifying every single row deliberately.
* **DELETE:** Removes existing rows. Likewise, MUST be used with a \`WHERE\` clause.
`,

  "DBMS": `
# 📚 Detailed Study Notes: Database Management Systems (DBMS)

*Comprehensive Study Notes*

---

## 1. Introduction to DBMS
A Database Management System (DBMS) is software used to store, retrieve, and run queries on data. It serves as an interface between an end-user and a database, allowing users to create, read, update, and delete data in the database.

* **Database vs DBMS:** A database is the actual collection of organized data, while the DBMS is the software interacting with the database.
* **ACID Properties:** The foundation of transaction processing in relational databases:
  * **Atomicity:** Transactions are "all or nothing."
  * **Consistency:** Only valid data is saved after a transaction.
  * **Isolation:** Transactions execute independently of one another.
  * **Durability:** Committed transactions remain safely stored even after a system failure.

## 2. Database Architecture and Data Models
* **Three-Schema Architecture:**
  * **Internal Level:** How the data is actually stored physically.
  * **Conceptual (Logical) Level:** Defines what data is stored and the relationships among them.
  * **External (View) Level:** Shows only specific portions of data to specific users.
* **Relational Model:** Data is represented as a collection of tables (relations). 
* **Entity-Relationship (ER) Model:** Uses entities (objects) and relationships to map database schemas visually.

## 3. Relational Database Concepts
* **Tuple:** A single row in a table.
* **Attribute:** A column in a table.
* **Degree & Cardinality:** Degree is the number of attributes (columns); Cardinality is the number of tuples (rows).
* **Keys:**
  * **Primary Key:** Uniquely identifies a record. Cannot be NULL.
  * **Candidate Key:** Any column or set of columns that can qualify as a Primary Key.
  * **Foreign Key:** A field in one table that uniquely identifies a row of another table, ensuring referential integrity.

## 4. Normalization
Normalization is the process of organizing data to reduce redundancy and improve data integrity.
* **1NF (First Normal Form):** Eliminates repeating groups and ensures all attributes are atomic.
* **2NF:** Must be in 1NF. Further removes partial dependencies (non-prime attributes must depend on the *entire* primary key).
* **3NF:** Must be in 2NF. Removes transitive dependencies (non-prime attributes MUST NOT depend on other non-prime attributes).
* **BCNF (Boyce-Codd Normal Form):** A stricter version of 3NF where every determinant must be a candidate key.

## 5. Structured Query Language (SQL)
* **DDL (Data Definition Language):** Defines structure. Commands: \`CREATE\`, \`ALTER\`, \`DROP\`, \`TRUNCATE\`.
* **DML (Data Manipulation Language):** Manipulates data. Commands: \`INSERT\`, \`UPDATE\`, \`DELETE\`.
* **DQL (Data Query Language):** Queries data. Command: \`SELECT\`.
* **DCL (Data Control Language):** Controls access. Commands: \`GRANT\`, \`REVOKE\`.
* **TCL (Transaction Control Language):** Manages transactions. Commands: \`COMMIT\`, \`ROLLBACK\`.
`,

  "Computer Network": `
# 📚 Detailed Study Notes: Computer Networks

*Comprehensive Study Notes*

---

## 1. Introduction & Network Types
A computer network is a system that connects two or more computing devices for transmitting and sharing data.

* **LAN (Local Area Network):** Covers a small physical area, like a home or office. High speed, low error rate.
* **MAN (Metropolitan Area Network):** Connects users across a city.
* **WAN (Wide Area Network):** Covers a broad area (e.g., across states or countries). The Internet is the largest WAN.
* **PAN (Personal Area Network):** A network arranged around an individual person (e.g., Bluetooth).

## 2. Network Topologies
Topology defines the physical or logical layout of a network.
* **Star:** All nodes are connected to a central hub/switch. Easy to troubleshoot, but if the central hub fails, the network goes down.
* **Bus:** All nodes share a single main cable (the backbone). Cheap, but suffers from high collision rates.
* **Ring:** Nodes are connected in a closed-loop. Data travels in one direction.
* **Mesh:** Every node is connected to every other node. Extremely highly reliable but expensive to wire.
* **Tree:** A hybrid of bus and star topologies, common in corporate networks.

## 3. The OSI Reference Model
The Open Systems Interconnection (OSI) model standardizes communication functions into 7 distinct layers:

1. **Physical Layer:** Hardware specifications, cables, hubs. Defines bits to signals.
2. **Data Link Layer:** MAC addressing, switches, framing. Detects and corrects errors. (Has two sublayers: LLC and MAC).
3. **Network Layer:** IP addressing, routers, routing packets. Solves the problem of getting data across different networks.
4. **Transport Layer:** TCP/UDP, ports, segments. Ensures end-to-end reliable data delivery and error recovery.
5. **Session Layer:** Establishes, maintains, and terminates communication sessions.
6. **Presentation Layer:** Data translation, encryption, decryption, and compression (e.g., JPEG, ASCII).
7. **Application Layer:** Interfaces directly with the application (e.g., HTTP, FTP, SMTP).

## 4. Transmission Control Protocol / Internet Protocol (TCP/IP)
The real-world implementation framework of the Internet.
* **TCP (Transmission Control Protocol):** Connection-oriented. Reliable, guarantees delivery, requires a 3-way handshake.
* **UDP (User Datagram Protocol):** Connectionless. Fast but unreliable (e.g., used for video streaming and VoIP).
* **IP Addresses:**
  * **IPv4:** 32-bit address, typically formatted in four decimal blocks (e.g., 192.168.1.1).
  * **IPv6:** 128-bit address created to solve IPv4 exhaustion. Formatted in hexadecimal.

## 5. Network Devices
* **Hub:** A dumb device working at Layer 1; it broadcasts data to all attached devices.
* **Switch:** An intelligent Layer 2 device; it learns MAC addresses and forwards data exclusively to the correct port.
* **Router:** A Layer 3 device that connects different networks and directs packet traffic dynamically.
* **Gateway:** Connects two networks that use entirely different protocols.
`,

  "Data Structure and Algorithm": `
# 📚 Detailed Study Notes: Data Structures and Algorithms

*Comprehensive Study Notes*

---

## 1. Introduction to Data Structures
A Data Structure is a specialized format for organizing, processing, retrieving, and storing data.

* **Linear Data Structures:** Elements are arranged in a sequential order. Examples: Arrays, Linked Lists, Stacks, Queues.
* **Non-Linear Data Structures:** Elements do not form a sequence. Examples: Trees, Graphs.
* **Time Complexity (Big-O Notation):** Describes the upper bound of the execution time algorithm. It denotes the worst-case scenario.

## 2. Arrays & Linked Lists
* **Arrays:** A collection of elements stored at contiguous memory locations. 
  * *Pros:* Fast access ($O(1)$) using an index.
  * *Cons:* Fixed size, slow insertion/deletion ($O(n)$) because elements must be shifted.
* **Linked Lists:** A linear collection of data elements (nodes), where each points to the next via a pointer. 
  * *Singly Linked List:* Contains data and one pointer to the next node.
  * *Doubly Linked List:* Contains data and two pointers (to the previous and next nodes).
  * *Pros:* Dynamic sizing, incredibly fast insertion/deletion ($O(1)$ at known nodes).
  * *Cons:* No random access (must traverse from the beginning, $O(n)$).

## 3. Stacks & Queues
* **Stack:** Follows the LIFO (Last-In-First-Out) principle.
  * *Operations:* Push (insert), Pop (remove), Peek (view top).
  * *Applications:* Undo functions, function call tracking (Call Stack), parenthesis matching.
* **Queue:** Follows the FIFO (First-In-First-Out) principle.
  * *Operations:* Enqueue (insert at rear), Dequeue (remove from front).
  * *Applications:* Printer task scheduling, CPU process scheduling.

## 4. Trees
Trees are hierarchical structures consisting of nodes, with a single Root node.
* **Binary Tree:** A tree where each node has at most two children (left and right).
* **Binary Search Tree (BST):** A structured binary tree where the left child is smaller than the parent, and the right child is greater than the parent. Offers extremely fast search capabilities ($O(log n)$ average case).
* **Tree Traversals:**
  * *In-order:* Left, Root, Right.
  * *Pre-order:* Root, Left, Right.
  * *Post-order:* Left, Right, Root.

## 5. Sorting Algorithms
Algorithms designed to put elements of a list into a specific order (numerical or lexicographical).
* **Bubble Sort:** Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Very inefficient ($O(n^2)$).
* **Merge Sort:** A Divide and Conquer algorithm. Divides the array into halves, recursively sorts them, and merges them. Time Complexity: $O(n \log n)$.
* **Quick Sort:** Picks an element as a 'pivot' and partitions the given array around the pivot. Average Time Complexity: $O(n \log n)$, but worst case is $O(n^2)$.

## 6. Graph Algorithms
A Graph consists of vertices (nodes) connected by edges.
* **BFS (Breadth-First Search):** Traverses the graph level-by-level using a Queue. Useful for finding the shortest path on unweighted graphs.
* **DFS (Depth-First Search):** Explores as far as possible along each branch before backtracking, utilizing a Stack. Useful for topological sorting and detecting cycles.
`,

  "Operating System": `
# 📚 Detailed Study Notes: Operating Systems

*Comprehensive Study Notes*

---

## 1. Introduction to Operating Systems
An Operating System (OS) is a program that acts as an intermediary between a user of a computer and the computer hardware. Its primary goals are to manage computer hardware and software resources and provide a convenient environment for executing programs.

* **Core Component:** The **Kernel** is the central part of the OS, managing CPU, memory, and peripheral devices.
* **Booting Process:** 
  * **POST (Power-On Self Test):** The first routine executed to check hardware health.
  * **Bootstrap Loader:** Located in ROM, it loads the OS kernel into main memory.
* **Batch Files (.BAT):** Script files used in Windows to automate command sequences.

## 2. Process Management
A Process is defined as a program in execution.

**A. Process States & Control**
Processes generally transition through 5 primary states:
* **New:** The process is being created.
* **Ready:** The process is in main memory, waiting for the processor.
* **Running:** Instructions are being executed by the CPU.
* **Waiting (Blocked):** The process is waiting for an event (like I/O completion).
* **Terminated:** The process has finished execution.
* **PCB (Process Control Block):** A data structure that stores all information (State, Program Counter, CPU registers) required to manage a process.
* **Context Switching:** The process of saving the state of the current process and restoring the state of a different process. This occurs when the CPU switches tasks but results in "idle" time as it is pure overhead.

**B. Schedulers**
* **Long-Term Scheduler (Job Scheduler):** Selects processes from the job pool and loads them into memory. It controls the degree of multiprogramming.
* **Short-Term Scheduler (CPU Scheduler):** Selects which process from the Ready Queue should execute next.
* **Mid-Term Scheduler:** Responsible for "swapping" processes out of memory to reduce the degree of multiprogramming.
* **Dispatcher:** The module that actually gives control of the CPU to the process selected by the short-term scheduler.

## 3. CPU Scheduling Algorithms
Scheduling is measured by Throughput (number of processes completed per unit time) and Turnaround Time (submission time to completion time).

| Algorithm | Type | Description |
|-----------|------|-------------|
| **FCFS** | Non-preemptive | First-Come, First-Served. No context switching occurs during execution. |
| **SJF** | Non-preemptive | Shortest Job First. Provably optimal for minimum average waiting time. Ties are broken by FCFS. |
| **Round Robin** | Preemptive | Uses a Time Quantum. Ideal for time-sharing systems. |
| **Priority** | Both | High priority runs first. Suffers from Starvation (low priority jobs never run). |

* **Aging:** A technique used to solve starvation by gradually increasing the priority of processes that wait in the system for a long time.

## 4. Process Synchronization & Deadlocks

**A. Synchronization**
* **Critical Section:** A code segment where shared resources are accessed. Only one process should be in its critical section at a time (Mutual Exclusion).
* **Mutex/Binary Semaphore:** Tools used to manage mutual exclusion.
* **Spin Lock:** A lock where the process "spins" in a loop waiting for the lock. It wastes CPU cycles (busy waiting).
* **IPC (Inter-Process Communication):** Mechanisms like Pipes, Shared Memory, and Message Queues that allow processes to communicate.

**B. Deadlocks**
A state where a set of processes are permanently blocked because each holds a resource the other needs.

* **Necessary Conditions (Coffman Conditions):** Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait (Can be prevented by linear ordering of resources).
* **Banker’s Algorithm:** Used for Deadlock Avoidance. It tests for "Safety" before allocating resources.
* **Deadlock Prevention Formula:** For $n$ resources and $k$ processes with max demand $d$, deadlock is avoided if $n > \sum(d) - k + 1$.

## 5. Memory Management

**A. Paging vs. Segmentation**
* **Paging:** Physical memory is broken into fixed-size blocks called Frames; logical memory into Pages. Eliminated External Fragmentation. Internal Fragmentation still exists. Address Translation done via Page Number and Page Offset. Offset size is based on page size ($PageSize = 2^{OffsetBits}$).
* **Segmentation:** Uses variable-sized blocks. It suffers from External Fragmentation.

**B. Memory Techniques**
* **Dynamic Loading:** A routine is not loaded until it is called.
* **Swapping:** Moving a process from main memory to secondary memory (Swap file) to free up RAM.
* **Overlays:** An older technique where the programmer manually manages memory by swapping program parts. It saves space but increases execution time.

## 6. Virtual Memory
Virtual memory simulates additional RAM using the Hard Disk.
* **Demand Paging:** A "lazy swapper" technique where pages are only loaded into memory when required.
* **Page Fault:** Occurs when a program tries to access a page that is mapped in virtual space but is not currently in physical RAM.
* **Thrashing:** A state of excessive paging activity where the system spends more time swapping than executing, causing performance to collapse.
* **Dirty Bit:** A flag used to identify if a page in memory has been modified. Only "dirty" pages need to be written back to disk when replaced.

## 7. I/O and Interrupts
* **Interrupts:** 
  * **Maskable:** Can be temporarily ignored or delayed by the CPU.
  * **Non-maskable (NMI):** Used for emergencies (power failure, smoke detection).
* **Software Interrupts:** Triggered by system calls, exceptions, or breakpoints.
* **DMA (Direct Memory Access):** Allows I/O modules to transfer data directly to/from main memory without constant CPU intervention.
* **Interrupt Latency:** The time from the receipt of an interrupt to the start of its service routine.

## 8. File Systems
* **Mount Point:** A directory in a file system where a new file system is attached (e.g., mounting a Pen drive in Linux).
* **FAT (File Allocation Table):** Common versions include FAT12, FAT16, and FAT32. (There is no FAT10).
* **NTFS:** The modern standard for Windows.
* **EXT:** The standard for Linux/Android.
`,

  "Operating Systems": `
# 📚 Detailed Study Notes: Operating Systems

*Comprehensive Study Notes*

---

## 1. Introduction to Operating Systems
An Operating System (OS) is a program that acts as an intermediary between a user of a computer and the computer hardware. Its primary goals are to manage computer hardware and software resources and provide a convenient environment for executing programs.

* **Core Component:** The **Kernel** is the central part of the OS, managing CPU, memory, and peripheral devices.
* **Booting Process:** 
  * **POST (Power-On Self Test):** The first routine executed to check hardware health.
  * **Bootstrap Loader:** Located in ROM, it loads the OS kernel into main memory.
* **Batch Files (.BAT):** Script files used in Windows to automate command sequences.

## 2. Process Management
A Process is defined as a program in execution.

**A. Process States & Control**
Processes generally transition through 5 primary states:
* **New:** The process is being created.
* **Ready:** The process is in main memory, waiting for the processor.
* **Running:** Instructions are being executed by the CPU.
* **Waiting (Blocked):** The process is waiting for an event (like I/O completion).
* **Terminated:** The process has finished execution.
* **PCB (Process Control Block):** A data structure that stores all information (State, Program Counter, CPU registers) required to manage a process.
* **Context Switching:** The process of saving the state of the current process and restoring the state of a different process. This occurs when the CPU switches tasks but results in "idle" time as it is pure overhead.

**B. Schedulers**
* **Long-Term Scheduler (Job Scheduler):** Selects processes from the job pool and loads them into memory. It controls the degree of multiprogramming.
* **Short-Term Scheduler (CPU Scheduler):** Selects which process from the Ready Queue should execute next.
* **Mid-Term Scheduler:** Responsible for "swapping" processes out of memory to reduce the degree of multiprogramming.
* **Dispatcher:** The module that actually gives control of the CPU to the process selected by the short-term scheduler.

## 3. CPU Scheduling Algorithms
Scheduling is measured by Throughput (number of processes completed per unit time) and Turnaround Time (submission time to completion time).

| Algorithm | Type | Description |
|-----------|------|-------------|
| **FCFS** | Non-preemptive | First-Come, First-Served. No context switching occurs during execution. |
| **SJF** | Non-preemptive | Shortest Job First. Provably optimal for minimum average waiting time. Ties are broken by FCFS. |
| **Round Robin** | Preemptive | Uses a Time Quantum. Ideal for time-sharing systems. |
| **Priority** | Both | High priority runs first. Suffers from Starvation (low priority jobs never run). |

* **Aging:** A technique used to solve starvation by gradually increasing the priority of processes that wait in the system for a long time.

## 4. Process Synchronization & Deadlocks

**A. Synchronization**
* **Critical Section:** A code segment where shared resources are accessed. Only one process should be in its critical section at a time (Mutual Exclusion).
* **Mutex/Binary Semaphore:** Tools used to manage mutual exclusion.
* **Spin Lock:** A lock where the process "spins" in a loop waiting for the lock. It wastes CPU cycles (busy waiting).
* **IPC (Inter-Process Communication):** Mechanisms like Pipes, Shared Memory, and Message Queues that allow processes to communicate.

**B. Deadlocks**
A state where a set of processes are permanently blocked because each holds a resource the other needs.

* **Necessary Conditions (Coffman Conditions):** Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait (Can be prevented by linear ordering of resources).
* **Banker’s Algorithm:** Used for Deadlock Avoidance. It tests for "Safety" before allocating resources.
* **Deadlock Prevention Formula:** For $n$ resources and $k$ processes with max demand $d$, deadlock is avoided if $n > \sum(d) - k + 1$.

## 5. Memory Management

**A. Paging vs. Segmentation**
* **Paging:** Physical memory is broken into fixed-size blocks called Frames; logical memory into Pages. Eliminated External Fragmentation. Internal Fragmentation still exists. Address Translation done via Page Number and Page Offset. Offset size is based on page size ($PageSize = 2^{OffsetBits}$).
* **Segmentation:** Uses variable-sized blocks. It suffers from External Fragmentation.

**B. Memory Techniques**
* **Dynamic Loading:** A routine is not loaded until it is called.
* **Swapping:** Moving a process from main memory to secondary memory (Swap file) to free up RAM.
* **Overlays:** An older technique where the programmer manually manages memory by swapping program parts. It saves space but increases execution time.

## 6. Virtual Memory
Virtual memory simulates additional RAM using the Hard Disk.
* **Demand Paging:** A "lazy swapper" technique where pages are only loaded into memory when required.
* **Page Fault:** Occurs when a program tries to access a page that is mapped in virtual space but is not currently in physical RAM.
* **Thrashing:** A state of excessive paging activity where the system spends more time swapping than executing, causing performance to collapse.
* **Dirty Bit:** A flag used to identify if a page in memory has been modified. Only "dirty" pages need to be written back to disk when replaced.

## 7. I/O and Interrupts
* **Interrupts:** 
  * **Maskable:** Can be temporarily ignored or delayed by the CPU.
  * **Non-maskable (NMI):** Used for emergencies (power failure, smoke detection).
* **Software Interrupts:** Triggered by system calls, exceptions, or breakpoints.
* **DMA (Direct Memory Access):** Allows I/O modules to transfer data directly to/from main memory without constant CPU intervention.
* **Interrupt Latency:** The time from the receipt of an interrupt to the start of its service routine.

## 8. File Systems
* **Mount Point:** A directory in a file system where a new file system is attached (e.g., mounting a Pen drive in Linux).
* **FAT (File Allocation Table):** Common versions include FAT12, FAT16, and FAT32. (There is no FAT10).
* **NTFS:** The modern standard for Windows.
* **EXT:** The standard for Linux/Android.
`,

  "Modern Indian History": `
# 📚 Detailed Study Notes: Modern Indian History

*This guide provides a comprehensive overview of key events, figures, and movements in India's struggle for independence, synthesized directly from your question bank.*

---

## 🏛️ Foundations & Renaissance
The awakening of modern India began with social and religious reform movements that aimed to eradicate regressive practices and promote education. 

* **The Father of the Indian Renaissance:** **Raja Rammohan Roy** is widely celebrated as the pioneer of the Indian Renaissance. His tireless efforts laid the groundwork for modern education and the abolition of orthodox social practices (like Sati). 

## ✊ The Rise of Nationalism
As the independence movement gained momentum, early leaders began asserting India's right to self-governance.

* **The Call for Swaraj:** The powerful and enduring slogan, *"Swaraj is my birthright and I shall have it,"* was coined by the fierce nationalist leader **Bal Gangadhar Tilak**. This marked a shift towards demanding complete self-rule rather than just concessions from the British.

## 🕊️ The Gandhian Era
Mahatma Gandhi's entry transformed the nationalist movement into a mass struggle using non-violent civil disobedience (Satyagraha).

* **The Champaran Movement (1917):** This was Gandhi's first major active involvement in Indian politics. It was organized specifically to **solve the problems of indigo workers** in Bihar, who were forced by British planters to grow indigo under oppressive conditions without fair compensation.
* **The Gandhi-Irwin Pact (1931):** A critical political agreement signed between Mahatma Gandhi and the then Viceroy of India, Lord Irwin. This pact marked a moment of negotiation and temporary halting of the civil disobedience movement.
* **The Quit India Movement (1942):** During the climax of the struggle, Gandhi launched this movement with the definitive call to action: **"Do or Die" (Karo ya Maro)**, demanding the immediate end of British rule.

## 📜 Constitutional Milestones & Independence
Parallel to the mass movements, constitutional changes were being implemented that eventually led to a free India.

* **Provincial Governments:** The **Government of India Act of 1935** was a landmark piece of legislation. It provided for provincial autonomy, leading to the constitution of the first real Provincial Governments.
* **The Dawn of Independence (1947):** At the historic moment when India finally gained its independence, the Prime Minister of England was **Clement Attlee** (from the Labour Party). 
* **First Indian Governor-General:** Following independence, and after Lord Mountbatten's departure, **C. Rajagopalachari** took office. He holds the distinction of being the first (and the last) Indian Governor-General of independent India.

---
*💡 Let me know when you add more history questions, and I will update this guide!*
  `
};

