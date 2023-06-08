function navIconChange() {
    let list = document.getElementById("navbarList")
    let finish = document.getElementById("navbarListFinish")
    let icon = document.getElementById("navButton")

    if (icon.className === "fa fa-close") {
        icon.className = "fa fa-bars"
        list.style.display = "none"
        finish.style.display = "none"
    } else {
        icon.className = "fa fa-close"
        list.style.display = "block"
        finish.style.display = "block"
    }
}


$(window).on("load", function() {
    console.log("test")
});


// Auto update the bio on the Title page
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        var data = JSON.parse(xhr.response)
        document.getElementsByName("bio")[0].innerText = data.bio
    }
}
xhr.open('GET', "https://api.github.com/users/RedGear-Studio", true);
xhr.send();



// Auto update the description on the Main project
const xhr2 = new XMLHttpRequest();
xhr2.onreadystatechange = () => {
    if (xhr2.readyState === 4) {
        var data = JSON.parse(xhr2.response)
        for (var i in data) {
            const element = document.getElementByName("description-" + data[i].name) || null
            if (element) element.innerText = data[i].description
        }
    }
}
xhr2.open('GET', "https://api.github.com/users/RedGear-Studio/repos", true);
xhr2.send();