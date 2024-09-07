import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrendingBanner from './TrendingBanner';
import { fetchConfiguration, fetchNowPlayingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../../api/moviesApi';
import HorizontalScrollCard from '../../components/cards/HorizontalScrollCard';
import './index.scss';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrendingMovies());
        dispatch(fetchNowPlayingMovies());
        dispatch(fetchPopularMovies());
        dispatch(fetchTopRatedMovies());
        dispatch(fetchConfiguration());
        dispatch(fetchUpcomingMovies());
    }, [dispatch]);

    const { movies: trendingMovies, status: trendingStatus, error: trendingError, imageUrl } = useSelector((state) => state.trendingMovies);
    const { movies: nowPlayingMovies, status: nowPlayingStatus, error: nowPlayingError } = useSelector((state) => state.nowPlayingMovies);
    const { movies: popularMovies, status: popularStatus, error: popularError } = useSelector((state) => state.popularMovies);
    const { movies: topRatedMovies, status: topRatedStatus, error: topRatedError } = useSelector((state) => state.topRatedMovies);
    const { movies: upcomingMovies, status: upcomingStatus, error: upcomingError } = useSelector((state) => state.upcomingMovies);

    return (
        <div className="">
            <TrendingBanner
                trendingMovies={trendingMovies}
                status={trendingStatus}
                error={trendingError}
                imageUrl={imageUrl}
            />

            <HorizontalScrollCard
                data={nowPlayingMovies}
                heading='Now Playing'
                media_type='movie'
            />
            <HorizontalScrollCard
                data={trendingMovies}
                heading='Trending'
                trending
            />
            <HorizontalScrollCard
                data={popularMovies}
                heading='Popular Movies'
                media_type='movie'
            />
            <HorizontalScrollCard
                data={topRatedMovies}
                heading='Top Rated Movies'
                media_type='movie'
            />
            <HorizontalScrollCard
                data={upcomingMovies}
                heading='Upcoming Movies'
                media_type='movie'
            />
        </div>
    );
}

export default Home;
