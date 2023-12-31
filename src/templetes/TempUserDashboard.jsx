import HelloImage from "../component/HelloImage";
import { Container } from "@mui/material";

function TempUserDashboard() {

  return (
    <Container sx={{ height: "calc(100vh - 70px)" }}>
      <HelloImage />
    </Container>
  );
}

export default TempUserDashboard;
