import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchExploreData } from "../../api/moviesApi";
import { useEffect } from "react";
import CardMovie from "../../components/cards/CardMovie";

const Explore = () => {
    const { explore } = useParams(); // type can be 'movie' or 'tv'
    const dispatch = useDispatch();

    console.log(explore,'explore 01');
    

    useEffect(() => {
        dispatch(fetchExploreData({ exploreType: explore }));
    }, [dispatch, explore]);
    
    const {movies: exploreMovies, status: exploreStatus, error: exploreError} = useSelector((state) => state.exploreMovies);
    

    return (
        <div className='py-16'>
        <div className='container mx-auto'>
            <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Popular {explore} show</h3>

            <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
              {
                exploreMovies.map((exploreData)=>{
                  return(
                      <CardMovie
                          movie={exploreData} key={exploreData.id + "exploreSEction"} media_type={explore} />
                  )
                })
              }
            </div>
        </div>
    </div>
    )
}

export default Explore
