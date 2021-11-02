let timeId = 0;
let countId = 0;
let cardId = 0;
let roundId = 0;
const fullCount = 60;
const fullMinutes = 60;
let soundOn = true;

//[오늘 날짜 영역]//
function showTime() {  
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  const date = yyyy + '년 ' + mm + '월 ' + dd + '일'
  document.querySelector('#date').value = date;


// [현재 시간 영역]//
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  const time = hours + ':' + minutes + ':' + seconds;
  document.querySelector('#time').value = time;
}
timeId = setInterval(showTime, 1000);


//[남은시간 영역]//
function showCountdown() {
  const countDown = new Date(); // 객체생성
  let seconds = fullCount - countDown.getSeconds(); 

  const count = seconds + '초'; // 변수선언
  const game = document.querySelector('#game_countdown'); // 객체 얻어오기
  game.innerHTML = count; //innerHTML = Html 안에 넣겠다
}
cardId = setInterval(showCountdown, 1000);

//[현재 회차 영역]//
function showCurrentround() {
  const currentRound = new Date(); // 객체생성
  let hours = currentRound.getHours();
  let minutes = currentRound.getMinutes();

  const round = (hours * fullMinutes) + minutes + '회'
  const totalround = document.querySelector('#game_currentround');
  totalround.innerHTML = round;

  const raceRound = (hours * fullMinutes) + minutes + '회차'
  const totalRaceRound = document.querySelector('#race_round');
  totalRaceRound.innerHTML = raceRound;
}
roundId = setInterval(showCurrentround, 1000);

//[소리 영역]//
function playSound() {
  const soundImage = document.querySelector('#sound_image');
  const audio = document.querySelector('#game_sound');
  soundImage.src = 'https://user-images.githubusercontent.com/89179590/135856318-de5c1fb7-a0bb-40c3-8c0e-b41d9c7a6558.png';

  if (soundOn === true) {
    soundOn = false;
    soundImage.src = 'https://user-images.githubusercontent.com/89179590/135856318-de5c1fb7-a0bb-40c3-8c0e-b41d9c7a6558.png';
    audio.pause();
  }

    else {
      soundOn = true;
      soundImage.src = 'https://user-images.githubusercontent.com/89179590/135798370-eec4a962-bd95-454a-96d8-957152951bf0.png';
      audio.play();
    }
}

//******* [카드 숫자값 가져오는 영역]*******//
function getBitcoinNumber(){
  return coinNumber('42,192.3');
}

function getEthereumNumber(){
  return coinNumber('2,909.71');
}

function coinNumber(number){
  let num = []
  let index = 1;

  for(let i = number.length -1; i >= 0; --i) {
    if(Number.isInteger(Number(number[i]))){
      num[index] = Number(number[i]);
      --index;

      if(index < 0)
        break;
    }
  }

  return num;
}


//[지난 회차 카드 쪼기영역]//
function showResultround() {
  const currentRound = new Date(); // 객체생성
  let hours = currentRound.getHours();
  let minutes = currentRound.getMinutes();

  const resultRound = '제 ' + ((hours * fullMinutes) + minutes -1) + '회 결과'
  const lastround = document.querySelector('#betting_result_round'); // 객체 얻어오기
  lastround.innerHTML = resultRound;
}
countId = setInterval(showResultround, 1000);


// [배팅영역]//
const item = {
  wonCoin : "[1등]",
  normal : "[일반]",
  odd : "홀",
  even : "짝",
  under : "언더",
  over : "오버",
  ethereum : "이더리움",
  bitcoin : "비트코인",
  ripple : "리플",
  dogecoin : "도지코인",
};

const bettingRate = {
  normal_odd : '1.93',
  normal_under : '1.93',
  normal_even : '1.93',
  normal_over : '1.93',

  wonCoin_ethereum : '3.72',
  wonCoin_bitcoin : '3.72',
  wonCoin_ripple : '3.72',
  wonCoin_dogecoin : '3.72',
};


const priceAmount = {
  price_1 : '10000',
  price_3 : '30000',
  price_5 : '50000',
  price_7 : '70000',
  price_10 : '100000',
  price_50 : '500000',
  price_100 : '1000000'
  };


function betting(selectId) {
  reset()
  resetButton();
  selectButton(selectId);
  inputDistributionName(selectId);
  inputDistributionRate(selectId);
}

function resetButton() {
  const buttons = document.querySelectorAll('.betting_button');
  for(button of buttons){
    button.style.opacity = '100%';
  }
}

function selectButton(selectId) {
  const button = document.querySelector('#' + selectId);
  button.style.opacity = '50%';
}

function inputDistributionName(selectId) {
  const name = getDistributionName(selectId);
  const nameText = document.querySelector('#distribution_name');
  nameText.value = name;
}

function getDistributionName(selectId){
  let name = '';
  const words = selectId.split('_');
  for(word of words){
    name += item[word] + ' + ';
  }

  name = name.substr(0, name.length - 3);
  return name;
}

function inputDistributionRate(selectId) {
  const rate = bettingRate[selectId];
  const rateText = document.querySelector('#distribution_rate');
  rateText.value = rate;
}

let totalPrice = 0;

function inputBettingPrice(selectId) {
  const price = priceAmount[selectId];
  const priceText = document.querySelector('#betting_price');
  totalPrice += Number(price);
  priceText.value = totalPrice;

  inputWonPrice();
}

function inputWonPrice() {
  const priceText = document.querySelector('#betting_price');
  const manualPrice = document.querySelector('#manual_price');
  const rateText = document.querySelector('#distribution_rate');


  const wonPrice = Math.round((Number(priceText.value) + Number(manualPrice.value)) * Number(rateText.value));
  const wonPriceText = document.querySelector('#won_price');
  wonPriceText.value = wonPrice;

  // alert("베팅금"+Number(priceText.value));
  // alert("수동베팅금"+Number(manualPrice.value));
  // alert("배당률"+Number(rateText.value));
}


function reset() {
  totalPrice = 0;

  const nameText = document.querySelector('#distribution_name');
  nameText.value = '';

  const rateText = document.querySelector('#distribution_rate');
  rateText.value = '';

  const priceText = document.querySelector('#betting_price');
  priceText.value = '';

  resetButton();

  const manualPrice = document.querySelector('#manual_price');
  manualPrice.value = '';

  const  wonPrice = document.querySelector('#won_price');
  wonPrice.value = '';



}
