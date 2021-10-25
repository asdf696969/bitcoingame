let timeId = 0;
let countId = 0;
let handId = 0;
let ethHandId = 0;
let gameId = 0;
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

//[손 이동 영역]//
let posx = 58;
let posy = 76;
const dx = 0.5;
const dy = -0.5;
let first = true;
let firstAni = true;
let xInc = 0;
let yInc = 0;

function showAniCard(){
  if(firstAni){

    xInc = 0;
    yInc = 0;
    firstAni = false;
  }

  if(xInc === 7){
    xInc = 0;
    ++yInc;
  }

  const bitcard = document.querySelector('#diamond_ani');
  bitcard.style.background = 'url(../Image/card_list_bitcoin_v2.png) no-repeat';
  bitcard.style.backgroundPosition = `${xInc * -290.7}px ${yInc * -243}px`;
  ++xInc;
}

function showethAniCard(){
  if(firstAni){

    xInc = 0;
    yInc = 0;
    firstAni = false;
  }

  if(xInc === 7){
    xInc = 0;
    ++yInc;
  }

  const ethcard = document.querySelector('#heart_ani');
  ethcard.style.background = 'url(../Image/card_list_ethereum_v2.png) no-repeat';
  ethcard.style.backgroundPosition = `${xInc * -290.7}px ${yInc * -243}px`;
  ++xInc;
}


function bitHandMove(){
  if(first)
  {
    posx = 58;
    posy = 76;
    first = false;
  }

   const bithandCountDown = new Date();
   let bitseconds = (fullCount - 52) - bithandCountDown.getSeconds();

  if (bitseconds < 5){
    first = true;
    firstAni = true;
    clearInterval(handId);
    return;
  }

  const bithand = document.querySelector('#patekPhilippe');
  posx += dx;
  posy += dy;
  bithand.style.left = `${posx}%`;
  bithand.style.top = `${posy}%`;

  showAniCard();
}


function ethHandMove(){
  if(first)
  {
    posx = 58;
    posy = 76;
    first = false;
  }

   const ethhandCountDown = new Date();
   let ethseconds = (fullCount - 52) - ethhandCountDown.getSeconds();

  if (ethseconds < 1){
    first = true;
    firstAni = true;
    clearInterval(ethHandId);
    return;
  }

  const ethhand = document.querySelector('#rechardMille');
  posx += dx;
  posy += dy;
  ethhand.style.left = `${posx}%`;
  ethhand.style.top = `${posy}%`;

  showethAniCard();
}


//[남은시간 영역]//
function showCountdown() {
  const countDown = new Date(); // 객체생성
  let seconds = fullCount - countDown.getSeconds(); 

  const count = seconds + '초'; // 변수선언
  const game = document.querySelector('#game_countdown'); // 객체 얻어오기
  game.innerHTML = count; //innerHTML = Html 안에 넣겠다


//[카드 쪼는 창 뜨게하기 영역]//
  const result = document.querySelector('#resultWindow');
  
  if(seconds === 60){
    test1();
    showBackCard();
    gameId = setInterval(gameCountdown, 1000);
    result.style.display = 'block';
  }

  if(seconds === 58){
    hideSpadeCloverBackCard();
  }

  if(seconds === 58){
    handId = setInterval(bitHandMove, 41);
    hideDiamondBackCard();
    showpatekpillppe();

    ethHandId = setInterval(ethHandMove, 41);
    hideHeartBackCard();
    showrechardMille();
  }

  if(seconds === 55){
    hidepatekPhillppe();
    hiderechardMille();
  }

  if(seconds === 52){
    showNumberResult(); 
  }

  if(seconds === 48){
    result.style.display = 'none';
    returnshowNumberResult();
  }
}

//카드 사라지고 나타나게 하기
function hideDiamondBackCard(){
  document.querySelector('#diamond_back').style.display = 'none';
}

function hideHeartBackCard(){
  document.querySelector('#heart_back').style.display = 'none';
}

function showObject(id){
  document.querySelector(id).style.display = 'block';
}

function hideObject(id){
  document.querySelector(id).style.display = 'none';
}

function hideSpadeCloverBackCard(){
  hideObject('#spade_back');
  hideObject('#clover_back');
}

function showBackCard(){
  showObject('#spade_back');
  showObject('#diamond_back');
  showObject('#clover_back');
  showObject('#heart_back');
}

//손 사라지고 나타나게 하기
function hidepatekPhillppe(id){
  document.querySelector('#patekPhilippe').style.display="none";
}

function hiderechardMille(){
  document.querySelector('#rechardMille').style.display="none";
}

function showpatekpillppe(){
  document.querySelector('#patekPhilippe').style.display="block";
}

