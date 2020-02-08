const main = document.querySelector("#main");
const addUserBtn = document.querySelector("#add-user");
const doubleBtn = document.querySelector("#double");
const showMillioniaresBtn = document.querySelector("#show-millionaires");
const sortBtn = document.querySelector("#sort");
const calculateWealthBtn = document.querySelector("#calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

// Double money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Sort by wealth
function sortByWealth() {
  data = data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDOM();
}

// Filter by millioniares
function filterByMillionaires() {
  data = data.filter(user => user.money > 1000000);
  updateDOM();
}

// Calculate Wealth
function calculateWealth() {
  const wealth = data.reduce((acc, person) => {
    return acc + person.money;
  }, 0);

  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthElement);
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach(person => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event listeners
addUserBtn.addEventListener("click", getRandomUser);

doubleBtn.addEventListener("click", doubleMoney);

sortBtn.addEventListener("click", sortByWealth);

showMillioniaresBtn.addEventListener("click", filterByMillionaires);

calculateWealthBtn.addEventListener("click", calculateWealth);
