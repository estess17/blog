import React, {useEffect} from 'react';
import {Layout, PrivateWrapper} from './components';
import {Route, Routes} from 'react-router-dom';
import {MainPage, PostPage, ProfilePage, PostCreateEditPage} from './pages';
import {ToastContainer} from 'react-toastify';
import {useAppDispatch, useAppSelector} from './utils/hooks';
import {getProfile} from './store/asyncActions/auth.actions';


function App() {
    const isDark = useAppSelector(state => state.darkMode.isDark);
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (accessToken) {
            dispatch(getProfile());
        }
    }, [accessToken]);


    return (
        <Layout>
            <Routes>
                <Route path="/" element={<MainPage/>}/>

                <Route path="/post">
                    <Route path=":id" element={<PostPage/>}/>
                    <Route element={<PrivateWrapper isAuthenticated={accessToken}/>}>
                        <Route path="create" element={<PostCreateEditPage/>}/>
                    </Route>
                    <Route element={<PrivateWrapper isAuthenticated={accessToken}/>}>
                        <Route path="edit/:id" element={<PostCreateEditPage/>}/>
                    </Route>
                </Route>

                <Route element={<PrivateWrapper isAuthenticated={accessToken}/>}>
                    <Route path="/profile" element={<ProfilePage/>}/>
                </Route>

                <Route path="*" element={<MainPage/>}/>
            </Routes>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
                theme={isDark ? 'dark' : 'light'}
            />
        </Layout>
    );
}

export default App;
