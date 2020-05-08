import React, { Fragment } from 'react'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import SplashWidget from './SplashWidget'
import SplashBG from './SplashBG';
import HeaderText from './SplashHeaderText'

const btnStyle = {
  margin: 'auto',
  maxWith: '100px',
  display: 'block',
};


export default function Splash() {
  return (
    <Fragment>
      <SplashBG />
        <SplashWidget />
          <HeaderText>The Human Freedom index</HeaderText>
          <Link to="/visualize" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" style = {btnStyle} >
            Explore
            </Button>
          </Link>
    </Fragment>
  )
}
