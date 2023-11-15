import React, { Component } from 'react'
import { DateRangePicker } from 'react-date-range';
import format from 'date-fns/format';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import addDays from 'date-fns/addDays';

interface Props {
    setRange: any;

}

interface State {
    range: any,
    showCalender: boolean
}


class CustomDateRangePicker extends Component<Props, State> {

    calenderRef = React.createRef<any>()

    constructor (props: Props) {
        super(props)
        let start = (new Date())
        start.setMonth(start.getMonth() - 1);
        this.state = {
            range: [{
                startDate: start,
                endDate: new Date(),
                key: 'selection'
              }],
            showCalender: false
        }
    }

    componentDidMount(): void {
        document.addEventListener('keydown', this.hideOnEscape, true);
        this.props.setRange(this.state.range);
    }

    hideOnEscape = (e:any) => {
        if(e.key === 'Escape'){
            this.setState({
                showCalender: false
            })
        }
    }

    handleSelect = (item:any) => {
        this.setState({range: [item.selection]},()=>{
            this.props.setRange(this.state.range); 
        })
    }


    toggleCalender = () => {
        this.setState((prevState) => ({
            showCalender: !prevState.showCalender
        }))
    }


    render(){
        return (
            <div className='relative z-50 lg:m-[0_16px_0px_8px] mb-4'>
                <input onClick={this.toggleCalender} value={`${format(this.state.range[0].startDate, 'MM/dd/yyyy')} - ${format(this.state.range[0].endDate, 'MM/dd/yyyy')}`} readOnly className='border border-solid border-080c341f lg:w-auto w-full bg-white h-[32px] rounded-[4px] border-r-none outline-0 p-[5px_8px] text-[14px] text-dark' type="text" placeholder="All" />
                <div ref={this.calenderRef}>
                {this.state.showCalender && 
                    <>
                        <div onClick={this.toggleCalender} className='fixed top-0 left-0 bottom-0 right-0 z-[-1] bg-[rgba(52,52,91,0.1)]'></div>
                        <DateRangePicker
                            onChange={this.handleSelect}
                            className="absolute left-0 top-full z-50"
                            showDateDisplay={false}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            ranges={this.state.range}
                            direction="horizontal"
                        />
                    </>
                }
                </div>
            </div>
            

          
        )
      }
}

export default CustomDateRangePicker;
