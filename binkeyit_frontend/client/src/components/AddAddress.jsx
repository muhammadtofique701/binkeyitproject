import React from 'react';
import { useForm } from "react-hook-form";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from '../provider/GlobalProvider';

const AddAddress = ({ close }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { fetchAddress } = useGlobalContext();

    const onSubmit = async (data) => {
        try {
            const response = await Axios({
                ...SummaryApi.createAddress,
                data, // field names now match schema
            });

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                fetchAddress();
                reset();
                close?.();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className="bg-black/25 fixed inset-0 z-50 h-screen overflow-auto">
            <div className="bg-white p-6 w-full max-w-lg mx-auto mt-10 rounded shadow-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Add Address</h2>
                    <button onClick={close} className="text-gray-600 hover:text-black cursor-pointer">
                        <IoClose size={25} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">

                    {/* Address Line */}
                    <div className="grid gap-1">
                        <label htmlFor="address_line">Address Line</label>
                        <input
                            id="address_line"
                            type="text"
                            className="border bg-blue-50 p-2 rounded"
                            {...register("address_line", { required: true })}
                        />
                        {errors.address_line && <small className="text-red-500">Address is required</small>}
                    </div>

                    {/* City */}
                    <div className="grid gap-1">
                        <label htmlFor="city">City</label>
                        <input
                            id="city"
                            type="text"
                            className="border bg-blue-50 p-2 rounded"
                            {...register("city", { required: true })}
                        />
                        {errors.city && <small className="text-red-500">City is required</small>}
                    </div>

                    {/* State */}
                    <div className="grid gap-1">
                        <label htmlFor="state">Province</label>
                        <input
                            id="state"
                            type="text"
                            className="border bg-blue-50 p-2 rounded"
                            {...register("state", { required: true })}
                        />
                        {errors.state && <small className="text-red-500">Province is required</small>}
                    </div>

                    {/* Postal Code*/}
                    <div className="grid gap-1">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                            id="postalCode"
                            type="text"
                            className="border bg-blue-50 p-2 rounded"
                            {...register("postalCode", {
                                required: "Postal code is required",
                                pattern: {
                                    value: /^\d{5}$/,
                                    message: "Enter a valid 5-digit postal code",
                                },
                            })}
                        />
                        {errors.postalCode && (
                            <small className="text-red-500">{errors.postalCode.message}</small>
                        )}
                    </div>


                    {/* Country */}
                    <div className="grid gap-1">
                        <label htmlFor="country">Country</label>
                        <input
                            id="country"
                            type="text"
                            className="border bg-blue-50 p-2 rounded"
                            {...register("country", { required: true })}
                        />
                        {errors.country && <small className="text-red-500">Country is required</small>}
                    </div>

                    {/* Mobile */}
                    <div className="grid gap-1">
                        <label htmlFor="mobile">Mobile No.</label>
                        <input
                            id="mobile"
                            type="text"
                            className="border bg-blue-50 p-2 rounded"
                            {...register("mobile", {
                                required: true,
                                pattern: {
                                    value: /^[0-9]{10,15}$/,
                                    message: "Enter a valid mobile number",
                                }
                            })}
                        />
                        {errors.mobile && <small className="text-red-500">{errors.mobile.message}</small>}
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white py-2 rounded mt-2 font-semibold cursor-pointer"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddAddress;
