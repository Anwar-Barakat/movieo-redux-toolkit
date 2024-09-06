import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchConfiguration, fetchTrendingMovies } from "../../api/moviesApi";
import axios from "axios";
import { setImageUrl } from "../../features/movies/trendingMoviesSlice";
import { ClipLoader } from "react-spinners";

const TrendingBanner = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrendingMovies());
        dispatch(fetchConfiguration());
    }, [dispatch]);

    const { trendingMovies, status, error, imageUrl } = useSelector((state) => state.trendingMoviesData);
    console.log(trendingMovies);
    return (
        <section className="w-full h-full">
            <div className="flex min-h-full max-h-screen overflow-y-hidden">
                {/* {status === "loading" && (
                    <div className="w-full flex justify-center items-center">
                        <ClipLoader color="#e53e3e" size={50} /> 
                    </div>
                )}
                {status === "failed" && <p>{error}</p>} */}
                {status === "succeeded" && trendingMovies.map((movie) => (
                    <div key={movie.id} className="min-w-full min-h-[450px] lg:min-h-full">
                        <div className="w-full h-full">
                            <img src={imageUrl + movie.backdrop_path} alt={movie.title} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    
                ))}
            </div>
        </section>
    )
}

export default TrendingBanner
