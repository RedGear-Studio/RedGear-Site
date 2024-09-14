var projectName = new URLSearchParams(window.location.search).get("name");


(async () => {
    if (!projectName) return window.location.href = "index.html#Projects";
    const repositoryFetch = await fetch("https://redgear-studio.github.io/RedGear-Site/assets/json/repository.json").then(rep => rep.json());
    const repository = { name: [] }
    function splitRepoList(value) {
        repository.name.push(value.name)
    }
    await repositoryFetch.list.forEach(splitRepoList);

    if (repository.name.includes(projectName)) {
        var xhr4 = new XMLHttpRequest();
        xhr4.onreadystatechange = async () => {
            if (xhr4.readyState === 4) {
                var data = JSON.parse(xhr4.response)
                data = data.filter(r => r.name === projectName)
                if (data[0]) {
                    var images = await fetch("https://api.github.com/repos/RedGear-Studio/RedGear-Site/contents/assets/images").then(rep => rep.json());
                    images = images.filter(i => i.name === projectName + "_red.png")
                    if (images[0]) {
                        images = images[0].path
                    } else {
                        images = "assets/images/logo.png"
                    }
                    var readme = await fetch("https://api.github.com/repos/RedGear-Studio/" + projectName + "/contents").then(rep => rep.json());

                    readme = readme.filter(f => f.name === "README.md")
                    if (readme[0]) readme = await fetch("https://raw.githubusercontent.com/RedGear-Studio/" + projectName + "/main/README.md").then(rep => rep.text());



                    document.getElementsByName("icone")[0].innerHTML.src = images
                    document.getElementsByName("icone")[0].style.display = ""
                    document.getElementsByName("name")[0].innerText = data[0].name
                    document.getElementsByName("projectName")[0].innerText = data[0].name
                    document.getElementsByName("projectDescription")[0].innerText = readme
                    document.getElementsByName("repository")[0].href += data[0].name
                    document.getElementsByName("repository")[1].href += data[0].name
                    if (data[0].description) document.getElementsByName("bio")[0].innerText = data[0].description
                } else {
                    window.location.href = "index.html#Projects";
                }
            }
        }
        xhr4.open('GET', "https://api.github.com/users/RedGear-Studio/repos", true);
        xhr4.send();
    } else {
        window.location.href = "index.html#Projects";
    }
})()
