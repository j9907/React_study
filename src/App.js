import React from "react";
import { useState } from "react";


function App() {
  // 컴포넌트 변경 State 값
  const [calc, setCalc] = useState("");
  // operation Check
  const [operCheck, setOperCheck] = useState(true);
  // point Check
  const [pointCheck, setPointCheck] = useState(true);

  // Btn 
function Button(props){
    return <button style={{
        backgroundColor:"#dadada",
        border:"none",
        color:"black",
        fontSize:"1.5rem",
        borderRadius:"35px",
        cursor:"pointer",
        boxShadow:"3px 3px 3px lightgray",     
    }} value = {props.value} onClick= {props.onClick}>
        {props.value}
    </button>
}


function CalButton(props){
   return  <button style={{
        backgroundColor:"#dadada",
        border:"none",
        color:"black",
        fontSize:"1.5rem",
        borderRadius:"35px",
        cursor:"pointer",
        boxShadow:"3px 3px 3px lightgray",
        fontSize:"2rem",
        color:"white",
        backgroundColor:"#4b89dc",
    }} value={props.value} onClick={props.onClick}>
      {props.value}
    </button>;
}
function ZeroButton(props){
   return <button style={{
        backgroundColor:"#dadada",
        border:"none",
        color:"black",
        fontSize:"1.5rem",
        borderRadius:"35px",
        cursor:"pointer",
        boxShadow:"3px 3px 3px lightgray",
        gridColumn: "1/3",
    }} value={props.value} onClick={props.onClick}>
      {props.value}
    </button>;
}

function InputBar(props){
    return <input style={{
        width:"40%",
        maxWidth:"450px",
        height:"65px",
        marginBottom:"10px",
        borderRadius:"10px",
        fontSize:"30px",
        border:"2px solid #4b89dc",
        textAlign:"right",
        paddingRight:"20px",
    }} value={props.value} readOnly></input>;
}

// 숫자 입력 시 input에 값 입력
  const getNum = (e) => {
    setCalc((prev) => prev + e.target.value);
    setOperCheck(true);
  };

  // operation 입력 시 input에 값 입력
  const getOper = (e) => {
    if (operCheck) {
      console.log(e.target.value)
      setCalc((prev) => prev + e.target.value);
      setOperCheck(false);
    }
  };

  // . 입력시 input에 입력
  const getPoint = (e) => {
    if (calc.length === 0) {
      return;
    }
    if (pointCheck) {
      setCalc((prev) => prev + e.target.value);
      setPointCheck(false);
    }
  };

  // 계산결과
  // 유효하지 않은 식 예외처리
  const getResult = () => {
    let replace_str = calc.replace(/×/gi, "*").replace(/÷/gi, "/");
    

    if (isNaN(eval(replace_str))) {
      setCalc("");
    } else if (eval(replace_str) == Infinity) {
      alert("0으로 나눌수 없습니다.");
      setCalc("");
      return false;
    } else {
      setCalc((prev) => eval(replace_str));
    }
  };

  // DEL = 한글자 삭제
  const delCalc = () => {
    setPointCheck(true);
    setOperCheck(true);
    let str = String(calc).slice(0, -1);
    setCalc((prev) => str);
  };
// AC = 전체 삭제
  const allClear = () => {
    setPointCheck(true);
    setCalc((prev) => "");
  };

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
  }}
  >
  
      <h1>계산기</h1>
      <InputBar readOnly value={calc}/>
      <div style={{
        display:"grid",
        width:"40%",
        maxWidth:"450px",
        height:"50%",
        gridTemplateColumns : "repeat(4,1fr)",
        gridColumnGap:"10px",
        gridRowGap:"10px",
    }}
    >
        <Button onClick={allClear} value="AC"/>
        <Button onClick={delCalc} value="DEL"/>
        <CalButton value="%" onClick={getOper}/>
        <CalButton value="÷" onClick={getOper}/>

        <Button value={7} onClick={getNum}/>
        <Button value={8} onClick={getNum}/>
        <Button value={9} onClick={getNum}/>
        <CalButton value="×" onClick={getOper}/>

        <Button value={4} onClick={getNum}/>
        <Button value={5} onClick={getNum}/>
        <Button value={6} onClick={getNum}/>
        <CalButton value="-" onClick={getOper}/>

        <Button value={1} onClick={getNum}/>
        <Button value={2} onClick={getNum}/>
        <Button value={3} onClick={getNum}/>
        <CalButton value="+" onClick={getOper}/>

        <ZeroButton value={0} onClick={getNum}/> 
        <Button value="." onClick={getPoint}/>
        <CalButton onClick={getResult} value="="/>
        </div>
      </div>
  );
}



export default App;