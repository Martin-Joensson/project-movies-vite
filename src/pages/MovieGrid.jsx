import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Movie } from "../components/Movie";
import { Header } from "../components/Header";
import { NotFound } from "./NotFound";
import { Loading } from "./Loading";
import "./MovieGrid.css";

export const MovieGrid = () => {
  const { genre } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [API_END, setAPI_END] = useState("popular");

  useEffect(() => {
    if (
      genre === "popular" ||
      genre === "top_rated" ||
      genre === "upcoming" ||
      genre === "now_playing"
    ) {
      setAPI_END(genre);
    } else {
      console.error("Invalid genre:", genre);
      <NotFound />;
    }
  }, [genre]);

  const API_KEY = import.meta.env.VITE_MOVIEDB_KEY;
  const API_URL = `https://api.themoviedb.org/3/movie/${API_END}?api_key=${API_KEY}&language=en-US&page=1`;

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((result) => result.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [API_URL]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <div>
      <Header />
      <div className="movie-grid">
        {data.results.map((movie, index) => (
          <div className="movie-link" key={index}>
            {genre ? (
              <Link to={`/${genre}/${movie.id}`}>
                {" "}
                <Movie movie={movie} />
              </Link>
            ) : (
              <Link to={`/movies/${movie.id}`}>
                {" "}
                <Movie movie={movie} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
