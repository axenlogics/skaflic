import React, { Component } from "react";
import Header, { NavbarSize } from "../components/header";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import Footer from "./footer";
import Banner from "../components/banner";
import HorizontalList from "../components/list-horzontol";
import ListIcons from "../components/listwithicons";
import RightImage from "../components/info-image-right";
import SecIconDark from "../components/dark-sec-icon";
import HorzontolIcon from "../components/horizontal-icon";


interface Props {
}


interface State {

}
class AllComp extends Component<Props, State> {
render(): React.ReactNode {
    return(
        <>
                <Header navbarSize={NavbarSize.sm} logoText={true} />
                <Banner/>
                <HorizontalList />
                <ListIcons/>
                <RightImage/>
                <SecIconDark/>
                <HorzontolIcon/>
                <Footer/>
        </>
    )
}




}
export default AllComp;