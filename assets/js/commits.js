var projectName = new URLSearchParams(window.location.search).get("name");


function mobileCheck() {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

function commits(it) {
    var expand = it.attributes["aria-expanded"].value;
    if (expand === "false") it.setAttribute("aria-expanded", "true")
    else it.setAttribute("aria-expanded", "false")
}

(async () => {
    if (!projectName) return window.location.href = "index.html#Projects";
    const repositoryFetch = await fetch("https://redgear-studio.github.io/RedGear-Site/assets/json/repository.json").then(rep => rep.json());
    const repository = { name: [] }
    function splitRepoList(value) {
        repository.name.push(value.name)
    }
    await repositoryFetch.list.forEach(splitRepoList);

    if (repository.name.includes(projectName)) {
        const xhr5 = new XMLHttpRequest();
        xhr5.onreadystatechange = () => {
            if (xhr5.readyState === 4) {
                var data = JSON.parse(xhr5.response)
                var coms = 0
                for (var i in data) {
                    var msg = message()
                    msg = msg.replace("${avatar}", data[i].author["avatar_url"])
                    msg = msg.replace("${username}", data[i].author.login)
                    msg = msg.replace("${date}", data[i].commit.author.date)
                    msg = msg.replace("${content}", data[i].commit.message === "" ? "No message" : data[i].commit.message)
                    msg = msg.replace("${link}", data[i]["html_url"])
                    document.getElementsByName("viewmore")[0].href = "https://github.com/RedGear-Studio/" + projectName + "/commits"
                    if (mobileCheck() === true) {
                        msg = msg.replace('<span class="accordion-subtitle" id="accordion-subtitle-"> - </span>', "<br>")
                    }
                    if (coms >= 5) return;
                    coms += 1
                    document.getElementById("latest-commits").innerHTML += msg
                }
            }
        }
        xhr5.open('GET', "https://api.github.com/repos/RedGear-Studio/" + projectName + "/commits", true); /* http://node1.adky.net:3034/commits */
        xhr5.send();
    } else {
        window.location.href = "index.html#Projects";
    }
})()


function message() {
    return `<div class="accordion-item">` +
        `<button id="accordion-button" aria-expanded="false" onclick="commits(this)">` +
        '<img src="${avatar}" class="profil">' +
        `<span>` +
        '${username}' +
        `</span>` +
        `<span class="accordion-subtitle" id="accordion-subtitle-"> - </span>` +
        `<span class="accordion-subtitle">` +
        'Commits of ${date}' +
        `</span>` +
        `<span class="icon" aria-hidden="true"></span>` +
        `</button>` +
        `<div class="accordion-content">` +
        '<p>${content}<br>' +
        '<a class="viewmore" href="${link}">View commit</a>' +
        `</p></div>` +
        `</div>`
}
