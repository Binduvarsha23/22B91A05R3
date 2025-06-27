import React, { useEffect, useState } from "react";
import {
  Container, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchStats } from "../api";

const StatisticsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchStats().then(setStats);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Shortened URL Statistics</Typography>
      {stats.map((entry, idx) => (
        <Accordion key={idx}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {entry.shortUrl} — Clicks: {entry.clicks.length}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Created: {new Date(entry.createdAt).toLocaleString()}</Typography>
            <Typography>Expires: {new Date(entry.expiresAt).toLocaleString()}</Typography>
            <List>
              {entry.clicks.map((click, i) => (
                <ListItem key={i}>
                  {new Date(click.timestamp).toLocaleString()} | {click.source} | {click.location}
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default StatisticsPage;
