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
import { Button, Container, Head, Box} from "@mui/material";
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
      <Box maxWidth="lg" bgcolor="grey" display="flex" justifyContent="space-between" p={3}>
      <a href="/generate">Generate New</a>
      <a href="/flashcards">Saved Flashcards</a>
      <Button onClick={handleSubmit}>STRIPE BUTTON</Button>
      </Box>
    </Container>
  );
}
