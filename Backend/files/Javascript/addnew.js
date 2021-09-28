quoteinput = document.getElementById('quoteinput')
quoteinput.addEventListener('input', check)
language = document.getElementById('languageinput')
language.addEventListener('input', checklanguage)
authorimg = document.getElementById('authorimg')
authorname = document.getElementById('authornameinput')
authorname.addEventListener('input', (event) => {
    if (event.data == " ") {
        fetch(window.location.origin + '/authorsearch?q=' + authorname.value).then(resp => {
            return resp.text()
        })
        .then(resp => {
            console.log(resp)
            if (resp !== "") {
                authorimg.src = resp
                console.log(resp)
            }

        }).catch(err => console.log('ERROR: ', err))
    }
})

window.onload = function() {
    quoteinput.value = ""
}

function checklanguage() {
    if (language.value.length > 2) {
        language.style.color = "red"
    } else {
        language.style.color = "black"
    }
}

function checkauthor(event) {
    
}

function check() {

    quoteinput.style.height = ""
    quoteinput.style.height = Math.min(quoteinput.scrollHeight, 1000) - 50 + "px"
    url = window.location.origin
    console.log(url)
    console.log(query = quoteinput.value.replaceAll("\n", " ").replaceAll("+", "%2B").replaceAll("&", "%26").replaceAll("#", "%23"))
    if (query.length > 10) {
        fetch(url + '/search?query=' + query)
            .then(response => {
                // console.log("Erfolg", response)
                return response.json();
            }).then(function (data) {
                data.forEach((language) => {
                    console.log(language.lang, language.prob)
                })
                language.value = data[0].lang
            })
            .catch(err => {
                console.log("Error", err)
            })
    }
}
