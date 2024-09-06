import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConfiguration, fetchTrendingMovies } from "../../api/moviesApi";
import { ClipLoader } from "react-spinners";

// Import Swiper and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectCoverflow, Zoom } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/zoom";
import { Link } from "react-router-dom";

const TrendingBanner = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrendingMovies());
        dispatch(fetchConfiguration());
    }, [dispatch]);

    const { trendingMovies, status, error, imageUrl } = useSelector((state) => state.trendingMoviesData);

    return (
        <section className="w-full">
            <div className="lg:h-full h-[90vh]">
                {status === "loading" && (
                    <div className="w-full flex justify-center items-center">
                        <ClipLoader color="#e53e3e" size={50} />
                    </div>
                )}
                {status === "failed" && <p>{error}</p>}
                {status === "succeeded" && (
                    <Swiper
                        modules={[Navigation, Autoplay, EffectCoverflow, Zoom]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        autoplay={{ delay: 50000, disableOnInteraction: false }}
                        loop={true}
                        speed={1000}
                        className="w-full h-full"
                    >
                        {trendingMovies.map((movie) => (
                            <>
                                <SwiperSlide key={movie.id} className="w-full trending-slide relative">
                                    <div className="grid gap-2 h-full">
                                        <img
                                            src={imageUrl + movie.backdrop_path}
                                            alt={movie.title}
                                            className="w-full h-full object-cover"
                                        />


                                        <div className='absolute top-0 w-full bg-gradient-to-t from-neutral-900 to-transparent'></div>

                                        <div className='absolute bottom-3 flex items-center justify-center text-center w-full'>
                                            <div className='w-full grid gap-2 max-w-2xl'>
                                                <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>{movie?.title || movie?.name}</h2>
                                                <p className='text-ellipsis line-clamp-3'>{movie.overview}</p>
                                                <div className='flex items-center gap-4'>
                                                    <p>Rating : {Number(movie.vote_average).toFixed(1)}+</p>
                                                    <span>|</span>
                                                    <p>View : {Number(movie.popularity).toFixed(0)}</p>
                                                </div>
                                                <Link to={"/" + movie?.media_type + "/" + movie.id}>
                                                    <button className=' bg-white px-4 py-2 text-black font-bold rounded  hover:bg-gradient-to-l from-primary to-orange-500 shadow-md transition-all hover:scale-105'>
                                                        Play Now
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </>

                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
};

export default TrendingBanner;
