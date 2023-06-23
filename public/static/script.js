const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const day = new Date().getDay()

const start = document.querySelector('#start').value = `${year}-${month}-${day}T8:30`

console.log(start)