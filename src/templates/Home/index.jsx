import { useEffect, useState } from "react"
import { Button } from "../../components/Button"
import { Posts } from "../../components/Posts"
import { TextInput } from "../../components/TextInput"
import { loadPosts } from "../../utils/loadPosts"
import "./styles.css"


export const Home = () => {
  const [searchValue, setSearchValue] = useState("")
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const postsPerPage = 10

  useEffect(() => {
    handleLoadPosts()
  }, [])

  const handleLoadPosts = async () => {
    const posts = await loadPosts()
  
    setPosts(posts.slice(page, postsPerPage))
    setAllPosts(posts)
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  }

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

    setPosts(prev => [...prev, ...nextPosts])
    setPage(nextPage)
  }

  const noMorePosts = page + postsPerPage >= allPosts.length
  const filteredPosts = searchValue 
    ? allPosts.filter(post => post.title.includes(searchValue)) 
    : posts

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
  )
}