
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className="background flex items-center justify-center h-screen">
            <div className=" border flex flex-col space-y-4 text-center bg-white px-10 md:px-16 py-6 rounded-lg shadow-2xl mx-5">
                <div className="text-red-500 w-fit mx-auto text-3xl font-medium">! 404 !</div>
                <div className='mx-auto max-w-[200px]'>
                    <img className='w-full' src="https://i.gifer.com/origin/7c/7ccc0b7b695e997d51f2abd73c3a4ed6_w200.gif" alt="" />
                </div>
                <div className="text-5xl text-primary font-medium h-fit">Page not found</div>
                <div className="h-fit text-gray-500">Sorry, the page you're looking for isn't available.</div>
                <div className="flex items-center justify-center">
                    <button onClick={()=>navigate(-1)} className="bg-primary px-4 py-1 text-white font-medium rounded-md hover:scale-105 cursor-pointer duration-300">
                      Go back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;
