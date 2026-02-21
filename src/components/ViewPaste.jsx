import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux"; // ✅ correct
// import { addToPastes, updateToPastes } from '../redux/pasteSlice.js';
import { FilePlus,Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const ViewPaste = () => {

  const navigate = useNavigate();


  const {id}=useParams();

  const allPastes=useSelector((state)=> state.paste.pastes);
   const paste = allPastes.find((p) => p._id === id);
  console.log("final pastes:", paste);

  return (
    <div className='w-[80%] mx-auto'>

      <div className='flex flex-row gap-7 justify-between w-[90%] '>

        <input 
          type="text" 
          placeholder='enter title here' 
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
          className='pl-5 p-4 rounded-2xl mt-2 bg-[#1a1a1a] flex-1 font-light text-xl'
        />
      
        {/* button */}
        <button 
          onClick={() => navigate('/')}
          className='border p-4 flex items-center gap-2 whitespace-nowrap hover:bg-[#1a1a1a] rounded-xl text-blue-400'>
          <FilePlus size={30} />
          
        </button>
      </div>

      <div className=' mt-4 relative w-[90%]'>

        {/* Copy button top-right corner */}
        <button 
          onClick={() => {
            navigator.clipboard.writeText(paste.content);
            toast.success("Copied to clipboard!");
          }}
          className='absolute top-3 right-6 flex items-center gap-1 text-gray-400 hover:text-white bg-[#2a2a2a] p-2 rounded-lg'>
          <Copy size={20} />
        </button>

        <textarea 
          value={paste.content}
          placeholder='enter content here . . .'
          onChange={(e)=>{setvalue(e.target.value)}}
          rows={20}
          disabled
          className='bg-[#1a1a1a] rounded-2xl w-full w-[90%] p-4 font-light text-xl'
        />

      </div>
    </div>
  )
}

export default ViewPaste;