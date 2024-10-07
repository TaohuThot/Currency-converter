// App.js
import { useEffect, useState } from "react";
import Axios from "axios";
import Dropdown from "react-dropdown";
import { HiSwitchHorizontal } from "react-icons/hi";
import { FaDollarSign, FaMoneyBillWave } from "react-icons/fa";
import "react-dropdown/style.css";
import "./App.css";

function App() {

// การประกาศสถานะ (State Variables) 
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("thb");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);

// การดึงข้อมูลจาก API เมื่อสกุลเงิน
  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`
    ).then((res) => {
      setInfo(res.data[from]);
    });
  }, [from]);

// การตั้งค่าตัวเลือกสกุลเงินและการคำนวณอัตราแลกเปลี่ยน
  useEffect(() => {
    const currencyOptions = Object.keys(info).map((code) => code.toUpperCase());
    setOptions(currencyOptions);
    convert();
  }, [info]);

// ฟังก์ชันคำนวณอัตราแลกเปลี่ยน 
  function convert() {
    if (info[to.toLowerCase()]) {
      const rate = info[to.toLowerCase()];
      setOutput(input * rate);
    }
  }

// ฟังก์ชันสลับสกุลเงิน
  function flip() {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }

// ฟังก์ชันแปลงค่าเงินอัตโนมัติ
  useEffect(() => {
    convert();
  }, [input, from, to]);

  return (
    <div className="App">
      <div className="heading">
        <h1>Currency Converter</h1>
      </div>
      <div className="container">
        <div className="input-group">
          <FaDollarSign size="20px" color="#00ffcc" />
          <input
            type="number"
            placeholder="กรอกจำนวน"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Dropdown
            className="react-dropdown"
            options={options}
            onChange={(e) => setFrom(e.value.toLowerCase())}
            value={from.toUpperCase()}
            placeholder="From"
          />
        </div>
        <div className="switch">
          <HiSwitchHorizontal size="30px" onClick={flip} />
        </div>
        <div className="input-group">
          <FaMoneyBillWave size="20px" color="#00ffcc" />
          <input type="text" value={output.toFixed(2)} readOnly />
          <Dropdown
            className="react-dropdown"
            options={options}
            onChange={(e) => setTo(e.value.toLowerCase())}
            value={to.toUpperCase()}
            placeholder="To"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
