"use strict";
var container = document.getElementById('root');
var ajax = new XMLHttpRequest();
var NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
var CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';
var PAGE_COUNT = 10;
var store = {
    currentPage: 1,
    feeds: [],
};
function getData(url) {
    ajax.open('GET', url, false);
    ajax.send();
    return JSON.parse(ajax.response);
}
function makeFeeds(feeds) {
    for (var i = 0; i < feeds.length; i++) {
        feeds[i].read = false;
    }
    return feeds;
}
function newsFeed() {
    var newsFeed = store.feeds;
    var newsList = [];
    var template = "\n    <div class=\"bg-gray-600 min-h-screen\">\n      <div class=\"bg-white text-xl\">\n        <div class=\"mx-auto px-4\">\n          <div class=\"flex justify-between items-center py-6\">\n            <div class=\"flex justify-start\">\n              <h1 class=\"font-extrabold\">Hacker News</h1>\n            </div>\n            <div class=\"items-center justify-end\">\n              <a href=\"#/page/{{__prev_page__}}\" class=\"text-gray-500\">\n                Previous\n              </a>\n              <a href=\"#/page/{{__next_page__}}\" class=\"text-gray-500 ml-4\">\n                Next\n              </a>\n            </div>\n          </div> \n        </div>\n      </div>\n      <div class=\"p-4 text-2xl text-gray-700\">\n        {{__news_feed__}}        \n      </div>\n    </div>\n  ";
    if (newsFeed.length === 0) {
        newsFeed = store.feeds = makeFeeds(getData(NEWS_URL));
    }
    for (var i = (store.currentPage - 1) * PAGE_COUNT; i < store.currentPage * PAGE_COUNT; i++) {
        newsList.push("\n      <div class=\"p-6 " + (newsFeed[i].read ? 'bg-red-500' : 'bg-white') + " mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100\">\n        <div class=\"flex\">\n          <div class=\"flex-auto\">\n            <a href=\"#/show/" + newsFeed[i].id + "\">" + newsFeed[i].title + "</a>  \n          </div>\n          <div class=\"text-center text-sm\">\n            <div class=\"w-10 text-white bg-green-300 rounded-lg px-0 py-2\">" + newsFeed[i].comments_count + "</div>\n          </div>\n        </div>\n        <div class=\"flex mt-3\">\n          <div class=\"grid grid-cols-3 text-sm text-gray-500\">\n            <div><i class=\"fas fa-user mr-1\"></i>" + newsFeed[i].user + "</div>\n            <div><i class=\"fas fa-heart mr-1\"></i>" + newsFeed[i].points + "</div>\n            <div><i class=\"far fa-clock mr-1\"></i>" + newsFeed[i].time_ago + "</div>\n          </div>  \n        </div>\n      </div>    \n    ");
    }
    template = template.replace('{{__news_feed__}}', newsList.join(''));
    template = template.replace('{{__prev_page__}}', store.currentPage > 1 ? store.currentPage - 1 : 1);
    template = template.replace('{{__next_page__}}', store.currentPage < Math.ceil(newsFeed.length / PAGE_COUNT) ? store.currentPage + 1 : store.currentPage);
    container.innerHTML = template;
}
function newsDetail() {
    var id = location.hash.substr(7);
    var newsContent = getData(CONTENT_URL.replace('@id', id));
    var template = "\n    <div class=\"bg-gray-600 min-h-screen pb-8\">\n      <div class=\"bg-white text-xl\">\n        <div class=\"mx-auto px-4\">\n          <div class=\"flex justify-between items-center py-6\">\n            <div class=\"flex justify-start\">\n              <h1 class=\"font-extrabold\">Hacker News</h1>\n            </div>\n            <div class=\"items-center justify-end\">\n              <a href=\"#/page/" + store.currentPage + "\" class=\"text-gray-500\">\n                <i class=\"fa fa-times\"></i>\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"h-full border rounded-xl bg-white m-6 p-4 \">\n        <h2>" + newsContent.title + "</h2>\n        <div class=\"text-gray-400 h-20\">\n          " + newsContent.content + "\n        </div>\n\n        {{__comments__}}\n\n      </div>\n    </div>\n  ";
    for (var i = 0; i < store.feeds.length; i++) {
        if (store.feeds[i].id === Number(id)) {
            store.feeds[i].read = true;
            break;
        }
    }
    function makeComment(comments, called) {
        if (called === void 0) { called = 0; }
        var commentString = [];
        for (var i = 0; i < comments.length; i++) {
            commentString.push("\n                <div style=\"padding-left: " + called * 40 + "px;\" class=\"mt-4\">\n                <div class=\"text-gray-400\">\n                    <i class=\"fa fa-sort-up mr-2\"></i>\n                    <strong>" + comments[i].user + "</strong> " + comments[i].time_ago + "\n                </div>\n                <p class=\"text-gray-700\">" + comments[i].content + "</p>\n                </div>      \n            ");
            if (comments[i].comments.length > 0) {
                commentString.push(makeComment(comments[i].comments, called + 1));
            }
        }
        return commentString.join('');
    }
    container.innerHTML = template.replace('{{__comments__}}', makeComment(newsContent.comments));
}
function router() {
    var routePath = location.hash;
    if (routePath === '') {
        newsFeed();
    }
    else if (routePath.indexOf('#/page/') >= 0) {
        store.currentPage = Number(routePath.substr(7));
        newsFeed();
    }
    else {
        newsDetail();
    }
}
window.addEventListener('hashchange', router);
router();
//# sourceMappingURL=app.js.map