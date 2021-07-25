// function applyApiMixins(tagetClass: any, baseClass: any[]): void {
//     baseClass.forEach(baseClass => {
//         Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
//             const discriptor = Object.getOwnPropertyDescriptor(baseClass.prototype, name);
//
//             if (discriptor) {
//                 Object.defineProperty(tagetClass.prototype, name, discriptor);
//             }
//         });
//     });
// }

// applyApiMixins(NewsFeedApi, [Api]);
// applyApiMixins(NewsDetailApi, [Api]);

// interface NewsFeedApi extends Api {
// };
//
// interface NewsDetailApi extends Api {
// };
import View from '../core/view';

export interface Store {
    currentPage: number;
    feeds: NewsFeed[];
}

export  interface News {
    readonly id: number;
    readonly time_ago: string;
    readonly title: string;
    readonly url: string;
    readonly user: string;
    content: string;
}

export interface NewsFeed extends News {
    comments_count: number;
    domain: string;
    points: number;
    read?: boolean;
}

export interface NewsDetail extends News {
    comments: NewsComment [];
}

export interface NewsComment extends News {
    comments: NewsComment [];
    level: number;
}

export interface RouteInfo {
    path: string;
    page: View;
}

