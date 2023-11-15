import React, { Component } from "react";
import { Button, ButtonType } from '../button';
import { FormCard, FormCardBody, FormCardHeader, FormCardOuterText, FormCardOuterWrap, FormCardTitle, FormHeader, FormScreen, FormWrap } from '../form-card';
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";


interface Props {
}

interface State {

}

class UpdateMsgReset extends Component<Props, State> {
    constructor(props: Props) {

        super(props);

        this.state = {

        };
    }
    componentDidMount() {
    }

    render() {
        return (
            <FormCard>
                    <div className="text-center h-[175px] pt-[25px]">
                        <Image src="/assets/images/svg/attentiongreen.svg" className="max-w-[200px] w-full h-[200px]" alt="Create Account" width={200} height={200} />
                    </div>
                <FormCardBody className="pt-8">
                    <p className="text-base text-171a1e leading-normal tracking-normal font-normal text-center">Your request will be updated after confirmation from our team</p>
                    <Button className="mt-5 font-bold w-full text-lg" type={ButtonType.primary}>OK</Button>
                </FormCardBody>
            </FormCard>
        );
    }

}

export default UpdateMsgReset;



