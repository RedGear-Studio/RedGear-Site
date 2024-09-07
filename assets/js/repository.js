function html(repository, name, description) {
    var content = repository.html.join("")
    var icon = repository.icon["null"]
    if (repository.icon[name] !== null) icon = repository.icon[name]
    return content.replace("{icon}", icon).replaceAll("{name}", name).replace("{description}", description)
}

(async () => {
    const repositoryFetch = await fetch("https://redgear-studio.github.io/RedGear-Site/assets/json/repository.json").then(rep => rep.json());
    const repository = { name: [], icon: { "null": repositoryFetch.icons["null"] }, html: repositoryFetch.html }
    function splitRepoList(value) {
        repository.name.push(value.name)
        repository.icon[value.name] = value.icon
    }
    await repositoryFetch.list.forEach(splitRepoList);

    const xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = async () => {
        if (xhr2.readyState === 4) {
            var data = JSON.parse(xhr2.response)
            var repoList = []
            for (var i in data) {
                if (repository.name.includes(data[i].name)) {
                    var content = await html(repository, data[i].name, data[i].description)
                    repoList.push(content)
                }
            }
            document.getElementsByName("mainprojects")[0].innerHTML = repoList.join("")
        }
    }
    xhr2.open('GET', "https://api.github.com/users/RedGear-Studio/repos", true);
    xhr2.send();
})()


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
