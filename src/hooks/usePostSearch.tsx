import axios, { type Canceler } from "axios";
import { useEffect, useState } from "react";
import type { PostsResponse } from "../types/post.types";

export default function usePostSearch(query: string) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [postTitles, setPostTitles] = useState<string[]>([]);

  useEffect(() => {

    if (query == "") {
        return;
    }

    setLoading(true);
    setError(false);

    let cancel: Canceler;

    axios<PostsResponse>({
      method: "GET",
      url: "http://localhost:3000/search",
      params: { q: query, page: 1, limit: 5 },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPostTitles([...new Set(res.data.posts.map((p) => p.title))]);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  }, [query]);

  return { loading, error, postTitles };
}
