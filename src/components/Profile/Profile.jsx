import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import styled from "styled-components";
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';


export default function Profile() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
    return (
        <div>
        <h1> This is the Profile Page </h1>
        </div>
    )
}
 

const Container = styled.div`
  grid-area: leftside;

`;

const ArtCard = styled.div`
  text-align: center;
  margin-top: 40px;
  overflow: hidden;
  margin-left: 20px;
  margin-right: 20px;
  width: 50%;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  transition: box-shadow 83ms;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const UserInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  word-wrap: break-word;
  word-break: break-word;
  
`;

const CardBackground = styled.div`
  background: url("/images/card-bg.svg");
  background-position: center;
  background-size: 462px;
  height: 54px;
  margin: -12px -12px 0;
  margin-top: 10px;
`;

const Photo = styled.div`
  box-shadow: none;
  class : avatar;
  background-image: url("/images/avatar.png");
  border-radius: 50%; 
  width: 100px;
  height: 100px;
  background-clip: content-box;
  background-color: white;
  background-position: center;
  background-size: 100%; 
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -38px auto 12px;
`;

const Link = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`;

const AddPhotoText = styled.div`
  color: #0a66c2;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.33;
  font-weight: 400;
`;