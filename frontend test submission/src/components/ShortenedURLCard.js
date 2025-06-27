import React from "react";
import {
  Card, CardContent, Typography, Link,
} from "@mui/material";

const ShortenedURLCard = ({ data }) => (
  <Card elevation={3}>
    <CardContent>
      <Typography variant="h6">Original URL:</Typography>
      <Link href={data.originalUrl} target="_blank" rel="noopener">{data.originalUrl}</Link>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Short URL: <Link href={data.shortUrl} target="_blank">{data.shortUrl}</Link>
      </Typography>
      <Typography variant="body2">Expires At: {new Date(data.expiresAt).toLocaleString()}</Typography>
    </CardContent>
  </Card>
);

export default ShortenedURLCard;
