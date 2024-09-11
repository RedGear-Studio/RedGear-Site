function incidents(it) {
    var expand = it.attributes["aria-expanded"].value;
    if (expand === "false") it.setAttribute("aria-expanded", "true")
    else it.setAttribute("aria-expanded", "false")
}


const xhr3 = new XMLHttpRequest();
xhr3.onreadystatechange = () => {
    if (xhr3.readyState === 4) {
        var data = JSON.parse(xhr3.response)
        // document.getElementById(this.)
        data = data.msg
        for (var i in data) {
            var msg = message()
            msg = msg.replace("${avatar}", data[i].avatar)
            msg = msg.replace("${username}", data[i].username)
            msg = msg.replace("${date}", data[i].timestamp)
            msg = msg.replace("${content}", data[i].content)
            window.mobileCheck()
            if (window.mobileCheck() === true) {
                msg = msg.replace('<span class="accordion-subtitle" id="accordion-subtitle-"> - </span>', "")
            }
            document.getElementById("latest-incidents").innerHTML += msg
        }
    }
}
xhr3.open('GET', "https://thebacou.github.io/Site-Okoura/testRedgear.json", true); /* http://node1.adky.net:3034/incidents */
xhr3.send();



function message() {
    return `<div class="accordion-item">` +
    `<button id="accordion-button" aria-expanded="false" onclick="incidents(this)">` +
    '<img src="${avatar}" class="profil">' +
    `<span>` +
    '${username}' +
    `</span>` +
    `<span class="accordion-subtitle" id="accordion-subtitle-"> - </span>` +
    `<span class="accordion-subtitle">` +
    'Incident of ${date}' +
    `</span>` +
    `<span class="icon" aria-hidden="true"></span>` +
    `</button>` +
    `<div class="accordion-content">` +
    '<p>${content}</p>' +
    `</div>` +
    `</div>`
}
