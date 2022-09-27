import React, {PropsWithChildren} from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import {Login, Register} from '../index';


function Layout(props: PropsWithChildren) {
    return (
        <div className="flex flex-col h-screen">
            <Header/>
            <main className="flex-grow bg-gray-50 dark:bg-slate-900">
                {props.children}
            </main>
            <Footer/>

            <Login/>
            <Register/>
        </div>
    );
}

export default Layout;