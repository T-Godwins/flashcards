"use client";

import Nav from "../nav/navbar";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  writeBatch,
  doc,
  collection,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
export default function FlashcardSet() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  useEffect(() => {
    async function getFlashcardSet() {
      if (!search || !user) {
        return;
      }
      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docSnap = await getDocs(colRef);

      const flashcards = [];
      docSnap.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashcardSet();
  }, []);
  const handleCardClick = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <div>
      <Box sx={{
          backgroundImage:`url('/17580.jpg')`,
          backgroundSize:'cover',
          backgroundPosition:'center',
          backgroundRepeat:'repeat-y'
        }}>
      <Nav/>
      {flashcards.length > 0 && (
        <Box 
        width="100vw"
        height="100vh"
        // bgcolor="#F5F5F5"
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={0}>
          <Typography variant="h5">{search}</Typography>
          <Grid container spacing={3} sx={{paddingInline:"100px"}}>
            {flashcards.map((flashcard, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <CardActionArea onClick={() => handleCardClick(i)}>
                  <CardContent>
                  <Box
                      sx={{
                        bgcolor:"white",
                        borderRadius:"20px",
                        perspective: "1000px",
                        "& > div": {
                          transition: "transform 0.6s",
                          transformStyle: "preserve-3d",
                          position: "relative",
                          width: "100%",
                          height: "200px",
                          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                          transform: flipped[i]
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                            borderRadius:"20px",
                        },
                        "& > div > div": {
                          position: "absolute",
                          borderRadius:"20px",
                          width: "100%",
                          height: "100%",
                          backfaceVisibility: "hidden",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 2,
                          boxSizing: "border-box",
                        },
                        "& > div > div:nth-of-type(2)": {
                          transform: "rotateY(180deg)",
                        },
                      }}
                    >
                      <div>
                        <div>
                          <Typography variant="h5" component="div" align="center">
                            {flashcard.front}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="h5" component="div" align="center">
                            {flashcard.back}
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter a name for collection</DialogContentText>
          <TextField
            autofocus
            margin="dense"
            label="Collection name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />{" "}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards}>Save</Button>
        </DialogActions>
      </Dialog> */}
      </Box>
    </div>
  );
}
