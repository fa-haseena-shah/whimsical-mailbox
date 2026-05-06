const letters = [
    { id: generateId(), message: "No one can make you feel inferior, not without your consent.", author: "Barbie in Princess Charmschool"},
    { id: generateId(), message: "Life takes on various flavors as it flows. I've decided to confront it. Confront whatever life throws at me, as I always have.", author: "Alice Feeny"},
    { id: generateId(), message: "Dear S, good luck with your assignment", author: "H"},
    { id: generateId(), message: "this too shall pass.", author: "anon"},
    { id: generateId(), message: "A ship in harbour is safe but that is not what ships are built for.", author: "unk"}
]

const letterStyles = ["letter-1", "letter-2", "letter-3"];

const mailboxSeq = [
    "assets/illustrations/mb-1.PNG",
    "assets/illustrations/mb-2.PNG",
    "assets/illustrations/mb-3.PNG",
    "assets/illustrations/mb-4.PNG",
    "assets/illustrations/mb-5.PNG",
    "assets/illustrations/mb-6.PNG",
    "assets/illustrations/mb-7.PNG",
    "assets/illustrations/mb-8.PNG",
    "assets/illustrations/mb-9.PNG",
    "assets/illustrations/mb-10.PNG",
    "assets/illustrations/mb-11.PNG",
    "assets/illustrations/mb-12.PNG",
];

const floralSeq = [
    "assets/illustrations/floral-1.PNG",
    "assets/illustrations/floral-2.PNG",
];

const titleSeq = [
    "assets/illustrations/title-1.PNG",
    "assets/illustrations/title-2.PNG",
]

let isMuted = false;

function startFloralAnimation() {
    const floralImg = document.getElementById("floralVine1");
    if (!floralImg) return;

    let currentIndex = 0;
    floralImg.src = floralSeq[currentIndex];

    setInterval(() => {
        currentIndex = (currentIndex + 1) % floralSeq.length;
        floralImg.src = floralSeq[currentIndex];
    }, 400);
}

function startTitleAnimation() {
    const titleImg = document.getElementById("title1");
    if (!titleImg) return;

    let currentIndex = 0;
    titleImg.src = titleSeq[currentIndex];

    setInterval(() => {
        currentIndex = (currentIndex + 1) % titleSeq.length;
        titleImg.src = titleSeq[currentIndex];
    }, 400);
}

const writeSnd = new Audio();
writeSnd.src = "assets/sounds/writeSnd.mp3";

const closeSnd = new Audio();
closeSnd.src = "assets/sounds/closeSnd.mp3";

const openSnd = new Audio();
openSnd.src = "assets/sounds/openSnd.mp3";

const writeLetterBtn = document.getElementById("writeBtn");
writeLetterBtn.addEventListener('click', function(){
        openWritingDialog();
    });

const postBtn = document.getElementById("postBtn");
postBtn.addEventListener('click', function(){
    postLetter();
})

const soundBtn = document.getElementById("soundBtn");
soundBtn.addEventListener('click', function(){
    toggleMute();
});

function generateId(){
    const shortId = Math.random().toString(36).substring(2, 8);
    return shortId;
}

function openWritingDialog(){
    const letterFormDialog = document.getElementById("letterFormDialog");
    const letterInput = document.getElementById("letterInput");
    letterFormDialog.showModal();
    letterInput.focus();
    playSound(writeSnd);
}

function postLetter(){
    const letterId = generateId();
    const letterInput = document.getElementById("letterInput").value;
    const authorName = document.getElementById("authorName").value;
    if (letterInput === "") {
        alert("you need to write a letter!")
        return;
    }
    letters.unshift({id: letterId, message: letterInput, author: authorName})
    document.getElementById("letterInput").value = "";
    document.getElementById("authorName").value = "";
    closeDialog();
}

function chooseLetterStyle() {
    const letterContainer = document.querySelector(".letter-container");
    letterContainer.classList.remove("letter-1", "letter-2", "letter-3");
    const randomIndex = Math.floor(Math.random() * letterStyles.length);
    const selectedStyle = letterStyles[randomIndex];
    letterContainer.classList.add(selectedStyle);
}

function selectLetter() {
    const randomIndex = Math.floor(Math.random() * letters.length);
    const letterContent = letters[randomIndex].message;
    const authorName = letters[randomIndex].author;

    const letterDisplay = document.getElementById("letterDisplay");
    const authorDisplay = document.getElementById("authorDisplay");

    letterDisplay.textContent = letterContent;
    authorDisplay.textContent = authorName;
    chooseLetterStyle()
}

function openLetterDialog() {
    playSound(openSnd);
    runAnimation(mailboxSeq, () => {
        const letterDialog = document.getElementById("letterDialog");
        letterDialog.showModal();
        selectLetter();
    });
}

function closeLetter() {
    const dialog = document.getElementById("letterDialog");
    dialog.close();
    runAnimation([...mailboxSeq].reverse(), null);
    playSound(closeSnd);
}


function closeDialog(){
    document.getElementById("letterFormDialog").close();
    playSound(closeSnd);
}

let animationInterval = null;

function runAnimation(frames, onComplete) {
    // Nuke any running animation unconditionally
    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }

    const imgElement = document.getElementById("mailboxClosed");
    let currentIndex = 0;

    // Show first frame immediately, don't wait for first tick
    imgElement.src = frames[0];
    currentIndex = 1;

    if (frames.length === 1) {
        if (onComplete) onComplete();
        return;
    }

    animationInterval = setInterval(() => {
        imgElement.src = frames[currentIndex];
        currentIndex++;

        if (currentIndex >= frames.length) {
            clearInterval(animationInterval);
            animationInterval = null;
            if (onComplete) onComplete();
        }
    }, 150);
}

function toggleMute() {
    isMuted = !isMuted;
    const soundImg = soundBtn.querySelector('img');
    
    if (isMuted) {
        soundImg.src = "assets/illustrations/sound-off.PNG";
        soundImg.alt = "music muted";
    } else {
        soundImg.src = "assets/illustrations/sound-on.PNG";
        soundImg.alt = "music playing ~";
    }
}

function playSound(audioElement) {
    if (!isMuted) {
        audioElement.currentTime = 0;
        audioElement.play();
    }
}

startFloralAnimation();
startTitleAnimation();