let ajax = new XMLHttpRequest();

const rootEl = document.getElementById('root');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

ajax.open('GET', NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);

const ulEl = document.createElement('ul');

const content = document.createElement('div');

window.addEventListener('hashchange', function(e) {
    const id = location.hash.substr(1);
    ajax.open('GET', CONTENT_URL.replace('@id', id), false);
    ajax.send();

    const newsContent = JSON.parse(ajax.response);
    const h2El = document.createElement('h1');

    console.dir(newsContent);
    h2El.innerHTML = newsContent.title;

    content.appendChild(h2El);
})

newsFeed.forEach((item) => {
    const liEl =  document.createElement('li');
    const aEl =  document.createElement('a');
    liEl.appendChild(aEl)

    aEl.href = `#${item.id}`;
    aEl.innerHTML = `${item.title} (${item.comments_count}) `;

    ulEl.appendChild(liEl);
});

rootEl.appendChild(ulEl);
rootEl.appendChild(content);