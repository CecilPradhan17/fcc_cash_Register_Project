let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const cashRecieved = document.getElementById("cash");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const cashInDrawer = document.querySelector("#drawer ul");
const priceInput = document.getElementById("price");

let changeList = {};

const addToList = (amount,number) => 
{
  changeList[amount] = (changeList[amount] ? changeList[amount] : 0 ) + number;
}

const updateCID = (arrayNum,number) => 
{
  cid[arrayNum][1] =round(cid[arrayNum][1] - number);
}

const round = (amount) => 
{
  return Math.round(amount * 100) / 100 ;
}

const displayCid = () =>
{
  cashInDrawer.innerHTML = cid.map(row => row.join(": $")).join("<br><br>");
}

const displayChange = (status) =>
{
  changeDue.textContent = "";
  changeDue.innerHTML = `Status: ${status}<br>` + ((Object.entries(changeList)).map(([key,value]) => `${key}: $${value}`)).join("<br>");
}

const buttonPress = () => {
  price = parseFloat(priceInput.value);
  changeList = {};
  let cash = parseFloat(cashRecieved.value);
  let hasExactChange = true;
  if (price > cash)
  {
    alert("Customer does not have enough money to purchase the item");
  }
  else if (price === cash)
  {
    changeDue.textContent = "No change due - customer paid with exact cash";
  }
  else
  {
    let change = round(cash - price);
    while (change > 0)
    {
      if (change >= 100 && cid[8][1] != 0)
      {
        addToList("One Hundred",100);
        updateCID(8,100);
        change = round(change - 100);
      }
      else if (change >= 20 && cid[7][1] != 0)
      {
        addToList("Twenty",20);
        updateCID(7,20);
        change = round(change - 20);
      }
      else if (change >= 10 && cid[6][1] != 0)
      {
        addToList("Ten",10);
        updateCID(6,10);
        change = round(change - 10);
      }
      else if (change >= 5 && cid[5][1] != 0)
      {
        addToList("Five",5);
        updateCID(5,5);
        change = round(change - 5);
      }
      else if (change >= 1 && cid[4][1] != 0)
      {
        addToList("One",1);
        updateCID(4,1);
        change = round(change - 1);
      }
      else if (change >= 0.25 && cid[3][1] != 0)
      {
        addToList("Quarter",0.25);
        updateCID(3,0.25);
        change = round(change - 0.25);
      }
      else if (change >= 0.1 && cid[2][1] != 0)
      {
        addToList("Dime",0.1);
        updateCID(2,0.1);
        change = round(change - 0.1);
      }
      else if (change >= 0.05 && cid[1][1] != 0)
      {
        addToList("Nickel",0.05);
        updateCID(1,0.05);
        change = round(change - 0.05);
      }
      else if (change >= 0.01 && cid[0][1] != 0)
      {
        addToList("Penny",0.01);
        updateCID(0,0.01);
        change = round(change - 0.01);
      }
      else
      {
        changeDue.textContent = "Status: INSUFFICIENT_FUNDS";
        change = 0;
        hasExactChange = false;
        break;
      }
    }
    change = round(change);
    if (hasExactChange)
    {
      let totalChangeLeft = round(cid.reduce((sum,curr) => sum + curr[1],0));
      if (totalChangeLeft)
      {
        displayChange("OPEN");
      }
      else
      {
        displayChange("CLOSED");
      }
      displayCid();
    }
  }
}


displayCid();

purchaseBtn.addEventListener("click", buttonPress);