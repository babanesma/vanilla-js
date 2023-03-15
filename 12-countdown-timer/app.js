const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let futureDate = new Date(2023, 2, 16, 20, 17, 30, 0);
let futureDateString = futureDate.toLocaleDateString('en-US', {
  weekday: "short",
  year: 'numeric',
  month: "short",
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})
giveaway.textContent = `giveaway ends on ${futureDateString}`;

// future time in ms
const futureTime = futureDate.getTime();
 
getRemainingTime = () => {
  const today = new Date().getTime()
  const t = futureTime - today;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  const values = [days, hours, minutes, seconds]

  items.forEach((item, index) => {
    item.textContent = values[index];
  });

  if (t<0) {
    clearInterval(countdown);
    deadline.innerHTML=`<h4 class="expired">This giveaway has expired</h4>`
  }
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();