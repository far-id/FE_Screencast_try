import React from 'react';
import { Link } from 'react-router-dom';

function LessonOfSeries({lessons, slug}) {
    console.log(lessons)
    return (
        <ol className='p-5 bg-white border rounded-lg'>
            {lessons.map((lesson, index) => (
                <li key={index} className="grid grid-cols-5 my-6">
                    <div className="col-span-1 place-self-center">
                        <div className='inline px-3 py-2 transition duration-200 bg-white border rounded-full hover:bg-gradient-to-br from-stone-700 to-stone-900'>
                            {index + 1}
                        </div>
                    </div>
                        <div className="col-span-4">
                        <Link to={`/series/${slug}/${lesson.episode}`} className="block">{lesson.title}</Link>
                        {lesson.runtime}
                        </div>
                </li>
            ))}
        </ol>
    );
}

export default LessonOfSeries;