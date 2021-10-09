var iframeelement = document.getElementById("pdfframe");

function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";

    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return (w1 - w2);
};
scrollbarwidth = getScrollBarWidth()

iframeelement.addEventListener("load", () => {

    var pdfframe = iframeelement.contentDocument

    pages = pdfframe.getElementsByClassName('pf')

    pdfcontainer = pdfframe.getElementById('page-container')

    pdfcontainer.style.cssText = '-ms-zoom: 2;  -webkit-zoom: 2; zoom: 2; -moz-transform:  scale(2,2);  -moz-transform-origin: left top; '
    scaledWidth = Math.max.apply(Math, Array.from(pages).map(function (o) { return o.getBoundingClientRect().width; }))
    iframeelement.style.width = "" + scaledWidth + "px";
    pdfcontainer.style.overflowX = 'hidden';
    pdfframe.getElementsByTagName("html")[0].scrollLeft = scaledWidth / 2 - 16
    console.log(scaledWidth / 2 - 16)
    pdfframe.getElementsByTagName("body")[0].style.overflow = "hidden"
})
pdfinput = document.getElementById('pdfinput')
outercircle = document.getElementById('outercircle')

moving = (e) => {
    pdfinput.style.left = e.clientX - 25 + "px"
    pdfinput.style.top = e.clientY - pdfinput.getBoundingClientRect().height / 2 + "px"
    outercircle.style.top = pdfinput.getBoundingClientRect().top - 25 + "px"
    outercircle.style.left = pdfinput.getBoundingClientRect().left - 100 + "px"
}

outercircle.addEventListener("mousedown", (e) => {
    document.addEventListener("mousemove", moving)
    pdfframe.addEventListener("mousemove", moving)
})

document.addEventListener("mouseup", (e) => {
    document.removeEventListener("mousemove", moving)
    pdfframe.removeEventListener("mousemove", moving)
})




window.onload = () => {
    outercircle.style.top = pdfinput.getBoundingClientRect().top - 25 + "px"
    outercircle.style.left = pdfinput.getBoundingClientRect().left - 100 + "px"
}

pdfinput.onfocus = () => {
    pdfinput.placeholder = "" 
}