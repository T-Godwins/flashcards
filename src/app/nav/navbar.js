"use client";
import Image from "next/image";
// import React, {useState} from 'react'
import getStripe from "@/utils/get-stripe";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { 
  Button, 
  Container, 
  Head, 
  Box, 
  Stack, 
  AppBar, 
  Typography,
  IconButton,
  Menu,
  MenuItem,
  MenuIcon,
  useMediaQuery
  } from "@mui/material";
export default function Nav() {
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

  // const isMobile = useMediaQuery('(max-width:600px)');
  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <AppBar 
      position="sticky" 
      sx={{boxShadow:"none"}}
      p={0}
    >
      <SignedOut>
        <Stack
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              gap={2}
              bgcolor="#F5F5F5"
        >
          <Stack
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
          > 
            <a href="/"><img src="flashai.jpg" alt="flash.ai logo" href="/" style={{height:"60px", borderRadius:"50px"}} /></a>
            <Typography variant="h4" color="black" sx={{fontSize:{xs:"0px", lg:"2rem"}}}>
            <a href="/">Flash.AI</a> </Typography>
          
          </Stack>
          <Stack
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
          >  
            <Button 
              variant="contained"
              sx={{
                  fontSize:{xs:"10px", lg:'1rem'},
                  borderRadius: '50px', 
                  bgcolor:"black", 
                  color:"white",
                  "&:hover": {
                      bgcolor: 'rgba(2, 2, 2, 0.7)',
                      color: 'white',}
                  }}
                  ><SignInButton />
            </Button>
            <Button 
              variant="contained"
              sx={{
                fontSize:{xs:"10px", lg:'1rem'},
                  borderRadius: '50px', 
                  bgcolor:"white", 
                  color:"black",
                  "&:hover": {
                      bgcolor: 'rgba(2, 2, 2, 0.7)',
                      color: 'white',}
                  }}
                  ><a href="/generate">Try for Free</a> 
            </Button>
          </Stack>
        </Stack>
      </SignedOut>

      <SignedIn>
            <Box
              width="100vw"
              height="10vh"
              bgcolor="#F5F5F5"
              display="flex"
              justifyContent="space-between"
              sx={{padding:{lg:3, xs:3.5}}}
            >
              <Stack
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            > 
              <a href="/"><img src="flashai.jpg" alt="flash.ai logo" href="/" style={{height:"60px", borderRadius:"50px"}} /></a>
              <Typography variant="h4" color="black" sx={{fontSize:{xs:"0px", lg:"2rem"}}}>
              <a href="/">Flash.AI</a> </Typography>
            
            </Stack>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                sx={{gap:{xs:0.5, md:3, lg:4}, flexDirection:{md:"row", xs:"column"}}}
              >
                <Button
                  variant="contained"
                  sx={{
                    fontSize: {xs:'0.5rem', sm:'0.7rem', md:'1rem', lg:'1rem'},
                    borderRadius: "50px",
                    bgcolor: "black",
                    "&:hover": {
                      bgcolor: "rgba(1, 1, 1, 0.7)",
                      color: "white",
                    },
                  }}
                >
                  <a href="/generate">Generate New</a>
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    fontSize: {xs:'0.5rem', sm:'0.7rem', md:'1rem', lg:'1rem'},
                    borderRadius: "50px",
                    bgcolor: "white",
                    color: "black",
                    "&:hover": {
                      bgcolor: "rgba(200, 200, 200, 0.9)",
                      color: "white",
                    },
                  }}
                >
                   <a href="/flashcards">Saved Flashcards</a>
                </Button>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                sx={{gap:{xs:0.5, md:2, lg:2}, flexDirection:{md:"row", xs:"column"}}}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ 
                    fontSize: {xs:'0.5rem', sm:'0.7rem', md:'1rem', lg:'1rem'},borderRadius: "50px" }}
                  onClick={handleSubmit}
                >
                  Go Pro
                </Button>

                  <Stack
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    // p={2}
                    gap={2}
                  >
                    
                    <UserButton />
                  </Stack>
              </Box>
            </Box>
          </SignedIn>

          {/* {isMobile ? (
          <div>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <Button color="primary">Button</Button>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button color="primary">Button</Button>
        )} */}

    </AppBar>
  );
}

