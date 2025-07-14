import { Container, Typography } from '@mui/material';
import StatsTable from '../components/StatsTable';
import { useEffect } from 'react';
import { logEvent } from '../services/logger';

export default function Statistics() {
  useEffect(() => {
    logEvent('frontend', 'info', 'page', 'Statistics Page Loaded');
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Statistics</Typography>
      <StatsTable />
    </Container>
  );
}
