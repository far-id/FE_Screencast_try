import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { cartsStore } from '../../store';

function Carts(props) { 
    const [cart, setCart] = useRecoilState(cartsStore);
    const [total, setTotal] = useState('');

    const removeCartHandler = async (index) => {
        try {
            let { data } = await axios.delete(`/api/carts/${cart[index].id}`);
            setCart(cart.filter((i) => i !== cart[index]));
            toast.success(data.message);
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    const purchaseHandler = async () => {
        try {
            let { data } = await axios.post('/api/orders/create');
            console.log(data);
            window.open(data.redirect_url, '_blank');
            // setCart([]);
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    }

    useEffect(() => {
        let totalPrice = cart.map((cart) => cart.price.default).reduce((a, b) => a + b, 0);
        setTotal(totalPrice);
    }, [cart]);
    return (
        <div className='mx-12 my-8'>
            {cart.length > 0 ? (
                
            <div className="flex gap-x-8 min-h-min">
                <div className='bg-white border border-gray-200 rounded-lg shadow-lg basis-2/3'>
                    <header className="px-5 py-4 border-b border-gray-100">
                        
                        <h2 className="font-semibold text-gray-800">
                            <span className='p-1 mr-2 text-sm font-medium text-white bg-indigo-600 rounded-lg'>
                                {cart.length}
                            </span>
                            Your Carts
                        </h2>
                    </header>
                    <div className="p-3">
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-50">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">#</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Series</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Episodes</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Instructor</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Price</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-center" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-100">
                                    {cart.map((item, index) => (
                                        <tr key={index}>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">{index + 1}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">{item.playlist.name}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">{item.playlist.episodes}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">{item.playlist.instructor.name}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Rp.{item.price.formatted}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="flex items-center font-semibold text-center">
                                                    <button onClick={(() => removeCartHandler(index))} className='text-center'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pink-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className='bg-white border border-gray-200 rounded-lg shadow-lg basis-1/3 place-self-start'>
                    <header className="px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Check Out</h2>
                    </header>
                    <div className="p-3">
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead className="text-xs font-semibold text-gray-400 uppercase bg-gray-50">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left">Series</div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-center">Price</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-100">
                                    {cart.map((item, index) => (
                                        <tr key={index}>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">{item.playlist.name}</div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Rp.{item.price.formatted}</div>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>
                                            <div className="font-semibold text-left">Total</div>
                                        </td>
                                        <td>
                                            <div className="font-semibold text-center">Rp.{total}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan='2'>
                                            <button 
                                                onClick={purchaseHandler}
                                                className='w-full py-2 text-center text-white bg-green-500 rounded-lg hover:bg-green-600 active:bg-green-600 focus:bg-green-600'>
                                                Buy
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            )
            :
            <div className='flex flex-col items-center justify-center'>
                <div className='text-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2a10 10 0 0110 10v8a10 10 0 01-10 10H2a10 10 0 01-10-10V12a10 10 0 0110-10h8z" />
                        <path d="M12.5 7v9a1.5 1.5 0 003 0V7h-3zM21 12a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                </div>
                <div className='mt-4 text-lg text-center text-gray-600'>
                    Your cart is empty
                </div>
            </div>
            }
        </div>
    );
}

export default Carts;