let ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';

ajax.open('GET', NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);

const rootEl = document.getElementById('root');
const ulEl = document.createElement('ul');

newsFeed.forEach((item) => {
    const liEl =  document.createElement('li');
    liEl.innerHTML= `<li> ${item.title} </li>`;
    ulEl.appendChild(liEl);
});

rootEl.appendChild(ulEl);