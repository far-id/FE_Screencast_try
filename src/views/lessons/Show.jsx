import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import LessonOfSeries from '../../components/LessonOfSeries';
import useSeries from '../../Hooks/useSeries';

function Show(props) {
    const { slug, episode } = useParams();
    const [lesson, setLesson] = useState([]);
    const [tags, setTags] = useState([]);
    const { lessons } = useSeries(slug);
    const [episodeCount, setEpisodeCount] = useState(0);
    const [errorScreen, setErrorScreen] = useState(false);
    const onReady = (event) => {
        console.log("onReady",)
    }

    const onStateChange = (event) => {
        console.log("onStateChange")
    }
    useEffect(() => {
        const getLesson = async () => {
            try {
                const { data } = await axios.get(`/api/playlists/${slug}/${episode}`);
                setEpisodeCount(data.data.playlist.videos_count)
                setLesson(data.data);
                setTags(data.data.playlist.tags);
            } catch (e) {
                setErrorScreen(true);
            }
        }
        getLesson();
    }, [slug, episode]);


    return (
        <div>
            <div className='w-screen h-screen -mb-20'>
                { !errorScreen ?
                    <YouTube
                        videoId={lesson.unique_video_id}
                        className={'w-full h-full aspect-video'}
                        containerClassName={'px-24 h-5/6 bg-gray-900'}
                        onReady={onReady}
                        onStateChange={onStateChange}
                    />
                :
                    <div className='w-full h-full bg-gray-900'>
                        <h1 className='text-4xl text-center text-white'>
                            you are must be bought the playlist before watching
                        </h1>
                    </div>
                }
            </div>
            <div className='w-screen mx-auto'>
                <div className="flex flex-row gap-4 mx-12">
                    <div className='bg-white basis-2/3'>
                        <div className="flex justify-between p-8 border-2 rounded-lg">
                            <div className='w-1/12'>
                                {lesson.episode > 1 ?
                                    <Link to={`/series/${slug}/${parseInt(episode) - 1}`} className="flex items-center justify-center w-10 h-10 transition duration-200 bg-white rounded-full shadow hover:bg-gray-800 hover:shadow-none hover:text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path>
                                        </svg>
                                    </Link>
                                :
                                <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow">
                                    <svg xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path>
                                    </svg>
                                </div>
                                }
                            </div>
                            <div className='w-10/12'>
                                <div>
                                    <h1 className='text-xl font-bold text-gray-800'>{lesson.title}</h1>
                                </div>
                            </div>
                            <div className="flex justify-end w-1/12">
                            { lesson.episode < episodeCount ?
                                <Link to={`/series/${slug}/${parseInt(episode) + 1}`} className="flex items-center justify-center w-10 h-10 transition duration-200 bg-white rounded-full shadow hover:bg-gray-800 hover:shadow-none hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                                    </svg>
                                </Link>
                            :
                                <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow">
                                    <svg xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>
                                    </svg>
                                </div>
                            }
                            </div>
                        </div>
                    </div>
                    <div className="block bg-white basis-1/3">
                        <div className="flex flex-col justify-center p-5 border-2 rounded-lg">
                            {lesson.title}
                            <div className="inline mt-2">
                                {tags.map((tag, index) => (
                                        <Link to="#" key={index}
                                            className="inline px-2 py-1 m-1 text-sm transition duration-200 bg-white border rounded-full hover:bg-gray-800 hover:text-white" >
                                            {tag.name}
                                        </Link>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <LessonOfSeries lessons={lessons} slug={slug} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Show;