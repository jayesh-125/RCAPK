import HelloImage from "../component/HelloImage";
import { Container } from "@mui/material";
import { useWindowWidth } from "../hook/Customhook";
import Sidebar from "../component/Sidebar";

function TempUserDashboard() {
  const windowWidth = useWindowWidth();
  return (
    <>
      {windowWidth > 570 ? (
        <Container sx={{ height: "calc(100vh - 70px)" }}>
          <HelloImage />
        </Container>
      ) : (
        <Sidebar />
      )}
    </>
  );
}

export default TempUserDashboard;
