import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useFetchedFeed } from "../scripts/hooks";
import { categorySearchAtom, titleSearchAtom } from "../store";
import "../assets/styles/navbar.scss";

const Navbar: React.FC = () => {
    const [titleSearch, set_titleSearch] = useState("");
    const set_titleSearchAtom = useSetRecoilState(titleSearchAtom);
    const set_categoyAtom = useSetRecoilState(categorySearchAtom);
    let { categories } = useFetchedFeed();

    const searchHandel = () => {
        set_titleSearchAtom(titleSearch.toLowerCase());
    };
    const selectHandel = (event: React.ChangeEvent<HTMLSelectElement>) => {
        set_categoyAtom(event.target.value.toLowerCase());
    };
    return (
        <nav className="navbar flex align-center space-between">
            <h2 id="logo">DevNews</h2>
            <div className="search-container flex justify-center">
                <div className="select-container">
                    <select
                        name="category"
                        id="category"
                        onChange={selectHandel}
                    >
                        <>
                            <option value="">All Categories</option>
                            {categories &&
                                Array.from(categories).map((c) => {
                                    return (
                                        <option value={c} key={c}>
                                            {c}
                                        </option>
                                    );
                                })}
                        </>
                    </select>
                </div>
                <input
                    type="text"
                    onChange={(e) => set_titleSearch(e.target.value)}
                    placeholder="Search Title"
                    value={titleSearch}
                />
                <button className="btn btn-default" onClick={searchHandel}>
                    Search
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
