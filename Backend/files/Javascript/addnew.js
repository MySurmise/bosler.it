quoteinput = document.getElementById("quoteinput");
language = document.getElementById("languageinput");
language.addEventListener("input", checklanguage);
authorimg = document.getElementById("newauthimg");
authornameinput = document.getElementById("authornameinput");

quoteinput.addEventListener("input", (event) => {
    quoteinput.style.height = "";
    quoteinput.style.height = Math.min(quoteinput.scrollHeight, 1000) - 50 + "px";
    if (event.inputType == "insertFromPaste" || event.data == " ") {
        url = window.location.origin;
        console.log(event);
        console.log(
            (query = quoteinput.value
                .replaceAll("\n", " ")
                .replaceAll("+", "%2B")
                .replaceAll("&", "%26")
                .replaceAll("#", "%23"))
        );

        fetch(url + "/search?query=" + query)
            .then((response) => {
                // console.log("Erfolg", response)
                return response.json();
            })
            .then(function (data) {
                data.forEach((language) => {
                    console.log(language.lang, language.prob);
                });
                language.value = data[0].lang;
            })
            .catch((err) => {
                console.log("Error", err);
            });
    }
});

authornameinput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        currentauth = authornameinput.value;
        requeststring =
            "https://" + language.value + ".wikipedia.org/w/api.php?action=opensearch&search=" +
            currentauth +
            "&utf8=&format=json&origin=*";
        console.log("'" + requeststring + "'");
        fetch(requeststring)
            .then((resp) => resp.json())
            .then((resp) => {
                console.log(resp);
                title = resp[1][0];
                link = resp[3][0];
                document.getElementById("newauthlink").href = link;
                document.getElementById("authorurlinput").value = link;
                fetch("https://" +
                    language.value +
                    ".wikipedia.org/w/api.php?action=query&prop=pageimages&titles=" +
                    title +
                    "&format=json&origin=*").then((resp) => resp.json())
                    .then((resp) => {
                        console.log(
                            img =
                            "https://commons.wikimedia.org/wiki/Special:FilePath/" +
                            Object.values(resp.query.pages)[0].pageimage)
                        document.getElementById("authorimginput").value = img;
                        authorimg.src = img;
                    });
               

            });
        
    
    }
})


window.onload = function () {
    quoteinput.value = "";
};

function checklanguage() {
    if (language.value.length > 2 || language.value.length == 1) {
        language.style.color = "red";
    } else {
        language.style.color = "black";
    }
}

function checkauthor(event) { }
