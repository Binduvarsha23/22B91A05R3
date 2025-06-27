import React, { useState } from "react";
import {
  Container, TextField, Button, Typography, Grid, Paper,
} from "@mui/material";
import { shortenURLs } from "../api";
import ShortenedURLCard from "./ShortenedURLCard";

const URLShortenerForm = () => {
  const [inputs, setInputs] = useState([{ url: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const addField = () => {
    if (inputs.length < 5) setInputs([...inputs, { url: "", validity: "", shortcode: "" }]);
  };

  const validateInput = (input) => {
    const urlRegex = /^https?:\/\/.+\..+/;
    if (!urlRegex.test(input.url)) return false;
    if (input.validity && isNaN(parseInt(input.validity))) return false;
    return true;
  };

  const handleSubmit = async () => {
    const validInputs = inputs.filter(validateInput);
    const payload = validInputs.map(({ url, validity, shortcode }) => ({
      url, validity: parseInt(validity), shortcode,
    }));
    const res = await shortenURLs(payload);
    setResults(res.urls || []);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {inputs.map((input, idx) => (
        <Paper key={idx} sx={{ p: 2, mb: 2 }}>
          <TextField
            label="Original URL"
            fullWidth
            value={input.url}
            onChange={(e) => handleChange(idx, "url", e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Validity (minutes)"
            fullWidth
            value={input.validity}
            onChange={(e) => handleChange(idx, "validity", e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Preferred Shortcode"
            fullWidth
            value={input.shortcode}
            onChange={(e) => handleChange(idx, "shortcode", e.target.value)}
          />
        </Paper>
      ))}
      {inputs.length < 5 && <Button onClick={addField}>Add More</Button>}
      <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>Shorten URLs</Button>

      {results.length > 0 && (
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {results.map((urlObj, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <ShortenedURLCard data={urlObj} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default URLShortenerForm;
