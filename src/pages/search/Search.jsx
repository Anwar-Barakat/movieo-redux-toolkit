import { useEffect, useState } from "react";
import { fetchSearchMovies } from "../../api/moviesApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardMovie from "../../components/cards/CardMovie";

const Search = () => {
    const dispatch = useDispatch()

    const location = useLocation()
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const navigate = useNavigate()

    

    const query = location?.search?.slice(3)

    useEffect(() => {
        dispatch(fetchSearchMovies({query}));
    }, [query]);

    const { movies: searchMovies, status: searchStatus, error: searchError } = useSelector((state) => state.searchMovies);

    console.log(
        searchMovies,
        searchStatus,
        searchError,
        query
    );


    return (
        <div className='py-16'>
            <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
                <input
                    type='text'
                    placeholder='Search here...'
                    onChange={(e) => navigate(`/search?q=${e.target.value}`)}
                    value={query?.split("%20")?.join(" ")}
                    className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900 '
                />
            </div>
            <div className='container mx-auto'>
                <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h3>

                <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
                    {
                        searchMovies.map((searchData) => {
                            return (
                                <CardMovie movie={searchData} key={searchData.id + "search"} media_type={searchData.media_type} />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Search
