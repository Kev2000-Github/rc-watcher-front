import { styled, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from "@mui/material";
import { DarkLogo } from '../../SVG/darkLogo'
import style from './style.module.scss'
import { menuItems, menuLastItems } from './helper'
import { useLocation, useNavigate } from 'react-router-dom'

const drawerWidth = 240;
const CustomDrawer = styled(Drawer)(({theme}) => ({
    width: drawerWidth,
    flexShrink: 0,
    justifyContent: 'center',
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundColor: theme.menu.background,
        color: theme.custom.white,
      },
}))
const CustomListButton = styled(ListItemButton)(({theme}) => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: theme.menu.pressed,
  },
  '&.MuiListItemButton-root:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)'
  },
  '& svg': {
    color: theme.custom.white
  }
}))

export function Menu() {
    const location = useLocation()
    const navigate = useNavigate()
    return (
    <CustomDrawer
        variant="permanent"
        anchor="left"
      >
        <Box className={style.logoOutline}>
          <DarkLogo style={style.logo}/>
        </Box>
        <List>
          {menuItems.map(({text, URI, icon}) => (
            <ListItem key={text} disablePadding>
              <CustomListButton 
                onClick={() => navigate(URI)}
                selected={location.pathname === URI}>
                <ListItemIcon sx={{minWidth: 40}}>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
              </CustomListButton>
            </ListItem>
          ))}
        </List>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 'auto',
            paddingBottom: 3
          }}
        >
          <List sx={{width: 1}}>
            {menuLastItems.map(({text, URI, icon}) => (
              <ListItem key={text} disablePadding>
                <CustomListButton sx={{justifyContent: "center"}}>
                  <ListItemIcon sx={{minWidth: 30}}>
                    {icon}
                  </ListItemIcon>
                  <Typography>
                    {text}
                  </Typography>
                </CustomListButton>
              </ListItem>
            ))}
          </List>
          <Typography>
            Empresa Polar, C.A
          </Typography>
          <Typography fontSize={13}>
            Venezuela
          </Typography>
        </Box>
    </CustomDrawer>
    )
  }