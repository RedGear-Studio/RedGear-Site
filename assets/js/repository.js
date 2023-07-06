const repository = require("assets/json/repository.json")
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
console.log("r")
const xhr2 = new XMLHttpRequest();
console.log("r2")
xhr2.onreadystatechange = () => {
    console.log(load)
    if (xhr2.readyState === 4) {
        var data = JSON.parse(xhr2.response)
        var repoList = []
        console.log(repoList)
        for (var i in data) {
            console.log(data[i].name)
            if (repository.list.includes(data[i].name)) {
                console.log("pushed")

                repoList.push(html(data[i].name, data[i].description))
            }
        }
        console.log(repoList)
        console.log(document.getElementsByName("mainprojects")[0])
        document.getElementsByName("mainprojects")[0].innerHTML = repoList.join("")
        console.log(document.getElementsByName("mainprojects")[0])
    }
}
console.log("r3")
xhr2.open('GET', "https://api.github.com/users/RedGear-Studio/repos", true);
console.log("get")
xhr2.send();
console.log("send")
