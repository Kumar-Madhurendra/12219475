import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import { isValidUrl } from '../Utils/validateUrl';
import { generateUniqueCode } from '../Utils/generateCode';
import { createShortUrl, getShortUrls } from '../services/api';
import { logEvent } from '../services/logger';

export default function URLForm({ onShorten }) {
  const [inputs, setInputs] = useState([{ originalUrl: '', validity: '', customCode: '' }]);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const handleAdd = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { originalUrl: '', validity: '', customCode: '' }]);
    }
  };

  const handleSubmit = async () => {
    const results = [];
    const existingCodes = getShortUrls().map(u => u.shortCode);

    for (let input of inputs) {
      const { originalUrl, validity, customCode } = input;
      if (!isValidUrl(originalUrl)) {
        alert(`Invalid URL: ${originalUrl}`);
        await logEvent('frontend', 'error', 'component', `Invalid URL: ${originalUrl}`);
        return;
      }

      let code = customCode || generateUniqueCode(existingCodes);
      if (existingCodes.includes(code)) {
        alert(`Shortcode '${code}' already exists.`);
        await logEvent('frontend', 'warn', 'component', `Shortcode collision: ${code}`);
        return;
      }

      const validMinutes = parseInt(validity) || 30;
      const expiry = Date.now() + validMinutes * 60000;

      const shortUrl = {
        originalUrl,
        shortCode: code,
        expiry,
        createdAt: Date.now(),
        clicks: []
      };

      createShortUrl(shortUrl);
      await logEvent('frontend', 'info', 'component', `Shortcode ${code} created for ${originalUrl}`);
      results.push(shortUrl);
    }
    onShorten(results);
  };

  return (
    <Paper sx={{ p: 3, mb: 2 }}>
      <Typography variant="h6">Shorten URLs</Typography>
      {inputs.map((input, index) => (
        <Grid container spacing={2} key={index} sx={{ my: 1 }}>
          <Grid item xs={5}>
            <TextField label="Original URL" fullWidth required onChange={(e) => handleChange(index, 'originalUrl', e.target.value)} />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Validity (min)" type="number" fullWidth onChange={(e) => handleChange(index, 'validity', e.target.value)} />
          </Grid>
          <Grid item xs={3}>
            <TextField label="Custom Shortcode" fullWidth onChange={(e) => handleChange(index, 'customCode', e.target.value)} />
          </Grid>
        </Grid>
      ))}
      <Button onClick={handleAdd} disabled={inputs.length >= 5}>Add More</Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>Shorten</Button>
    </Paper>
  );
}
