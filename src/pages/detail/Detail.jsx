import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/moviesApi';
import moment from 'moment/moment';
import Divider from '../../components/partials/Divider';
import HorizontalScrollCard from '../../components/cards/HorizontalScrollCard';
import VideoPlay from '../../components/partials/VideoPlay';

const Detail = () => {
    const dispatch = useDispatch();
    const { explore: movieType, id: movieId } = useParams();

    useEffect(() => {
        if (movieType && movieId) {
            dispatch(fetchMovieDetails({ movieType, movieId }));
        }
    }, [dispatch, movieType, movieId]);

    const { movie, cast, similar, recommended, imageUrl } = useSelector((state) => state.movieDetail);

    const duration = (movie?.runtime / 60)?.toFixed(1)?.split(".")
    const writer = cast?.crew?.filter(el => el?.job === "Writer")?.map(el => el?.name)?.join(", ")

    return (
        <div>

            <div className='w-full h-[280px] relative hidden lg:block'>
                <div className='w-full h-full'>
                    <img
                        src={imageUrl + movie?.backdrop_path}
                        className='h-full w-full object-cover'
                    />
                </div>
                <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
            </div>

            <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10 '>
                <div className='relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60'>
                    <img
                        src={imageUrl + movie?.poster_path}
                        className='h-80 w-60 object-cover rounded'
                    />
                    <button onClick={() => handlePlayVideo(movie)} className='main__btn'>Play Now</button>
                </div>

                <div>
                    <h2 className='text-2xl lg:text-4xl font-bold text-white '>{movie?.title || movie?.name}</h2>
                    <p className='text-neutral-400'>{movie?.tagline}</p>

                    <Divider />

                    <div className='flex items-center gap-3'>
                        <p>
                            Rating :  {Number(movie?.vote_average).toFixed(1)}+
                        </p>
                        <span>|</span>
                        <p>
                            View : {Number(movie?.vote_count)}
                        </p>
                        <span>|</span>
                        <p>Duration : {duration[0]}h {duration[1]}m</p>
                    </div>

                    <Divider />

                    <div>
                        <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
                        <p>{movie?.overview}</p>

                        <Divider />
                        <div className='flex items-center gap-3 my-3 text-center'>
                            <p>
                                Status : {movie?.status}
                            </p>
                            <span>|</span>
                            <p>
                                Release Date : {moment(movie?.release_date).format("MMMM Do YYYY")}
                            </p>
                            <span>|</span>
                            <p>
                                Revenue : {Number(movie?.revenue)}
                            </p>
                        </div>

                        <Divider />
                    </div>

                    <div>
                        <p><span className='text-white'>Director</span> : {cast[0]?.name}</p>

                        <Divider />
                        <p>
                            <span className='text-white'>Writer : {writer}</span>
                        </p>
                    </div>

                    <Divider />

                    <h2 className='font-bold text-lg'>Cast :</h2>
                    <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4'>
                        {
                            cast?.filter(el => el?.profile_path).map((starCast, index) => {
                                return (
                                    <div key={index}>
                                        <div>
                                            <img
                                                src={imageUrl + starCast?.profile_path}
                                                className='w-24 h-40 object-cover rounded-md'
                                            />
                                        </div>
                                        <p className='font-bold text-center text-sm text-neutral-400'>{starCast?.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div>
                <HorizontalScrollCard
                    data={similar}
                    heading={`Similar ${movieType}`}
                />
                <HorizontalScrollCard
                    data={recommended}
                    heading={`Recommendation ${movieType}`}
                />
            </div>
        </div>
    )
};

export default Detail;
