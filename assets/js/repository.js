var repository = {

    "list": [
        "Atlas77",
        "Realms-of-Power"
    ],
    "html": [
        "<div class='col-sm-6 col-md-5 col-lg-4 item'>",
        "<div id='features' class='box'>",
        "<i class='fa fa-connectdevelop icon' style='color: var(--main-color);'></i>",
        "<h3 class='name'>{name}</h3>",
        "<p class='description' style='color: var(--secondary-text-color);'>",
        "{description}",
        "</p></div></div>"
    ]
}
function html(name, description) {
    var content = repository.html.join("")
    return content.replace("{name}", name).replace("{description}", description)
}


jQuery(window).on("load", function() {
    console.log("test")
});



// Auto update the bio on the Title page
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        var data = JSON.parse(xhr.response)
        if (!data.bio) return;
        else document.getElementsByName("bio")[0].innerText = data.bio
    }
}
xhr.open('GET', "https://api.github.com/users/RedGear-Studio", true);
xhr.send();



// Auto update the description on the Main project
const xhr2 = new XMLHttpRequest();
xhr2.onreadystatechange = () => {
    if (xhr2.readyState === 4) {
        var data = JSON.parse(xhr2.response)
        var repoList = []
        for (var i in data) {
            if (repository.list.includes(data[i].name)) {

                repoList.push(html(data[i].name, data[i].description))
            }
        }
        document.getElementsByName("mainprojects")[0].innerHTML = repoList.join("")
    }
}
xhr2.open('GET', "https://api.github.com/users/RedGear-Studio/repos", true);
xhr2.send();