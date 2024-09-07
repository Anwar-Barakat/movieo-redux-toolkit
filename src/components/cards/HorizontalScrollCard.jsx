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
  trending = false,
  media_type = ''
}) => {

  return (
    <div className='container mx-auto px-3 my-10'>
      <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>{heading}</h2>

      <div className='relative'>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20} // Adjust space between slides
          slidesPerView={'auto'} // Allows multiple slides to be visible
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className='swiper-container'
        >
          {data.length > 0 ? data.map((movie, index) => (
            <SwiperSlide key={movie.id + "heading" + index} className='flex-shrink-0'>
              <CardMovie movie={movie} index={index + 1} trending={trending} media_type={media_type} />
            </SwiperSlide>
          )) : (
            <SwiperSlide className='flex-shrink-0'>
              <p>No movies available</p>
            </SwiperSlide>
          )}
        </Swiper>

        <div className='absolute top-0 hidden lg:flex justify-between w-full h-full items-center'>
          <button className='swiper-button-prev bg-white p-1 text-black rounded-full z-10'>
            <FaAngleLeft />
          </button>
          <button className='swiper-button-next bg-white p-1 text-black rounded-full z-10'>
            <FaAngleRight />
          </button>
        </div>
      </div>
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
  trending: PropTypes.bool,
  media_type: PropTypes.string
};

export default HorizontalScrollCard;
