const msgEl = document.getElementById('msg')

const randomNum = getRandomNumber()
console.log('Number:', randomNum);

function onSpeak(e) {
    console.log(e) 
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// Start Recognition and Game
let recognition = new window.SpeechRecognition()
recognition.start()

// capture your speak
function onSpeak(e) {
    const msg = e.results[0][0].transcript
    console.log(msg);
    
    
    writeMessage(msg)
    checkNumber(msg)
    
}

// Check msg against num
function checkNumber(msg) {
    const num = +msg  // convert to strign

    // check if the number
    if (Number.isNaN(num)) {
        msgEl.innerHTML += '<div>That is not a valid number</div>'
        return
    }

    // check in range
    if (num > 100 || num < 1) {
        msgEl.innerHTML += `<div>Number must be between 1 and 100<div>`
        return
    }

    // check number 
    if (num === randomNum) {
        document.body.innerHTML = `
            <h2>Congrats! you have guessed the number! <br><br>
            It was ${num}
            </h2>
            <button class="play-again" id="play-again">Play Again</button>`
    } else if (num > randomNum) {
        msgEl.innerHTML += `<div>GO LOWER</div>`
    } else {
        msgEl.innerHTML += `<div>GO HIGHER</div>`
    }
}

// Write what user speack
function writeMessage(msg) {
    msgEl.innerHTML = `
        <div>You said:</div>
        <span class="box">${msg}</span>`
}

// Generate Random Number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}

// Speack result
recognition.addEventListener('result', onSpeak)

// End SR service
recognition.addEventListener('end', () => recognition.start())

document.body.addEventListener('click', e => {
    if (e.target.id == 'play-again') {
        window.location.reload()
    }   
})