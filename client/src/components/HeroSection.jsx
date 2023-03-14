import sali from '../assets/Saly-1.png';
import { BiArrowBack } from 'react-icons/bi';

const HeroSection = () => {
    return (
        <section className='flex flex-col items-center min-h-screen max-w-4xl mx-auto gap-9 p-9 pb-1 md:flex-row md:justify-between xl:max-w-7xl'>
            <div className='flex flex-col items-center text-white text-center gap-y-5 max-w-sm md:items-start md:text-start xl:max-w-xl'>
                <span className='inline-block text-[11px] font-black tracking-[4px] uppercase text-primary'>Sketches into realistic images</span>
                <h1 className='font-black text-[40px] leading-10 xl:text-7xl'>
                    Bring Your Drawings to Life with AI
                </h1>
                <p className='text-xs text-neutral-500 font-semibold xl:text-lg'>
                    With Draw-to-Life, you can create a masterpiece from a simple sketch. Simply draw your idea in our canvas, and let the AI do the rest. Start creating your own artwork now!
                </p>
                <a href="#" className='inline-flex items-center gap-x-1 bg-primary py-4 px-8 rounded-full font-bold text-black hover:-translate-y-[2px] duration-200'>
                    Try it now <BiArrowBack className='rotate-180 font-bold' />
                </a>
            </div>

            <div className='max-w-sm xl:max-w-lg'>
                <img src={sali} alt="home image" />
            </div>
        </section>
    )
}

export default HeroSection;