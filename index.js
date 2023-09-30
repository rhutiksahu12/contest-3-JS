const apiKey = 'LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a'


const dateInput = document.getElementById('search-input')
const searchbtn = document.getElementById('search-button')
const image = document.getElementById('image')
const imgTitle = document.getElementById('title')
const imgDesc = document.getElementById('description')
const dayTitle = document.getElementById('day-title')
const historyList = document.getElementById('search-history')



// const date = new Date().toISOString().split('T')[0];


const fetchData = async (date) => {
    const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`
    try {
        const res = await fetch(url)

        if (!res.ok) {
            throw new Error('network Error')
        }
        const data = await res.json();

        console.log(data)

        return data;

    } catch (err) {
        console.error('Error', err)
    }
}

const getCurrentImageOfTheDay = async () => {
    const today = new Date().toISOString().split('T')[0];
    const data = await fetchData(today)
    image.src = data.url
    imgTitle.innerText = data.title
    imgDesc.innerText = data.explanation

}


searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    getImageOfTheDay()
})


const getImageOfTheDay = async () => {
    const selectedDate = dateInput.value
    console.log(selectedDate)
    const data = await fetchData(selectedDate)
    saveSearch(data)
    // addSearchToHistory();
    image.src = data.url
    imgTitle.innerText = data.title
    imgDesc.innerText = data.explanation
    dayTitle.innerText = `Picture of ${selectedDate}`

}

const saveSearch = (data) => {
    const historyArray = localStorage.getItem('list');

    const history = historyArray ? JSON.parse(historyArray) : []
    // console.log(history)
    // const newItem = data;
    history.unshift(data)
    // console.log(history)

    const updatedHistory = JSON.stringify(history)

    localStorage.setItem('list', updatedHistory)
   
}

const addSearchToHistory = async () => {
    const history = await JSON.parse(localStorage.getItem('list'));
    // const history = JSON.parse(list)
    history.forEach(element => {
        const newItem = document.createElement('li')
        const anchor = document.createElement('a')
        anchor.innerText = element.date;
        anchor.href = getImageOfTheDay(element.date)
        newItem.appendChild(anchor)
        // newItem.innerText = element.date;
        historyList.append(newItem)
    });
    // const historyL = JSON.parse(history)
    console.log(history, "history")
}



window.onload = function () {
    getCurrentImageOfTheDay()
    // addSearchToHistory();
   
}