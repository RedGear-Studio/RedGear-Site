function incidents(it) {
    var expand = it.attributes["aria-expanded"].value;
    if (expand === "false") it.setAttribute("aria-expanded", "true")
    else it.setAttribute("aria-expanded", "false")
}


const xhr3 = new XMLHttpRequest();
xhr3.onreadystatechange = () => {
    if (xhr3.readyState === 4) {
        var data = xhr3.response
        document.getElementById("ppp123").innerHTML = data
    }
}
xhr3.open('GET', "node1.adky.net:3034/incidents", true);
xhr3.send();
