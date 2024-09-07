import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrendingBanner from './TrendingBanner';
import { fetchConfiguration, fetchNowPlayingMovies, fetchTrendingMovies } from '../../api/moviesApi';
import HorizontalScrollCard from '../../components/cards/HorizontalScrollCard';
import './index.scss'

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrendingMovies());
        dispatch(fetchNowPlayingMovies());
        dispatch(fetchConfiguration());
    }, [dispatch]);

    const { movies: trendingMovies, status: trendingStatus, error: trendingError, imageUrl } = useSelector((state) => state.trendingMovies);
    const { movies: nowPlayingMovies, status: nowPlayingStatus, error: nowPlayingError } = useSelector((state) => state.nowPlayingMovies);

    
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


        </div>
    );
}

export default Home;
