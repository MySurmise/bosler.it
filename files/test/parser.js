

function extractRoot(url) {
    var hostname;
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];

    var domain = hostname;
    splitArr = domain.split('.'),
        arrLen = splitArr.length;

    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    return domain;
}

const extractImg = (url) => {
    root = extractRoot(url)
    if (root == "youtu.be") {
        return url.split("youtu.be")[1].slice(0, 11)
    } else if (root == "youtube.com") {
        return url.split("watch?v=")[1].slice(0, 11)
    }
    
}

id = extractImg("https://www.youtube.com/watch?v=V_Kr9OSfDeU")
console.log(id)