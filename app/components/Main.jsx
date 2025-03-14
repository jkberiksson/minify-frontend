'use client';

import { useState } from 'react';
import { X, Info } from 'lucide-react';
import { PulseLoader } from 'react-spinners';

export default function Main({ toast }) {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [uiVideo, setUiVideo] = useState(null);
    const [inputKey, setInputKey] = useState(Date.now());
    const [loading, setLoading] = useState(false);
    const [quality, setQuality] = useState(50);

    const handleSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedVideo(file);
            setUiVideo(URL.createObjectURL(file));
        }
    };

    const handleClear = () => {
        setSelectedVideo(null);
        setInputKey(Date.now());
        setQuality(50);
        setUiVideo(null);
    };

    const handleCompress = async () => {
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('video', selectedVideo);
            formData.append('quality', quality);

            const res = await fetch('http://localhost:3000/upload-video', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Something went wrong during the compression');
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            const name = selectedVideo.name.split('.mp4');
            a.href = url;
            a.download = 'compressed_video_and_thumbnail.zip';
            a.download = `${name[0]}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            handleClear();
            toast.success('Wihooo! Snyggt jobbat!!');
        } catch (e) {
            toast.error('Whoops, något gick fel... Försök igen!');
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className='bg-white p-6 rounded shadow mb-4'>
                <h2 className='text-3xl mb-4'>Ladda upp video</h2>

                <div className='border-2 border-dashed rounded-lg p-12 text-center border-gray-300 hover:border-gray-900 relative'>
                    <input
                        type='file'
                        accept='video/*'
                        className='hidden'
                        id='file-upload'
                        onChange={handleSelect}
                        key={inputKey}
                        aria-label='Upload a video'
                    />
                    <label
                        htmlFor='file-upload'
                        className='text-lg text-gray-600 w-full h-full absolute top-0 left-0 flex items-center justify-center cursor-pointer overflow-hidden'>
                        Klicka här för att välja en video
                    </label>
                </div>

                {uiVideo && (
                    <div className='mt-4 relative rounded overflow-hidden'>
                        <div
                            className='absolute top-2 right-2 bg-red-400 w-10 h-10 rounded flex items-center justify-center z-10 cursor-pointer hover:bg-red-500'
                            onClick={handleClear}>
                            <X color='white' />
                        </div>
                        <video src={uiVideo} controls className='w-full rounded mb-4' />
                        <p className='mt-2 text-sm text-gray-500'>Vald fil: {selectedVideo.name}</p>
                        <p className='mt-2 text-sm text-gray-500'>Storlek: {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                )}
            </div>
            {uiVideo && (
                <div className='bg-white p-6 rounded shadow'>
                    <h2 className='text-3xl mb-2'>Välj kvalité</h2>
                    <div className='flex items-center gap-1 mb-4'>
                        <Info size={18} />
                        <p className='text-xs text-gray-600'>
                            Den faktiska komprimeringen kan variera beroende på videons innehåll och format.
                        </p>
                    </div>
                    <input
                        type='range'
                        min='1'
                        max='100'
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                        className='w-full bg-gray-300 h-2 rounded-lg cursor-pointer accent-black mb-4'
                    />
                    <p className='text-base text-gray-500 mb-6'>Kvalitet: {quality}% (Högre värde = bättre kvalité = större filstorlek)</p>
                    <button
                        disabled={loading}
                        onClick={handleCompress}
                        className={`bg-black ${
                            loading ? 'opacity-90 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                        } text-white h-14 w-full rounded  flex justify-center items-center`}>
                        {loading ? <PulseLoader color={'#fff'} /> : 'Komprimera och ladda ner'}
                    </button>
                </div>
            )}
        </>
    );
}
