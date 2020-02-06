const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");

populateUi();

let ticketPrice = parseInt(movieSelect.value);

// Get data from localStorage and populate UI
function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
  const selectedMoviePrice = JSON.parse(localStorage.getItem('selectedMoviePrice'));
  
  if (selectedSeats !== null && selectedSeats.length > 0) {
    selectedSeats.forEach(seat => {
      seats[seat].classList.toggle('selected')
    })

    const totalSeats = selectedSeats.length;

    count.innerText = totalSeats;
    total.innerText = totalSeats * selectedMoviePrice;
  }

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
  
}

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  // setMovieData(movieSelect.selectedIndex, ticketPrice)

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = ticketPrice * selectedSeatsCount;
}

// Movie select event
movieSelect.addEventListener("change", e => {
  ticketPrice = parseInt(e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
