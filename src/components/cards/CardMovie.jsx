import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

const CardMovie = ({ movie = {}, trending = false, index = 0, media_type = '' }) => {
    const imageURL = useSelector(state => state.trendingMoviesData.imageUrl);

    const mediaType = movie.media_type ?? media_type;

    return (
        <Link to={"/" + mediaType + "/" + movie.id} className='w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all'>
            {
                movie?.poster_path ? (
                    <img
                        src={imageURL + movie?.poster_path}
                        alt={movie?.title || movie?.name}
                        className='w-full h-full object-cover'
                    />
                ) : (
                    <div className='bg-neutral-800 h-full w-full flex justify-center items-center'>
                        No image found
                    </div>
                )
            }
            <div className='absolute top-4'>
                {
                    trending && (
                        <div className='py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden'>
                            #{index} Trending
                        </div>
                    )
                }
            </div>
            <div className='absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2'>
                <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{movie?.title || movie?.name}</h2>
                <div className='text-sm text-neutral-400 flex justify-between items-center'>
                    <p>{moment(movie.release_date).format("MMMM Do YYYY")}</p>
                    <p className='bg-black px-1 rounded-full text-xs text-white'>Rating : {Number(movie.vote_average).toFixed(1)}</p>
                </div>
            </div>
        </Link>
    );
}

export default CardMovie;
