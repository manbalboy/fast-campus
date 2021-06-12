let ajax = new XMLHttpRequest();

const rootEl = document.getElementById('root');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
const PAGE_COUNT = 10;

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

    let template = `
        <div>
            <h1>Hacker News</h1>
            <ul>
                {{__news_feed__}}
            </ul>
            <div>
                <a href="#/page/{{__prev_page__}}">이전페이지</a>
                <a href="#/page/{{__next_page__}}">다음페이지</a>
            </div>
        </div>
    `;

    for (let i = (store.currentPage - 1) * PAGE_COUNT; i < store.currentPage * PAGE_COUNT; i++) {
        newsList.push(`
            <li>
                <a href="#/show/${newsFeed[i].id}">
                    ${newsFeed[i].title} (${newsFeed[i].comments_count})
                </a>
            </li>
        `)
    }

    template = template.replace('{{__news_feed__}}', newsList.join(""));
    template = template.replace('{{__prev_page__}}', store.currentPage > 1 ? store.currentPage - 1 : 1);
    template = template.replace('{{__next_page__}}', store.currentPage < Math.ceil(newsFeed.length / PAGE_COUNT) ? store.currentPage + 1 : store.currentPage);

    rootEl.innerHTML = template;
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
