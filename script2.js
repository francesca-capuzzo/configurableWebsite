function setting() {
    fetch('./assets/settings/setting.json')
    .then(response => response.json())
    .then(applySettings)
    .catch(error => console.log(error));
}

function settingTheme() {
    fetch('./assets/settings/setting.json')
    .then(response => response.json())
    .then(changeTheme)
    .catch(error => console.log(error));
}

function settingStyle() {
    fetch('./assets/settings/setting.json')
    .then(response => response.json())
    .then(changeWebsiteStyle)
    .catch(error => console.log(error));
}

function pages() {
   fetch('./assets/settings/pagesMarkdown.json')
   .then(response => response.json())
   .then(configurePages)
   .catch(error => console.log(error));
}


function applySettings(data) {
    
    document.title = data.title;
    const title2 = document.getElementById('main-title');
    const text2 = document.createTextNode(data.title);
    title2.appendChild(text2);

    const imageHeader = document.getElementById('header');
    imageHeader.style.backgroundImage = "url(" + data.headerImage + ")";
    imageHeader.className = 'imageHeader';

    const footer = document.getElementsByClassName('link-container')[0];
    for (const item of data.footerLinks) {
        const textFooter = document.createTextNode(item.text);
        const link = document.createElement('a');
        link.setAttribute('href', item.url);
        link.appendChild(textFooter);
        footer.appendChild(link);
    }
    
   
}

function configurePages(pageSetting) {
    setNavMenu(pageSetting);

    const paramString = window.location.search;
    const params = new URLSearchParams(paramString);
    let id = params.get('id');

    if(!id){
        id = 'p1'
    }
    const page = pageSetting.filter(p => p.id === id)[0];
    createPages(page);
}


function setNavMenu(pageSetting) {
    const navMenu = document.getElementById('nav-menu');
    for (const page of pageSetting) {
        const a = document.createElement('a');
        const node = document.createTextNode(page.name);
        a.appendChild(node);

        const url = "/?id=" + page.id;
        a.href = url;

        navMenu.appendChild(a);
    }
}



function createPages(data) {

    const page = document.getElementById('page-content');
    page.innerHTML = marked.parse(data.content);
}



function changeTheme(data) {
    const element = document.body;
    element.classList.toggle("dark-mode");
}


function changeWebsiteStyle(data) {
    const newElement = document.body;
    newElement.classList.toggle("new-mode");
}


function createHTMLelements(elementSetting) {
    switch (elementSetting.tag) {
        case 'h2':
            return createH2(elementSetting);
        case 'p':
            return createP(elementSetting);
        case 'img':
            return createIMG(elementSetting);
        case 'div':
            return createDIV(elementSetting);
        default:
            break;
    }
}


function createH2(elementSetting) {
    const h2 = document.createElement('h2');
    const node = document.createTextNode(elementSetting.text);
    h2.appendChild(node);
    return h2;
}


function createP(elementSetting) {
    const p = document.createElement('p')
    const node = document.createTextNode(elementSetting.text);
    p.appendChild(node);
    return p;
}


function createIMG(elementSetting) {
    const img = document.createElement('img');
    img.src = elementSetting.url;
    return img;
}


function createDIV(elementSetting) {
    const div = document.createElement('div');
    for (const element of elementSetting.children) {
        const htmlElement = createHTMLelements(element);
        div.appendChild(htmlElement);
    }
    return div;
}
