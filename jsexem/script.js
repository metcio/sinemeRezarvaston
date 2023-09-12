const container = document.querySelector('.container')
const count = document.getElementById('count')
const total = document.getElementById('total')
const select = document.getElementById('movie')
const seats = document.querySelectorAll('.seat:not(.reserved)')



container.addEventListener('click', (e) => {    
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected')

     calculate()
    }
   
})

const calculate = () => {
    const selectedSeat = container.querySelectorAll('.seat.selected')

    let selectedArr = [...selectedSeat]
    const seatArr = [...seats]

    let selectedSeatIndexs = selectedArr.map((seat) => {
        return seatArr.indexOf(seat)
    })

    let  selectedSeatCount = selectedSeat.length;
    // localStorage save to index of method
   saveToStorage(selectedSeatIndexs)    
    count.innerText = selectedSeatCount
    total.innerText = selectedSeatCount * select.value
}

select.addEventListener('change', (e) => {
    calculate()
})

const getLocalStorage = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('seats'))
    const currentMovie = localStorage.getItem('selectedMovie')

        select.selectedIndex = currentMovie
    
    if(selectedSeats.length > 0 && selectedSeats !== null){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }
    
}

const saveToStorage = (item) => {
    localStorage.setItem('seats',JSON.stringify(item))
    localStorage.setItem('selectedMovie',select.selectedIndex)
}
getLocalStorage()
calculate()