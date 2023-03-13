import { useState, useRef } from "react";
import CanvasDraw from "./CanvasDraw";
import { Orbit } from '@uiball/loaders'
import api from "../api";

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

                <div className='relative rounded-xl overflow-hidden'>
                    <CanvasDraw ref={canvasRef} />
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-3 lg:flex-row lg:gap-0 lg:order-3 lg:col-span-2'>
                    <input
                        type="text"
                        className='flex-1 bg-transparent py-2 px-3 font-bold focus:outline-none text-white border-4 border-primary rounded-lg lg:border-r-0 lg:rounded-r-none'
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                    />
                    <button className='bg-primary whitespace-nowrap rounded-lg font-bold py-4 px-7 lg:rounded-l-none'>Make it real!</button>
                </form>

                <div className="rounded-xl overflow-hidden flex">
                    {!prediction.output ? (
                        <div className='flex-1 border-4 border-primary bg-primary text-neutral-800 min-h-[400px] font-black text-3xl p-8 pr-11 rounded-xl md:text-5xl'>
                            Just start drawing on our canvas and let AI do the rest
                            {isLoading && (
                                <div className="flex flex-col items-center mt-5">
                                    <Orbit size={35} color="#231F20" />
                                    <span className="text-lg">{`${prediction.status}...`}</span>
                                </div>
                            )}
                        </div>) : (
                        <img src={prediction.output[1]} alt={prompt} className="w-full" />
                    )}
                </div>

            </div>

        </section>
    )
}

export default CanvasSection;