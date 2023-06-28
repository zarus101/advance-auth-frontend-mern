export const MainButton=({text, handleClick})=>{
    return <button onClick={handleClick} className="w-fit p-3 flex justify-center bg-indigo-700 text-white text-[20px] font-bold rounded-lg">{text}</button>
}