function showrechardMille(){
  document.querySelector('#rechardMille').style.display="block";
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

  const bitRound = '제 ' + ((hours * fullMinutes) + minutes) + '회차'
  const bitTotalRound = document.querySelector('#bitRound');
  bitTotalRound.innerHTML = bitRound;

  const ethRound = '제 ' + ((hours * fullMinutes) + minutes) + '회차'
  const ethTotalRound = document.querySelector('#ethRound');
  ethTotalRound.innerHTML = ethRound;
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

//[카드 결과값 그룹핑]
const setCard = (num, id, ypixel) => {
  // -1은 이미지의 시작이 0부터 될 수 없으니 -1의 값을 넣어야 한다.
  const card = document.querySelector(id);

  card.style.backgroundPosition = `${(num - 1) * -290}px ${ypixel}px`;
};

//[숫자 합 그룹핑]
const setAddNumber = (num, id) => {
  const setNumber = `${(num[0]) + (num[1])}`;
  const addNumber = document.querySelector(id);
  addNumber.innerHTML = setNumber[setNumber.length -1];
};

//[카드 결과값 노출 영역]
function test1(){
  const bitNum = getBitcoinNumber();
  const ethNum = getEthereumNumber();

  setCard(bitNum[0], '#spade', -729);
  setCard(bitNum[1], '#diamond', 0);
  setCard(ethNum[0], '#clover', -243);
  setCard(ethNum[1], '#heart', -486);
}

function isEven(num){
  if(num % 2 === 0)
    return true;
  else
    return false;
}

function isOver(num){
  if(num >= 5)
    return true;
  else
    return false;
}

function showNumberResult(){
  const bitNum = getBitcoinNumber();
  const ethNum = getEthereumNumber();

  setAddNumber(bitNum, '#playGame_01_number');
  setAddNumber(ethNum, '#playGame_02_number');
  const resultTitle = document.querySelector('#result_title')
  const resultCoin = document.querySelector('.betting_result_coin')
  const resultNumber = document.querySelector('#number_result');
  const result = getGameValue();

  if(result["name"] === '비트코인'){
    resultTitle.innerHTML = '비트코인'
    resultCoin.style.background = 'url(Image/Bitcoin_logo_v2.png) no-repeat';
    resultCoin.style.backgroundPosition = 'center';
    resultNumber.innerHTML = result["value"];
    resultNumber.style.color = "#CC4D52";
  }else if(result["name"] === '이더리움'){
    resultTitle.innerHTML = '이더리움'
    resultCoin.style.background = 'url(Image/ethereum_logo_v2.png) no-repeat';
    resultCoin.style.backgroundPosition = 'center';
    resultNumber.innerHTML = result["value"];
    resultNumber.style.color = "#0967C7";
  }else if(result["name"] === 'draw'){
    resultTitle.innerHTML = '무승부'
    resultCoin.style.background = 'url(Image/draw_v2.png) no-repeat';
    resultCoin.style.backgroundPosition = 'center';
    resultNumber.innerHTML = result["value"];
    resultNumber.style.color = "#1E8F7B";
  }

  const value = result["value"];
  const even = isEven(value);
  const over = isOver(value);
  const resultEvenOdd = document.querySelector('#value_result');

  if(even && over){
    resultEvenOdd.style.background = 'url(Image/EvenOver.png) no-repeat';
    resultEvenOdd.style.backgroundPosition = 'center';
  }else if(even && !over){
    resultEvenOdd.style.background = 'url(Image/EvenUnder.png) no-repeat';
    resultEvenOdd.style.backgroundPosition = 'center';
  }else if(!even && over){
    resultEvenOdd.style.background = 'url(Image/OddOver.png) no-repeat';
    resultEvenOdd.style.backgroundPosition = 'center';
  }else{
    resultEvenOdd.style.background = 'url(Image/OddUnder.png) no-repeat';
    resultEvenOdd.style.backgroundPosition = 'center';
  }
}

function returnshowNumberResult(){
  const returnAddNumber1 = document.querySelector('#playGame_01_number');
  const returnAddNumber2 = document.querySelector('#playGame_02_number');
  returnAddNumber1.innerHTML = '?'
  returnAddNumber2.innerHTML = '?'
}

//[지난 회차 카드 쪼기영역]//
function showResultround() {
  const currentRound = new Date(); // 객체생성
  let hours = currentRound.getHours();
  let minutes = currentRound.getMinutes();

  const round = (hours * fullMinutes) + minutes -1 + '회'
  const totalround = document.querySelector('#playGame_result_round');
  totalround.innerHTML = round;

  const resultRound = '제 ' + ((hours * fullMinutes) + minutes -1) + '회 결과'
  const lastround = document.querySelector('#betting_result_round'); // 객체 얻어오기
  lastround.innerHTML = resultRound;
}
countId = setInterval(showResultround, 1000);

//[게임 창 남은시간 영역]//
function gameCountdown() {
  const countDown = new Date(); // 객체생성
  let seconds = (fullCount - 50) - countDown.getSeconds();
  
  if (seconds < 0){
    clearInterval(gameId);
    return;
  }

  const count = seconds + '초'; // 변수선언
  const game = document.querySelector('#playGame_result_time'); // 객체 얻어오기
  game.innerHTML = count; //innerHTML = Html 안에 넣겠다
}
gameId = setInterval(gameCountdown, 1000);

function getGameValue(){
  const bitNum = getBitcoinNumber();
  const ethNum = getEthereumNumber();  

  const bitSum = String(bitNum[0] + bitNum[1]);
  const ethSum = String(ethNum[0] + ethNum[1]);
  bitResult = bitSum[bitSum.length -1];
  ethResult = ethSum[ethSum.length -1];

  let resultObject =  { 
    "name" : "",
    "value" : 0
  };

  if (bitResult > ethResult){
    resultObject["name"] = '비트코인';
    resultObject["value"] = bitResult;
  }else if(bitResult === ethResult){
    resultObject["name"] = 'draw';
    resultObject["value"] = bitResult;
  }else{
    resultObject["name"] = '이더리움';
    resultObject["value"] = ethResult;
  }

  return resultObject;
}
