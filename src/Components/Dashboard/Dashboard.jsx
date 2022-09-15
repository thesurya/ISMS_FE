import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import {Footer} from "../Footer/Footer";
import {Header} from "../Header/Header";
import SideNavBar from "../SidebarMenu/Sidebar";
import {BackgroundLogo} from "../BackgroundLogo/BackgroundLogo";
import MaterialTable from 'material-table'
import axios from "axios";
import Avatar from "react-avatar";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";

function Dashboard() {
    const columns = [
        {
            title: "",
            render: data => (
                <Avatar
                    maxInitials={1}
                    size={40}
                    round={true}
                    name={data === undefined ? " " : data.name}
                />
            )
        },
        {
            field: "name",
            title: "Name",  
        },
        {
            field: "rank",
            title: "Rank"
        },
        {
            field: "number",
            title: "Number"
        },
        {
            field: "adharno",
            title: "Aadhar Card "
        },
        {
            field: "snumber",
            title: "Snumber"
        },
        {
            field: "blacklist",
            title: "Blacklist",
            filtering: false
        }, 
        {
            field: "place",
            title: "Place",
            filtering: false
        }, 
        {
            field: "supervisor",
            title: "Supervisor",
            filtering: false
        },
        {
            field: "timein",
            title: "Time In",
            filtering: false
        }, 
        {
            field: "datein",
            title: "Date In",
            filtering: false
        },
        {
            field: "timeout",
            title: "Time Out",
            filtering: false
        },
        {
            field: "dateout",
            title: "Date Out",
            filtering: false
        }
    ]
    const [tableData, setTableData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios("http://11.0.0.221:8000/getUserEntries").then((res) => {
            res.data.forEach(function(element, index) { 
                element.datein = element.datein ? moment(element.datein).format('MM/DD/YYYY') : '-';
                element.timein = element.timein ? element.timein.split('.')[0] : '-';
                element.dateout = element.dateout ? moment(element.dateout).format('MM/DD/YYYY') : '-';
                element.timeout = element.timeout ? element.timeout.split('.')[0] : '-';
            });
            if (!res.data) {
                tableData = [];
                return;
            }
            res.data = res.data.sort((a, b) => a.datein < b.dateIn);
            setTableData(res.data);
            res.data.forEach((element, index) => element.__id2 = index);
        });
    };

    return (
        <>
            <div className='SideNavBarClass'><SideNavBar/></div>
            <div className='HeaderClass'><Header /></div>    
            <div className="App MaterialTable pt-4">
                <MaterialTable
                    style={{fontSize: "medium"}}
                    className="App-Content"
                    title=""
                    data={tableData}
                    columns={columns}
                    options={{
                        grouping: true,
                        exportButton: true,
                        exportAllData: true,
                        pageSize: rowsPerPage,
                        pageSizeOptions: [5, 10, 20, { value: tableData.length > 0 ? tableData.length : 1, label: 'All' }],
                    }}
                /> 
                <BackgroundLogo />
            </div>
            <div className='FooterClass'><Footer /></div>
        </>
    );
}

export default Dashboard;
