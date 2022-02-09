import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import Jumbotron from '../../components/Jumbotron';

function Index(props) {
    const [series, setSeries] = useState([])
    const [links, setlinks] = useState([])
    const [url, setUrl] = useState('/api/playlists')

    useEffect(() => {
        const getSeries = async () => {
            const { data } = await axios.get(url);
            setSeries(data.data);
            setlinks(data.meta.links)
        }
        getSeries();
    }, [ url ]); 
    return (
        <div className='mx-12'>
            <Jumbotron title="All Series">
                The latest <strong>Series</strong> we have
            </Jumbotron>
            <div className='grid grid-cols-3 gap-4'>
                {series.map(series => (
                    <Link to={`/series/${series.slug}`} key={series.id} className='col-span-1 overflow-hidden bg-white rounded-md shadow group'>
                        <img src={series.picture} alt={series.name} className='min-w-full' />
                        <h2 className='px-4 py-2 -mb-3 text-lg font-medium text-blue-700'>{series.name}</h2>
                        <div className='flex items-center justify-between px-4 py-2'>
                            <p className='text-sm text-gray-600'>{series.episodes} Episode</p>
                            <p className='text-sm text-gray-600'>Rp.{series.price.formatted}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="mt-8 ">
                <div className='flex items-center justify-end'>
                    <div className='overflow-hidden rounded-md ring-violet-700 ring-1'>
                        {links.length > 3 && links.map((link,index) => (
                            <button onClick={() => setUrl(link.url)} key={index} dangerouslySetInnerHTML={{ __html: link.label }} disabled={link.url === null && true}
                                className={`bg-gray-800 px-4 py-2 font-bold  ${link.url === url ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' } ring-Indigo-900 ring-1  disabled:bg-gray-800 disabled:text-slate-500`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;