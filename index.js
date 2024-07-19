const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const cron = require('node-cron');
// const User = require('./models/User'); 
const app = express();
const port = 5000;
const corsOptions = {
  origin: ['http://localhost:5173', 'https://weather-app-three-alpha-23.vercel.app'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('API is running');
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'caohoaithcsant@gmail.com',
    pass: 'csndxkyinoulwdiz',
  },
});

// cron.schedule('0 10 * * *', async () => {
//   try {
//     const users = await User.find({ confirmed: true });

//     for (const user of users) {
//       const weatherResponse = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
//         params: {
//           key: '6515965237304e4899c52935241807',
//           q: user.location,
//           days: 1,
//         },
//       });

//       const forecast = weatherResponse.data.forecast.forecastday[0];
//       const mailOptions = {
//         from: 'caohoaithcsant@gmail.com',
//         to: user.email,
//         subject: 'Daily Weather Forecast',
//         text: `Today's weather: ${forecast.day.condition.text}, high of ${forecast.day.maxtemp_c}°C, low of ${forecast.day.mintemp_c}°C.`,
//       };

//       await transporter.sendMail(mailOptions);
//     }
//   } catch (error) {
//     console.error('Error sending daily forecast:', error);
//   }
// });

app.post('/api/register', async (req, res) => {
  const { name, email, location, data } = req.body;
  console.log(email);
  console.log(location?.name);
  try {
    const mailOptions = {
      from: 'caohoaithcsant@gmail.com',
      to: email,
      subject: 'REGISTER EMAIL SUCCESSFULLY',
      html: `
        <html>
    <head>
        <title>Error</title>  
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">  
        <style>
            
        </style>
    </head>
    <body>
        
        <div class="app-title">
            <div>Weather app</div>
        </div>		
        
        <div><hr/></div>

        <h1>Dear <span style="font-weight: bold;">${name}</span>,Welcome to our weather apps!</h1>

        <div>Our System will send you nofitication about <span style="color: #ff0000; font-weight: bold; ">${location?.name}</span> at 9 AM every days.</div>
        <div>
          <p>You can unsubscribe at any time by visiting our system.</p>
          <a href="https://your-unsubscribe-link.com" style="color: #ff0000;">Unsubscribe</a>
        </div>
        <div>
          Here is the forecast for today: 
          <div class='container-weather'>
            
          </div>
        </div>
        <div style="
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  align-items: start;
                  gap: 15px;"
                  >
              <div><span style="font-style: bold;">(${location?.name})</span></div><br />
              <div><span style=" font-weight: bold; ">Temp:</span> ${data?.temp_c} °C</div><br/>
              <div><span style=" font-weight: bold; ">Wind:</span> ${data?.wind_kph} km/h</div><br/>
              <div><span style=" font-weight: bold; ">Humidity:</span> ${data?.humidity} %</div><br/>
            </div>
            <div class='status'>
              <img src=${data?.condition?.icon} alt='weather' />
              <span>${data?.condition?.text}</span>
            </div>
    </body>

</html>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('Confirmation email sent');
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: ${error.message}`);
  }
});

// app.get('/api/confirm/:token', async (req, res) => {
//   const { token } = req.params;

//   try {
//     const user = await User.findOne({ confirmToken: token });

//     if (!user) {
//       return res.status(400).send('Invalid confirmation token');
//     }

//     user.confirmed = true;
//     user.confirmToken = null;
//     await user.save();

//     res.status(200).send('Email confirmed successfully');
//   } catch (error) {
//     res.status(500).send(`Error: ${error.message}`);
//   }
// });

app.post('/api/unsubscribe', async (req, res) => {
  const { email } = req.body;

  try {
    const mailOptions = {
      from: 'caohoaithcsant@gmail.com',
      to: email,
      subject: 'UNSUBCRIBE EMAIL SUCCESSFULLY',
      html: `
        <html>
    <head>
        <title>Error</title>  
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">  
        <style>
            
        </style>
    </head>
    <body>
        
        <div class="app-title">
            <div>Weather app</div>
        </div>		
        
        <div><hr/></div>

        <h1>Thank you for using our apps</h1>

        <div>Our System will not send you nofitication from today</div>
        <div>
          <p>You can subscribe at any time by visiting our system.</p>
          <a href="https://your-unsubscribe-link.com" style="color: #ff0000;">Unsubscribe</a>
        </div>
        
    </body>

</html>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('Confirmation email sent');
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.get('/api/weather', async (req, res) => {
  const city = req.query.city || 'Ho Chi Minh City';
  const apiKey = '1dcda379ce114b32ae671649241807';

  try {
    const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
      params: {
        key: apiKey,
        q: city
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/forecast', async (req, res) => {
  const city = req.query.city || 'Ho Chi Minh City';
  const days = req.query.days || 4;
  const apiKey = '1dcda379ce114b32ae671649241807';
  try {
    const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
      params: {
        key: apiKey,
        q: city,
        days: days
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
