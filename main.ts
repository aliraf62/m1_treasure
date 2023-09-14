let foundBy = ""
radio.setGroup(1)

// When someone finds M1 and presses its button
input.onButtonPressed(Button.A, function () {
    if (foundBy == "M2") {
        radio.sendValue("TeamAScore", 1)
        basic.showString("M2")
        music.playMelody("C D E F", 120)
    } else if (foundBy == "M3") {
        radio.sendValue("TeamBScore", 1)
        basic.showString("M3")
        music.playMelody("G A B C5", 120)
    }
    foundBy = ""
    // Signal to reset for the next round
    radio.sendString("Reset")
})

radio.onReceivedString(function (receivedString) {
    if (receivedString == "M2Found") {
        foundBy = "M2"
        radio.sendString("ConfirmM2")
    } else if (receivedString == "M3Found") {
        foundBy = "M3"
        radio.sendString("ConfirmM3")
    }
})

// Broadcasts the compass heading regularly
basic.forever(function () {
    radio.sendValue("M1Bearing", input.compassHeading())
    basic.pause(500)
})

// Calibration phase: M1 broadcasts a calibration signal
for (let index = 0; index < 5; index++) {
    radio.sendString("CalibrationSignal")
    basic.pause(100)
}
