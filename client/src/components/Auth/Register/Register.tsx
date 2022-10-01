import {Dialog, Transition} from '@headlessui/react';
import React, {Fragment, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../../utils/hooks';
import {closeLogin, openLogin} from '../../../store/slices/modals.slice';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {register as signUp} from '../../../store/asyncActions/auth.actions';
import {IRegisterFormInputs} from '../../../utils/interfaces';
import * as yup from 'yup';


const registerSchema = yup.object({
    username: yup.string().min(4).max(32).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(64).required(),
}).required();


function Register() {
    const open = useAppSelector(state => state.modals.isRegister);
    const cancelButtonRef = useRef(null);
    const dispatch = useAppDispatch();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IRegisterFormInputs>({
        resolver: yupResolver(registerSchema),
    });

    function onSubmit(data: IRegisterFormInputs) {
        dispatch(signUp(data));
        reset();
    }

    function handleClose() {
        reset();
        dispatch(closeLogin());
    }

    function onSwitch() {
        reset();
        dispatch(openLogin());
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
                                                           placeholder="Nickname"
                                                           autoComplete="username"
                                                           className={`input ${errors.username && 'border-red-600 dark:border-red-900'}`}
                                                           {...register('username', {required: true})}
                                                    />
                                                    <p className="mt-1 text-sm text-red-800 font-medium dark:text-red-600">
                                                        {errors.username?.message}
                                                    </p>
                                                    <input type="email"
                                                           placeholder="Email"
                                                           autoComplete="email"
                                                           className={`input mt-2 ${errors.email && 'border-red-600 dark:border-red-900'}`}
                                                           {...register('email', {required: true})}
                                                    />
                                                    <p className="mt-1 text-sm text-red-800 font-medium dark:text-red-600">
                                                        {errors.email?.message}
                                                    </p>
                                                    <input type="password"
                                                           placeholder="Password"
                                                           autoComplete="current-password"
                                                           className={`input mt-2 ${errors.password && 'border-red-600 dark:border-red-900'}`}
                                                           {...register('password', {required: true})}
                                                    />
                                                    <p className="mt-1 text-sm text-red-800 font-medium dark:text-red-600">
                                                        {errors.password?.message}
                                                    </p>
                                                </form>
                                                <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
                                                    Already have an account?&nbsp;
                                                    <span className="text-teal-600 font-semibold cursor-pointer"
                                                          onClick={onSwitch}>Log in</span>
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
                                        onClick={handleSubmit(onSubmit)}
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