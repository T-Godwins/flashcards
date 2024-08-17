"use client";
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button, Container, Head, Box, Typography, Card, Stack} from "@mui/material";
import Nav from "./nav/navbar"; 
export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
    });
    const checkoutSessionJson = await checkoutSession.json();
    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };
  return (
    <Container maxWidth="lg">
        <Nav/>
        <Box 
          width="100vw"
          height="50vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bgcolor="#F7F7F7"
          sx={{paddingBottom:"20px"}}
          >
          <Typography variant="h2" gutterBottom p={0} sx={{ textAlign:"center", fontSize: {xs:'2rem', md:'5rem', lg:'5rem'}}} >
            Welcome to Flash.AI
          </Typography>
          <Typography variant="h7" gutterBottom p={1} sx={{ textAlign:"center", fontSize: {xs:'1rem', md:'2rem', lg:'2rem'}}} >
            10x your studying effeciency with AI          
          </Typography>
          
          <Button variant="contained"
                sx={{
                    borderRadius: '50px', 
                    bgcolor:"black", 
                    color:"white",
                    "&:hover": {
                        bgcolor: 'rgba(2, 2, 2, 0.7)',
                        color: 'white',}
                    }}
                    ><a href="/generate">Get Started</a> 
          </Button>
          </Box>

{/* Features */}
<Box id="features"
          width="100vw"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={2}>
            <Typography variant="h7" sx={{ textAlign:"center", fontSize: {xs:'1rem', md:'2rem', lg:'2rem'}}} >
            Features          
            </Typography>
            <Box id="pricing-options"
              width="100vw"
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              p={2}
              gap={5}>
            <Card variant="outlined">
              <Stack p={2} 
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                maxWidth="400px"
                minHeight="200px">
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Leverage the future
                  </Typography>
                  <Typography variant="h5" component="div" align="center">
                    AI-Generated Flashcards:
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" align="center">
                    Automatically generate personalized flashcards from any study material, allowing you to quickly create effective study aids without manual input.
                  </Typography>
              </Stack>
            </Card>

            <Card variant="outlined">
              <Stack p={2} 
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                maxWidth="400px"
                minHeight="200px"
                >
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Simplify Your Study Process
                  </Typography>
                  <Typography variant="h5" component="div" align="center">
                  Seamless User Experience:
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" align="center">
                  Enjoy an intuitive and user-friendly interface that makes creating, organizing, and reviewing flashcards effortless, even for first-time users.
                  </Typography>
              </Stack>
            </Card>

            <Card variant="outlined">
              <Stack p={2} 
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                maxWidth="400px"
                minHeight="200px">
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Learning On the Go
                  </Typography>
                  <Typography variant="h5" component="div" align="center">
                    Accessibility Anywhere:
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" align="center">
                  Study and review your flashcards on any device, ensuring your learning continues seamlessly wherever you are.
                  </Typography>
              </Stack>
            </Card>
            </Box>
          </Box>

          
{/* Pricing */}
          <Box id="pricing"
          width="100vw"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bgcolor="#F7F7F7"
          p={2}>
            <Typography variant="h7" sx={{ textAlign:"center", fontSize: {xs:'1rem', md:'2rem', lg:'2rem'}}} >
              Pricing          
            </Typography>
            <Box id="pricing-options"
              width="100vw"
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              p={2}
              gap={5}>
            <Card variant="outlined">
              <Stack p={2} display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                maxWidth="200px"
                minHeight="230px">
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Basic
              </Typography>
              <Typography variant="h5" component="div">
                $0 / month
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" align="center">
                10 flashcards and limited storage + community support.
              </Typography>
              <Button 
                variant="contained" 
                sx={{
                    borderRadius: '50px', 
                    bgcolor:"black", 
                    "&:hover": {
                        bgcolor: 'rgba(1, 1, 1, 0.7)',
                        color: 'white',}
                    }}>
                  <a href="/generate">Try Free</a>
              </Button>
              </Stack>
            </Card>

            <Card variant="outlined">
              <Stack p={2} display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                maxWidth="200px"
                minHeight="230px">
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Plus
              </Typography>
              <Typography variant="h5" component="div">
                $5 / month
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" align="center">
                50 flashcards and moderate storage + standard support.
              </Typography>
              <Button 
                variant="contained" 
                sx={{
                    borderRadius: '50px', 
                    bgcolor:"black", 
                    "&:hover": {
                        bgcolor: 'rgba(1, 1, 1, 0.7)',
                        color: 'white',}
                    }}>
                Go Plus
              </Button>
              </Stack>
            </Card>

            <Card variant="outlined">
              <Stack p={2} 
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center" 
                maxWidth="200px"
                minHeight="230px">
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Pro
              </Typography>
              <Typography variant="h5" component="div">
                $10 / month
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" align="center">
                Unlimited flashcards and storage + priority support.
              </Typography>
              <Button 
                variant="contained" 
                sx={{
                    borderRadius: '50px', 
                    // // bgcolor:"black", 
                    // "&:hover": {
                    //     bgcolor: 'rgba(1, 1, 1, 0.7)',
                    //     color: 'white',}
                    }} 
                color="secondary"
                onClick={handleSubmit}>
                Go Pro
              </Button>
              </Stack>
            </Card>
            </Box>
          </Box>
    </Container>
  );
}
