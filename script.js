// Game state variables
let secretNumber;
let lowerBound = 0;
let upperBound = 100; // Default value, will be updated based on range selection
let currentPlayerIndex = 0;
let players = [];
let round = 1;
let gameActive = false;
let currentQuestion = null;
let currentCorrectAnswer = null;
let loserFound = false;
let activeQuestionBank = 'built-in';
let customQuestionBank = [];
let canGuess = false; // New flag to track if guessing is allowed

const builtInQuestions = [
    {
        question: "What is the synonym of 'important'?",
        options: ["significant", "small", "random", "rare"],
        correctAnswer: "significant"
    },
    {
        question: "Which word means 'a place where books are kept'?",
        options: ["library", "bookstore", "school", "study"],
        correctAnswer: "library"
    },
    {
        question: "What is the comparative form of 'good'?",
        options: ["better", "best", "well", "gooder"],
        correctAnswer: "better"
    },
    {
        question: "Which prefix means 'not'?",
        options: ["un-", "re-", "pre-", "over-"],
        correctAnswer: "un-"
    },
    {
        question: "What is the antonym of 'include'?",
        options: ["exclude", "involve", "cover", "contain"],
        correctAnswer: "exclude"
    },
    {
        question: "What is the past participle of 'write'?",
        options: ["written", "wrote", "writing", "writes"],
        correctAnswer: "written"
    },
    {
        question: "Which word refers to 'a short sleep during the day'?",
        options: ["nap", "dream", "snore", "rest"],
        correctAnswer: "nap"
    },
    {
        question: "Which is a collective noun for 'cows'?",
        options: ["herd", "team", "flock", "pack"],
        correctAnswer: "herd"
    },
    {
        question: "What is the plural of 'crisis'?",
        options: ["crises", "crisises", "crisises'", "cris"],
        correctAnswer: "crises"
    },
    {
        question: "What is the synonym of 'assist'?",
        options: ["help", "ignore", "harm", "stop"],
        correctAnswer: "help"
    },
    {
        question: "Which is the past tense of 'begin'?",
        options: ["began", "begun", "begins", "beginning"],
        correctAnswer: "began"
    },
    {
        question: "Which word refers to 'a place where planes take off and land'?",
        options: ["airport", "station", "harbor", "garage"],
        correctAnswer: "airport"
    },
    {
        question: "What is the opposite of 'succeed'?",
        options: ["fail", "win", "achieve", "progress"],
        correctAnswer: "fail"
    },
    {
        question: "What is the noun form of 'decide'?",
        options: ["decision", "deciding", "decided", "decisive"],
        correctAnswer: "decision"
    },
    {
        question: "Which word means 'to officially end something'?",
        options: ["cancel", "start", "continue", "approve"],
        correctAnswer: "cancel"
    },
    {
        question: "What is the correct suffix to form a noun from 'happy'?",
        options: ["-ness", "-ful", "-ly", "-ish"],
        correctAnswer: "-ness"
    },
    {
        question: "Which word refers to 'a formal meeting for discussion'?",
        options: ["conference", "party", "interview", "seminar"],
        correctAnswer: "conference"
    },
    {
        question: "Which is a synonym for 'quickly'?",
        options: ["rapidly", "slowly", "frequently", "rarely"],
        correctAnswer: "rapidly"
    },
    {
        question: "What is the meaning of 'reduce'?",
        options: ["decrease", "increase", "divide", "remove"],
        correctAnswer: "decrease"
    },
    {
        question: "What is the opposite of 'borrow'?",
        options: ["lend", "take", "buy", "keep"],
        correctAnswer: "lend"
    },
    {
        question: "What is the past participle of 'see'?",
        options: ["seen", "saw", "sees", "seeing"],
        correctAnswer: "seen"
    },
    {
        question: "Which word refers to 'a person who writes books'?",
        options: ["author", "editor", "publisher", "librarian"],
        correctAnswer: "author"
    },
    {
        question: "Which suffix can create an adjective from 'care'?",
        options: ["-ful", "-ness", "-able", "-ly"],
        correctAnswer: "-ful"
    },
    {
        question: "What is the synonym of 'vacation'?",
        options: ["holiday", "work", "travel", "rest"],
        correctAnswer: "holiday"
    },
    {
        question: "What is the plural of 'analysis'?",
        options: ["analyses", "analysis'", "analyzes", "analysis"],
        correctAnswer: "analyses"
    },
    {
        question: "What is the opposite of 'arrive'?",
        options: ["depart", "stay", "leave", "stop"],
        correctAnswer: "depart"
    },
    {
        question: "Which word means 'to fix something'?",
        options: ["repair", "build", "destroy", "change"],
        correctAnswer: "repair"
    },
    {
        question: "Which is an antonym of 'increase'?",
        options: ["decrease", "expand", "grow", "improve"],
        correctAnswer: "decrease"
    },
    {
        question: "What is the adjective form of 'danger'?",
        options: ["dangerous", "dangered", "dangering", "dangerly"],
        correctAnswer: "dangerous"
    },
    {
        question: "Which word means 'a piece of furniture for sleeping'?",
        options: ["bed", "sofa", "chair", "table"],
        correctAnswer: "bed"
    },
    {
        question: "If you put a ______ under a leaking faucet, you will be surprised at the amount of water collected in 24 hours.",
        options: ["border", "timer", "container", "marker"],
        correctAnswer: "container"
    },
    {
        question: "The local farmers’ market is popular as it offers a variety of fresh seasonal ______ to people in the community.",
        options: ["produce", "fashion", "brand", "trend"],
        correctAnswer: "produce"
    },
    {
        question: "As the years have passed by, many of my childhood memories are already ______; I can no longer recall clearly what happened back then.",
        options: ["blurring", "trimming", "draining", "glaring"],
        correctAnswer: "blurring"
    },
    {
        question: "Racist remarks are by nature ______ and hurtful, and should be avoided on all occasions.",
        options: ["excessive", "furious", "offensive", "stubborn"],
        correctAnswer: "offensive"
    },
    {
        question: "Not satisfied with the first ______ of her essay, Mary revised it several times before turning it in to the teacher.",
        options: ["text", "brush", "draft", "plot"],
        correctAnswer: "draft"
    },
    {
        question: "Left ______ for years, the deserted house was filled with a thick coating of dust and a smell of old damp wood.",
        options: ["casual", "fragile", "remote", "vacant"],
        correctAnswer: "vacant"
    },
    {
        question: "The high school student showed ______ courage when she helped the old man escape from the fire.",
        options: ["gigantic", "exclusive", "multiple", "enormous"],
        correctAnswer: "enormous"
    },
    {
        question: "Publicly financed projects are often ______ or delayed during tough economic times due to a lack of resources.",
        options: ["halted", "hatched", "possessed", "reinforced"],
        correctAnswer: "halted"
    },
    {
        question: "Despite his busy schedule, the President ______ the school’s graduation ceremony with his presence and a heartwarming speech.",
        options: ["praised", "graced", "addressed", "credited"],
        correctAnswer: "graced"
    },
    {
        question: "The manager of the company was sued for ______ abusing his colleagues, calling them “hopeless losers.”",
        options: ["verbally", "dominantly", "legitimately", "relevantly"],
        correctAnswer: "verbally"
    },
    {
        question: "People who desire a ______ figure should exercise regularly and maintain healthy eating habits.",
        options: ["spicy", "slender", "slight", "slippery"],
        correctAnswer: "slender"
    },
    {
        question: "Watching the sun ______ from a sea of clouds is a must-do activity for all visitors to Ali Mountain.",
        options: ["emerging", "flashing", "rushing", "floating"],
        correctAnswer: "emerging"
    },
    {
        question: "Do you know what time the next bus is ______? I’ve been waiting here for more than 30 minutes.",
        options: ["apt", "due", "bound", "docked"],
        correctAnswer: "due"
    },
    {
        question: "The roasting heat and high ______ made me feel hot and sticky, no matter what I did to cool off.",
        options: ["density", "humidity", "circulation", "atmosphere"],
        correctAnswer: "humidity"
    },
    {
        question: "Artwork created by truly great artists such as Picasso and Monet will no doubt ______ the test of time.",
        options: ["stay", "take", "serve", "stand"],
        correctAnswer: "stand"
    },
    {
        question: "In some countries, military service is ______ for men only; women do not have to serve in the military.",
        options: ["forceful", "realistic", "compulsory", "distinctive"],
        correctAnswer: "compulsory"
    },
    {
        question: "The team complained that its leader always took the ______ for all the hard work done by the team members.",
        options: ["advantage", "revenge", "remedy", "credit"],
        correctAnswer: "credit"
    },
    {
        question: "Located at the center of the city, the business hotel ______ not only good service but also convenient public transport.",
        options: ["proposes", "contains", "promises", "confirms"],
        correctAnswer: "promises"
    },
    {
        question: "As blood supplies have fallen to a critically low level, many hospitals are making an ______ for the public to donate blood.",
        options: ["appeal", "approach", "operation", "observation"],
        correctAnswer: "appeal"
    },
    {
        question: "David felt disappointed when he found out that he could not choose his study partners, but would be ______ placed in a study group.",
        options: ["eligibly", "randomly", "apparently", "consequently"],
        correctAnswer: "randomly"
    },
    {
        question: "The bus driver often complains about chewing gum found under passenger seats because it is _____ and very hard to remove.",
        options: ["sticky", "greasy", "clumsy", "mighty"],
        correctAnswer: "sticky"
    },
    {
        question: "Jesse is a talented model. He can easily adopt an elegant _____ for a camera shoot.",
        options: ["clap", "toss", "pose", "snap"],
        correctAnswer: "pose"
    },
    {
        question: "In order to draw her family tree, Mary tried to trace her _____ back to their arrival in North America.",
        options: ["siblings", "commuters", "ancestors", "instructors"],
        correctAnswer: "ancestors"
    },
    {
        question: "Upon the super typhoon warning, Nancy rushed to the supermarket—only to find the shelves almost _____ and the stock nearly gone.",
        options: ["blank", "bare", "hollow", "queer"],
        correctAnswer: "bare"
    },
    {
        question: "Even though Jack said 'Sorry!' to me in person, I did not feel any _____ in his apology.",
        options: ["liability", "generosity", "integrity", "sincerity"],
        correctAnswer: "sincerity"
    },
    {
        question: "My grandfather has astonishing powers of _____. He can still vividly describe his first day at school as a child.",
        options: ["resolve", "fraction", "privilege", "recall"],
        correctAnswer: "recall"
    },
    {
        question: "Recent research has found lots of evidence to _____ the drug company’s claims about its 'miracle' tablets for curing cancer.",
        options: ["provoke", "counter", "expose", "convert"],
        correctAnswer: "counter"
    },
    {
        question: "Corrupt officials and misguided policies have _____ the country’s economy and burdened its people with enormous foreign debts.",
        options: ["crippled", "accelerated", "rendered", "ventured"],
        correctAnswer: "crippled"
    },
    {
        question: "As a record number of fans showed up for the baseball final, the highways around the stadium were _____ with traffic all day.",
        options: ["choked", "disturbed", "enclosed", "injected"],
        correctAnswer: "choked"
    },
    {
        question: "Studies show that the _____ unbiased media are in fact often deeply influenced by political ideology.",
        options: ["undoubtedly", "roughly", "understandably", "supposedly"],
        correctAnswer: "supposedly"
    },
    {
        question: "When Jeffery doesn’t feel like cooking, he often orders pizza online and has it ______ to his house.",
        options: ["advanced", "delivered", "offered", "stretched"],
        correctAnswer: "delivered"
    },
    {
        question: "Jane is the best ______ I have ever had. I cannot imagine running my office without her help.",
        options: ["assistant", "influence", "contribution", "politician"],
        correctAnswer: "assistant"
    },
    {
        question: "The temple celebrated Mazu Festival by hosting ten days of lion dances, Taiwanese operas, and traditional hand ______ shows.",
        options: ["chat", "quiz", "puppet", "variety"],
        correctAnswer: "puppet"
    },
    {
        question: "The new vaccine was banned by the Food and Drug Administration due to its ______ fatal side effects.",
        options: ["potentially", "delicately", "ambiguously", "optionally"],
        correctAnswer: "potentially"
    },
    {
        question: "______ the photos with dates and keywords help you sort them easily in your file.",
        options: ["Tagging", "Flocking", "Rolling", "Snapping"],
        correctAnswer: "Tagging"
    },
    {
        question: "An ______ person is usually pleasant and easy to get along with, but don’t expect that he or she will always say 'yes' to everything.",
        options: ["enormous", "intimate", "agreeable", "ultimate"],
        correctAnswer: "agreeable"
    },
    {
        question: "Hidden deep in a small alley among various tiny shops, the entrance of the Michelin star restaurant is barely ______ to passersby.",
        options: ["identical", "visible", "available", "remarkable"],
        correctAnswer: "visible"
    },
    {
        question: "The original budget for my round-island trip was NT$5,000, but the ______ cost is likely to be 50 percent higher.",
        options: ["moderate", "absolute", "promising", "eventual"],
        correctAnswer: "eventual"
    },
    {
        question: "After watching a TV program on natural history, Adam decided to go on a ______ for dinosaur fossils in South Dakota.",
        options: ["trial", "route", "strike", "quest"],
        correctAnswer: "quest"
    },
    {
        question: "With pink cherry blossoms blooming everywhere, the valley ______ like a young bride under the bright spring sunshine.",
        options: ["bounces", "blushes", "polishes", "transfers"],
        correctAnswer: "blushes"
    }
];
// DOM elements
const gameSetupEl = document.getElementById('game-setup');
const gameAreaEl = document.getElementById('game-area');
const gameOverEl = document.getElementById('game-over');
const numPlayersInput = document.getElementById('num-players');
const numberRangeInput = document.getElementById('number-range'); // New DOM element
const startGameBtn = document.getElementById('start-game');
const questionBankSelect = document.getElementById('question-bank-select');
const customBankContainer = document.getElementById('custom-bank-container');
const customBankTextarea = document.getElementById('custom-bank-textarea');
const saveCustomBankBtn = document.getElementById('save-custom-bank');
const rangeDisplayEl = document.getElementById('range-display');
const currentPlayerEl = document.getElementById('current-player');
const roundNumberEl = document.getElementById('round-number');
const questionTextEl = document.getElementById('question-text');
const answerOptionsEl = document.getElementById('answer-options');
const guessSectionEl = document.getElementById('guess-section');
const guessInputEl = document.getElementById('guess-input');
const submitGuessBtn = document.getElementById('submit-guess');
const messageAreaEl = document.getElementById('message-area');
const playerListEl = document.getElementById('player-list');
const resultMessageEl = document.getElementById('result-message');
const playAgainBtn = document.getElementById('play-again');

