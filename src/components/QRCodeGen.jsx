import React from 'react'
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { ToastContainer, toast } from 'react-toastify';

const QRcodeGenerator = () => {
    const [qrCode, setqrCode] = useState('');
    const [input, setinput] = useState('');

    const handleGenQRCode = (e) => {
        e.preventDefault();
        setqrCode(input);
        toast("QR Code generated successfully!", {});
    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />

            <div className='w-full h-full flex flex-col justify-center items-center pt-15 gap-5'>
                <h1 className='text-2xl font-bold bg-gradient-to-br from-[#0b49f4] to-[#a034e4] bg-clip-text text-transparent'>QR Code Generator</h1>
                <div className='bg-gradient-to-br from-[#2cdffb] to-[#9919e8] py-8 px-10 md:p-10 rounded-2xl  flex flex-col justify-center items-center gap-7'>
                    <form onSubmit={handleGenQRCode} className='flex flex-col md:flex-row items-center gap-5  md:gap-5'>
                        <input type="text" value={input} onChange={(e) => setinput(e.target.value)} placeholder='Input text or Website URL' className=' text-center bg-white rounded-[5px] outline-none  py-2.5 md:py-1.5 px-4 md:px-6 focus:ring-[2.5px] ring-purple-500 duration-200' /><button disabled={input === '' ? true : false} type='submit' title='Generate QR Code' className='bg-blue-500 hover:bg-blue-700 active:hover:bg-blue-700 active:bg-blue-600 active:ring-3 active:ring-blue-800 duration-200 text-white cursor-pointer rounded-[5px] px-2 py-1'>Generate</button>
                    </form>
                    <div>
                        <QRCode value={qrCode} bgColor="#a5f7e7" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default QRcodeGenerator
