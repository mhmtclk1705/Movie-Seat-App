const container = document.querySelector(".container");
const count = document.getElementById("count")
const movieCategory = document.getElementById("movie");
const film = document.getElementById("film");
const total = document.getElementById("total");
const seats = document.querySelectorAll(".seat:not(.reserved)")


getFromLocaleStorage();
calculateTotal();


container.addEventListener("click", (e) => {
    if(e.target.classList.contains("seat")){
        e.target.classList.toggle("selected")
        calculateTotal();
        
    }
})


movieCategory.addEventListener("change", (e) => {

        if(e.target.value == "10"){
        film.innerText = "Avengers: Endgame ($10)";
        
        
    }
        else if(e.target.value == "12"){
        film.innerText = "Joker ($12)";
    }
        else if(e.target.value == "8"){
        film.innerText = "Toy Story 4 ($8)";
    }
        else if(e.target.value == "9"){
        film.innerText = "The Lion King ($9)";
    }
    
    calculateTotal();

})


function calculateTotal(){
    const selectedSeats = container.querySelectorAll(".seat.selected");
    const selectedArray = [];
    const seatsArray = [];

    selectedSeats.forEach((seat) => {
        selectedArray.push(seat);
    })
    seats.forEach((seat) => {
        seatsArray.push(seat)
    });

    const selectedSeatIndex = selectedArray.map((seat) => {
        return seatsArray.indexOf(seat)})
        

    const selectedCount = container.querySelectorAll(".seat.selected").length;
        const price = movieCategory.value
        count.innerText = selectedCount;
        total.innerText = price * selectedCount
    
        saveToLocaleStorage(selectedSeatIndex);
}


function saveToLocaleStorage(index){
    localStorage.setItem("selectedSeats", JSON.stringify(index));
    localStorage.setItem("selectedMovieIndex", movieCategory.selectedIndex);
}

function getFromLocaleStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if(selectedMovieIndex != null) {
        movieCategory.selectedIndex = selectedMovieIndex;
        film.innerText = movieCategory[selectedMovieIndex].innerText
    }
}

