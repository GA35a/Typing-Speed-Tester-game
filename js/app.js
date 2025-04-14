document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");
    const playAgainBtn = document.getElementById("play-again-btn");
    const startScreen = document.getElementById("start-screen");
    const gameScreen = document.getElementById("game-screen");
    const resultScreen = document.getElementById("result-screen");
    const hiddenInput = document.getElementById("hidden-input");
    const sentenceDisplay = document.getElementById("text-display");
    const timerElement = document.getElementById("timer");
    const finalTimeElement = document.getElementById("final-time");
    const accuracyElement = document.getElementById("accuracy");
    const difficultySelect = document.getElementById("difficulty");

    let currentSentence = "";
    let time = 0;
    let interval;
    let isGameStarted = false;
    let isTimerRunning = false;

    const easySentences = ["The cat ran.", "Birds fly.", "I love pizza.", "Dogs bark loudly.", "She smiles brightly."];
    const mediumSentences = [
        "The sun sets over the mountains.",
        "Children are playing in the park.",
        "Books are a window to the world.",
        "A beautiful melody fills the air.",
        "The wind whispers through the trees."
    ];
    const hardSentences = [
        "In the midst of winter, I finally learned that there was in me an invincible summer.",
        "Despite the raging storm outside, the lighthouse continued to shine brightly, guiding the ships safely to shore.",
        "The complexity of the universe often leaves us wondering about the deep mysteries that govern time and space."
    ];

    function getTextBasedOnDifficulty() {
        const difficulty = difficultySelect.value;
        const sentenceList =
            difficulty === "easy" ? easySentences :
            difficulty === "medium" ? mediumSentences :
            hardSentences;
        return sentenceList[Math.floor(Math.random() * sentenceList.length)];
    }

    function startGame() {
        startScreen.style.display = "none";
        gameScreen.style.display = "flex";
        resultScreen.style.display = "none";

        currentSentence = getTextBasedOnDifficulty();
        sentenceDisplay.innerHTML = `<span class="balloon-gray">${currentSentence}</span>`;
        hiddenInput.value = "";
        timerElement.textContent = "0";
        time = 0;
        isGameStarted = true;
        isTimerRunning = false;

        setTimeout(() => hiddenInput.focus(), 50);
    }

    function startTimer() {
        clearInterval(interval);
        interval = setInterval(() => {
            time++;
            timerElement.textContent = time;
        }, 1000);
    }

    function stopGame() {
        clearInterval(interval);

        const typed = hiddenInput.value;
        const totalChars = currentSentence.length;
        let correctChars = 0;

        for (let i = 0; i < totalChars; i++) {
            if (typed[i] === currentSentence[i]) {
                correctChars++;
            }
        }

        const accuracy = Math.floor((correctChars / totalChars) * 100);

        finalTimeElement.textContent = time;
        accuracyElement.textContent = accuracy + "%";

        gameScreen.style.display = "none";
        resultScreen.style.display = "flex";
    }

    hiddenInput.addEventListener("input", () => {
        if (!isGameStarted) return;

        if (!isTimerRunning && hiddenInput.value.length > 0) {
            isTimerRunning = true;
            startTimer();
        }

        const typed = hiddenInput.value;
        let output = "";

        for (let i = 0; i < currentSentence.length; i++) {
            if (i < typed.length) {
                if (typed[i] === currentSentence[i]) {
                    output += `<span class="balloon-black">${currentSentence[i]}</span>`;
                } else {
                    output += `<span class="balloon-red">${currentSentence[i]}</span>`;
                }
            } else {
                output += `<span class="balloon-gray">${currentSentence[i]}</span>`;
            }
        }

        sentenceDisplay.innerHTML = output;

        if (typed.length === currentSentence.length) {
            stopGame();
        }
    });

    function restartGame() {
        clearInterval(interval);
        time = 0;
        isGameStarted = true;
        isTimerRunning = false;

        currentSentence = getTextBasedOnDifficulty();
        sentenceDisplay.innerHTML = `<span class="balloon-gray">${currentSentence}</span>`;
        timerElement.textContent = "0";
        hiddenInput.value = "";

        resultScreen.style.display = "none";
        gameScreen.style.display = "flex";

        setTimeout(() => hiddenInput.focus(), 50);
    }

    function playAgain() {
        resultScreen.style.display = "none";
        startScreen.style.display = "block";
    }

    startBtn?.addEventListener("click", startGame);
    restartBtn?.addEventListener("click", restartGame);
    playAgainBtn?.addEventListener("click", playAgain);
});
