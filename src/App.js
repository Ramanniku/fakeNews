import './App.css';
import { useState } from 'react';
// const OpenAI = require('openai');
import openai from 'openai';
// import bg from './images/bg.jpg';

const apiKey = "<api-key>"; // Replace with your actual API key
const gpt = new openai({ apiKey, dangerouslyAllowBrowser: true });
console.log('gpt is ',gpt)

function App() {

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [tagline, setTagline] = useState('');
  const [content, setContent] = useState('');
  const [prediction, setPrediction] = useState(null);

   // Toggle function to switch between light and dark mode
   const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handlePredict = () => {
    // Replace placeholders in the prompt template
    const prompt = `
      You are given the content, tell me if it is fake or real: 
    
        Tagline:
        "${tagline}"

        Content:  
        "${content}"
  
        Is tagline matching to the content : Say either "Tagline Matched to the Content", or "Tagline does not match to the Content" \n
        Fake or Real : Tell whether you think it is fake or real according to the sources. \n
        Confidence score : How confident are you in your response out of 100%?

        Give your response in this format : 
        <"Tagline Matched to the Content", or "Tagline does not match to the Content"> \n
        Fake or Real : <your response> \n
        Confidence score : <your response>

  
      `

const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      `Bearer api-key`,
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo-16k-0613",
    messages: [{ role: "system", content: prompt }],
  }),
};

return fetch("https://api.openai.com/v1/chat/completions", requestOptions)
  .then((response) => response.json())
  .then((data) => {
    const { choices } = data;
    console.log(choices[0].message.content)
    setPrediction(choices[0].message.content);
  });
  //   // Your GPT-3 API endpoint and API key
  //   const apiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions';

  //   const prompt = `
  //   You are given the content, tell me if it is fake or real in pirate's tone : 
  
  //     Content:  
  //     "${content}"

  //     Fake or Real : Tell whether you think it is fake or real according to the sources.

  //   `
  //   console.log(prompt)
  //   // Create a prompt for GPT-3
  //   // const prompt = `Tagline: ${tagline}\nContent: ${content}\n Write more about the content`;

  //   // Make a POST request to GPT-3 API
  //   fetch(apiEndpoint, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${apiKey}`,
  //     },
  //     body: JSON.stringify({
  //       prompt,
  //       max_tokens: 200, // Adjust as needed
  //       temperature: 0.7
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data.choices[0])
  //       setPrediction(data.choices[0].text);
  //     })
  //     .catch(error => {
  //       console.error('Error calling GPT-3:', error);
  //       setPrediction('An error occurred while verifying content.');
  //     });
  };

  // const handlePredict = async () => {
  //   // Perform the GPT-3 verification here
  //   try {
  //     const response = await gpt.create({
  //       engine: 'davinci',
  //       prompt: `Tagline: ${tagline}\nContent: ${content}\nIs this content fake or real?`,
  //       max_tokens: 50, // Adjust as needed
  //     });

  //     setPrediction(response.choices[0].text);
  //   } catch (error) {
  //     console.error('Error calling GPT-3:', error);
  //     setPrediction('An error occurred while verifying content.');
  //   }
  // };


  return (
    < >
    <div className={`flex flex-row ${isDarkMode? 'bg-blue-950': 'bg-blue-200'}  py-4 px-2`}>
    <header className={`${isDarkMode? 'text-white':'text-black'} text-2xl font-bold ml-2`} >Fake Content Detector</header>  
   <button 
      className={`w-16 h-8 rounded-full p-1 shadow-md ml-auto mr-1 ${
        isDarkMode ? 'bg-gray-700' : 'bg-blue-500'
      }`}
      onClick={toggleMode}
    >
      <div
        className={`w-6 h-6 rounded-full bg-white transform duration-300 ${
          isDarkMode ? 'translate-x-8' : ''
        }`}
      ></div>
    </button>
    </div>
    

    <div className="bg-cover bg-no-repeat w-full h-[676px]" style={{ backgroundImage: `url(${require('./images/bg.jpg')})` }}>
  <div className=' p-8 w-[600px] text-7xl leading-relaxed text-white font-extrabold font-serif'>
    FAKE CONTENT/NEWS DETECTION 
  </div>
  <button id='CheckNow' className=  {` ${isDarkMode? 'bg-blue-950 text-white':'bg-blue-200 text-black'} rounded-md p-4 ml-12  font-semibold text-base `}><a href="#checknow"> Check Now!</a></button>
    </div>

    <div className={`${isDarkMode? 'bg-blue-900' : 'bg-white'}  h-fit flex flex-col`}>
<span id="checknow" className={`mx-auto my-10 text-3xl ${isDarkMode? 'text-white':'text-black'}  font-bold`}>Check if the news is real or fake!</span>
<textarea className={`mx-auto my-6 w-[700px] p-2 rounded-md ${isDarkMode?'bg-white':'bg-blue-200'}`} placeholder='Enter Tagline' value={tagline} onChange={(e) => setTagline(e.target.value)}></textarea>

<textarea className={`mx-auto my-6 w-[700px] p-2 rounded-md h-44 ${isDarkMode?'bg-white':'bg-blue-200'} `} placeholder='Enter Content' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
 <div className='choo'>
 <input className='choose' type= 'file'></input>
 </div>
 
<button className={`${isDarkMode? 'bg-blue-950 text-white':'bg-blue-200 text-black'} font-semibold text-base p-4 rounded-md w-24 mx-auto`} onClick={handlePredict}>Predict</button>
{prediction && (
        <div className={`mx-auto my-6 text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <strong>Prediction:</strong> {prediction}
        </div>
      )}
<div className=' flex flex-row'>
{/* <div className='p-5'>Results</div> */}
<div className='ml-auto mr-4 p-6 flex flex-col bg-slate-400 mb-6 rounded-md'>
  <span className={`mx-auto font-semibold text-xl ${isDarkMode? 'text-white':'text-black'}`}>
  Your Feedback
  </span>
  <textarea className='mx-auto my-6 w-[300px] p-2 rounded-md' placeholder='Feedback'></textarea>
  <button className={`${isDarkMode? 'bg-blue-950 text-white':'bg-blue-200 text-black'} font-semibold text-base p-4 rounded-md w-24 mx-auto`}>Submit</button>


 </div>
</div>
    </div>
    <footer className={`${isDarkMode? 'text-white bg-blue-950':'text-black bg-blue-200'} h-16 flex flex-row`}>
      <span className='mx-auto my-auto'>copyright@2023 | Made by group No : 10</span>
    </footer>


    <script>
    let CN = document.getElementById('CheckNow')
      function cheNow(

       
      )
      
    </script>

    </>

  
  );
}

export default App;
