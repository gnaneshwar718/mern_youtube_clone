import { darkTheme, lightTheme } from "./utils/Theme";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { useState,React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import { useSelector } from "react-redux";
import { useSwipeable } from 'react-swipeable'

const Container = styled.div`
  display: flex;
 
`;

const SwipeContainer = styled.div`
${'' /* background-color: ${({ theme }) => theme.bg};
 &.open {
    display : none;
  } */}
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;


function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleToggle,
    onSwipedRight: handleToggle,
  });
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <Container >
    <BrowserRouter>
    <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Main>
        <Navbar />
        <Wrapper>
        <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>} />
                  <Route path="trends" index element={<Home type="trend"/>} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="settings" element={<Home type="settings" />} />
                  <Route path="search" element={<Search />} />
                  <Route
                    path="signin"
                    element={currentUser ? <Home /> : <SignIn />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
        </Wrapper>
      </Main>
    </BrowserRouter>
    </Container>
    </ThemeProvider>
  );
}

export default App;