// Event listeners
startGameBtn.addEventListener('click', startGame);
submitGuessBtn.addEventListener('click', function(e) {
    // Only process the guess if the player is allowed to guess
    if (canGuess) {
        handleGuess();
    } else {
        e.preventDefault();
        displayMessage('Please answer the question correctly first', 'error');
    }
});
playAgainBtn.addEventListener('click', resetGame);
questionBankSelect.addEventListener('change', handleQuestionBankChange);
saveCustomBankBtn.addEventListener('click', saveCustomQuestionBank);

// Initialize the game
function initializeGame() {
    // Load any saved question bank from local storage
    loadCustomQuestionBank();
    
    // Set initial question bank selection state
    handleQuestionBankChange();
}

function handleQuestionBankChange() {
    activeQuestionBank = questionBankSelect.value;
    
    if (activeQuestionBank === 'custom') {
        customBankContainer.classList.remove('hidden');
    } else {
        customBankContainer.classList.add('hidden');
    }
}

function saveCustomQuestionBank() {
    try {
        const questionBankData = customBankTextarea.value.trim();
        if (!questionBankData) {
            displaySetupMessage('Please enter valid question data', 'error');
            return;
        }
        
        // Parse the JSON data
        const parsedData = JSON.parse(questionBankData);
        
        // Validate the format
        if (!Array.isArray(parsedData) || !parsedData.every(isValidQuestion)) {
            displaySetupMessage('Invalid question format. Please check your JSON data.', 'error');
            return;
        }
        
        // Save to memory and local storage
        customQuestionBank = parsedData;
        localStorage.setItem('customQuestionBank', questionBankData);
        
        displaySetupMessage('Custom question bank saved successfully!', 'success');
    } catch (error) {
        displaySetupMessage('Error saving question bank: ' + error.message, 'error');
    }
}

