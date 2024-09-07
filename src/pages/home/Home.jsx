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
                loading={nowPlayingStatus === 'loading'}
                error={nowPlayingStatus === 'failed' ? nowPlayingError : null}
                media_type='movie'
            />

            <HorizontalScrollCard
                data={trendingMovies}
                heading='Trending'
                loading={trendingStatus === 'loading'}
                error={trendingStatus === 'failed' ? trendingError : null}
                trending
            />

            <HorizontalScrollCard
                data={popularMovies}
                heading='Popular Movies'
                loading={popularStatus === 'loading'}
                error={popularStatus === 'failed' ? popularError : null}
                media_type='movie'
            />

            <HorizontalScrollCard
                data={topRatedMovies}
                heading='Top Rated Movies'
                loading={topRatedStatus === 'loading'}
                error={topRatedStatus === 'failed' ? topRatedError : null}
                media_type='movie'
            />

            <HorizontalScrollCard
                data={upcomingMovies}
                heading='Upcoming Movies'
                loading={upcomingStatus === 'loading'}
                error={upcomingStatus === 'failed' ? upcomingError : null}
                media_type='movie'
            />
        </div>
    );
}

export default Home;
