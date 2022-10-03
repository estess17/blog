import React from 'react';


function PostSkeleton() {
    return (
        <div className="p-10 rounded-md shadow bg-white dark:bg-slate-800">
            <div className="animate-pulse">
                <div>
                    <div className="h-7 mb-2 bg-slate-300 dark:bg-slate-700 rounded"></div>
                    <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded"></div>
                </div>
                <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center">
                        <div className="mr-2 rounded-full bg-slate-300 dark:bg-slate-700 h-10 w-10"></div>
                        <div>
                            <div className="h-2 w-20 mb-2 bg-slate-300 dark:bg-slate-700 rounded"></div>
                            <div className="h-2 w-24 bg-slate-300 dark:bg-slate-700 rounded"></div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="h-4 w-10 mr-2 bg-slate-300 dark:bg-slate-700 rounded"></div>
                        <div className="h-4 w-10 bg-slate-300 dark:bg-slate-700 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostSkeleton;