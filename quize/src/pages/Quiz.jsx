import React, { useState } from 'react'
import { useAsyncError, useNavigate } from 'react-router-dom'
import que from "./Question.json"
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify"
import axios from "axios"
import coding from "../quizejson/codeing.json"
import math from "../quizejson/math.json"
import genral from "../quizejson/genral.json"

export default function Quiz() {
  const navigate = useNavigate()
  const [options, setoptions] = useState(false)
  const [idx, setidx] = useState(0)
  const [playgame, setplaygame] = useState(false)
  const [checked, setchecked] = useState(false)
  const [afterwin, setafterwin] = useState(false)
  const [score, setscore] = useState(0)
  const [quize, setquizedata] = useState([])
  const [quizeName, setquizeName] = useState(math)
  const [showletsstart, setshowletsstart] = useState('')
  const [checkbox, setcheckbox] = useState(0)
  const [selectedIndex,setSelectedIndex] = useState(null)
  const names = [
    { name: "math" },
    { name: "genral" },
    { name: "coding" }
  ]
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/")
  }





  const setgameplay = (e) => {

    console.log((Array.from(quizeName)))

    setplaygame(true)
  }

  const optionButtonOnclick = (e,i) => {
    // e.target.classList.add("cursor-not-allowed")
    setSelectedIndex(i)
    if (quizeName[idx].answer[i].correct) {
      toast.success("correct answer")
      setscore(score + 1)
    } else {
     
      toast.warn("wrong answer")
    }
    setchecked(true)
  }

  const next = () => {
    if (idx + 1 == quizeName.length) {
      // setidx(0)
      setafterwin(true)
      toast.success("Thanku for completing this text!")
      return

    }
    setchecked(false)
    setidx(idx + 1)
  }

  const checkboxinput = (i, name) => {
    setcheckbox(i)

    if (name == "math") {
      setquizeName(math)
    }
    if (name == "genral") {

      setquizeName(genral)
    }
    if (name == "coding") {
      setshowletsstart()
      setquizeName(coding)
    }

  }

  return (
    <>
      <div className='fixed h-screen w-screen flex justify-center  items-center bg-gradient-to-br from-slate-400 to-blue-500'>
        <ToastContainer
          position="top-center"
          autoClose={2000}         // 2 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="dark" />
        <button onClick={() => logout()} className='p-2 border rounded-lg px-3 text-[20px] cursor-pointer absolute top-4 active:scale-95 '>Logout</button>

        {afterwin ? (<>

          <div className='text-center space-y-6'>
            <h1 className=' text-[60px] text-white font-mono '>{`your score  ${score}/10 `}</h1>
            <span className='text-orange-400 text-4xl'>{score<5?(<><span className='animate-pulse text-[60px]'>😕</span> its very less</>):(<><span className='animate-pulse text-[60px]'>👏</span> Pass</>)}</span>
            <h1  className='text-[30px]'>{score<5?"I hope you do better next time — at least try to cross 5.":"Yes, you did it — you have passed!"}</h1>

            <button onClick={() => navigate("/")} className='block mx-auto bg-blue-400 py-3 px-3 rounded-lg cursor-pointer'>Go to home</button>
          </div>

        </>) :
          (<>

            {!playgame ? (<><div className='flex justify-center items-center flex-col '>
              <span className='text-[70px]'>Hey! Lets play the game!</span>
              <br />
              <button onClick={() => setgameplay()} className={`text-[30px] visible bg-blue-600 text-white py-4 px-[10px] rounded-xl cursor-pointer active:scale-95`}>Lets start😃</button>
              {names.map((e, i) => {
                return (
                  <div className='my-3'>
                    <input onChange={() => checkboxinput(i, e.name)} checked={checkbox === i ? true : false} className='cursor-pointer' type="checkbox" placeholder='' /><span className='ml-2 text-white'>{e.name}</span>
                  </div>
                )
              })}
            </div></>) : (<>
              {/* <h1 className='absolute top-[150px] text-[20px] text-center'>Live score <br /><span className='text-[40px]'>{score}</span></h1> */}
              <div className='text-center' >
                <button onClick={() => navigate("/")} className='text-[20px] text-white bg-gray-400 p-4 rounded-xl cursor-pointer '>Go To Home</button>
                <h1 className='block top-[10%] text-red-600 text-[20px]  w-full '> Don't refresh the page, otherwise you will be thrown back and start from the beginning.</h1>
                <div className="choices mt-7  max-w-[900px]  ">

                  <h1 className='text-[30px] font-semibold font-serif text-blue-200'>{`${idx + 1}) `}{quizeName[idx].question}</h1>
                  <div className='grid grid-cols-2'>
                    {quizeName[idx].answer.map((e, i) => {
                      return (
                        <>
                          <button onClick={(r) => !checked && optionButtonOnclick(r,i)} disabled={checked} className={`py-4  px-6 m-5 text-[15px]  font-serif rounded-2xl ${!checked ? "cursor-pointer" : "cursor-not-allowed"} ${(checked && quizeName[idx].answer[i].correct) ? "bg-green-500" : checked && (i===selectedIndex)&& !quizeName[idx].answer[i].correct?"bg-red-700":"bg-white"}  `}>{e.opt}</button>
                        </>
                      )
                    })}

                  </div>

                  {/* <button className='py-4 px-6 m-5 text-[30px] cursor-pointer bg-white rounded-2xl '>2) secomd</button>

              <button className='py-4 px-6 m-5 text-[30px] cursor-pointer bg-white rounded-2xl '>3) third</button>
              <button className='py-4 px-6 m-5 text-[30px] cursor-pointer bg-white rounded-2xl '> 4) fourth</button> */}
                </div>
                <button onClick={() => next()} className={`text-white bg-green-400 text-[20px] cursor-pointer py-[20px] px-[30px] rounded-xl block mx-auto mt-[40px] ${checked ? "visible" : "hidden"}`}>next</button>
              </div>
            </>)}

          </>)

        }



      </div>
    </>
  )
}
