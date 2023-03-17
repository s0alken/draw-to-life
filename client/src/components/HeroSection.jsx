import { motion } from "framer-motion"
import sali from '../assets/Saly-1.png';
import { BiArrowBack } from 'react-icons/bi';

const textVariant = {
    hidden: {
        y: 20,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: .6
        }
    }
}

const HeroSection = () => {
    return (
        <motion.section
            className='flex flex-col items-center min-h-screen max-w-4xl mx-auto gap-9 p-9 pb-1 md:flex-row md:justify-center xl:max-w-7xl'
        /* initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }} */
        >
            <motion.div
                className='flex flex-col items-center text-white text-center gap-y-5 max-w-sm md:items-start md:text-start xl:max-w-xl'
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: .3,
                            delayChildren: .2
                        }
                    }
                }}
            >
                <motion.span variants={textVariant} className='inline-block text-[11px] font-black tracking-[4px] uppercase text-primary'>
                    Sketches into realistic images
                </motion.span>
                <motion.h1 variants={textVariant} className='font-black text-[40px] leading-10 xl:text-7xl'>
                    Bring Your Drawings to Life with AI
                </motion.h1>
                <motion.p variants={textVariant} className='text-xs text-neutral-500 font-semibold xl:text-lg'>
                    With Draw-to-Life, you can create a masterpiece from a simple sketch. Simply draw your idea in our canvas, and let the AI do the rest. Start creating your own artwork now!
                </motion.p>
                <motion.a
                    variants={textVariant}
                    href="#"
                    className='inline-flex items-center gap-x-1 bg-primary py-4 px-8 rounded-full font-bold text-black mt-5'
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                >
                    Try it now <BiArrowBack className='rotate-180 font-extrabold' />
                </motion.a>
            </motion.div>

            <motion.div
                className='max-w-sm xl:max-w-lg'
                initial={{
                    y: 50,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1
                }}
                transition={{
                    duration: 1.5,
                    delay: 1.5
                }}

            >
                <motion.img
                    src={sali}
                    alt="home image"
                    animate={{
                        y: [0, 15]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: 'reverse'
                    }}
                />
            </motion.div>
        </motion.section>
    )
}

export default HeroSection;