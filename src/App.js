import {Footer} from "./Components/Footer/Footer";
import {Header} from "./Components/Header/Header";
import SideNavBar from "./Components/SidebarMenu/Sidebar";
import {BackgroundLogo} from "./Components/BackgroundLogo/BackgroundLogo";
import { UserContextProvider } from "./context/WebcamContext";
import { Camera } from "./Components/Capture/CameraCard/Camera";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() { 
  return (
    <>
      <UserContextProvider>
        <div className='SideNavBarClass'><SideNavBar/></div>
        <div className='HeaderClass'><Header /></div>
        <div className='App'>
          <div className="App-Content">
            <Camera numberOfImages={3} addNewData={false} />
          </div>
          <BackgroundLogo />
        </div>
        <div className='FooterClass'><Footer /></div>
      </UserContextProvider>
    </>
  );
}

export default App;
