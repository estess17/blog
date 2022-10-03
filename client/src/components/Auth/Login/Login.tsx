import {Dialog, Transition} from '@headlessui/react';
import {Fragment, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../../utils/hooks';
import {closeLogin, openRegister} from '../../../store/slices/modals.slice';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {login} from '../../../store/asyncActions/auth.actions';
import {ILoginFormInputs} from '../../../utils/interfaces';
import * as yup from 'yup';


const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(64).required(),
}).required();

function Login() {
    const open = useAppSelector(state => state.modals.isLogin);
    const cancelButtonRef = useRef(null);
    const dispatch = useAppDispatch();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<ILoginFormInputs>({
        resolver: yupResolver(loginSchema),
    });


    function onSubmit(data: ILoginFormInputs) {
        reset();
        dispatch(login(data));
    }

    function handleClose() {
        reset();
        dispatch(closeLogin());
    }

    function onSwitch() {
        reset();
        dispatch(openRegister());
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
                                                Log in
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500 dark:text-slate-400">
                                                    You need to log in to be able to create and comment posts
                                                </p>

                                                <form className="flex flex-col mt-4">
                                                    <input type="email"
                                                           placeholder="Email"
                                                           autoComplete="email"
                                                           className={`input ${errors.email && 'border-red-600 dark:border-red-900'}`}
                                                           {...register('email', {required: true})}
                                                    />
                                                    <p className="mt-1 text-sm text-red-800 font-medium dark:text-red-600">
                                                        {errors.email?.message}
                                                    </p>
                                                    <input type="password"
                                                           placeholder="Password"
                                                           autoComplete="current-password"
                                                           className={`input mt-2 ${errors.password && 'border-red-600 dark:border-red-900'}`}
                                                           {...register('password', {required: true, minLength: 6})}
                                                    />
                                                    <p className="mt-1 text-sm text-red-800 font-medium dark:text-red-600">
                                                        {errors.password?.message}
                                                    </p>
                                                </form>

                                                <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
                                                    Dont have an account?&nbsp;
                                                    <span className="text-teal-600 font-semibold cursor-pointer"
                                                          onClick={onSwitch}>Sign Up</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-slate-800">
                                    <button
                                        type="button"
                                        className="btn ml-3 bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500 dark:focus:ring-offset-slate-800"
                                        onClick={handleSubmit(onSubmit)}
                                    >
                                        Log in
                                    </button>
                                    <button
                                        type="button"
                                        className="btn dark:bg-transparent dark:focus:ring-slate-600 dark:focus:ring-offset-slate-800"
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

export default Login;