let ajax = new XMLHttpRequest();

const rootEl = document.getElementById('root');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

const store = {
    currentPage: 1,
};

const ajaxFn = function (method = 'GET', url, syncFg = false) {
    ajax.open(method, url, syncFg);
    ajax.send();

    return JSON.parse(ajax.response);
}

const newsDetails = function () {
    const id = location.hash.substr(7);
    const newsContent = ajaxFn('GET', CONTENT_URL.replace('@id', id));

    rootEl.innerHTML = `
        <h1>${newsContent.title}</h1>
        <div>
            <a href="#/page/${store.currentPage}">목록으로</a>
        </div>
    `;
}

const newsFeedFn = function () {
    const newsFeed = ajaxFn('GET', NEWS_URL);
    const newsList = [];
    newsList.push('<ul>');

    for (let i = (store.currentPage - 1) * 10; i < store.currentPage  * 10; i++) {
        newsList.push(`
            <li>
                <a href="#/show/${newsFeed[i].id}">
                    ${newsFeed[i].title} (${newsFeed[i].comments_count})
                </a>
            </li>
        `)
    }

    newsList.push('</ul>');

    newsList.push(`
    
        <div>
            <a href="#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}">이전페이지</a>
            <a href="#/page/${store.currentPage + 1}">다음페이지</a>
        </div>
    `)

    rootEl.innerHTML = newsList.join("");
}

const router = function () {
    const routePath = location.hash;
    if (routePath === '') {
        newsFeedFn();
    } else if (routePath.indexOf('#/page/') >= 0) {
        store.currentPage = Number(routePath.substr(7));
        newsFeedFn();
    } else {
        newsDetails();
    }
};

window.addEventListener('hashchange', router);
router();
