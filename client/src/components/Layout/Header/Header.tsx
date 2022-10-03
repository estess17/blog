import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {CgSearch, CgMoon, CgSun} from 'react-icons/cg';
import {useAppDispatch, useAppSelector} from '../../../utils/hooks';
import {toggle} from '../../../store/slices/dark-mode.slice';
import {openLogin} from '../../../store/slices/modals.slice';
import avatar from '../../../assets/images/avatar.png';
import {ProfileDropdown} from '../../index';


function Header() {
    const dark = useAppSelector(state => state.darkMode.isDark);
    const [isDark, setIsDark] = useState(dark);
    const user = useAppSelector(state => state.auth.user);

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
                <div className="flex items-center">
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
                            className="text-4xl text-gray-800 font-thin cursor-pointer p-1.5 rounded-full
                            hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-slate-700"
                            onClick={() => setIsDark(state => !state)}/>
                    }
                    {
                        user ?
                            <ProfileDropdown/> :
                            <button
                                className="btn ml-3 dark:bg-transparent  dark:hover:bg-slate-700 dark:focus:ring-slate-600 dark:focus:ring-offset-slate-800"
                                onClick={() => dispatch(openLogin())}
                            >
                                Log in
                            </button>
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;