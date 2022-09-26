import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {CgSearch, CgMoon, CgSun} from 'react-icons/cg';
import {useAppDispatch, useAppSelector} from '../../../utils/hooks';
import {toggle} from '../../../store/slices/darkMode.slice';


function Header() {
    const dark = useAppSelector(state => state.darkMode.isDark);
    const [isDark, setIsDark] = useState(dark);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
    });

    useEffect(() => {
        dispatch(toggle(isDark));
    }, [isDark]);

    return (
        <header className="border-b dark:bg-slate-800 dark:border-slate-700">
            <div className="container flex justify-between items-center h-20">
                <Link to="/" className="text-3xl font-semibold text-gray-800 select-none dark:text-gray-100">
                    Blog
                </Link>
                <div className="flex">
                    <CgSearch
                        className="text-4xl text-gray-800 font-thin cursor-pointer mr-3 p-1.5 rounded-full
                        hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-slate-700"
                    />
                    {isDark ?
                        <CgSun
                            className="text-4xl text-gray-800 font-thin cursor-pointer p-1.5 rounded-full
                            hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-slate-700"
                            onClick={() => setIsDark(state => !state)}/> :
                        <CgMoon
                            className="text-4xl text-gray-800 font-thin cursor-pointer  p-1.5 rounded-full
                            hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-slate-700"
                            onClick={() => setIsDark(state => !state)}/>
                    }
                    <button
                        className="py-1 px-2 ml-3 w-24 border rounded-md font-semibold hover:shadow-sm
                         dark:text-gray-100 dark:border-slate-700 dark:shadow-slate-700">
                        Log in
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;