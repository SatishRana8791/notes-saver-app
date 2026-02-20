import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux"; // ✅ correct
import { addToPastes, updateToPastes } from '../redux/pasteslice.js';
import toast from 'react-hot-toast';

const Home = () => {
  const [title,setTitle]=useState('');
  const [value,setvalue]=useState('');

  const [searchParams, setSearchParams]=useSearchParams();
  const pasteId=searchParams.get("pasteId");

  const dispatch=useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);

  // 🔥 Load existing paste in edit mode
  useEffect(() => {
    if (pasteId) {
      const existingPaste = pastes.find(p => p._id === pasteId);
      if (existingPaste) {
        setTitle(existingPaste.title);
        setvalue(existingPaste.content);
      }
    }
  }, [pasteId, pastes]);

  function createpaste(){

    if (!title.trim()) {
    toast.error("Please enter a title!");
    return;
    }

    if (!value.trim()) {
      toast.error("Please enter some content!");
      return;
    }

    const paste={
      title:title,
      content:value,
      _id:pasteId || Date.now().toString(26),
      createdAt:new Date().toISOString(),
    }

    if(pasteId){
      //update
      dispatch(updateToPastes(paste));
    }
    else{
      //create
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setvalue('');
    setSearchParams({});
  }

  return (
    <div className='w-[75%] mx-auto mt-4'>
      <div className='flex flex-row gap-7 justify-between'>
        <input 
        type="text" 
        placeholder='enter title here' 
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}
        className='pl-5 p-4 rounded mt-2 bg-[#1a1a1a] w-[82%] font-light text-xl'
        />
  
        <button onClick={createpaste} className='border p-4 bg-blue-800 mr-4'>
          {
            pasteId ? "Update My Paste" : "Create My Paste"
          }
        </button>
      </div>
      <div className=' mt-4 w-full'>
        <textarea 
          value={value}
          placeholder='write your content here...'
          onChange={(e)=>{setvalue(e.target.value)}}
          rows={20}
          className='bg-[#1a1a1a] rounded w-full pl-4 pt-3 font-light text-xl'
        />
      </div>
    </div>
  )
}

export default Home;