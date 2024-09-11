function incidents(it) {
    var expand = it.attributes["aria-expanded"].value;
    if (expand === "false") it.setAttribute("aria-expanded", "true")
    else it.setAttribute("aria-expanded", "false")
}


const xhr3 = new XMLHttpRequest();
xhr3.onreadystatechange = () => {
    if (xhr3.readyState === 4) {
        console.log(xhr3)
        console.log(xhr3.response)
        console.log(xhr3.responseText)

    }
}
xhr3.open('GET', "http://node1.adky.net:3034/incidents", true);
xhr3.send();
