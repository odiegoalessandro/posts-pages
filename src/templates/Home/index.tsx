import { useCallback, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { PostResponse } from "../../components/PostCard/type";
import { Posts } from "../../components/Posts";
import { TextInput } from "../../components/TextInput";
import { loadPosts } from "../../utils/loadPosts";
import "./styles.css";


export const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [allPosts, setAllPosts] = useState<PostResponse[]>([]);
  const [page, setPage] = useState(0);
  const postsPerPage = 10;
  const noMorePosts = page + postsPerPage >= allPosts.length;
  
  const filteredPosts = searchValue 
    ? allPosts.filter(post => post.title.includes(searchValue)) 
    : posts;
  
  const handleLoadPosts = useCallback(async () => {
    const loadedPosts = await loadPosts();

    setAllPosts(loadedPosts);
    setPosts(loadedPosts.slice(0, postsPerPage));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  
  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    
    setPosts(prev => [...prev, ...nextPosts]);
    setPage(nextPage);
  };
  
  useEffect(() => {
    handleLoadPosts();
  }, [handleLoadPosts]);

  return (
    <section className="container">
      <div className="search-container">
        {searchValue && <h1>Search value {searchValue}</h1>}
        <TextInput searchValue={searchValue} onChange={handleChange} />
      </div>

      { filteredPosts.length > 0 
        ? <Posts posts={filteredPosts} /> 
        : <p>Não existem posts</p>
      }

      <div className="button-container">
        { !searchValue && (
          <Button disabled={noMorePosts} text="load more posts" onClick={loadMorePosts} />
        ) }
      </div>
    </section>
  );
};
