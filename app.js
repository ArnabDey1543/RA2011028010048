const express = require('express');
const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 8080;

// function to make url and fetching data
const fetchJsonData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}: ${error.message}`);
    return null;
  }
};

// get method to exract numbers 
app.get('/numbers', async (req, res) => {
  const primesUrl = req.query.primes_url;
  const fiboUrl = req.query.fibo_url;

  if (!primesUrl || !fiboUrl) {
    return res.status(400).json({ error: "Both 'primes_url' and 'fibo_url' parameters are required." });
  }

  const primesData = await fetchJsonData(primesUrl);
  const fiboData = await fetchJsonData(fiboUrl);

  if (primesData === null || fiboData === null) {
    return res.status(500).json({ error: 'Failed to fetch data from provided URLs.' });
  }

  res.json({ primes_data: primesData, fibo_data: fiboData });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
