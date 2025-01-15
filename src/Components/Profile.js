import React from "react";
import './Profile.css';
import {Chart as ChartJS, defaults} from 'chart.js/auto';
import {Bar, Doughnut, Line} from 'react-chartjs-2';
import sourceData from '../data/sourceData.json';
import revenueData from '../data/revenueData.json'
defaults.maintainAspectRatio = false;
defaults.responsive= true;
defaults.plugins.title.display=true;
defaults.plugins.title.align="start";
defaults.plugins.title.font.size=20;
defaults.plugins.title.color="black";
const Profile = () => {
    return (
        <div className="profile-container">
            <div className="dataCard revenueCard" >
                <Line 
                data={{
                    labels: revenueData.map((data) => data.label),
                    datasets:[
                        {
                            label:"Revenue",
                            data: revenueData.map((data) => data.revenue),
                            backgroundColor:"#064FF0",
                            borderColor: "#064FF0",
                        },
                        {
                            label:"Cost",
                            data: revenueData.map((data) => data.cost),
                            backgroundColor:"#FF3030",
                            borderColor: "#FF3030",
                        },
                    ]
                }} 
                options={{
                    elements:{
                        line:{
                            tension:0.5,
                        },
                    },
                    plugins:{
                        title:{
                            text:"Monthly Revenue & Cost",
                            display: true,
                            position: 'top',
                            align: 'center',
                            font: {
                                size: 20,
                                weight: 'bold'
                            }                            
                        }
                    }
                }}/>
            </div>
            <div className="dataCard customerCard"> 
                <Bar data={{labels: sourceData.map((data) => data.label), datasets:[{ label: "Revenue", data:sourceData.map((data)=> data.value),
                    backgroundColor: [
                        'rgba(43, 63, 229, 0.8)',
                        'rgba(255, 159, 64, 0.8)',
                        'rgba(253, 135, 135, 0.8)',],
                    borderRadius:5,
            
            }]}}
            options={{
                elements:{
                    line:{
                        tension:0.5,
                    },
                },
                plugins:{
                    title:{
                        text:"revenue Sources",
                        display: true,
                        position: 'top',
                        align: 'center',
                        font: {
                            size: 20,
                            weight: 'bold'
                        }                           
                    }
                }
            }}/>
            </div>
            <div className="dataCard categoryCard">
                <Doughnut data={{labels: sourceData.map((data) => data.label), datasets:[{ label: "Revenue", data:sourceData.map((data)=> data.value),
                        backgroundColor: [
                            'rgba(43, 63, 229, 0.8)',
                            'rgba(255, 159, 64, 0.8)',
                            'rgba(253, 135, 135, 0.8)',],
                        borderColor:[
                            'rgba(43, 63, 229, 0.8)',
                            'rgba(255, 159, 64, 0.8)',
                            'rgba(253, 135, 135, 0.8)',
                        ],
                
                }]}}
                options={{
                    elements:{
                        line:{
                            tension:0.5,
                        },
                    },
                    plugins:{
                        title:{
                            text:"Revenue Sources",
                            display: true,
                            position: 'top',
                            align: 'center',
                            font: {
                                size: 20,
                                weight: 'bold'
                            }                            
                        }

                    }
                }}/>
            </div>
        </div>
    )
}
export default Profile;