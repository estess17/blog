import React, {useEffect} from 'react';
import {Layout} from './components';
import {Route, Routes} from 'react-router-dom';
import {MainPage, PostPage, ProfilePage} from './pages';
import {ToastContainer} from 'react-toastify';
import {useAppDispatch, useAppSelector} from './utils/hooks';
import {getProfile} from './store/asyncActions/auth.actions';


function App() {
    const isDark = useAppSelector(state => state.darkMode.isDark);
    const accessToken = useAppSelector(state => state.auth.accessToken);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProfile());
    }, [accessToken])

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="post/:id" element={<PostPage/>}/>
                <Route path="profile" element={<ProfilePage/>}/>
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
