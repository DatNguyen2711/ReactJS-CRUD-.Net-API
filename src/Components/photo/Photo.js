import React, { useState } from "react";

function Content(){
  const [countdown,setcoundown]=useState(189);
  setInterval(()=>{
    setcoundown(countdown-1);
  },1000)
}

export default Content;
