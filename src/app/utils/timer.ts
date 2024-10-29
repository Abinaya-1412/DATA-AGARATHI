let upgradeTime: number = Number(JSON.parse(localStorage.getItem('expiredDate')!));
let seconds: number = Number(JSON.parse(localStorage.getItem('expiredDate')!));
export function setExpTime() {
    console.log(JSON.stringify(localStorage.getItem('token')))
   JSON.stringify(localStorage.getItem('token')) ? countdownTimer : null;
}

const countdownTimer = setInterval(() => timer(), 1000);
let expTime: any;
function timer() {
    !JSON.stringify(localStorage.getItem('token')) ? clearInterval(countdownTimer) : null;
    var days = Math.floor(seconds / 24 / 60 / 60);
    var hoursLeft = Math.floor((seconds) - (days * 86400));
    var hours = Math.floor(hoursLeft / 3600);
    var minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
    var minutes = Math.floor(minutesLeft / 60);
    var remainingSeconds = seconds % 60;
    function pad(n: any) {
        return (n < 10 ? "0" + n : n);
    }
    let time = pad(hours) + ":" + pad(minutes) + ":" + pad(remainingSeconds);
    console.log(time)
    localStorage.setItem('timer', JSON.stringify(pad(hours) + ":" + pad(minutes) + ":" + pad(remainingSeconds)));
    expTime = JSON.parse(localStorage.getItem('timer')!)
    if (seconds == 0) {
        clearInterval(countdownTimer);
    } else {
        seconds--;
        localStorage.setItem('timer', JSON.stringify(seconds))
    }
}