import PropTypes from 'prop-types';
import { ClipLoader } from "react-spinners";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useRef } from 'react';

const TrendingBanner = ({
    trendingMovies = [],
    status = "loading",
    error = "",
    imageUrl = "",
}) => {
    // Create a reference for the Swiper instance
    const swiperRef = useRef(null);

    return (
        <section className="w-full">
            <div className="lg:h-[100vh] h-[90vh] relative">
                {status === "loading" && (
                    <div className="w-full h-full flex justify-center items-center">
                        <ClipLoader color="#e53e3e" size={50} />
                    </div>
                )}
                {status === "failed" && <p>{error}</p>}
                {status === "succeeded" && (
                    <Swiper
                        ref={swiperRef}
                        modules={[Navigation, Autoplay, EffectCoverflow, Zoom]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={{ 
                            nextEl: ".trending-swiper-button-next", 
                            prevEl: ".trending-swiper-button-prev" 
                        }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                        speed={1000}
                        className="w-full h-full"
                    >
                        {trendingMovies.map((movie) => (
                            <SwiperSlide key={movie.id} className="w-full h-full relative">
                                <img
                                    src={imageUrl + movie.backdrop_path}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                                <div className="absolute bottom-[10%] flex items-center justify-center text-center w-full">
                                    <div className="w-full grid gap-4 max-w-2xl">
                                        <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                                            {movie?.title || movie?.name}
                                        </h2>
                                        <p className="text-white text-ellipsis line-clamp-3">{movie.overview}</p>
                                        <div className="flex justify-center w-full gap-4 items-center text-white">
                                            <div className='w-16 h-16'>
                                                <CircularProgressbar
                                                    value={movie.vote_average * 10}
                                                    text={`${Number(movie.vote_average).toFixed(1)}`}
                                                    styles={buildStyles({
                                                        textSize: '32px',
                                                        pathColor: movie.vote_average > 5 ? 'green' : 'red',
                                                        textColor: '#fff',
                                                        trailColor: '#d6d6d6',
                                                        strokeLinecap: 'round',
                                                        pathTransitionDuration: 0.5,
                                                    })}
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <p>View: {Number(movie.popularity).toFixed(0)}</p>
                                            </div>
                                            <Link to={`/${movie?.media_type}/${movie.id}`}>
                                                <button className="main__btn shadow-md">
                                                    Play Now
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                <div className="swiper-button-prev trending-swiper-button-prev custom-nav-button" onClick={() => swiperRef.current.swiper.slidePrev()}>
                    <svg className="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
                <div className="swiper-button-next trending-swiper-button-next custom-nav-button" onClick={() => swiperRef.current.swiper.slideNext()}>
                    <svg className="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

// Define prop types for validation
TrendingBanner.propTypes = {
    trendingMovies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            backdrop_path: PropTypes.string,
            title: PropTypes.string,
            name: PropTypes.string,
            overview: PropTypes.string,
            vote_average: PropTypes.number,
            popularity: PropTypes.number,
            media_type: PropTypes.string,
        })
    ).isRequired,
    status: PropTypes.oneOf(['loading', 'succeeded', 'failed', 'idle']),
    error: PropTypes.string,
    imageUrl: PropTypes.string,
};

export default TrendingBanner;
