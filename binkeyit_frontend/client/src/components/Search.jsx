import React, { use, useEffect ,useState} from 'react';
import { IoIosSearch } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';


function Search() {
  const navigate = useNavigate();
  const location = useLocation()
  const [isSearchPage, setIsSearchPage] = useState(false);
  const params = useLocation()
  const searchText = (params.search.slice(3))

  useEffect(()=>{
    const isSearch = location.pathname === '/search';
    setIsSearchPage(isSearch);
    
  },[location])

  console.log("search",isSearchPage)

  const redirectToSearchPage = () => {
    navigate('/search');
  };

  const handleOnChange = (e)=>{
    const value = e.target.value
    const url = `/search?q=${value}`
    navigate(url)
  }
  return (
    <div 
      onClick={redirectToSearchPage}
      className='w-full min-w-[300px] lg:min-w-[420px] h-12 rounded-lg border-2 border-gray-200 overflow-hidden flex items-center px-4 cursor-pointer hover:border-primary-300 transition bg-slate-50 group-focus-within:outline-primary-200'
    >
      <IoIosSearch size={22} className="text-gray-500 mr-2" />
      <div className='w-full h-full flex items-center'>
        {
          !isSearchPage ? (
            <div className="text-gray-500 text-sm">
                          <TypeAnimation
                    sequence={[
                      // Same substring at the start will only be typed once, initially
                      'Search "Laptops"',
                      1000,
                      'Search "Phones"',
                      1000,
                      'Search "Milk',
                      1000,
                      'Search "Bread"',
                      1000,
                      'Search "Sugar"',
                      1000,
                      'Search "Toys"',
                      1000,
                    ]}
                    speed={50}
                    repeat={Infinity}
                  />
            </div>

          ) : (
            <div className="w-full h-full">
              <input
                type="text"
                placeholder="Search..." 
                autoFocus= {true}
                defaultValue={searchText}
                className="w-full h-full outline-none text-sm text-gray-700"
                onChange={handleOnChange}
              />
            </div>
          )
        }
      </div>

    </div>
  );
}

export default Search;
