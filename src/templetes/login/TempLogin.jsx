import { Button, Grid, TextField } from "@mui/material";

function TempLogin() {
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
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            label="Enter Your Mobile Number"
            name="Number"
            color="success"
            sx={{ marginBottom: "1rem" }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "1rem", background: "#555555" }}
            onClick={() => navigatw("/")}
          >
            Send OPT
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default TempLogin;
