import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function URLList({ urls }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">Shortened URLs</Typography>
      <List>
        {urls.map((u, i) => (
          <ListItem key={i} divider>
            <ListItemText primary={`http://localhost:3000/${u.shortCode}`} secondary={`Expires: ${new Date(u.expiry).toLocaleString()}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}