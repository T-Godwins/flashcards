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
import { Button, Container, Head, Box, Stack} from "@mui/material";
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
  return (
        <Box 
            width="100vw"
            height="10vh" 
            bgcolor="#F5F5F5" 
            display="flex" 
            justifyContent="space-between" 
            p={3}>
            <Box display="flex" 
            flexDirection="row"
            justifyContent="space-between" 
            gap={4}>
            <Button 
                variant="contained" 
                sx={{
                    borderRadius: '50px', 
                    bgcolor:"black", 
                    "&:hover": {
                        bgcolor: 'rgba(1, 1, 1, 0.7)',
                        color: 'white',}
                    }}>
                <a href="/generate">Generate New</a></Button>
            <Button variant="contained" 
                sx={{
                    borderRadius: '50px', 
                    bgcolor:"white", 
                    color:"black",
                    "&:hover": {
                        bgcolor: 'rgba(200, 200, 200, 0.9)',
                        color: 'white',}
                    }}>
                <a href="/flashcards">Saved Flashcards</a></Button>
            </Box>
            <Box display="flex" 
            flexDirection="row"
            justifyContent="space-between" 
            gap={2}>
            <Button variant="contained" color="secondary" sx={{borderRadius: '50px'}} onClick={handleSubmit}>Go Pro</Button>

            <Button variant="none" sx={{
                    borderRadius: '50px', 
                    bgcolor:"black", 
                    color:"white",
                    "&:hover": {
                        bgcolor: 'rgba(1, 1, 1, 0.7)',
                        color: 'white',}
                    }}>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <Stack display="flex"
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                        // p={2}
                        gap={2}>
                    <UserButton />
                     Hey!
                    </Stack>
                </SignedIn>
            </Button>
            </Box>
        </Box>
  );
}
