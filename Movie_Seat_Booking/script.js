// Select elements from the DOM
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI(); // Populate the UI with saved data from localStorage

let ticketPrice = +movieSelect.value; // Initialize ticket price from selected movie

// Save selected movie index and price to localStorage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update the total and count of selected seats
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Create array of selected seat indexes
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); // Save to localStorage

    // Update DOM for selected seats count and total price
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Populate UI with data from localStorage
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    // Check and apply saved seat selections from localStorage
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.includes(index)) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex; // Restore selected movie
    }
}

// Movie select event listener
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value; // Update ticket price
    setMovieData(e.target.selectedIndex, e.target.value); // Save selection
    updateSelectedCount(); // Update count and total after selection change
});

// Seat click event listener
container.addEventListener('click', e => {
    // Toggle 'selected' class for non-occupied seats only
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount(); // Update count and total on seat click
    }
});

// Initial calculation of count and total
updateSelectedCount();
