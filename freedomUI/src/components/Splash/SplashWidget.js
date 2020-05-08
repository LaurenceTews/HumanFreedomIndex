import  React from 'react'
import WidgetContainer from './SplashWidgetContainer';
import SplashWidgetBlock from './SplashWidgetBlock';

export default function SplashWidget() {
  return (
        <WidgetContainer>
            <SplashWidgetBlock delay='0' first='0.5' second='1.2' third='0.8' fourth='1.0' />
            <SplashWidgetBlock delay='0' first='1.6' second='1.2' third='0.3' fourth='1.0' />
            <SplashWidgetBlock delay='0.5' first='0.5' second='1.2' third='0.8' fourth='1.0'/>
            <SplashWidgetBlock delay='0.5' first='0.3' second='0.9' third='1.5' fourth='1.0' />
            <SplashWidgetBlock delay='0' first='0.5' second='1.2' third='0.8' fourth='1.0' />
            <SplashWidgetBlock delay='0.5' first='0.7' second='1.4' third='1.1' fourth='1.0' />
        </WidgetContainer>
  )
}
