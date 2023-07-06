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