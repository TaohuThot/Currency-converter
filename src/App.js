// App.js
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';

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
`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`)
            .then((res) => {
                setInfo(res.data[from]);
            })
    }, [from]);

    // การตั้งค่าตัวเลือกสกุลเงินและการคำนวณอัตราแลกเปลี่ยน
    useEffect(() => {
        setOptions(Object.keys(info));
        convert();
    }, [info])

    // ฟังก์ชันคำนวณอัตราแลกเปลี่ยน 
    function convert() {
        var rate = info[to];
        setOutput(input * rate);
    }

    // ฟังก์ชันสลับสกุลเงิน
    function flip() {
        var temp = from;
        setFrom(to);
        setTo(temp);
    }

    return (
        <div className="App">
            <div className="heading">
                <h1>Currency converter</h1>
            </div>
            <div className="container">
                <div className="left">
                    <h3>จำนวน</h3>
                    <input type="text"
                        placeholder="กรอกจำนวน"
                        onChange={(e) => setInput(e.target.value)} />
                </div>
                <div className="middle">
                    <h3>จาก</h3>
                    <Dropdown 
                        className="react-dropdown"
                        options={options}
                        onChange={(e) => { setFrom(e.value) }}
                        value={from} 
                        placeholder="From" />
                </div>
                <div className="switch">
                    <HiSwitchHorizontal size="30px"
                        onClick={() => { flip() }} />
                </div>
                <div className="right">
                    <h3>แปลงเป็น</h3>
                    <Dropdown 
                        className="react-dropdown"
                        options={options}
                        onChange={(e) => { setTo(e.value) }}
                        value={to} 
                        placeholder="To" />
                </div>
            </div>
            <div className="result">
                <button onClick={() => { convert() }}>แปลง</button>
                <h2>แปลงเป็น:</h2>
                <p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>

            </div>
        </div>
    );
}

export default App;
