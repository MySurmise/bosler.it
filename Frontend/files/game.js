
async function fetchJSON() {
    const response = await fetch(('../files/quote.json'))
    const quote = await response.json()
    return quote
}
fetchJSON().then(value => main(value))


/*
fetch('../files/quote.json')
    .then(response => response.json())
    .then(quote => (window.quotefetched = quote))

await sleep(2000);
*/

function main(val) {
    document.getElementById('authorimg').src = val.authorimg
    document.getElementById('authorurl').href=val.authorurl
    document.getElementById('originimg').src=val.originimg
    document.getElementById('originurl').href=val.originurl
    document.getElementById('authorname').innerHTML = " - " + val.authorname
    textlength = val.text.trim().length
    splitted_quote = val.text.trim().split(" ")
    finished = []
    quote = val
    current = ""
    wordcount = 0
    lettercount = 0
    inputfield = document.getElementById("inputfield")
    const input = document.getElementById('inputfield');
    input.addEventListener('input', check);
    current = splitted_quote.shift()
    document.getElementById("unfinishedcurrent").innerHTML = current + " "
    document.getElementById("unfinished").innerHTML = splitted_quote.join(" ")
    letterwrong = -1
    inputfield.value = ""
    inputfield.focus();
     inputfield.select();
    inputfield.placeholder = "Type here..."
    progressbar = document.getElementById('progressfinished')
    progresscircle = document.getElementById('progresscircle')
    acc = document.getElementById("accuracynumber")
    speed = document.getElementById("speednumber")
    acc.innerHTML  = 100
    speed.innerHTML = 0
    started = false
    round = 0
    mistakes = 0
    inputfield.onpaste = e => e.preventDefault();
    checkwpm = window.setInterval(function () {
        if (started) {
            time = (Date.now() - startTime) / 1000
            speed.innerHTML = parseInt(typedchars / (time / 12))
        }
    }, 1000);
   

}


function standardreturn() {
    document.getElementById("rightfinished").innerHTML = finished.join(" ") + " "
    document.getElementById("rightcurrent").innerHTML = ""
    document.getElementById("wrongcurrent").innerHTML = ""
    document.getElementById("unfinishedcurrent").innerHTML = current + " "
    document.getElementById("unfinished").innerHTML = splitted_quote.join(" ")
}



function check() {
    inputfield.placeholder=""
    inputfield = document.getElementById("inputfield")
    entry = inputfield.value
    lettercount = entry.length;
    typedchars = entry.concat(finished.join(" ")).length


    if (started) {
        if (letterwrong == -1) {
            progressbar.style.width = ((typedchars / textlength *100 +2).toString() + '%')
            progresscircle.style.left = ((typedchars / textlength  * 100 ).toString() + '%')
            time = (Date.now() - startTime) / 1000
            if (round == 5) {
            
                speed.innerHTML = parseInt(typedchars / ( time/12))
            } else {
                round += 1
            }
                acc.innerHTML = 100 - parseInt(mistakes / (typedchars+mistakes) * 100)
        }
    } else {
        startTime = Date.now()
        started = true
    }
    /* debugging
    console.log(progressbar.style.width)
    console.log(current.slice(0, lettercount+1) )
    console.log(entry.slice(0, lettercount+1))
    console.log(lettercount)
    console.log(entry)
    console.log(current)
    console.log(lettercount)
    console.log(current.length)
    console.log(entry == (current + " ") )
    console.log(lettercount == current.length+1)
    */
    if (entry == (current + " ") && lettercount == current.length+1) { // move word
        finished.push(current)
        current = splitted_quote.shift()
        standardreturn()
        inputfield.value = ""
        return
    }
    if (lettercount == 0) { // new word
        standardreturn()
        letterwrong = -1
        return
    } else {
        if (current.slice(0, lettercount) == entry.slice(0, lettercount)) { // words ok
            console.log("passt")
            document.getElementById("rightfinished").innerHTML = finished.join(" ") + " "
            document.getElementById("rightcurrent").innerHTML = current.slice(0, lettercount)
            document.getElementById("wrongcurrent").innerHTML = ""
            document.getElementById("unfinishedcurrent").innerHTML = current.slice(lettercount) + " "
            document.getElementById("unfinished").innerHTML = splitted_quote.join(" ")
             letterwrong = -1
            

        } else {  // words not ok
            if (letterwrong == -1) { // first mistake
                letterwrong = lettercount
                mistakes += 1
                acc.innerHTML = 100 - parseInt(mistakes / (typedchars + mistakes) * 100)
                console.log(letterwrong)
            } else { // not first mistake
                if (letterwrong > lettercount) {
                    letterwrong = -1
                    standardreturn()
                    return
                }
            }
            document.getElementById("rightfinished").innerHTML = finished.join(" ") + " "
            document.getElementById("rightcurrent").innerHTML = current.slice(0, letterwrong-1)
            if (lettercount < current.length){
                document.getElementById("wrongcurrent").innerHTML = current.slice(letterwrong - 1, lettercount)
                document.getElementById("unfinishedcurrent").innerHTML = current.slice(lettercount) + " "
                document.getElementById("unfinished").innerHTML =  splitted_quote.join(" ")
            } else {
                document.getElementById("wrongcurrent").innerHTML = current.concat(" " + splitted_quote.join(" ")).slice(letterwrong - 1, lettercount)
                document.getElementById("unfinishedcurrent").innerHTML = current.slice(lettercount)
                document.getElementById("unfinished").innerHTML = current.concat(" " + splitted_quote.join(" ")).slice(lettercount )
            }
            
        }
    }
    if (splitted_quote.length == 0 && entry == current) {
        //document.getElementById("textarea").remove()
        aftertyping()
    }
}

function aftertyping() {
    inputfield.classList.add("inputfield_fadeout")
    document.getElementById("rightcurrent").id = "rightfinished"
    document.getElementById("unfinishedcurrent").remove()
    inputfield.blur();
    progressbar.style.width =  '98%'
    progresscircle.style.left = '96%'
    clearInterval(checkwpm)
    quotearea = document.getElementById('quotearea')
    quotearea.style.paddingBottom = "12rem"
    
    next = document.getElementById('restart')
    restart.classList.add('fadein05s')
    next = document.getElementById('next')
    next.classList.add('fadein05s')
}

