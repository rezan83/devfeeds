import Article from "../components/Article";
import Loading from "../components/Loading";
import { useRecoilValue } from "recoil";
import { categorySearchAtom, titleSearchAtom } from "../store";
import { useFetchedFeed } from "../scripts/hooks";
import "../assets/styles/home.scss";

const Home: React.FC = () => {
    const titleSearch = useRecoilValue(titleSearchAtom);
    const categorySearch = useRecoilValue(categorySearchAtom);

    let { allArticles, categories, noData, error } = useFetchedFeed();
    if (error) return <div>failed to load, Please try later</div>;
    if (noData) return <Loading />;
    if (titleSearch) {
        allArticles = allArticles?.filter((article) =>
            article.title?.toLowerCase().includes(titleSearch)
        );
    }
    if (categories && categorySearch) {
        allArticles = allArticles?.filter((article) =>
            article.category.includes(categorySearch)
        );
    }
    const articles = allArticles?.map((articleData) => {
        let { title, creator, pubDate, content, readMore } = articleData;
        return (
            <Article
                article={{
                    title,
                    creator,
                    pubDate,
                    content,
                    readMore
                }}
                key={Math.random()}
            />
        );
    });

    return (
        <div className="home flex flex-wrap justify-center">
            {articles?.length ? articles : <div>No Match Found</div>}
        </div>
    );
};

export default Home;
