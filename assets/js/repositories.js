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

module.exports = {
    bio() {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                var data = JSON.parse(xhr.response)
                document.getElementById("news-lead").innerHTML
            }
        }
        xhr.open('GET', "https://api.github.com/users/RedGear-Studio", true);
        xhr.send();
    }
}