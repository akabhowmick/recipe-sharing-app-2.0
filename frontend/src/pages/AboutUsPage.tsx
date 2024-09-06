import { Container, Typography, Grid, Avatar, Box } from "@mui/material";
import { reasons } from "../components/HomePageComponents/info";
import { generateRandomImage } from "../MockData/RandomImage";

export const AboutUsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          Why Share Recipes?
        </Typography>
        <Typography variant="body1" color="white">
          At Recipe Sharing App, we believe that food is more than just nourishment — it's a gateway
          to exploring new cultures, traditions, and flavors. Our platform allows you to share your
          favorite recipes and learn from others around the world, creating a global community of
          food enthusiasts.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {reasons.map((reason, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
              <Avatar
                alt={reason.title}
                src={generateRandomImage()}
                sx={{
                  width: 128,
                  height: 128,
                  mb: 2,
                  border: "4px solid",
                  borderColor: "primary.main",
                }}
              />
              <Typography variant="h5" fontWeight="bold" gutterBottom color="white">
                {reason.title}
              </Typography>
              <Typography variant="body2" color="white">
                {reason.text}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

