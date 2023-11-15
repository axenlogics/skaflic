import Script from 'next/script'
import styles from './style.module.css';
import { Component } from 'react';
import cx from 'classnames';

declare var document:any;
declare var window:any;


interface Props {
  
}

interface State {
    chartHeight: any
}

class Chart extends Component<Props, State>  {
    constructor(props:any) {

        super(props);
        
        this.state = {
            chartHeight: 300
        };
    }

    componentDidMount(): void {
       
    }

    setChartHeight = (ch:number) => {
        this.setState({
            chartHeight: ch
        })
    }

    render(){
        
        return (
        <>
            <div id='tradingchart' className={cx(styles.tradingchart, 'tradingchart')} style={{height: this.state.chartHeight}}></div>
            <Script src="/assets/datafeeds/udf/dist/bundle.js" />
            <Script src="/assets/charting_library/charting_library.js" />
            <Script src="/assets/chartinit.js?ver=128" />
        </>
        );
    }
}

export default Chart