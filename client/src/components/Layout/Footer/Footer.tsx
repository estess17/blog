import React from 'react';


function Footer() {
    return (
        <footer className="border-t bg-gray-100 dark:bg-gray-900 dark:border-slate-800">
            <div className="container flex flex-col items-center justify-center h-32">
                <h2 className="font-medium mb-3 text-gray-800 dark:text-slate-400">©2022 Blog</h2>
                <p className="text-gray-600 dark:text-slate-500">
                    Powered by&nbsp;
                    <a href="https://github.com/estess17" target="_blank" rel="noreferrer" className="font-semibold hover:underline">
                        Nikita Panagoda
                    </a>
                </p>
            </div>
        </footer>
    );
}

export default Footer;