import ReactHtmlParser from "react-html-parser";
import "../assets/styles/article.scss";

interface IProp {
    article: {
        title: string | null;
        creator: string | null;
        pubDate: string | null;
        content: string;
        readMore: string;
    };
}

const Article: React.FC<IProp> = ({ article }) => {
    const { title, creator, pubDate, content, readMore } = article;
    return (
        <div className="article flex flex-col space-between">
            <h2>{title}</h2>
            <h5>
                {creator} at{" "}
                {pubDate && new Date(pubDate).toISOString().substring(0, 10)}
            </h5>
            {content && <p> {content}</p>}
            {readMore && <div className="read-more-container">{ReactHtmlParser(readMore)}</div> }
        </div>
    );
};

export default Article;
