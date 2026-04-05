export function timeToString(seconds){
    let minutes = Math.floor(seconds / 60);
    let minutesString = minutes.toString().padStart(2, '0');

    let secondsLeft = seconds % 60;
    let secondsLeftString = secondsLeft.toString().padStart(2, '0');

    return `${minutesString}:${secondsLeftString}`;
}
