import React, { Component, useRef } from 'react';


interface Props {
    // mainPairId: number,
    small?:boolean,
    medium?:boolean,
    large?:boolean,
}

interface State {

}
class ButtonLoader extends Component<Props, State> {
    public childRef: any;

    constructor(props: any) {
        super(props);
        this.childRef = React.createRef();
        this.state = {

        };
    }
    render() {
       
        return (
            <React.Fragment>
                <span>Loading...</span>
            </React.Fragment>
        );
    }
}
export default ButtonLoader