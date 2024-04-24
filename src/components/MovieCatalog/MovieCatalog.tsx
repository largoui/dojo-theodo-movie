import styles from "./MovieCatalog.module.css";

import GenreList from "../GenreList/GenreList";
import MoviePreview from "../MoviePreview/MoviePreview";
import { useInfiniteQuery } from "react-query";
import { getMovies } from "../../services/movieService";
import { useEffect } from "react";

export const MovieCatalog = () => {
  const {
    fetchNextPage,
    hasNextPage,
    data,
    isLoading
  } = useInfiniteQuery({
    queryKey: ["getPopularMovies"],
    queryFn: ({ pageParam = 1 }) => getMovies(pageParam),
    getNextPageParam: (_lastPage, allPages) => {return allPages.length + 1},
  });

  const moviesList = data?.pages.flat() || []
  useEffect(()=>{
    const handleScroll = () => {
      if (document.body.offsetHeight <= window.innerHeight + window.scrollY && hasNextPage){
        fetchNextPage()
      }
    }

    window.addEventListener("scroll",handleScroll)
    return () => window.removeEventListener("scroll", handleScroll);
  },[moviesList])

  return (
    <>
    {isLoading && <div>Chargement...</div>}
    {!isLoading && 
      <>
        <GenreList />
        <div className={styles.layout}>
          {moviesList.map((movie)=>(
            <MoviePreview movie={movie}/>
          ))}
        </div>
      </>
    } 
    </>
  );
};
