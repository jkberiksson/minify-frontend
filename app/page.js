import Main from './components/Main';
import Toast from './components/Toast';

import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
    return (
        <div className='p-6 container max-w-[1200px] mx-auto'>
            <Main toast={toast} />
            <Toast ToastContainer={ToastContainer} />
        </div>
    );
}
