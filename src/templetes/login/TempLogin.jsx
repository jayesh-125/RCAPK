import { Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TempLogin = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
        background: "#55555522",
      }}
    >
      <Grid item sm={4}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
            padding: "30px",
          }}
        >
          <Typography
            color={"green"}
            fontSize={24}
            fontWeight={600}
            marginBottom={5}
          >
            Login
          </Typography>
          <TextField
            fullWidth
            variant="filled"
            label="Enter Your Mobile Number"
            name="Number"
            type="number"
            color="success"
            sx={{ marginBottom: "1rem" }}
            size="small"
          />
          OR
          <TextField
            fullWidth
            variant="filled"
            label="Enter Your Mobile Number"
            name="email"
            type="email"
            color="success"
            sx={{ marginBottom: "1rem" }}
            size="small"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "1rem", background: "#555555" }}
            onClick={() => navigate("/")}
          >
            Login
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default TempLogin;
