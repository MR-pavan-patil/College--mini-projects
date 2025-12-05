// ===================== AdvancedQuiz Full Logic ===================== //

document.addEventListener('DOMContentLoaded', function() {
    // ------------------ Questions Array ------------------ //
    const questions = [{
            question: "1. What is the primary goal of Artificial Intelligence (AI)?",
            options: ["To replace human intelligence", "To mimic human intelligence", "To confuse humans", "To automate all jobs"],
            answer: "To mimic human intelligence"
        },
        {
            question: "2. Which of the following is a task that AI aims to perform?",
            options: ["Cooking", "Cleaning", "Reasoning", "Driving"],
            answer: "Reasoning"
        },
        {
            question: "3. AI is a subfield of:",
            options: ["Mechanical engineering", "Electrical engineering", "Computer science", "Civil engineering"],
            answer: "Computer science"
        },
        {
            question: "4. Which of the following is NOT a goal of AI?",
            options: ["To mimic human intelligence", "To automate tasks", "To enhance decision-making", "To replace all human emotions"],
            answer: "To replace all human emotions"
        },
        {
            question: "5. Which of the following is a key component of AI?",
            options: ["Robotics", "Natural Language Processing (NLP)", "Computer Vision", "All of the above"],
            answer: "All of the above"
        },
        {
            question: "6. In which industry is AI used for diagnosing diseases?",
            options: ["Finance", "Healthcare", "Transportation", "Entertainment"],
            answer: "Healthcare"
        },
        {
            question: "7. Self-driving cars are an application of AI in:",
            options: ["Education", "Transportation", "Finance", "Healthcare"],
            answer: "Transportation"
        },
        {
            question: "8. AI is used to provide personalized learning experiences in:",
            options: ["Transportation", "Education", "Entertainment", "Finance"],
            answer: "Education"
        },
        {
            question: "9. Which of the following is an application of Natural Language Processing?",
            options: ["Fraud detection", "Language translation", "Object detection", "Algorithmic trading"],
            answer: "Language translation"
        },
        {
            question: "10. AI algorithms are used for ________ in finance.",
            options: ["drug discovery", "algorithmic trading", "navigation", "creating video game characters"],
            answer: "algorithmic trading"
        },
        {
            question: "11. Which of the following is an ethical concern related to AI?",
            options: ["Job creation", "Privacy", "Increased human interaction", "Lack of data"],
            answer: "Privacy"
        },
        {
            question: "12. What is a potential consequence of automation due to AI?",
            options: ["Increased job opportunities", "Job displacement", "Reduced need for ethical considerations", "Decreased productivity"],
            answer: "Job displacement"
        },
        {
            question: "13. Bias in AI algorithms is an example of:",
            options: ["positive impact of AI", "ethical concern", "technological advancement", "efficient decision-making"],
            answer: "ethical concern"
        },
        {
            question: "14. Which of the following is important for the responsible use of AI technologies?",
            options: ["Ignoring privacy concerns", "Minimizing ethical discussions", "Addressing bias in algorithms", "Avoiding automation"],
            answer: "Addressing bias in algorithms"
        },
        {
            question: "15. What is the main focus of Artificial Intelligence?",
            options: ["Creating physical robots", "Creating computer systems that perform tasks requiring human intelligence", "Studying animal behavior", "Designing video games"],
            answer: "Creating computer systems that perform tasks requiring human intelligence"
        },
        {
            question: "16. Which of the following is a task that AI systems can perform?",
            options: ["Cooking meals", "Making decisions", "Growing crops", "Building houses"],
            answer: "Making decisions"
        },
        {
            question: "17. AI systems can ________ to new situations.",
            options: ["ignore", "adapt", "create", "destroy"],
            answer: "adapt"
        },
        {
            question: "18. Which of the following technologies uses AI?",
            options: ["Toasters", "Voice assistants", "Refrigerators", "Televisions"],
            answer: "Voice assistants"
        },
        {
            question: "19. AI aims to make computers capable of:",
            options: ["only calculations", "tasks that typically require human intelligence", "physical labor", "artistic creation only"],
            answer: "tasks that typically require human intelligence"

        },
        // {
        //     question: "3. AI is a subfield of:",
        //     options: ["Mechanical engineering", "Electrical engineering", "Computer science", "Civil engineering"],
        //     answer: "Computer science"
        // },
        //         {
        //             question: "4. Which of the following is NOT a goal of AI?",
        //             options: ["To mimic human intelligence", "To automate tasks", "To enhance decision-making", "To replace all human emotions"],
        //             answer: "To replace all human emotions"
        //         },
        //         {
        //             question: "5. Which of the following is a key component of AI?",
        //             options: ["Robotics", "Natural Language Processing (NLP)", "Computer Vision", "All of the above"],
        //             answer: "All of the above"
        //         },
        //         {
        //             question: "6. In which industry is AI used for diagnosing diseases?",
        //             options: ["Finance", "Healthcare", "Transportation", "Entertainment"],
        //             answer: "Healthcare"
        //         },
        //         {
        //             question: "7. Self-driving cars are an application of AI in:",
        //             options: ["Education", "Transportation", "Finance", "Healthcare"],
        //             answer: "Transportation"
        //         },
        //         {
        //             question: "8. AI is used to provide personalized learning experiences in:",
        //             options: ["Transportation", "Education", "Entertainment", "Finance"],
        //             answer: "Education"
        //         },
        //         {
        //             question: "9. Which of the following is an application of Natural Language Processing?",
        //             options: ["Fraud detection", "Language translation", "Object detection", "Algorithmic trading"],
        //             answer: "Language translation"
        //         },
        //         {
        //             question: "10. AI algorithms are used for ________ in finance.",
        //             options: ["drug discovery", "algorithmic trading", "navigation", "creating video game characters"],
        //             answer: "algorithmic trading"
        //         },
        //         {
        //             question: "11. Which of the following is an ethical concern related to AI?",
        //             options: ["Job creation", "Privacy", "Increased human interaction", "Lack of data"],
        //             answer: "Privacy"
        //         },
        //         {
        //             question: "12. What is a potential consequence of automation due to AI?",
        //             options: ["Increased job opportunities", "Job displacement", "Reduced need for ethical considerations", "Decreased productivity"],
        //             answer: "Job displacement"
        //         },
        //         {
        //             question: "13. Bias in AI algorithms is an example of:",
        //             options: ["positive impact of AI", "ethical concern", "technological advancement", "efficient decision-making"],
        //             answer: "ethical concern"
        //         },
        //         {
        //             question: "14. Which of the following is important for the responsible use of AI technologies?",
        //             options: ["Ignoring privacy concerns", "Minimizing ethical discussions", "Addressing bias in algorithms", "Avoiding automation"],
        //             answer: "Addressing bias in algorithms"
        //         },
        //         {
        //             question: "15. What is the main focus of Artificial Intelligence?",
        //             options: ["Creating physical robots", "Creating computer systems that perform tasks requiring human intelligence", "Studying animal behavior", "Designing video games"],
        //             answer: "Creating computer systems that perform tasks requiring human intelligence"
        //         },
        //         {
        //             question: "16. Which of the following is a task that AI systems can perform?",
        //             options: ["Cooking meals", "Making decisions", "Growing crops", "Building houses"],
        //             answer: "Making decisions"
        //         },
        //         {
        //             question: "17. AI systems can ________ to new situations.",
        //             options: ["ignore", "adapt", "create", "destroy"],
        //             answer: "adapt"
        //         },
        //         {
        //             question: "18. Which of the following technologies uses AI?",
        //             options: ["Toasters", "Voice assistants", "Refrigerators", "Televisions"],
        //             answer: "Voice assistants"
        //         },
        //         {
        //             question: "19. AI aims to make computers capable of:",
        //             options: ["only calculations", "tasks that typically require human intelligence", "physical labor", "artistic creation only"],
        //             answer: "tasks that typically require human intelligence"
        //         },
        //         {
        //             question: "20. The philosophy of AI explores questions about:",
        //             options: ["the stock market", "human-machine relationship", "weather patterns", "sports"],
        //             answer: "human-machine relationship"
        //         }

        //  ,
        //         {
        //             question: "4. The SI unit of electric current is:",
        //             options: ["Volt", "Ampere", "Ohm", "Watt"],
        //             answer: "Ampere"
        //         },
        //         {
        //             question: "5. The main constituent of biogas is:",
        //             options: ["Methane", "Ethane", "Propane", "Butane"],
        //             answer: "Methane"
        //         },
        //         {
        //             question: "6. What is the chemical symbol for Sodium?",
        //             options: ["Na", "So", "S", "Sn"],
        //             answer: "Na"
        //         },
        //         {
        //             question: "7. Which organ in the human body is primarily responsible for detoxification?",
        //             options: ["Heart", "Liver", "Kidney", "Lungs"],
        //             answer: "Liver"
        //         },
        //         {
        //             question: "8. The largest planet in our solar system is:",
        //             options: ["Earth", "Jupiter", "Saturn", "Mars"],
        //             answer: "Jupiter"
        //         },
        //         {
        //             question: "9. Water boils at what temperature at sea level?",
        //             options: ["90°C", "100°C", "110°C", "120°C"],
        //             answer: "100°C"
        //         },
        //         {
        //             question: "10. Which vitamin is produced in the skin in response to sunlight?",
        //             options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
        //             answer: "Vitamin D"
        //         },
        //         {
        //             question: "11. The gas essential for photosynthesis is:",
        //             options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        //             answer: "Carbon dioxide"
        //         },
        //         {
        //             question: "12. Who is known as the father of computers?",
        //             options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"],
        //             answer: "Charles Babbage"
        //         },
        //         {
        //             question: "13. The hardest natural substance on Earth is:",
        //             options: ["Gold", "Iron", "Diamond", "Platinum"],
        //             answer: "Diamond"
        //         },
        //         {
        //             question: "14. What is the main gas found in the air we breathe?",
        //             options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        //             answer: "Nitrogen"
        //         },
        //         {
        //             question: "15. The process of converting solid directly to gas is called:",
        //             options: ["Condensation", "Sublimation", "Evaporation", "Deposition"],
        //             answer: "Sublimation"
        //         },
        //         {
        //             question: "16. In agriculture, urea is used as a ________.",
        //             options: ["Pesticide", "Fertilizer", "Weedicide", "Fungicide"],
        //             answer: "Fertilizer"
        //         },
        //         {
        //             question: "17. Which technology enabled communication over long distances without wires?",
        //             options: ["Wired telegraph", "Wireless telegraphy", "Fiber optics", "Satellite phones"],
        //             answer: "Wireless telegraphy"
        //         },
        //         {
        //             question: "18. Which of the following would not conduct electricity?",
        //             options: ["Copper wire", "Plastic rod", "Aluminum foil", "Steel rod"],
        //             answer: "Plastic rod"
        //         },
        //         {
        //             question: "19. What is the main function of white blood cells?",
        //             options: ["Transport oxygen", "Fight infection", "Clot blood", "Carry nutrients"],
        //             answer: "Fight infection"
        //         },
        //         {
        //             question: "20. The ozone layer protects us from which type of radiation?",
        //             options: ["Infrared", "Ultraviolet", "Gamma", "X-rays"],
        //             answer: "Ultraviolet"
        //         },
        //         {
        //             question: "21. Which is the smallest unit of life?",
        //             options: ["Atom", "Molecule", "Cell", "Tissue"],
        //             answer: "Cell"
        //         },
        //         {
        //             question: "22. The process of plants making their own food is called:",
        //             options: ["Respiration", "Photosynthesis", "Transpiration", "Fermentation"],
        //             answer: "Photosynthesis"
        //         },
        //         {
        //             question: "23. Which is not a computer peripheral?",
        //             options: ["Monitor", "Keyboard", "Motherboard", "Mouse"],
        //             answer: "Motherboard"
        //         },
        //         {
        //             question: "24. The process of removing salt from seawater is called:",
        //             options: ["Desalination", "Filtration", "Distillation", "Chlorination"],
        //             answer: "Desalination"
        //         },
        //         {
        //             question: "25. Which nutrient is most abundant in egg white?",
        //             options: ["Protein", "Carbohydrate", "Fat", "Vitamin"],
        //             answer: "Protein"
        //         },
        //         {
        //             question: "26. The boiling point of water decreases as:",
        //             options: ["Pressure increases", "Altitude increases", "Temperature increases", "Humidity increases"],
        //             answer: "Altitude increases"
        //         },
        //         {
        //             question: "27. Which device is used to measure atmospheric pressure?",
        //             options: ["Thermometer", "Barometer", "Hygrometer", "Anemometer"],
        //             answer: "Barometer"
        //         },
        //         {
        //             question: "28. Which is a renewable source of energy?",
        //             options: ["Coal", "Petroleum", "Solar", "Natural gas"],
        //             answer: "Solar"
        //         },
        //         {
        //             question: "29. Which vitamin helps in blood clotting?",
        //             options: ["Vitamin A", "Vitamin C", "Vitamin K", "Vitamin D"],
        //             answer: "Vitamin K"
        //         },
        //         {
        //             question: "30. The largest bone in the human body is:",
        //             options: ["Femur", "Tibia", "Fibula", "Humerus"],
        //             answer: "Femur"
        //         },
        //         {
        //             question: "1. What is the primary goal of Artificial Intelligence (AI)?",
        //             options: ["To replace human intelligence", "To mimic human intelligence", "To confuse humans", "To automate all jobs"],
        //             answer: "To mimic human intelligence"
        //         },
        //         {
        //             question: "2. Which of the following is a task that AI aims to perform?",
        //             options: ["Cooking", "Cleaning", "Reasoning", "Driving"],
        //             answer: "Reasoning"
        //         },
        //         {
        //             question: "3. AI is a subfield of:",
        //             options: ["Mechanical engineering", "Electrical engineering", "Computer science", "Civil engineering"],
        //             answer: "Computer science"
        //         },
        //         {
        //             question: "4. Which of the following is NOT a goal of AI?",
        //             options: ["To mimic human intelligence", "To automate tasks", "To enhance decision-making", "To replace all human emotions"],
        //             answer: "To replace all human emotions"
        //         },
        //         {
        //             question: "5. Which of the following is a key component of AI?",
        //             options: ["Robotics", "Natural Language Processing (NLP)", "Computer Vision", "All of the above"],
        //             answer: "All of the above"
        //         },
        //         {
        //             question: "6. In which industry is AI used for diagnosing diseases?",
        //             options: ["Finance", "Healthcare", "Transportation", "Entertainment"],
        //             answer: "Healthcare"
        //         },
        //         {
        //             question: "7. Self-driving cars are an application of AI in:",
        //             options: ["Education", "Transportation", "Finance", "Healthcare"],
        //             answer: "Transportation"
        //         },
        //         {
        //             question: "8. AI is used to provide personalized learning experiences in:",
        //             options: ["Transportation", "Education", "Entertainment", "Finance"],
        //             answer: "Education"
        //         },
        //         {
        //             question: "9. Which of the following is an application of Natural Language Processing?",
        //             options: ["Fraud detection", "Language translation", "Object detection", "Algorithmic trading"],
        //             answer: "Language translation"
        //         },
        //         {
        //             question: "10. AI algorithms are used for ________ in finance.",
        //             options: ["drug discovery", "algorithmic trading", "navigation", "creating video game characters"],
        //             answer: "algorithmic trading"
        //         },
        //         {
        //             question: "11. Which of the following is an ethical concern related to AI?",
        //             options: ["Job creation", "Privacy", "Increased human interaction", "Lack of data"],
        //             answer: "Privacy"
        //         },
        //         {
        //             question: "12. What is a potential consequence of automation due to AI?",
        //             options: ["Increased job opportunities", "Job displacement", "Reduced need for ethical considerations", "Decreased productivity"],
        //             answer: "Job displacement"
        //         },
        //         {
        //             question: "13. Bias in AI algorithms is an example of:",
        //             options: ["positive impact of AI", "ethical concern", "technological advancement", "efficient decision-making"],
        //             answer: "ethical concern"
        //         },
        //         {
        //             question: "14. Which of the following is important for the responsible use of AI technologies?",
        //             options: ["Ignoring privacy concerns", "Minimizing ethical discussions", "Addressing bias in algorithms", "Avoiding automation"],
        //             answer: "Addressing bias in algorithms"
        //         },
        // {
        //     question: "15. What is the main focus of Artificial Intelligence?",
        //     options: ["Creating physical robots", "Creating computer systems that perform tasks requiring human intelligence", "Studying animal behavior", "Designing video games"],
        //     answer: "Creating computer systems that perform tasks requiring human intelligence"
        // },
        // {
        //     question: "16. Which of the following is a task that AI systems can perform?",
        //     options: ["Cooking meals", "Making decisions", "Growing crops", "Building houses"],
        //     answer: "Making decisions"
        // },
        // {
        //     question: "17. AI systems can ________ to new situations.",
        //     options: ["ignore", "adapt", "create", "destroy"],
        //     answer: "adapt"
        // },
        // {
        //     question: "18. Which of the following technologies uses AI?",
        //     options: ["Toasters", "Voice assistants", "Refrigerators", "Televisions"],
        //     answer: "Voice assistants"
        // },
        // {
        //     question: "19. AI aims to make computers capable of:",
        //     options: ["only calculations", "tasks that typically require human intelligence", "physical labor", "artistic creation only"],
        //     answer: "tasks that typically require human intelligence"
        // },
        // {
        //     question: "20. The philosophy of AI explores questions about:",
        //     options: ["the stock market", "human-machine relationship", "weather patterns", "sports"],
        //     answer: "human-machine relationship"
        // }
    ];

    // ------------------ DOM Elements ------------------ //
    const welcomeScreen = document.getElementById('welcome-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const leaderboardModal = document.getElementById('leaderboard-modal');
    const leaderboardContent = document.getElementById('leaderboard-content');
    const leaderboardTable = document.getElementById('leaderboard-table').querySelector('tbody');
    const timerDisplay = document.getElementById('timer-value');
    const questionArea = document.getElementById('question-area');
    const optionsDiv = document.getElementById('options');
    const nextBtn = document.getElementById('next-btn');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const viewLeaderboardBtn = document.getElementById('view-leaderboard-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    const closeLeaderboardBtn = document.getElementById('close-leaderboard-btn');
    const userResult = document.getElementById('user-result');
    const resultUsername = document.getElementById('result-username');
    const userScoreEl = document.getElementById('user-score');
    const usernameInput = document.getElementById('username');
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // ------------------ State Variables ------------------ //
    let currentQuestion = 0;
    let score = 0;
    let userName = '';
    let selectedOption = null;
    let timer = null;
    let timeLeft = 20;
    let bonusGiven = false;

    // ------------------ Dark Mode Persistence ------------------ //
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
    }

    function updateDarkModeIcon() {
        if (body.classList.contains('dark')) {
            darkModeBtn.textContent = '☀️';
            darkModeBtn.title = 'Switch to light mode';
        } else {
            darkModeBtn.textContent = '🌙';
            darkModeBtn.title = 'Switch to dark mode';
        }
    }
    darkModeBtn.addEventListener('click', function() {
        body.classList.toggle('dark');
        localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
        updateDarkModeIcon();
    });
    updateDarkModeIcon();

    // ------------------ Screen Transitions ------------------ //
    function showScreen(screen) {
        [welcomeScreen, quizScreen, resultScreen].forEach(div => div.style.display = 'none');
        screen.style.display = 'flex';
        screen.classList.add('fade-in');
        setTimeout(() => screen.classList.remove('fade-in'), 500);
    }

    // ------------------ Quiz Logic ------------------ //
    function startQuiz() {
        userName = usernameInput.value.trim() || 'Guest';
        localStorage.setItem('quizUserName', userName);
        currentQuestion = 0;
        score = 0;
        showScreen(quizScreen);
        loadQuestion(currentQuestion);
    }

    function loadQuestion(index) {
        if (timer) clearInterval(timer);
        timeLeft = 20;
        bonusGiven = false;
        timerDisplay.textContent = timeLeft;
        questionArea.textContent = questions[index].question;
        const opts = questions[index].options;
        optionsDiv.querySelectorAll('.option-btn').forEach((btn, i) => {
            btn.textContent = opts[i];
            btn.className = 'option-btn';
            btn.disabled = false;
        });
        nextBtn.disabled = true;
        selectedOption = null;
        startTimer();
    }

    function selectOption(e) {
        if (selectedOption !== null) return; // Prevent re-selection
        const btn = e.target;
        selectedOption = btn;
        const correct = btn.textContent === questions[currentQuestion].answer;
        btn.classList.add(correct ? 'correct' : 'incorrect');
        btn.innerHTML += correct ? ' ✔️' : ' ❌';
        if (correct) {
            score += 1;
            if (timeLeft > 10 && !bonusGiven) {
                score += 0.5; // Bonus
                bonusGiven = true;
            }
        }
        // Disable all buttons
        optionsDiv.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
        nextBtn.disabled = false;
    }

    function nextQuestion() {
        if (timer) clearInterval(timer);
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion(currentQuestion);
        } else {
            showResult();
        }
    }

    function showResult() {
        showScreen(resultScreen);
        resultUsername.textContent = userName;
        userScoreEl.textContent = score;
        // Save to leaderboard (local)
        let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
        leaderboard.push({ name: userName, score });
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

        // Send to SheetDB API
        fetch("https://sheetdb.io/api/v1/bq8qpoqukh9ts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    data: {
                        name: userName,
                        score: `${score}/${questions.length}`
                    }
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("✅ Sent to SheetDB:", data);
            })
            .catch(error => {
                console.error("❌ Error sending to SheetDB:", error);
            });

        // Optionally, still send to Web3Forms if needed
        const formName = document.getElementById('form-name');
        const formScore = document.getElementById('form-score');
        const submitForm = document.getElementById('submitForm');
        if (formName && formScore && submitForm) {
            formName.value = userName;
            formScore.value = `${score}/${questions.length}`;
            submitForm.requestSubmit();
        }
    }

    function restartQuiz() {
        usernameInput.value = '';
        userName = '';
        score = 0;
        currentQuestion = 0;
        showScreen(welcomeScreen);
    }

    // ------------------ Timer Logic ------------------ //
    function startTimer() {
        timerDisplay.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                // Auto-skip if not answered
                optionsDiv.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
                nextBtn.disabled = false;
            }
        }, 1000);
    }

    // ------------------ Leaderboard Logic ------------------ //
    function showLeaderboard() {
        leaderboardModal.style.display = 'flex';
        const leaderboardTableBody = leaderboardTable.querySelector('tbody') || leaderboardTable;
        leaderboardTableBody.innerHTML = '<tr><td colspan="2">Loading...</td></tr>';
        fetch("https://sheetdb.io/api/v1/bq8qpoqukh9ts")
            .then(response => response.json())
            .then(data => {
                if (!Array.isArray(data)) throw new Error("Invalid leaderboard data");
                // Parse score as number for sorting (handle "score/total" format)
                data.sort((a, b) => {
                    function parseScore(s) {
                        if (!s) return 0;
                        if (typeof s === 'number') return s;
                        if (typeof s === 'string' && s.includes('/')) return parseFloat(s.split('/')[0]);
                        return parseFloat(s) || 0;
                    }
                    return parseScore(b.score) - parseScore(a.score);
                });
                leaderboardTableBody.innerHTML = '';
                data.forEach((entry, i) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td>${i === 0 ? '🏆 ' : ''}${entry.name || 'Anonymous'}</td><td>${entry.score || ''}</td>`;
                    leaderboardTableBody.appendChild(row);
                });
                if (data.length === 0) {
                    leaderboardTableBody.innerHTML = '<tr><td colspan="2">No scores yet.</td></tr>';
                }
            })
            .catch(error => {
                leaderboardTableBody.innerHTML = `<tr><td colspan="2">Failed to load leaderboard.</td></tr>`;
                console.error("❌ Error loading leaderboard:", error);
            });
    }

    function closeLeaderboard() {
        leaderboardModal.style.display = 'none';
    }

    function clearHistory() {
        localStorage.removeItem('leaderboard');
        showLeaderboard();
    }

    // ------------------ Animations ------------------ //
    // Add fade-in class for transitions (handled in CSS)

    // ------------------ Event Listeners ------------------ //
    startQuizBtn.addEventListener('click', startQuiz);
    optionsDiv.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', selectOption);
    });
    nextBtn.addEventListener('click', nextQuestion);
    viewLeaderboardBtn.addEventListener('click', showLeaderboard);
    closeLeaderboardBtn.addEventListener('click', closeLeaderboard);
    clearHistoryBtn.addEventListener('click', clearHistory);
    restartQuizBtn.addEventListener('click', restartQuiz);

    // Allow closing leaderboard by clicking outside content
    leaderboardModal.addEventListener('click', function(e) {
        if (e.target === leaderboardModal) closeLeaderboard();
    });

    // On load, show welcome or quiz screen based on state
    if (localStorage.getItem('quizUserName')) {
        usernameInput.value = localStorage.getItem('quizUserName');
    }
    showScreen(welcomeScreen);
});

// ===================== End AdvancedQuiz Logic ===================== //