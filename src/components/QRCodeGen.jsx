import React from 'react'
import { useState, useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';
import { ToastContainer, toast } from 'react-toastify';
import { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";
import { Save } from 'lucide-react';

const override = {
    display: "block",
    margin: "0 auto",
    // border:"10px",
    borderColor: "purple",
};


const QRcodeGenerator = () => {
    const [qrCode, setqrCode] = useState('Please Input text or Website URL to generate QR Code!');
    const [input, setinput] = useState('');
    const [isLoading, setisLoading] = useState(true);
    const qrRef = useRef();

    // for spinner: 
    let [color, setColor] = useState("#ffffff");

    const handleGenQRCode = (e) => {

        e.preventDefault();
        if (input !== '') {
            setisLoading(true);
            setqrCode(input);
            toast("QR Code generated successfully!", {});
            setinput('');
        }
        else {
            toast("Please input text or Website URL !", {});
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setisLoading(false);
        }, 1200);
    }, [handleGenQRCode])

    const downloadQRCode = () => {
        const svg = qrRef.current.querySelector('svg');
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        // Set canvas size
        canvas.width = 256;
        canvas.height = 256;
        
        // Fill canvas with background color
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        img.onload = () => {
            // Add padding equivalent to p-1 (4px scaled to 256px canvas = ~4px)
            const padding = 4;
            const qrSize = canvas.width - (padding * 2);
            ctx.drawImage(img, padding, padding, qrSize, qrSize);
            const pngFile = canvas.toDataURL('image/png');
            
            // Create download link
            const downloadLink = document.createElement('a');
            downloadLink.download = "your-qrcode.png";
            downloadLink.href = pngFile;
            downloadLink.click();
        };
        
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };


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
                theme="dark" />

            <div className='w-full h-full flex flex-col justify-center items-center pt-7 md:pt-15 gap-5'>
                <h1 className='text-3xl font-bold bg-gradient-to-br from-[#0bbaf4] to-[#ad46ee] bg-clip-text text-transparent'>QR Code Generator</h1>
                <div className='bg-gradient-to-br from-[#2cdffbdb] to-[#9919e8c4] pt-6 pb-4 px-8 md:pt-10 md:pb-5 rounded-2xl  flex flex-col justify-center items-center gap-7'>
                    <form onSubmit={handleGenQRCode} className='flex flex-col md:flex-row items-center gap-5  md:gap-2'>
                        <input type="text" value={input} onChange={(e) => setinput(e.target.value)} placeholder='Input text or Website URL' className=' text-center bg-white rounded-[5px] outline-none  py-2.5 md:py-1.5 px-4 md:px-6 focus:ring-[2.5px] ring-purple-500 duration-200' /><button type='submit' title='Generate QR Code' className='bg-purple-600 hover:bg-purple-700 active:hover:bg-purple-700 active:bg-purple-600 active:ring-3 active:ring-purple-800 duration-200 text-white cursor-pointer rounded-[5px] px-2 py-1'>Generate</button>
                    </form>
                    <div ref={qrRef} className={isLoading?"":"bg-white rounded"} >
                        {
                            isLoading ?
                                <ClipLoader
                                    color={color}
                                    loading={isLoading}
                                    cssOverride={override}
                                    size={80}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                /> :
                                <QRCode value={qrCode}  className='p-1'/>
                        }
                    </div>
                    {!isLoading && qrCode !== 'Please Input text or Website URL to generate QR Code!' && (
                        <button 
                            onClick={downloadQRCode}
                            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-600 duration-200 text-white px-4 py-2 rounded-md flex items-center gap-2"
                            title="Download QR Code"
                        >
                            <Save/>
                            Download QR Code
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default QRcodeGenerator
