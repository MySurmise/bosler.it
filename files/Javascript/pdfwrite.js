innerpdfinput = document.getElementById("innerpdfinput")


innerpdfinput.onfocus = () => {
    innerpdfinput.placeholder = ""
}

window.onload = () => {
    pdfframe = document.getElementById("pdfframe");
    pdfdocument = pdfframe.contentDocument
    sidebar = pdfdocument.getElementById('sidebar')

    // Close sidebar in pdf at beginning - set to ["opened"] to open it
    sidebar.classList = ["closed"]

    

}