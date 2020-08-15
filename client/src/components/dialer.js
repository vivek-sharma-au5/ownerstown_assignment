import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import Info from "./info";

const Dialer = () => {
  const [output, setOutput] = useState("");
  const [code, setCode] = useState([]);
  const [displayData, setDisplayData] = useState("");
  const [image, setImageData] = useState("");
  const [strength, setStrengthData] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  var userNums = [];
  var outputData = [];

  const postCode = (e) => {
    e.preventDefault();
    const info = {
      code: code,
    };

    if (output[0] === 0) {
      axios({
        method: "post",
        url: "/superhero",
        data: info,
      })
        .then((response) => {
          console.log(response);
          setOutput("");
          getSuperHeroData(response.data.join(" "));
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      setError("invalid Code");
    }
  };

  const getSuperHeroData = (query) => {
    setLoading(true);
    axios({
      method: "get",
      url: `https://www.superheroapi.com/api.php/3579268208772127/search/${query}`,
    })
      .then((response) => {
        console.log("data-response SH");
        const filtered = response.data.results.filter(
          (ele) => ele.name.toLowerCase() === query.toLowerCase()
        );
        console.log("filtered", filtered);
        setDisplayData(filtered[0]);
        setImageData(filtered[0].image.url);
        setStrengthData(filtered[0].powerstats);
        setCode("");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setDisplayData("");
        setImageData("");
        setStrengthData("");
        setError("Invalid Code");
        setLoading(false);
        window.location.reload();
      });
  };

  const saveCode = (num) => {
    userNums.push(num);
    outputData.push(num);
    setOutput([...output, num]);
    setCode([...code, num]);
    setError("");
    console.log(output);
    if (output.length > 15) {
      setOutput("");
      setCode("");
      setError("invalid Code");
      return;
    }
  };

  const handleZeroSpace = (num) => {
    outputData.push(num);
    setOutput([...output, num]);
    setDisplayData("");
    setImageData("");
    setStrengthData("");
  };

  return (
    <div className='main-row'>
      <div className='dialer-div'>
        <div className='container'>
          <div style={{ color: "black" }}>
            code format - Zero(space)(code)
            <br />
            for hulk type - 0 4855
          </div>
          <div id='output' className='mt-1'>
            <span className='output-num'>
              {output}
              <span class='blinking-cursor'>|</span>
            </span>
          </div>
          <form onSubmit={(e) => postCode(e)}>
            <div className='row mt-3'>
              <div className='digit' id='one' onClick={() => saveCode(1)}>
                1<div className='sub'>@.!</div>
              </div>
              <div className='digit' id='two' onClick={() => saveCode(2)}>
                2<div className='sub'>ABC</div>
              </div>
              <div className='digit' id='three' onClick={() => saveCode(3)}>
                3<div className='sub'>DEF</div>
              </div>
            </div>
            <div className='row'>
              <div className='digit' id='four' onClick={() => saveCode(4)}>
                4<div className='sub'>GHI</div>
              </div>
              <div className='digit' id='five' onClick={() => saveCode(5)}>
                5<div className='sub'>JKL</div>
              </div>
              <div className='digit' id='six' onClick={() => saveCode(6)}>
                6<div className='sub'>MNO</div>
              </div>
            </div>
            <div className='row'>
              <div className='digit' onClick={() => saveCode(7)}>
                7<div className='sub'>PQRS</div>
              </div>
              <div className='digit' onClick={() => saveCode(8)}>
                8<div className='sub'>TUV</div>
              </div>
              <div className='digit' onClick={() => saveCode(9)}>
                9<div className='sub'>WXYZ</div>
              </div>
            </div>
            <div className='row'>
              <div className='digit' onClick={() => saveCode("*")}>
                *<div className='sub'></div>
              </div>
              <div className='digit' onClick={() => handleZeroSpace(0)}>
                0<div className='sub'>zero</div>
              </div>
              <div className='digit' onClick={() => handleZeroSpace(" ")}>
                #<div className='sub'>space</div>
              </div>
            </div>
            <div className='botrow'>
              <button id='call' className='btn btn-success' type='submit'>
                <i className='fa fa-phone' aria-hidden='true'></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='info-div'>
        <Info
          displayData={displayData}
          image={image}
          strength={strength}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Dialer;
