input.onButtonPressed(Button.A, function () {
    if (foundBy == "M2") {
        radio.sendValue("TeamAScore", 1)
    } else if (foundBy == "M3") {
        radio.sendValue("TeamBScore", 1)
    }
    foundBy = ""
    // Reset the state for the next discovery
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
let foundBy = ""
radio.setGroup(1)
basic.forever(function () {
    radio.sendValue("M1Bearing", input.compassHeading())
    basic.pause(500)
})
