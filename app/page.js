import Main from './components/Main';
import Toast from './components/Toast';

import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
    return (
        <div className='p-6 container max-w-[980px] mx-auto'>
            <h1 className='text-5xl font-semibold mb-10'>Minify - Care of Carl</h1>
            <Main toast={toast} />
            <Toast ToastContainer={ToastContainer} />
        </div>
    );
}
