import React, {Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch} from "../../../utils/hooks";
import {BiDotsHorizontalRounded} from "react-icons/bi";
import {TbEdit} from "react-icons/tb";
import {RiDeleteBin2Line} from "react-icons/ri";
import {remove} from "../../../store/asyncActions/posts.actions";


function PostMenuDropdown({id}: { id: string}) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function removeHandler() {
        dispatch(remove(id));
        navigate('/');
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button>
                    <BiDotsHorizontalRounded className="p-1.5 text-4xl font-semibold text-gray-800 rounded-full cursor-pointer
                 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-slate-700 dark:text-slate-200"/>
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
                    className="absolute right-0 z-10 mt-1 w-32 origin-top-right rounded-md bg-white
                     shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-900 dark:shadow-slate-800">
                    <div className="py-1">
                        <Menu.Item>
                            <Link
                                to={`/post/edit/${id}`}
                                className="text-gray-700 block px-4 py-2 hover:bg-gray-100 text-gray-900 flex items-center
                                dark:text-slate-100 dark:hover:bg-slate-800"
                            >
                                <TbEdit/> <span className="text-sm ml-2">Edit</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <button
                                type="submit"
                                className="w-full text-red-600 px-4 py-2 hover:bg-red-50 text-gray-900 flex items-center
                                dark:text-slate-100 dark:hover:bg-slate-800"
                                onClick={removeHandler}
                            >
                                <RiDeleteBin2Line/> <span className="text-sm ml-2">Delete</span>
                            </button>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default PostMenuDropdown;
