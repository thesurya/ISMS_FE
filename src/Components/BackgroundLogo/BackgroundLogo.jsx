import logo from '../../static/Indian_Navy_Insignia.svg.png';

export const BackgroundLogo = () => {
    return (
        <>
            <img src={logo} className="App-logo" alt="logo"/>
            <div className='App-Content'></div>
        </>
    );
  }