function isValidQuestion(q) {
    return q && 
           typeof q.question === 'string' && 
           Array.isArray(q.options) && 
           q.options.length >= 2 &&
           typeof q.correctAnswer === 'string' &&
           q.options.includes(q.correctAnswer);
}

function loadCustomQuestionBank() {
    const savedBank = localStorage.getItem('customQuestionBank');
    if (savedBank) {
        try {
            customQuestionBank = JSON.parse(savedBank);
            customBankTextarea.value = savedBank;
        } catch (error) {
            console.error('Error loading saved question bank:', error);
            customQuestionBank = [];
        }
    }
}

function displaySetupMessage(message, type) {
    const setupMessageArea = document.getElementById('setup-message-area');
    setupMessageArea.textContent = message;
    setupMessageArea.className = '';
    setupMessageArea.classList.add(`message-${type}`);
    
    // Clear message after 5 seconds
    setTimeout(() => {
        setupMessageArea.textContent = '';
        setupMessageArea.className = '';
    }, 5000);
}

function startGame() {
    const numPlayers = parseInt(numPlayersInput.value);
    
    if (numPlayers < 2 || numPlayers > 10) {
        alert('Number of players must be between 2 and 10');
        return;
    }
    
    // Check if using custom question bank and it's empty
    if (activeQuestionBank === 'custom' && customQuestionBank.length === 0) {
        displaySetupMessage('Custom question bank is empty. Please add questions or switch to built-in questions.', 'error');
        return;
    }
    
    // Get selected number range
    upperBound = parseInt(numberRangeInput.value);
    
    // Initialize game state
    gameActive = true;
    lowerBound = 0;
    currentPlayerIndex = 0;
    round = 1;
    loserFound = false;
    canGuess = false; // Reset the flag at the start of the game
    
    // Generate secret number (1 to upperBound-1, excluding bounds)
    secretNumber = Math.floor(Math.random() * (upperBound - 1)) + 1;
    console.log("Secret number: " + secretNumber); // For testing
    
    // Create players
    players = [];
    for (let i = 1; i <= numPlayers; i++) {
        players.push({
            name: `Player ${i}`,
            isSkipped: false
        });
    }
    
    // Update UI
    gameSetupEl.classList.add('hidden');
    gameAreaEl.classList.remove('hidden');
    updateGameInfo();
    renderPlayerList();
    
    // Start first player's turn
    startPlayerTurn();
}

