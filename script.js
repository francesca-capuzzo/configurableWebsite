

function setting() {
    fetch('./assets/settings/setting.json')
    .then(response => response.json())
    .then(applySettings)
    .catch(error => console.log(error));
}


function pages() {
   fetch('./assets/settings/pages.json')
   .then(response => response.json())
   .then(createPages)
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
    
    if (data.theme === 'light') {
        document.body.style.backgroundColor = 'rgba(255,240,237)';
    } else {
        document.body.style.backgroundColor = 'black';

    }
}


function createPages(data) {

    const page = document.getElementById('page-content');
    for (const item of data[0].content) {
        console.log(data.content);
        const tag = document.createElement(item.tag);
        const text = document.createTextNode(item.text);
        tag.appendChild(text);
        page.appendChild(tag);
        tag.setAttribute('src', item.url);
    }
    if (document.body.style.backgroundColor === 'black') {
        page.style.color = 'pink';
    }
}


