import axios from 'axios';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import Jumbotron from '../../components/Jumbotron';
import { useSetRecoilState } from 'recoil';
import { cartsStore } from '../../store';
import LessonOfSeries from '../../components/LessonOfSeries';
import useSeries from '../../Hooks/useSeries';

function Show() {
    const slug = useParams().slug;
    const [hasBought, setHasBought] = useState(false);
    const setCarts = useSetRecoilState(cartsStore);
    const { series, lessons } = useSeries(slug);

    const addToCartHandler = async () => {
        try {
            const { data } = await axios.post(`/api/add-to-cart/${slug}`)
            setCarts(cars => [...cars, data.data])
            toast(data.message,{
                icon: '👏',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            })
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const getApi = async (url, set) => {
            const { data } = await axios.get(url);
            set(data.data);
        }
        getApi(`/api/user-has-bougt-playlist-${slug}`, setHasBought);
    }, [ slug ]);
    return (
        <div className='mx-12'>
            <Jumbotron title={series.name}>
                {series.description}
                <div className='mt-5'>
                    <Link to={`/series/${slug}/1`} 
                        className='p-3 mr-3 text-white rounded-lg ring-1 ring-slate-500 hover:bg-slate-500 bg-slate-600 focus:bg-slate-700'>
                        Watch
                    </Link>
                    { !hasBought &&
                        <button onClick={addToCartHandler} 
                            className='p-3 text-white bg-blue-600 rounded-lg ring-1 ring-blue-600 hover:bg-blue-700 focus:bg-blue-800'>
                            Add to Cart
                        </button>
                    }
                </div>
            </Jumbotron>
            <div className='grid grid-cols-2 -mt-16 '>
                <div className='p-3 bg-white rounded'>
                    <h3 className='my-1 text-lg'>{series.name}</h3>
                    <hr />
                <LessonOfSeries slug={slug} lessons={lessons}/>
                </div>
            </div>
        </div>
    );
}

export default Show;