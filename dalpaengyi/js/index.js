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



