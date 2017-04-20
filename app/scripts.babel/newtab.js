import { quotes, hellos } from './quotes';


const userName = 'Kyle';
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const dates = {
  soda: {
    date: new Date('12/24/2016 06:00 AM'),
    id: 'soda'
  },
  workout: {
    date: new Date('03/09/2017 05:00 AM'),
    id: 'workout'
  },
  age: {
    date: new Date('07/09/1986 04:00 AM'),
    id: 'age'
  }
};

const newQuote = () => {
  const randomQuote = Math.floor(Math.random() * (quotes.length));
  document.getElementById('quotate').innerHTML = quotes[randomQuote];
};

const newGreeting = () => {
  const randomGreet = Math.floor(Math.random() * (hellos.length));
  document.getElementById('hi').innerHTML = hellos[randomGreet];
};

const newUser = () => {
  localStorage.setItem('userName', JSON.stringify(userName));
  const retrievedObject = localStorage.getItem('userName');
  document.getElementById('user').innerHTML = JSON.parse(retrievedObject);
};

const calcTime = startDate => () => {
  const now = new Date();
  const distance = now - startDate;
  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);
  return [now, distance, days, hours, minutes, seconds];
};

const displayTime = (calcFn, id) => {
  const [now, distance, days, hours, minutes, seconds] = calcFn();

  document.getElementById(`days-${id}`).innerHTML = days + ' Days ';
  document.getElementById(`hours-${id}`).innerHTML = hours + 'h ';
  document.getElementById(`mins-${id}`).innerHTML = minutes + 'm ';
  document.getElementById(`secs-${id}`).innerHTML = seconds + 's ';
};

newUser();
newGreeting();
newQuote();

const list = [dates.soda, dates.workout, dates.age];

list.forEach(date => {
  const calcFn = calcTime(date.date);

  setInterval(() => {
    displayTime(calcFn, date.id);
  }, 50);
});
