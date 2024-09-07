import { useEffect } from 'react';
import HorizontalScrollCard from '../../components/cards/HorizontalScrollCard';
import './index.scss';
import TrendingBanner from "./TrendingBanner";
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfiguration, fetchTrendingMovies } from '../../api/moviesApi';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrendingMovies());
        dispatch(fetchConfiguration());
    }, [dispatch]);

    const { trendingMovies, status, error, imageUrl } = useSelector((state) => state.trendingMoviesData);

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
        </div>
    );
}

export default Home;
