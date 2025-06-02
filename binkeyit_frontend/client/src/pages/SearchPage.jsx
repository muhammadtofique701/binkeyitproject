import React, { useEffect, useState } from 'react'
import CardLoading from '../components/CardLoading'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import CardProduct from '../components/CardProduct'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom'
import noDataImage from "../assets/nothing here yet.webp"

function SearchPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("q") || ""; // assuming "?q=searchterm"

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page: page,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (page === 1) {
          setData(responseData.data);
        } else {
          setData(prev => [...prev, ...responseData.data]);
        }
        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1); // Reset page when search text changes
    setData([]); // Clear old data
  }, [searchText]);

  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  const handleFetchMore = () => {
    if (page < totalPage) {
      setPage(prev => prev + 1);
    }
  };

  const loadingArrayCard = new Array(10).fill(null);

  return (
    <section className='bg-white min-h-screen'>
      <div className='container mx-auto p-4'>
        <p className='font-semibold'>Search Results: {data.length}</p>

        <InfiniteScroll
          dataLength={data.length}
          hasMore={page < totalPage}
          next={handleFetchMore}
          loader={
            loading &&
            loadingArrayCard.map((_, index) => (
              <div key={"loadingsearchpage" + index}>
                <CardLoading />
              </div>
            ))
          }
        >
          <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 py-5 gap-2'>
            {data.map((p, index) => (
              <CardProduct data={p} key={p?._id + "searchProduct" + index} />
            ))}
          </div>
        </InfiniteScroll>

        {/* No Data Image */}
        {!data[0] && !loading && (
          <div className='flex flex-col justify-center items-center'>
            <img
              src={noDataImage}
              className='w-full h-full max-w-xs max-h-xs'
              alt="No data"
            />
            <p className='font-semibold my-2'>No Data Found</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SearchPage;
