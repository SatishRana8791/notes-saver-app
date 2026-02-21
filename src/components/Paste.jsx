import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removefromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Search } from 'lucide-react';

// button
import { Trash2, Copy, Pencil, Eye, Share2,Calendar , Download } from 'lucide-react';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');

 
  const [sortOrder, setSortOrder] = useState('newest');


  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
  console.log("Deleting:", pasteId);
  console.log("Current pastes:", pastes.map(p => p._id));
  dispatch(removefromPastes(pasteId));
}

// 👇 sort on top of filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortOrder === 'az') return a.title.localeCompare(b.title);
    if (sortOrder === 'za') return b.title.localeCompare(a.title);
  });

function handleDownload(paste) {
  const element = document.createElement('a');
  const file = new Blob([paste.content], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = `${paste.title}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  toast.success("Downloading...");
}

  return (
    <div>
      <div className='m-3 w-[80%] mx-auto'>
        {/* Search */}
        <div className='relative'>
          <Search size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            type="search"
            placeholder='search paste here...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10 p-2 mt-4 mb-3 bg-[#1e2026] w-[100%] font-light text-xl border rounded text-white'
          />
        </div>

        <div className='flex justify-between border rounded'>
          <div className=' p-2 text-2xl rounded-t'>
              All Pastes
          </div>

          <div className='flex gap-4 items-center justify-center'>

            <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className='bg-[#1e2026] text-white  rounded-xl mr-2 pl-2 p-2 font-light text-base cursor-pointer '
             >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
            </select>

          </div>

        </div>

        {/* All Pastes */}
        <div className='border bg-[#1e2026]  '>
          {
            filteredData.length > 0 ? (
              sortedData.map((paste) => (  // ✅ Changed: removed { and return
                <div key={paste._id} className='border p-2 rounded m-4 flex flex-row gap-4  bg-[#202228] '>

                  {/*left side title and content */}
                  <div  className='w-[70%] flex flex-col gap-2 p-2'>
                    <div className='font-bold text-lg '>{paste.title}</div>
                    <div className='text-gray-300 mt-2'>
                      {paste.content.split(' ').slice(0, 20).join(' ')}
                      {paste.content.split(' ').length > 20 ? '...' : ''}
                    </div>
                  </div>

                  {/* right side buttons and date */}
                  <div className='w-[30%] flex flex-col items-end justify-between  p-2 '>  {/* u can give border to check the div  */}
                    {/* Buttons in a top row */}
                    <div className='flex flex-row gap-7 flex-wrap justify-center  pl-2 pr-2'>
                        <button>
                          <a href={`/?pasteId=${paste?._id}`} className='flex items-center gap-1'>
                          <Pencil size={18} />
                          </a>
                        </button>

                        <button onClick={()=>{
                          navigator.clipboard.writeText(paste?.content)
                          toast.success("copied to clipboard")
                        }}className='flex items-center gap-1 text-blue-400 hover:text-blue-600'>
                        <Copy size={18} />
                        </button>

                        <button onClick={()=>handleDelete(paste?._id)}
                           className='flex items-center gap-1 text-blue-400 hover:text-red-600'>
                           <Trash2 size={18} />
                        </button>
    
                        <button onClick={() => {
                            const link = `${window.location.origin}/pastes/${paste?._id}`;
                            navigator.clipboard.writeText(link);
                            toast.success("Link copied to clipboard!");
                            }}className='flex items-center gap-1 text-purple-400 hover:text-purple-600'>
                            <Share2 size={18} />
                        </button>
                    </div>

                    {/* 👇 Download and View centered with equal spacing */}
                    <div className='flex flex-row  justify-end gap-7 mt-2 mb-2 pl-2 pr-2 '>
                      <button>
                        <a href={`/pastes/${paste?._id}`} className='flex items-center gap-1 text-blue-400'>
                          <Eye size={18} />
                        </a>
                      </button>

                      <button onClick={() => handleDownload(paste)}
                        className='flex items-center gap-1 text-green-400 hover:text-green-600'>
                        <Download size={18} />
                      </button>
                    </div>

                    {/* Buttons in a bottom row */}
                    <div className='flex flex-row items-center gap-2 text-sm text-gray-400 pl-2 pr-2 '>
                      <Calendar size={16} />
                      {new Date(paste.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>

                  </div>
                </div>
              ))  // ✅ Removed the closing }
            ) : (
              <p className='mt-4 text-gray-400'>No Results Found</p>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Paste;