const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://pkatiyar574:Ramji1234@cluster0.kynig5p.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch((err) => console.log(err));


app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the API!'); 
});

app.listen(5000, () => console.log('Server running on port 5000'));
