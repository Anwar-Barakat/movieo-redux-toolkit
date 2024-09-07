import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CardMovie = ({ movie = {}, trending = false, index = 0, media_type = '' }) => {
    const imageURL = useSelector(state => state.trendingMoviesData.imageUrl);

    const mediaType = movie.media_type ?? media_type;

    // Normalize the vote_average (assuming it's out of 10) to a percentage (out of 100)
    const voteAveragePercentage = (movie.vote_average || 0) * 10;

    return (
        <Link to={"/" + mediaType + "/" + movie.id} className='w-full min-w-[230px] max-w-[230px] overflow-hidden block rounded relative hover:scale-105 transition-all'>
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
            <div className='absolute bottom-0 h-auto backdrop-blur-3xl w-full bg-black/60 p-2'>
                <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{movie?.title || movie?.name}</h2>
                <div className='text-sm text-neutral-400 flex justify-between items-center gap-2'>
                    <p>{moment(movie.release_date).format("MMMM Do YYYY")}</p>
                    <div className='w-12 h-12'>
                        <CircularProgressbar
                            value={voteAveragePercentage}
                            text={`${Number(movie.vote_average).toFixed(1)}`}
                            styles={buildStyles({
                                textSize: '30px',
                                pathColor: voteAveragePercentage > 50 ? 'green' : 'red',
                                textColor: '#fff',
                                trailColor: '#d6d6d6',
                                strokeLinecap: 'butt',
                                pathTransitionDuration: 0.5,
                            })}
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};

// PropTypes validation
CardMovie.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        poster_path: PropTypes.string,
        title: PropTypes.string,
        name: PropTypes.string,
        release_date: PropTypes.string,
        vote_average: PropTypes.number,
        media_type: PropTypes.string,
    }).isRequired,
    trending: PropTypes.bool,
    index: PropTypes.number,
    media_type: PropTypes.string,
};

export default CardMovie;
