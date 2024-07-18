require('dotenv').config();
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
  origin: 'https://weather-app-three-alpha-23.vercel.app/', 
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.log(`Error: ${error.message}`);
//     console.log("Exiting...")
//     process.exit(1);
//   }
// };

// connectDB();

app.get('/', (req, res) => {
  res.send('API is running');
});

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'caohoaithcsant@gmail.com',
//     pass: 'csndxkyinoulwdiz',
//   },
// });

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

// app.post('/api/register', async (req, res) => {
//   const { email, location } = req.body;

//   try {
//     const user = new User({ email, location });
//     await user.save();

//     const mailOptions = {
//       from: 'caohoaithcsant@gmail.com',
//       to: email,
//       subject: 'Please confirm your email address',
//       text: `Please confirm your email address by clicking on the following link: http://localhost:${port}/api/confirm/${user.confirmToken}`
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).send('Confirmation email sent');
//   } catch (error) {
//     res.status(500).send(`Error: ${error.message}`);
//   }
// });

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

// app.post('/api/unsubscribe', async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOneAndDelete({ email });

//     if (!user) {
//       return res.status(400).send('Email not found');
//     }

//     res.status(200).send('Unsubscribed successfully');
//   } catch (error) {
//     res.status(500).send(`Error: ${error.message}`);
//   }
// });

app.get('/api/weather', async (req, res) => {
  const city = req.query.city || 'Ho Chi Minh City';
  const apiKey = '6515965237304e4899c52935241807';

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
  const apiKey = '6515965237304e4899c52935241807';
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
