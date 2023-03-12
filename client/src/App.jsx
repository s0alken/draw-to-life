import sali from './assets/Saly-1.png';
import { BiArrowBack } from 'react-icons/bi';
import CanvasDraw from './components/CanvasDraw';

const App = ()  => {

  return (

    <div className='bg-black'>
      <section className='flex flex-col items-center min-h-screen max-w-4xl mx-auto gap-9 p-9 md:flex-row md:justify-between xl:max-w-7xl'>
        <div className='flex flex-col items-center text-white text-center gap-y-5 max-w-sm md:items-start md:text-start xl:max-w-xl'>
          <span className='inline-block text-[11px] font-black tracking-[4px] uppercase text-primary'>Sketches into realistic images</span>
          <h1 className='font-black text-[40px] leading-10 xl:text-7xl'>
            Bring Your Drawings to Life with AI
          </h1>
          <p className='text-xs text-neutral-600 xl:text-lg'>
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

      <section className='p-9'>
        <div className='mx-auto text-center max-w-sm lg:max-w-xl'>
          <h1 className='font-black mb-4 text-3xl leading-10 xl:text-5xl text-white'>
            Bring Your Drawings to Life with AI
          </h1>
          <p className='text-xs text-neutral-600 xl:text-lg mb-6'>
            With Draw-to-Life, you can create a masterpiece from a simple sketch. Simply draw your idea in our canvas, and let the AI do the rest.
          </p>
        </div>

        <div className='grid bg-neutral-900 p-6 rounded-xl max-w-[400px] mx-auto gap-6 lg:max-w-4xl lg:grid-cols-2'>

          <div className='rounded-xl overflow-hidden'>
            <CanvasDraw />
          </div>

          <div className='flex flex-col gap-3 lg:flex-row lg:gap-0 lg:order-3 lg:col-span-2'>
            <input type="text" className='flex-1 bg-transparent py-2 px-3 font-bold focus:outline-none text-white border-4 border-primary rounded-lg lg:border-r-0 lg:rounded-r-none' />
            <button className='bg-primary whitespace-nowrap rounded-lg font-bold py-4 px-7 lg:rounded-l-none'>Make it real!</button>
          </div>

          <div className='border-4 border-primary bg-primary text-neutral-800 min-h-[400px] font-black text-3xl p-8 pr-11 rounded-xl md:text-5xl'>
            Just start drawing on our canvas and let AI do the rest
          </div>

        </div>

      </section>
    </div>

  )
}

export default App;