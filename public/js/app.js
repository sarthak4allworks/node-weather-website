console.log('Client side java script file is loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#location');
const messageTwo = document.querySelector('#forecast');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    const url = 'http://localhost:3000/weather?address=' + location;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                //console.log(data.error);
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                //console.log(data);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecastData;
            }
        });
    });
});