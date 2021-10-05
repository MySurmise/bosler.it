password = document.getElementById('password')
password.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        window.location.href = "/newquotes?key=" + password.value
    }
})
window.onload = () => {
    password.focus()
}