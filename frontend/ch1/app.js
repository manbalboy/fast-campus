let ajax = new XMLHttpRequest();

const rootEl = document.getElementById('root');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

const ajaxFn = function (method = 'GET', url, syncFg = false) {
    ajax.open(method, url, syncFg);
    ajax.send();

    return JSON.parse(ajax.response);
}





const newsDetails = function () {
    const id = location.hash.substr(1);
    const newsContent = ajaxFn('GET', CONTENT_URL.replace('@id', id));

    rootEl.innerHTML = `
        <h1>${newsContent.title}</h1>
        <div>
            <a href="#">목록으로</a>
        </div>
    `;
}


const newsFeedFn = function () {
    const newsFeed = ajaxFn('GET', NEWS_URL);
    const newsList = [];
    newsList.push('<ul>');

    newsFeed.forEach((item) => {
        newsList.push(`
        <li>
            <a href="#${item.id}">
                ${item.title} (${item.comments_count})
            </a>
        </li>
    `);
    });

    newsList.push('</ul>');

    rootEl.innerHTML = newsList.join("");
}

const router = function () {
    const routePath = location.hash;
    if(routePath === '') {
        newsFeedFn();
    } else {
        newsDetails();
    }
};

window.addEventListener('hashchange', router);
router();
