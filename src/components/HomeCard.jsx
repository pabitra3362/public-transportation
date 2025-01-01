/* eslint-disable react/prop-types */

const HomeCard = ({icon,title,description,gridAlign="justify-items-center",textAlign="text-center",topLine="true"}) => {
  return (
    <div className={`group w-80 bg-white md:bg-slate-200  rounded-lg h-80 hover:shadow-2xl hover:-translate-y-5 transition duration-300 relative grid ${gridAlign} items-center gap-2 px-3 p-5`}>
      {
        topLine && <div className='absolute w-80 top-0 left-0 h-1 bg-yellow-400 hidden group-hover:block transition duration-200'></div>
      }
        <div className='icon flex justify-center items-center'>
            {icon}
        </div>
        <div className={`title text-black text-xl font-bold ${textAlign}`}>{title}</div>
        <div className={`description text-slate-500 ${textAlign}`}>{description}</div>
    </div>
  )
}

export default HomeCard
