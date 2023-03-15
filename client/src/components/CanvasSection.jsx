import { useState, useRef } from "react";
import { saveAs } from 'file-saver'
import CanvasDraw from "./CanvasDraw";
import { Orbit } from '@uiball/loaders'
import { IoCloseCircleSharp } from 'react-icons/io5';
import { BsFillFileImageFill } from 'react-icons/bs';
import { BiDownload } from 'react-icons/bi';
import api from "../api";
import { motion } from "framer-motion";

const CanvasSection = () => {

    const [prediction, setPrediction] = useState({ status: 'starting' });
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const canvasRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        let { data: prediction } = await api.post('/upload', {
            prompt,
            drawing: canvasRef.current.toDataURL('image/png')
        });

        while (prediction.status !== "succeeded" && prediction.status !== "failed") {
            await new Promise((r) => setTimeout(r, 500));

            const { data } = await api.get(`/prediction/${prediction.id}`);

            prediction = data;

            setPrediction(prediction);
        }

        setIsLoading(false);
    }

    return (
        <motion.section
            className='p-3 pb-8'
            initial="hidden"
            whileInView="visible"
            variants={{
                hidden: {
                    y: 50,
                    opacity: 0,
                },
                visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                        duration: 1.25
                    }
                }
            }}
        >
            <div className='mx-auto text-center max-w-sm lg:max-w-xl'>
                <h1 className='font-black mb-4 text-3xl leading-10 xl:text-5xl text-white'>
                    Bring Your Drawings to Life with AI
                </h1>
                <p className='text-xs font-semibold text-neutral-500 max-w-xs mx-auto mb-6 md:max-w-none xl:text-lg'>
                    With Draw-to-Life, you can create a masterpiece from a simple sketch. Simply draw your idea in our canvas, and let the AI do the rest.
                </p>
            </div>

            <div className='grid bg-neutral-900 p-4 rounded-xl max-w-[400px] w-fit mx-auto gap-4 lg:max-w-none lg:grid-cols-[400px_400px]'>

                <div className='relative rounded-xl overflow-hidden'>
                    <CanvasDraw ref={canvasRef} />
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-3 lg:flex-row lg:gap-0 lg:order-3 lg:col-span-2'>
                    <div className="relative flex-1">
                        <input
                            type="text"
                            className='w-full h-full bg-transparent p-3 font-bold text-white border-2 border-primary rounded-lg focus:outline-none placeholder:font-bold placeholder:text-neutral-600 md:border-4 lg:border-r-0 lg:rounded-r-none'
                            value={prompt}
                            onChange={e => setPrompt(e.target.value)}
                            placeholder="Tell us what are you drawing, E.g: 'A happy dog'"
                        />
                        {!!prompt.length && (
                            <IoCloseCircleSharp
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary cursor-pointer text-2xl lg:text-3xl"
                                onClick={() => setPrompt('')}
                            />
                        )}
                    </div>
                    <button className='bg-primary whitespace-nowrap rounded-lg font-bold p-3 lg:py-4 lg:px-6 lg:rounded-l-none'>Make it real!</button>
                </form>

                <div className="rounded-xl overflow-hidden flex">
                    {!prediction.output ? (
                        <div className='flex-1 flex flex-col justify-center items-center min-h-[400px] rounded-xl border-2 border-dashed border-neutral-600 text-neutral-600 font-bold tracking-wider'>
                            <div className="flex flex-col items-center gap-4">
                                {isLoading ? (
                                    <>
                                        <Orbit size={35} color="#565656" />
                                        <span className="capitalize">{`${prediction.status}...`}</span>
                                    </>
                                ) : (
                                    <>
                                        <BsFillFileImageFill className="text-4xl" />
                                        <span className="capitalize">The result will be shown here</span>
                                    </>
                                )}
                            </div>
                        </div>) : (
                        <div className="relative group">
                            <img src={prediction.output[1]} alt={prompt} className="w-full" />
                            <button
                                className="absolute flex items-center gap-2 top-0 right-0 bg-neutral-800 px-3 py-1 rounded-full m-2 text-neutral-500 font-semibold text-sm tracking-wider opacity-0 group-hover:opacity-100 hover:text-primary"
                                onClick={() => saveAs(prediction.output[1], `${prediction.input.prompt.replaceAll(' ', '_')}.png`)}
                            >
                                Download
                                <BiDownload className="text-lg" />
                            </button>
                        </div>
                    )}
                </div>

            </div>

        </motion.section>
    )
}

export default CanvasSection;