const item = {
  power : "[파워볼]",
  normal : "[일반볼]",
  odd : "홀",
  even : "짝",
  under : "언더",
  over : "오버",
  small : "소",
  middle : "중",
  big : "대",

  one : "1",
  two : "2",
  three : "3",
  four : "4",
  five : "5",
  six : "6",
  seven : "7",
  eight : "8",
  nine : "9",
  zero : "0",

};

const bettingRate = {
  power_odd : '1.93',
  power_under : '1.93',
  power_odd_over : '3.1',
  power_odd_under : '4.1',
  power_even : '1.93',
  power_over : '1.93',
  power_even_under : '3.1',
  power_even_over : '4.1',

  normal_odd : '1.93',
  normal_under : '1.93',
  normal_odd_over : '3.72',
  normal_odd_under : '3.72',
  normal_even : '1.93',
  normal_over : '1.93',
  normal_even_under : '3.72',
  normal_even_over : '3.72',

  normal_small : '2.35',
  normal_middle : '2.35',
  normal_big : '2.35',

  power_odd_normal_odd_under : '7.2',
  power_odd_normal_odd_over : '7.2',
  power_odd_normal_even_under : '7.2',
  power_odd_normal_even_over : '7.2',
  power_even_normal_even_over : '7.2',
  power_even_normal_even_under : '7.2',
  power_even_normal_odd_over : '7.2',
  power_even_normal_odd_under : '7.2',

  power_one : '9',
  power_two : '9',
  power_three : '9',
  power_four : '9',
  power_five : '9',
  power_six : '9',
  power_seven : '9',
  power_eight : '9',
  power_nine : '9',
  power_zero : '9'
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
  alert("배당률"+Number(rateText.value));
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



}

