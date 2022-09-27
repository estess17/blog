import {Dialog, Transition} from '@headlessui/react';
import React, {FormEvent, Fragment, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {closeRegister, openLogin, openRegister} from '../../store/slices/modals.slice';


function Register() {
    const open = useAppSelector(state => state.modals.isRegister);
    const cancelButtonRef = useRef(null);
    const dispatch = useAppDispatch();

    function handleClose() {
        dispatch(closeRegister());
    }

    function handleSubmit() {
        console.log('submit');
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-slate-900">
                                    <div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3"
                                                          className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-300">
                                                Sign Up
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500 dark:text-slate-400">
                                                    You need to sign up to be able to create and comment posts
                                                </p>
                                                <form className="flex flex-col mt-4">
                                                    <input type="text"
                                                           name="name"
                                                           placeholder="Nickname"
                                                           className="py-2.5 px-2 border rounded outline-none focus:ring-1 focus:ring-gray-300 text-sm
                                                            dark:bg-transparent dark:border-slate-700 dark:focus:ring-slate-500 dark:text-slate-400 dark:placeholder-slate-500"
                                                    />
                                                    <input type="email"
                                                           name="email"
                                                           placeholder="Email"
                                                           className="mt-2 py-2.5 px-2 border rounded outline-none focus:ring-1 focus:ring-gray-300 text-sm
                                                           dark:bg-transparent dark:border-slate-700 dark:focus:ring-slate-500 dark:text-slate-400 dark:placeholder-slate-500"
                                                    />
                                                    <input type="password"
                                                           name="password"
                                                           placeholder="Password"
                                                           className="mt-2 py-2.5 px-2 border rounded outline-none focus:ring-1 focus:ring-gray-300 text-sm
                                                            dark:bg-transparent dark:border-slate-700 dark:focus:ring-slate-500 dark:text-slate-400 dark:placeholder-slate-500"
                                                    />
                                                    <input type="password"
                                                           name="password"
                                                           placeholder="Confirm password"
                                                           className="mt-2 py-2.5 px-2 border rounded outline-none focus:ring-1 focus:ring-gray-300 text-sm
                                                            dark:bg-transparent dark:border-slate-700 dark:focus:ring-slate-500 dark:text-slate-400 dark:placeholder-slate-500"
                                                    />
                                                </form>
                                                <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
                                                    Already have an account?&nbsp;
                                                    <span className="text-teal-600 font-semibold cursor-pointer"
                                                          onClick={() => dispatch(openLogin())}>Log in</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-slate-800">
                                    <button
                                        type="button"
                                        className="btn bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500 dark:focus:ring-offset-slate-800"
                                        onClick={handleSubmit}
                                    >
                                        Sign Up
                                    </button>
                                    <button
                                        type="button"
                                        className="btn dark:bg-transparent  dark:focus:ring-slate-600 dark:focus:ring-offset-slate-800"
                                        onClick={handleClose}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default Register;