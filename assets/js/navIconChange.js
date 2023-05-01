function navIconChange(icon) {
    let newIcon = icon.className === 'fa fa-bars icon' ? 'fa fa-close icon' : 'fa fa-bars icon'
    icon.className = newIcon
}