function startPlayerTurn() {
    // Reset guess permission at the start of each turn
    canGuess = false;
    
    // Check if current player is skipped
    if (players[currentPlayerIndex].isSkipped) {
        displayMessage(`${players[currentPlayerIndex].name}'s turn is skipped this round.`, 'info');
        players[currentPlayerIndex].isSkipped = false; // Reset the skip status
        renderPlayerList();
        
        // Move to next player
        setTimeout(() => {
            nextPlayer();
            startPlayerTurn();
        }, 2000);
        
        return;
    }
    
    // Display whose turn it is
    updateGameInfo();
    displayMessage(`${players[currentPlayerIndex].name}'s turn`, 'info');
    
    // Reset UI for new turn
    guessSectionEl.classList.add('hidden');
    guessInputEl.value = '';
    
    // Present a random question
    presentQuestion();
}

function presentQuestion() {
    // Use the active question bank
    const questionSet = activeQuestionBank === 'built-in' ? builtInQuestions : customQuestionBank;
    
    // Select a random question
    const randomIndex = Math.floor(Math.random() * questionSet.length);
    currentQuestion = questionSet[randomIndex];
    currentCorrectAnswer = currentQuestion.correctAnswer;
    
    // Display the question
    questionTextEl.textContent = currentQuestion.question;
    
    // Display the answer options
    answerOptionsEl.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const optionEl = document.createElement('div');
        optionEl.className = 'answer-option';
        optionEl.textContent = option;
        optionEl.addEventListener('click', () => handleAnswerSelection(option));
        answerOptionsEl.appendChild(optionEl);
    });
}

