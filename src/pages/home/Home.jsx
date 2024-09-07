import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrendingBanner from './TrendingBanner';
import { fetchConfiguration, fetchNowPlayingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../../api/moviesApi';
import HorizontalScrollCard from '../../components/cards/HorizontalScrollCard';
import './index.scss'

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
            {
                nowPlayingStatus === 'loading' ? (
                    <div className='container mx-auto px-3 my-10'>
                        <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>Now Playing</h2>
                        <p className='text-white'>Loading...</p>
                    </div>
                ) : nowPlayingStatus === 'error' ? (
                    <div className='container mx-auto px-3 my-10'>
                        <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>Now Playing</h2>
                        <p className='text-white'>{nowPlayingError}</p>
                    </div>
                ) : (
                    <HorizontalScrollCard
                        data={nowPlayingMovies}
                        heading='Now Playing'
                        media_type='movie'
                    />
                )
            }

            {
                trendingStatus === 'loading' ? (
                    <div className='container mx-auto px-3 my-10'>
                        <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>Trending</h2>
                        <p className='text-white'>Loading...</p>
                    </div>
                ) : trendingStatus === 'error' ? (
                    <div className='container mx-auto px-3 my-10'>
                        <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>Trending</h2>
                        <p className='text-white'>{trendingError}</p>
                    </div>
                ) : (
                    <HorizontalScrollCard
                        data={trendingMovies}
                        heading='Trending'
                        trending
                    />
                )
            }


            {
                popularStatus === 'loading' ? (
                    <div className='container mx-auto px-3 my-10'>
                        <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>Popular</h2>
                        <p className='text-white'>Loading...</p>
                    </div>
                ) : popularStatus === 'error' ? (
                    <div className='container mx-auto px-3 my-10'>
                        <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>Popular</h2>
                        <p className='text-white'>{popularError}</p>
                    </div>
                ) : (
                    <HorizontalScrollCard
                        data={popularMovies}
                        heading='Popular Movies'
                        media_type='movie'
                    />
                )
            }


            {
                topRatedStatus === 'loading' ? (
                    <div className='container mx-auto px-3 my-10'>
                        <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>Top Rated</h2>
                        <p className='text-white'>Loading...</p>
                    </div>
                ) : topRatedStatus === 'error' ? (
                    <div className='container mx-auto px-3 my-10'>
                        <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>Top Rated</h2>
                        <p className='text-white'>{topRatedError}</p>
                    </div>
                ) : (
                    <HorizontalScrollCard
                        data={topRatedMovies}
                        heading='Top Rated Movies'
                        media_type='movie'
                    />
                )
            }

            {
                upcomingStatus === 'loading' ? (
                    <div className='container mx-auto px-3 my-10'>
                        <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>Upcoming</h2>
                        <p className='text-white'>Loading...</p>
                    </div>
                ) : upcomingStatus === 'error' ? (
                    <div className='container mx-auto px-3 my-10'>
                        <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>Upcoming</h2>
                        <p className='text-white'>{upcomingError}</p>
                    </div>
                ) : (
                    <HorizontalScrollCard
                        data={upcomingMovies}
                        heading='Upcoming Movies'
                        media_type='movie'
                    />
                )
            }

        </div>
    );
}

export default Home;
