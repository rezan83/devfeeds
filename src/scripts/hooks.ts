import useSWR from "swr";
import { fetcher } from "./api";

// this hook is used in two components but 
// the fitcher will call the api once once
export const useFetchedFeed = () => {
    const { data, error } = useSWR("/feed.xml", fetcher);
    let { allArticles, categories } = data || {};
    let noData = !data;
    return { allArticles, categories, noData, error };
};
