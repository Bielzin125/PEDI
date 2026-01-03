export default function ItemQuest({name,valor}) {
    return (
       <div className="flex flex-col justify-center items-center font-extrabold text-white w-full h-[80px] bg-gray-300 gap-3 rounded-[2px]">
            <p>{name}</p>
       </div>
    )
}