let ajax = new XMLHttpRequest();

const rootEl = document.getElementById('root');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

const ajaxFn = function (method = 'GET', url, syncFg = false ) {
    ajax.open(method, url, syncFg);
    ajax.send();

    return JSON.parse(ajax.response);
}


const newsFeed = ajaxFn('GET', NEWS_URL);

const ulEl = document.createElement('ul');

const content = document.createElement('div');

window.addEventListener('hashchange', function(e) {
    const id = location.hash.substr(1);

    const newsContent = ajaxFn('GET', CONTENT_URL.replace('@id', id)); 
    const h2El = document.createElement('h1');

    console.dir(newsContent);
    h2El.innerHTML = newsContent.title;

    content.appendChild(h2El);
})

newsFeed.forEach((item) => {
    const div = document.createElement('div');

    div.innerHTML = `
        <li>
            <a href="#${item.id}">
                ${item.title} (${item.comments_count})
            </a>
        </li>
    `;

    ulEl.appendChild(div.children[0]);
});

rootEl.appendChild(ulEl);
rootEl.appendChild(content);