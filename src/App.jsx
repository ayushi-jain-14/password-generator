import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
const [length,setLength]=useState(8);
const [numberAllowed,setNumberAllowed]=useState(false);
const [charAllowed,setCharAllowed]=useState(false);
const [pass,setPass]=useState("");

// hook useref
const passRef= useRef(null);

const passGenerator= useCallback(()=>{
let pass=""
let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
if(numberAllowed) str += "0123456789"
if(charAllowed) str += "!@#$%^&*_-=+{}[]~`"
for(let i=0;i<length;i++){
 let char =Math.floor(Math.random()*str.length +1);
 pass += str.charAt(char)
}
setPass(pass);
},[length,numberAllowed,charAllowed,setPass])

const copyPass= useCallback(()=>{
  passRef.current?.select()
  passRef.current?.setSelectionRange(0,101)
  window.navigator.clipboard.writeText(pass)
},[pass])


useEffect(()=>{
  passGenerator()
},
[length,numberAllowed,charAllowed,passGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>pass Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={pass}
        className='outline-none w-full py-1 px-3 bg-white'
        placeholder='password' readOnly 
        ref={passRef} />
<button  
onClick={copyPass}
className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
  copy
  </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-centergap-x-1'>
          <input type="range" min={6} max={100} 
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}} />
          <label >length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
<input type='checkbox' defaultChecked={numberAllowed} 
id="numberInput" 
onChange={()=>{
  setNumberAllowed((prev)=>!prev); 
}} />
<label htmlFor='numberInput'>Numbers</label>
        </div>
            <div className='flex items-center gap-x-1'>
<input type='checkbox' defaultChecked={charAllowed} 
id="charaterInput" 
onChange={()=>{
  setCharAllowed((prev)=>!prev); 
}} />
<label htmlFor='charaterInput'>Characters</label>
        </div>

      </div>
      </div>
    </>
  )
}

export default App
