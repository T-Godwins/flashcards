"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  writeBatch,
  doc,
  collection,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) {
        return;
      }
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]); // Add user as a dependency to run useEffect when user is loaded

  if (!isLoaded || !isSignedIn) {
    return null; // Return null to render nothing while loading
  }

  const handleClick = (id) => {
    router.push(`/flashcard-set/?id=${id}`);
  };

  return (
    <Container maxwidth="100vw">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, i) => (
          <Grid key={i} item xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea onClick={() => handleClick(flashcard.name)}>
                <CardContent>
                  <Typography variant="h6">{flashcard.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
