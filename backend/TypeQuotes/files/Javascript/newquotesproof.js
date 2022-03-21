ok = document.getElementById('ok')
notok = document.getElementById('notok')

ok.addEventListener('click', () => {
    window.location.href = window.location.href + "&quoteid=" + quoteid + "&approve=true"
})

notok.addEventListener('click', () => {
    window.location.href = window.location.href + "&quoteid=" + quoteid + "&approve=false"
})

window.onload = () => {
    quoteid = document.getElementById('quoteid').innerHTML
}