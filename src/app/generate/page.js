"use client";

import { useUser } from "@clerk/nextjs";
import Nav from "../nav/navbar";
import {
  Box,
  Stack,
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  writeBatch,
  doc,
  collection,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    fetch(`api/generate`, {
      method: "POST",
      body: text,
    })
      .then((res) => res.json())
      .then((data) => setFlashcards(data));
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }
    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, "users"), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert("flashcard collection with name exists");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });
    await batch.commit();
    handleClose();
    router.push("/flashcards");
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
      <Box 
        width="100vw"
        height="150vh"
        
        p={10}>
      
      <Box
        sx={{
          mt: {lg:4, xs:0},
          mb: {lg:6, xs:0},
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" align="center">Generate Flashcards</Typography>
        <Stack sx={{ p: {lg:4, xs:1}, width:{md:"60%", xs:"180%"}}} spacing={2}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter topics or notes you would like to study!"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            width="200px"
            sx={{
              borderRadius: "50px",
              bgcolor: "black",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(1, 1, 1, 0.7)",
                color: "white",
              },
            }}
          >
            Submit
          </Button>
        </Stack>
      </Box>

      {flashcards.length > 0 && (
        <Box>
          <Typography variant="h4" align="center">Flashcards Preview</Typography>
          <Grid container spacing={3}>
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
          <Box display="flex"
              justifyContent="center"sx={{ my: 4 }}>
            <Button
              sx={{ width: "45%", borderRadius: "50px",
                bgcolor: "black",
                "&:hover": {
                  bgcolor: "rgba(1, 1, 1, 0.7)",
                  color: "white",
                },
              }}
              variant="contained"
              color="secondary"
              onClick={handleOpen}
            >
              Save
            </Button>
          </Box>
        </Box>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter a name for collection</DialogContentText>
          <TextField
            autoFocus
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
      </Dialog>
      </Box>
      </Box>
    </div>
  );
}
