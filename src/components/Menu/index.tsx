import { styled, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from "@mui/material";
import { DarkLogo } from '../../SVG/darkLogo'
import style from './style.module.scss'
import { menuItems, menuLastItems, operatorMenuItems } from './helper'
import { useLocation, useNavigate } from 'react-router-dom'
import loginService from "../../services/Session";
import { useMutation } from "@tanstack/react-query";
import { routes } from "../../app/constants";
import { closeNotification, notifyLoading } from "../../utils/alert";
import { useEffect } from "react";
import { useUserStore } from "../../store";
import { mutationKey } from "../../services/constants";

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
    const {clear, user, isAdmin, isAuditor} = useUserStore()
    const logoutMutation = useMutation([mutationKey.LOGOUT], loginService.logout, {
      onSuccess: () => {
        clear()
        navigate(routes.LOGIN)
        closeNotification()
      }
    })
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
      if(logoutMutation.isLoading) notifyLoading()
    }, [logoutMutation.isLoading])

    const getMenuItems = () => {
      if(isAdmin() || isAuditor()){
        return menuItems
      }
      else{
        return operatorMenuItems
      }
    }
    return (
    <CustomDrawer
        variant="permanent"
        anchor="left"
      >
        <Box className={style.logoOutline}>
          <DarkLogo style={style.logo}/>
        </Box>
        <List>
          {
            user &&
            getMenuItems().map(({text, URI, icon}) => (
              <ListItem key={text} disablePadding>
                <CustomListButton 
                  onClick={() => {
                    closeNotification()
                    navigate(URI)
                  }}
                  selected={location.pathname === URI}>
                  <ListItemIcon sx={{minWidth: 40}}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </CustomListButton>
              </ListItem>
            ))
          }
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
            {
              menuLastItems.map(({text, icon}) => (
                <ListItem key={text} disablePadding>
                  <CustomListButton 
                    sx={{justifyContent: "center"}}
                    onClick={() => logoutMutation.mutate()}>
                    <ListItemIcon sx={{minWidth: 30}}>
                      {icon}
                    </ListItemIcon>
                    <Typography>
                      {text}
                    </Typography>
                  </CustomListButton>
                </ListItem>
              ))
            }
          </List>
          <Typography>
            {user?.Company?.name ?? 'COMPANY NAME'}
          </Typography>
          <Typography fontSize={13}>
            {user?.Company?.Country?.name ?? 'COUNTRY'}
          </Typography>
        </Box>
    </CustomDrawer>
    )
  }