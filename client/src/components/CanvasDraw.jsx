import { useState, useEffect, useRef, forwardRef } from 'react';
import { BiUndo } from 'react-icons/bi';
import { BiRedo } from 'react-icons/bi';
import { BiTrash } from 'react-icons/bi';
import { BiPencil } from 'react-icons/bi';
import { BiEraser } from 'react-icons/bi';

const CanvasDraw = forwardRef((props, canvasRef) => {

    const [history, setHistory] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedTool, setSelectedTool] = useState('pencil');

    const ctxRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 400;
        canvas.height = 400;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctxRef.current = ctx;

        setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    }, []);

    const startDrawing = ({ nativeEvent }) => {

        setIsDrawing(true);

        ctxRef.current.beginPath();
        ctxRef.current.moveTo(nativeEvent.offsetX, nativeEvent.offsetY);
    }

    const stopDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);

        setHistory([...history.slice(0, selectedIndex + 1), ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)]);
        setSelectedIndex(selectedIndex + 1);
    };

    const draw = ({ nativeEvent }) => {

        if (!isDrawing) return;

        ctxRef.current.lineCap = 'round';
        ctxRef.current.lineJoin = 'round';
        ctxRef.current.lineWidth = selectedTool === 'pencil' ? '4' : '12';
        ctxRef.current.strokeStyle = selectedTool === 'pencil' ? 'black' : 'white';
        ctxRef.current.lineTo(nativeEvent.offsetX, nativeEvent.offsetY);
        ctxRef.current.stroke();
    }

    const clearCanvas = () => {
        ctxRef.current.fillStyle = 'white';
        ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        setHistory([...history.slice(0, selectedIndex + 1), ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)]);
        setSelectedIndex(selectedIndex + 1);
    }


    const undoDrawing = () => {
        if (!selectedIndex) return;

        ctxRef.current.putImageData(history[selectedIndex - 1], 0, 0);
        setSelectedIndex(selectedIndex - 1);
    }

    const redoDrawing = () => {
        if (selectedIndex === history.length - 1) return;

        ctxRef.current.putImageData(history[selectedIndex + 1], 0, 0);
        setSelectedIndex(selectedIndex + 1);
    }

    return (
        <>
            <canvas
                className={`touch-none ${selectedTool === 'pencil' ? 'cursor-pencil' : 'cursor-eraser'}`}
                ref={canvasRef}
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
            />

            <div className='absolute bottom-0 left-0 right-0 m-2 flex flex-wrap justify-between bg-neutral-800 py-2 px-4 text-neutral-500 rounded-full'>
                <button
                    className='flex gap-1 items-center font-semibold disabled:text-neutral-700 hover:text-neutral-400 active:text-neutral-200'
                    onClick={undoDrawing}
                    disabled={!selectedIndex}
                >
                    <BiUndo className='text-sm' />
                    <span className='text-xs tracking-wider'>Undo</span>
                </button>
                <button
                    className='flex gap-1 items-center font-semibold disabled:text-neutral-700 hover:text-neutral-400 active:text-neutral-200'
                    onClick={redoDrawing}
                    disabled={selectedIndex === history.length - 1}
                >
                    <BiRedo className='text-sm' />
                    <span className='text-xs tracking-wider'>Redo</span>
                </button>
                <button
                    className={`flex gap-1 items-center font-semibold ${selectedTool === 'pencil' ? 'text-primary' : 'active:text-neutral-200 hover:text-neutral-400'}`}
                    onClick={() => setSelectedTool('pencil')}
                >
                    <BiPencil className='text-sm' />
                    <span className='text-xs tracking-wider'>Pen</span>
                </button>
                <button
                    className={`flex gap-1 items-center font-semibold ${selectedTool === 'eraser' ? 'text-primary' : 'active:text-neutral-200 hover:text-neutral-400'}`}
                    onClick={() => setSelectedTool('eraser')}
                >
                    <BiEraser className='text-sm' />
                    <span className='text-xs tracking-wider'>Eraser</span>
                </button>
                <button
                    className='flex gap-1 items-center font-semibold hover:text-neutral-400 active:text-neutral-200'
                    onClick={clearCanvas}>
                    <BiTrash className='text-sm' />
                    <span className='text-xs tracking-wider'>Clean</span>
                </button>
            </div>
        </>
    )
})

export default CanvasDraw;