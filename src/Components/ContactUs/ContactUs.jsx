import React from 'react'
import { BackgroundLogo } from '../BackgroundLogo/BackgroundLogo';
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import SideNavBar from "../SidebarMenu/Sidebar";


export const ContactUs = () => {
  return (
    <>
        <SideNavBar/>
        <Header/>
        <div className="App pt-4">
            <div className='App-Content'>
                <div className='card' style={{'width': '50em'}}>
                    <div className='card-header h4'>In Case of any Issue or Query Please Contact us:</div>
                    <div className="d-flex flex-column card-body ml-1">
                        <div className="p-2">
                            <p>SLt Aaditya Banchhiwal</p>
                            <p>Ph. 7982554655</p>
                        </div>
                        <hr />
                        <div className="p-2">
                            <p>SLt Surya Prakash Swami</p>
                            <p>Ph. 8290502020</p>
                        </div>
                        <hr />
                        <div className="p-2">
                            <p>SLt Shreyas S Kamath</p>
                            <p>Ph. 8073489119</p>

                        </div>
                    </div>
                </div>   
            </div>
            <BackgroundLogo />
        </div>
        <div className="FooterClass"><Footer /></div>
    </>   
  )
}