function handleAnswerSelection(selectedAnswer) {
    // Clear previous selections
    document.querySelectorAll('.answer-option').forEach(el => {
        el.style.backgroundColor = '#ecf0f1';
        el.style.color = '#333';
    });
    
    // Highlight the selected answer
    event.target.style.backgroundColor = '#3498db';
    event.target.style.color = 'white';
    
    // Check if the answer is correct
    setTimeout(() => {
        if (selectedAnswer === currentCorrectAnswer) {
            displayMessage('Correct! You can now make a guess.', 'success');
            
            // Allow guessing since the answer was correct
            canGuess = true;
            
            // Wait a moment to show the success message, then show the guess section
            setTimeout(() => {
                // Show the guess section
                guessSectionEl.classList.remove('hidden');
                
                // Update guess input min/max range to exclude the bounds
                guessInputEl.min = lowerBound + 1;
                guessInputEl.max = upperBound - 1;
                
                // Focus on the input field
                guessInputEl.focus();
            }, 1000);
        } else {
            displayMessage('Incorrect! Your turn is skipped.', 'error');
            
            // Ensure guessing is not allowed
            canGuess = false;
            
            // Move to next player after showing the error message
            setTimeout(() => {
                nextPlayer();
                startPlayerTurn();
            }, 2000);
        }
    }, 1000);
}

