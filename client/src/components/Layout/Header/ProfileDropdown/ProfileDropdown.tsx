import React, {Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react';
import avatar from '../../../../assets/images/avatar.png';
import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../../../utils/hooks';
import {logout} from '../../../../store/asyncActions/auth.actions';
import {CgLogOut, CgProfile} from 'react-icons/cg';


function ProfileDropdown() {
    const dispatch = useAppDispatch();

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button>
                    <img src={avatar}
                         alt="avatar"
                         className="w-10 ml-3 rounded-full ring-2 ring-gray-100 dark:ring-slate-700 cursor-pointer"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white
                     shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-900 dark:shadow-slate-800">
                    <div className="py-1">
                        <Menu.Item>
                            <Link
                                to="profile"
                                className="text-gray-700 block px-4 py-2 hover:bg-gray-100 text-gray-900 flex items-center
                                dark:text-slate-100 dark:hover:bg-slate-800"
                            >
                                <CgProfile/> <span className="text-sm ml-2">Account</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <button
                                type="submit"
                                className="w-full text-gray-700 px-4 py-2 hover:bg-gray-100 text-gray-900 flex items-center
                                dark:text-slate-100 dark:hover:bg-slate-800"
                                onClick={() => dispatch(logout())}
                            >
                                <CgLogOut/> <span className="text-sm ml-2">Sign out</span>
                            </button>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default ProfileDropdown;
