import { useEffect } from 'react';
import HorizontalScrollCard from '../../components/cards/HorizontalScrollCard';
import './index.scss';
import TrendingBanner from "./TrendingBanner";
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfiguration, fetchNowPlayingMovies, fetchTrendingMovies } from '../../api/moviesApi';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrendingMovies());
        dispatch(fetchConfiguration());

        dispatch(fetchNowPlayingMovies());
    }, [dispatch]);

    const { trendingMovies, status, error, imageUrl } = useSelector((state) => state.trendingMoviesData);
    const { nowPlayingMovies, nowPlayingStatus, nowPlayingError,
        nowPlayingImageUrl
    } = useSelector((state) => state.nowPlayingMoviesData);

    console.log(nowPlayingMovies);
    

    return (
        <div className="">
            <TrendingBanner
                trendingMovies={trendingMovies}
                status={status}
                error={error}
                imageUrl={imageUrl}
            />

            {status === "succeeded" && (
                <HorizontalScrollCard
                    data={trendingMovies}
                    heading={"Trending"}
                    trending={true}
                />
            )}

            {nowPlayingStatus === "succeeded" && (
                <HorizontalScrollCard
                    data={nowPlayingMovies}
                    heading={"Now Playing"}
                    trending={false}
                />
            )}
        </div>
    );
}

export default Home;
