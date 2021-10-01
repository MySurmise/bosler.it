quoteinput = document.getElementById("quoteinput");
language = document.getElementById("languageinput");
language.addEventListener("input", checklanguage);
authorimg = document.getElementById("newauthimg");
authornameinput = document.getElementById("authornameinput");
originurlinput = document.getElementById("originurlinput");
originimginput = document.getElementById("originimginput");
neworiginimg = document.getElementById("neworiginimg");
submitquote = document.getElementById('submitQuote')
authorurlinput = document.getElementById('authorurlinput')
authorimginput = document.getElementById('authorimginput');
clearbutton = document.getElementById('clear')
commitpass = document.getElementById('commitpass')

clearbutton.addEventListener("click", () => {
  quoteinput.value = ""
  language.value = ""
  authornameinput.value = ""
  authorimginput.value = ""
  authorurlinput.value = ""
  originurlinput.value = ""
  originimginput.value = ""
  
})

submitquote.addEventListener("click", () => {

  quotesubmitquery = {
    text: quoteinput.value,
    lang: language.value,
    authorname: authornameinput.value,
    authorimg: authorimginput.value,
    authorurl: authorurlinput.value,
    originurl: originurlinput.value,
    originimg: originimginput.value,
    commitpass: commitpass.value,
  }

  window.location.href = '/submit?' + objectToQueryString(quotesubmitquery)
})

originurlinput.addEventListener("input", () => {
  originimginput.value = extractImg(originurlinput.value);
  neworiginimg.src = extractImg(originurlinput.value);
  neworiginlink.href = originurlinput.value;
});



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


authornameinput.addEventListener("focusout", (event) => {
  if (typeof (title) !== "undefined") {
    authornameinput.value = title
  }
  }
)


authornameinput.addEventListener("keyup", (event) => {
  {
    currentauth = authornameinput.value;
    requeststring =
      "https://" +
      language.value +
      ".wikipedia.org/w/api.php?action=opensearch&search=" +
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
        fetch(
          "https://" +
          language.value +
          ".wikipedia.org/w/api.php?action=query&prop=pageimages&titles=" +
          title +
          "&format=json&origin=*"
        )
          .then((resp) => resp.json())
          .then((resp) => {
            if (typeof (img = Object.values(resp.query.pages)[0].pageimage) !== "undefined") {
              authorimg.src = "https://commons.wikimedia.org/wiki/Special:FilePath/" + img
              document.getElementById("authorimginput").value = "https://commons.wikimedia.org/wiki/Special:FilePath/" + img;
            } else {
              document.getElementById("authorimginput").value = ""
              authorimg.src = ""
            }
          });
      });
  }
});


function objectToQueryString(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function extractRoot(url) {
  var hostname;
  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }
  hostname = hostname.split(":")[0];
  hostname = hostname.split("?")[0];

  var domain = hostname;
  (splitArr = domain.split(".")), (arrLen = splitArr.length);

  if (arrLen > 2) {
    domain = splitArr[arrLen - 2] + "." + splitArr[arrLen - 1];
    if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
      domain = splitArr[arrLen - 3] + "." + domain;
    }
  }
  return domain;
}

const extractImg = (url) => {
  root = extractRoot(url);
  if (root == "youtu.be") {
    return (
      "https://i.ytimg.com/vi/" +
      url.split("youtu.be/")[1].slice(0, 11) +
      "/hqdefault.jpg"
    );
  } else if (root == "youtube.com") {
    return (
      "https://i.ytimg.com/vi/" +
      url.split("watch?v=")[1].slice(0, 11) +
      "/hqdefault.jpg"
    );
  }
};

function checklanguage() {
  if (language.value.length > 2 || language.value.length == 1) {
    language.style.color = "red";
  } else {
    language.style.color = "black";
  }
}

function checkauthor(event) { }


window.onload = function () {
  document.getElementById('commitpass').value = "";
};