function handleGuess() {
    // Double-check the canGuess flag (extra validation)
    if (!canGuess) {
        displayMessage('Please answer the question correctly first', 'error');
        return;
    }
    
    const guess = parseInt(guessInputEl.value);
    
    // Validate guess
    if (isNaN(guess)) {
        displayMessage('Please enter a number', 'error');
        return;
    }
    
    if (guess <= lowerBound || guess >= upperBound) {
        displayMessage(`Please enter a number between ${lowerBound + 1} and ${upperBound - 1}`, 'error');
        return;
    }
    
    // Process the guess
    if (guess === secretNumber) {
        // Game over - current player loses
        displayMessage(`${players[currentPlayerIndex].name} guessed the secret number ${secretNumber}!`, 'info');
        endGame(currentPlayerIndex);
    } else if (guess < secretNumber) {
        // Update lower bound
        lowerBound = guess;
        displayMessage(`The secret number is higher than ${guess}. Range updated.`, 'info');
        
        // Check if next player has no valid moves
        if (lowerBound + 1 >= upperBound - 1) {
            // Next player will lose
            const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
            displayMessage(`${players[nextPlayerIndex].name} has no valid moves and loses!`, 'info');
            endGame(nextPlayerIndex);
            return;
        }
        
        // Move to next player
        nextPlayer();
        setTimeout(startPlayerTurn, 2000);
    } else {
        // Update upper bound
        upperBound = guess;
        displayMessage(`The secret number is lower than ${guess}. Range updated.`, 'info');
        
        // Check if next player has no valid moves
        if (lowerBound + 1 >= upperBound - 1) {
            // Next player will lose
            const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
            displayMessage(`${players[nextPlayerIndex].name} has no valid moves and loses!`, 'info');
            endGame(nextPlayerIndex);
            return;
        }
        
        // Move to next player
        nextPlayer();
        setTimeout(startPlayerTurn, 2000);
    }
    
    updateGameInfo();
}

function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    
    // Check if we've completed a round
    if (currentPlayerIndex === 0) {
        round++;
    }
    
    updateGameInfo();
    renderPlayerList();
}

function displayMessage(message, type) {
    messageAreaEl.textContent = message;
    messageAreaEl.className = '';
    messageAreaEl.classList.add(`message-${type}`);
}

function updateGameInfo() {
    // Display the current range showing the exclusive bounds correctly
    rangeDisplayEl.textContent = `${lowerBound} - ${upperBound}`;
    currentPlayerEl.textContent = players[currentPlayerIndex].name;
    roundNumberEl.textContent = round;
}

function renderPlayerList() {
    playerListEl.innerHTML = '';
    
    players.forEach((player, index) => {
        const playerEl = document.createElement('div');
        playerEl.className = 'player-card';
        
        if (index === currentPlayerIndex) {
            playerEl.classList.add('player-active');
        }
        
        if (player.isSkipped) {
            playerEl.classList.add('player-skipped');
        }
        
        playerEl.innerHTML = `
            <div>${player.name}</div>
            ${player.isSkipped ? '<div>Skipped Next Round</div>' : ''}
        `;
        
        playerListEl.appendChild(playerEl);
    });
}

function endGame(loserIndex) {
    loserFound = true;
    gameActive = false;
    
    // Show game over screen
    setTimeout(() => {
        gameAreaEl.classList.add('hidden');
        gameOverEl.classList.remove('hidden');
        
        resultMessageEl.innerHTML = `
            <p>Game Over! The secret number was <span class="highlight">${secretNumber}</span>.</p>
            <p>${players[loserIndex].name} loses!</p>
        `;
    }, 3000);
}

function resetGame() {
    // Hide game over screen and show setup
    gameOverEl.classList.add('hidden');
    gameSetupEl.classList.remove('hidden');
    
    // Reset game state
    secretNumber = null;
    lowerBound = 0;
    upperBound = parseInt(numberRangeInput.value); // Use current selected range
    currentPlayerIndex = 0;
    players = [];
    round = 1;
    gameActive = false;
    currentQuestion = null;
    loserFound = false;
    canGuess = false; // Reset the guess permission flag
    
    // Clear messages
    messageAreaEl.textContent = '';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeGame);
