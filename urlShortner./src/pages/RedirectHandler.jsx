import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getShortUrls, saveClick } from '../services/api';
import { logEvent } from '../services/logger';

export default function RedirectHandler() {
  const { code } = useParams();

  useEffect(() => {
    const urls = getShortUrls();
    const match = urls.find(u => u.shortCode === code);
    if (!match) {
      logEvent('frontend', 'error', 'route', `Invalid shortcode accessed: ${code}`);
      return;
    }

    if (Date.now() > match.expiry) {
      logEvent('frontend', 'warn', 'route', `Expired link accessed: ${code}`);
      alert('Link expired');
      return;
    }

    saveClick(code, {
      timestamp: new Date().toISOString(),
      referrer: document.referrer || 'direct',
      location: 'India'
    });

    logEvent('frontend', 'info', 'route', `Redirecting for ${code}`);
    window.location.href = match.originalUrl;
  }, [code]);

  return <p>Redirecting...</p>;
}
