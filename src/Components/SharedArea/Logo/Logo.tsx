import "./Logo.css";

import coupFunLogo from '../../../../src/Assets/Images/coupFunIcon.png';
import { Avatar, createStyles, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";


function Logo(): JSX.Element {

    const useStyles = makeStyles((theme: Theme) => createStyles({
        xSmall: {
            width: theme.spacing(5),
            height: theme.spacing(5),
        },
        small: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
        medium: {
            width: theme.spacing(12),
            height: theme.spacing(12),
        },

        large: {
            width: theme.spacing(15),
            height: theme.spacing(15),
        },
        xLarge: {
            width: theme.spacing(18),
            height: theme.spacing(18),
        }
    }));

    const styleClass = useStyles();

    return (

        <Toolbar className='Logo'>
            <NavLink to="/home">

            <Typography className='coup-fun-name' variant='h5'>
                CoupManager
        </Typography>

            <Avatar className={styleClass.small + ' coup-fun-logo'} src={coupFunLogo} alt='coup-fun-logo' />
            </NavLink>

        </Toolbar>








    );
}

export default Logo;
