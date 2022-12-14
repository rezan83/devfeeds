import "../assets/styles/loading.scss";
import loadingImg from "../assets/images/loading.svg";

const Loading: React.FC = () => {
    return (
        <div className="loading-container">
            <img src={loadingImg} alt="loading Image" />
        </div>
    );
};

export default Loading;
