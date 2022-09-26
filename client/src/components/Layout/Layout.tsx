import React, {PropsWithChildren} from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';


function Layout(props: PropsWithChildren) {
    return (
        <div className="container">
            <Header/>
            {props.children}
            <Footer/>
        </div>
    );
}

export default Layout;