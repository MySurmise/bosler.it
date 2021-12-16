main();

function main() {
  var val = {
    text: document.getElementById("unfinished").innerHTML,
  };
  /*
    document.getElementById('authorimg').src = val.authorimg
    document.getElementById('authorurl').href=val.authorurl
    document.getElementById('originimg').src=val.originimg
    document.getElementById('originurl').href=val.originurl
    document.getElementById('authorname').innerHTML = " - " + val.authorname
    */
  accuracy = 100;
  speednumber = 0;
  textlength = val.text.trim().length;
  splitted_quote = val.text.trim().split(" ");
  console.log(splitted_quote, val, val.text);
  finished = [];
  quote = val;
  current = "";
  wordcount = 0;
  lettercount = 0;
  inputfield = document.getElementById("inputfield");
  const input = document.getElementById("inputfield");
  current = splitted_quote.shift();
  letterwrong = -1;
  inputfield.value = "";
  inputfield.focus();
  inputfield.select();
  inputfield.placeholder = "Type here...";
  progressbar = document.getElementById("progressfinished");
  progresscircle = document.getElementById("progresscircle");
  acc = document.getElementById("accuracynumber");
  accuracyfield = document.getElementById("accuracy");
  speed = document.getElementById("speednumber");
  speedfield = document.getElementById("speed");
  acc.innerHTML = 100;
  speed.innerHTML = 0;
  started = false;
  round = 0;
  mistakes = 0;
  input.addEventListener("input", check);
  inputfield.onpaste = (e) => e.preventDefault();
  textarea = document.getElementById("textarea")
  textarea.scrollTop = 0
  rightfinished = document.getElementById("rightfinished")
  rightcurrent =  document.getElementById("rightcurrent")
  wrongcurrent = document.getElementById("wrongcurrent");
  unfinishedcurrent = document.getElementById("unfinishedcurrent");
  unfinished =  document.getElementById("unfinished");
  finishedandcurrent = document.getElementById("finishedandcurrent"); 
  
  unfinishedcurrent.innerHTML = current + " ";
  unfinished.innerHTML = splitted_quote.join(" ");
}

function startedfunction() {
	
	checkheight = window.setInterval(function () {

		a = textarea.scrollHeight
		b = textarea.offsetHeight
		c = finishedandcurrent.offsetHeight
		d = textlength
		e = beginning = b/2
		f = end = -60
		textarea.scrollTop = c - e  + 8
		// console.log(((a - b) / (a - b - e - f)) * c - e * ((a - b) / (a - b - e - f)))
		// console.log(a,b,c,d,e,f)

	}, 150)

	checkwpm = window.setInterval(function () {
	accuracy = acc.innerHTML
    if (accuracy > 80) {
        accuracyfield.style.backgroundColor =
          "hsla(" + (0.0125 * Math.pow((accuracy - 80), 3)) + ", 82.8%, 45.7%, 1)";
      } else {
        accuracyfield.style.backgroundColor = "hsla(0, 82.8%, 45.7%, 1)";
      }
      if (round > 10) {
        speedfield.style.backgroundColor =
          "hsla(" + speednumber + ", 82.8%, 45.7%, 0.78)";
      }
      time = (Date.now() - startTime) / 1000;
      speed.innerHTML = speednumber = parseInt(typedchars / (time / 12));
   
  }, 500);

}

function coloring() {
  
}

function standardreturn() {
  rightfinished.innerHTML = finished.join(" ") + " ";
  rightcurrent.innerHTML = "";
  wrongcurrent.innerHTML = "";
  unfinishedcurrent.innerHTML = current + " ";
  unfinished.innerHTML = splitted_quote.join(" ");
}

function check() {
  round += 1
  if (round == 5) {
		  startedfunction()
	console.log("started!")	
  }
  inputfield.placeholder = "";
  inputfield = document.getElementById("inputfield");
  entry = inputfield.value;
  lettercount = entry.length;
  typedchars = entry.concat(finished.join(" ")).length;

  if (started) {
    if (letterwrong == -1) {
      progressbar.style.width =
        ((typedchars / textlength) * 100 + 2).toString() + "%";
      progresscircle.style.left =
        ((typedchars / textlength) * 100).toString() + "%";
      time = (Date.now() - startTime) / 1000;
      
      accuracy = 100 - parseInt((mistakes / (typedchars + mistakes)) * 100);
      acc.innerHTML = accuracy;
    }
  } else {
    startTime = Date.now();
    started = true;
  }

  if (entry == current + " " && lettercount == current.length + 1) {
    // move word
    finished.push(current);
    current = splitted_quote.shift();
    standardreturn();
    inputfield.value = "";
    return;
  }
  if (lettercount == 0) {
    // new word
    standardreturn();
    letterwrong = -1;
    return;
  } else {
    if (current.slice(0, lettercount) == entry.slice(0, lettercount)) {
      // words ok
      rightfinished.innerHTML =
        finished.join(" ") + " ";
      rightcurrent.innerHTML = current.slice(
        0,
        lettercount
      );
      wrongcurrent.innerHTML = "";
      unfinishedcurrent.innerHTML =
        current.slice(lettercount) + " ";
      unfinished.innerHTML =
        splitted_quote.join(" ");
      letterwrong = -1;
    } else {
      // words not ok
      if (letterwrong == -1) {
        // first mistake
        letterwrong = lettercount;
        mistakes += 1;
        acc.innerHTML =
          100 - parseInt((mistakes / (typedchars + mistakes)) * 100);
        console.log(letterwrong);
      } else {
        // not first mistake
        if (letterwrong > lettercount) {
          letterwrong = -1;
          standardreturn();
          return;
        }
      }
      rightfinished.innerHTML =
        finished.join(" ") + " ";
      rightcurrent.innerHTML = current.slice(
        0,
        letterwrong - 1
      );
      if (lettercount < current.length) {
       wrongcurrent.innerHTML = current.slice(
          letterwrong - 1,
          lettercount
        );
        unfinishedcurrent.innerHTML =
          current.slice(lettercount) + " ";
        unfinished.innerHTML =
          splitted_quote.join(" ");
      } else {
        wrongcurrent.innerHTML = current
          .concat(" " + splitted_quote.join(" "))
          .slice(letterwrong - 1, lettercount);
        unfinishedcurrent.innerHTML =
          current.slice(lettercount);
        unfinished.innerHTML = current
          .concat(" " + splitted_quote.join(" "))
          .slice(lettercount);
      }
    }
  }
  if (splitted_quote.length == 0 && entry == current) {
    //document.getElementById("textarea").remove()
    aftertyping();
  }
}

function aftertyping() {
  restart = document.getElementById("restart");
  restart.classList.add("fadein05s");
  restart.style.display = "block";
  next = document.getElementById("next");
  next.classList.add("fadein05s");
  next.style.display = "block";
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        restart.classList.add("restarthover");
        document.location.reload();
      } else {
        next.classList.add("nexthover");
        document.location.href = "/newsingle";
      }
    }

    console.log(event);
  });

  inputfield.classList.add("inputfield_fadeout");
  document.getElementById("rightcurrent").id = "rightfinished";
  document.getElementById("unfinishedcurrent").remove();
  inputfield.blur();
  progressbar.style.width = "98%";
  progresscircle.style.left = "96%";
  clearInterval(checkwpm);
  quotearea = document.getElementById("quotearea");
  quotearea.style.paddingBottom = "11vw";
  quotearea.style.minHeight = "11vw";
}
