  import { useRef } from 'react';
  import PropTypes from 'prop-types';
  import { Swiper, SwiperSlide } from 'swiper/react';
  import { Navigation } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import CardMovie from './CardMovie';
  import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';

  const HorizontalScrollCard = ({
    data = [],
    heading = '',
    loading = false,
    error = null,
    trending = false,
    media_type = ''
  }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
      <div className='container mx-auto px-3 my-10'>
        <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>{heading}</h2>

        {loading ? (
          <div className='flex flex-col items-center'>
            <div className='spinner'></div> {/* Loading spinner */}
            <div className='text-white mt-3'>Loading...</div>
          </div>
        ) : error ? (
          <div className='text-white text-center'>Error: {error}</div>
        ) : (
          <div className='relative'>
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={'auto'}
              navigation={{
                nextEl: nextRef.current,
                prevEl: prevRef.current,
              }}
              className='swiper-container'
              onInit={(swiper) => {
                nextRef.current = swiper.navigation.nextEl;
                prevRef.current = swiper.navigation.prevEl;
              }}
            >
              {data.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <CardMovie movie={movie} trending={trending} media_type={media_type} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className='absolute top-0 hidden lg:flex justify-between w-full h-full items-center'>
              <button
                ref={prevRef}
                className='swiper-button-prev bg-white p-1 text-black rounded-full z-10'
              >
                <FaAngleLeft />
              </button>
              <button
                ref={nextRef}
                className='swiper-button-next bg-white p-1 text-black rounded-full z-10'
              >
                <FaAngleRight />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Define prop types for validation
  HorizontalScrollCard.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        poster_path: PropTypes.string,
        title: PropTypes.string,
        name: PropTypes.string,
        release_date: PropTypes.string,
        vote_average: PropTypes.number,
        media_type: PropTypes.string
      })
    ).isRequired,
    heading: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.string,
    trending: PropTypes.bool,
    media_type: PropTypes.string,
  };

  export default HorizontalScrollCard;
