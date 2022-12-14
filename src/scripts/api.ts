import axios from "axios";
let parser = new DOMParser();

export const fetcher = (args: string) => {
    // gathering all categories. this should be
    // fetched  ideally from a separate api
    let categories: Set<string> = new Set();

    return axios
        .get(args, {
            headers: {
                "Content-Type": "application/xml; charset=utf-8"
            }
        })

        .then((response) => {
            const data = parser.parseFromString(response.data, "text/xml");
            const articles = Array.from(data.getElementsByTagName("item"));
            return articles;
        })
        .then((articles) => {
            let allArticles = articles.map((article) => {
                const title =
                    article.getElementsByTagName("title")[0].textContent;
                const category = Array.from(
                    article.getElementsByTagName("category")
                ).map((cat) => {
                    cat.textContent && categories.add(cat.textContent);
                    return cat.textContent?.toLowerCase();
                });

                const creator =
                    article.getElementsByTagName("dc:creator")[0].textContent;
                const pubDate =
                    article.getElementsByTagName("pubDate")[0].textContent;
                const [content, readMore] =
                    article
                        .getElementsByTagName("description")[0]
                        .textContent?.split(/(?=<p)/g) || [];

                return {
                    title,
                    creator,
                    pubDate,
                    content,
                    readMore,
                    category
                };
            });
            return { allArticles, categories };
        })

        .catch((error) => {
            console.log(error);
        });
};
