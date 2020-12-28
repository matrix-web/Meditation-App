"use strict"

const app = () => {
    const song = document.querySelector(".song")
    const play = document.querySelector(".play")
    const outline = document.querySelector(".moving-outline circle")
    const video = document.querySelector(".vid-container video")

    // Sounds
    const sounds = document.querySelectorAll(".sound-picker button")
    // Time display
    const timeDisplay = document.querySelector(".time-display")
    // Time select
    const timeSelect = document.querySelectorAll(".time-select button")
    // Get the length of the outline
    const outlineLength = outline.getTotalLength()
    // Duration
    let fakeDuration = 600

    outline.style.strokeDasharray = outlineLength
    outline.style.strokeDashoffset = outlineLength

    // Create a function specific to stop and play the sounds
    const checkPlaying = song => {
        if (song.paused) {
            song.play()
            video.play()
            play.src = "./svg/pause.svg"
        } else {
            song.pause()
            video.pause()
            play.src = "./svg/play.svg"
        }
    }

    const addZero = n => n < 10 ? '0' + n : n

    //  Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener("click", function () {
            song.src = this.getAttribute("data-sound")
            video.src = this.getAttribute("data-video")
            checkPlaying(song)
        })
    })

    // play sound
    play.addEventListener("click", () => {
        checkPlaying(song)
    })

    // Select sound
    timeSelect.forEach(option => {
        option.addEventListener("click", function () {
            fakeDuration = this.dataset.time
            timeDisplay.innerText = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}0`
        })
    })

    // Animated the circle
    song.ontimeupdate = () => {
        const currentTime = song.currentTime
        const elapsed = fakeDuration - currentTime
        const seconds = Math.floor(elapsed % 60)
        const minutes = Math.floor(elapsed / 60)

        // Animate the circle
        const progress = outlineLength - (currentTime / fakeDuration) * outlineLength
        outline.style.strokeDashoffset = progress

        // Animate the text
        timeDisplay.innerText = `${addZero(minutes)}:${addZero(seconds)}`;

        if (currentTime >= fakeDuration) {
            song.pause()
            song.currentTime = 0
            play.src = './svg/play.svg'
            video.pause()
        }
    }
}

app()