import React from 'react';
import {Layout} from './components';
import {Route, Routes} from 'react-router-dom';
import {MainPage, PostPage, ProfilePage} from './pages';


function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="post/:id" element={<PostPage/>}/>
                <Route path="profile" element={<ProfilePage/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
