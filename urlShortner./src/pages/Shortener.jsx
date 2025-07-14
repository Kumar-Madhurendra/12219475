import { Container, Typography } from '@mui/material';
import URLForm from '../components/URLForm';
import URLList from '../components/URLList';
import { useState, useEffect } from 'react';
import { fetchAuthToken } from '../services/auth';
import { logEvent } from '../services/logger';

export default function Shortener() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetchAuthToken().then(() => {
      logEvent('frontend', 'info', 'page', 'Shortener Page Loaded');
    });
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>React URL Shortener</Typography>
      <URLForm onShorten={setUrls} />
      <URLList urls={urls} />
    </Container>
  );
}
