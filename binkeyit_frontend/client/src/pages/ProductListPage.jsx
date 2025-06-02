import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';
import { useSelector } from 'react-redux';
import { validURLConvert } from '../utils/validURLConvert';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);

  const params = useParams();
  const allSubCategory = useSelector(state => state.product.allSubCategory);
  const [displaySubCategory, setDisplaySubCategory] = useState([]);

  const subCategory = params.subCategory?.split("-");
  const subCategoryName = subCategory?.slice(0, subCategory.length - 1)?.join(" ");
  const categoryId = params.category?.split("-").pop();
  const subCategoryId = params.subCategory?.split("-").pop();

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getproductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page,
          limit: 8
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page === 1) {
          setData(responseData.data);
        } else {
          setData(prev => [...prev, ...responseData.data]);
        }

        setTotalPage(responseData.totalPage || 1);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [categoryId, subCategoryId]);

  useEffect(() => {
    const filteredSub = allSubCategory.filter(s =>
      s.category.some(el => el._id === categoryId)
    );
    setDisplaySubCategory(filteredSub);
  }, [categoryId, allSubCategory]);

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container mx-auto grid grid-cols-[90px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr] gap-2">
        {/* Subcategories */}
        <div className="min-h-[88vh] max-h-[88vh] overflow-y-auto space-y-1 shadow-md bg-white py-2 px-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
  {displaySubCategory.map(s => {
    const link = `/${validURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${validURLConvert(s.name)}-${s._id}`;
    const isActive = subCategoryId === s._id;

    return (
      <Link
        key={s._id}
        to={link}
        className={`flex flex-col lg:flex-row items-center gap-2 lg:gap-4 p-2 border-b hover:bg-green-100 transition-all duration-150 ${
          isActive ? 'bg-green-100' : ''
        }`}
      >
        <div className="w-12 h-12 flex justify-center items-center">
          <img
            src={s.image}
            alt="subcategory"
            className="h-full w-full object-contain"
          />
        </div>
        <p className="text-xs lg:text-sm text-center lg:text-left break-words">{s.name}</p>
      </Link>
    );
  })}
</div>


        {/* Products */}
        <div className='sticky top-20'>
          <div className="bg-white shadow-md p-4 z-10">
            <h3 className="font-medium capitalize">{subCategoryName}</h3>
          </div>
          <div className='min-h-[70vh] max-h-[70vh] overflow-y-auto relative'>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-4 gap-2">
            {data.map((p, index) => (
              <CardProduct key={p._id + "ProductSubCategory" + index} data={p} />
            ))}
          </div>
          </div>

          {loading && <Loading />}
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
