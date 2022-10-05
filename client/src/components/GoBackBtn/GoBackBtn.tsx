import React from 'react';
import {useNavigate} from 'react-router-dom';
import {TiArrowBack} from 'react-icons/ti';


function GoBackBtn() {
    const navigate = useNavigate();

    function handleClick() {
        navigate(-1);
    }

    return (
        <button className="btn flex items-center justify-center text-xl w-20 rounded-full
                           dark:bg-transparent dark:hover:bg-slate-800 dark:focus:ring-slate-600 dark:focus:ring-offset-slate-800"
                onClick={handleClick}
        >
            <TiArrowBack/>
        </button>
    );
}

export default GoBackBtn;