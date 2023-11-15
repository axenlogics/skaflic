import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import  Styles  from './slider.module.css'
import cx from 'classnames';

export default class SimpleSlider extends Component {
   data = [
    {'pair':'AVAX/USDT','time':'17:12','lg':'5m lost','change':'- % 2,35'},
    {'pair':'CELO/USDT','time':'17:11','lg':'5m gain','change':'+ % 1,69'},
    {'pair':'LINK/USDT','time':'17:09','lg':'5m gain','change':'+ % 1,77'},
    {'pair':'BTC/USDT','time':'17:12','lg':'5m lost','change':'- % 2,35'},
    {'pair':'ETH/USDT','time':'17:12','lg':'5m lost','change':'- % 2,35'},
    {'pair':'DOT/USDT','time':'17:12','lg':'5m lost','change':'- % 2,35'},
    {'pair':'DOGE/USDT','time':'17:12','lg':'5m lost','change':'- % 2,35'},
  ]
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 840,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      
      <div className="px-12">
        <style>{pageStyle}</style>
        <Slider {...settings}>
        {this.data.map(item => (
          <div className={cx(Styles.item,'items-center','justify-center')} key={item.pair}>
            <div>
              <div className={cx('text-base','font-bold','text-181a1e')}>{item.pair}</div>
              <div className={cx('text-a2a2a2','pt-4')}>{item.time}</div>
            </div>
            <div>
              <div className={cx(item.change.indexOf('-')>-1?'text-danger':'text-success','text-base','text-right')}>{item.lg}</div>
              <div className={cx(item.change.indexOf('-')>-1?'text-danger':'text-success','text-base','font-bold','ml-[15px]','pt-4')}>{item.change}</div>
            </div>
          </div>
        ))}
        </Slider>
      </div>
    );
  }
}

const pageStyle = `
.slick-slider  {
width: 100%;
max-width: 1200px;
height: 80px;
border-radius: 30px;
background: #f6f6fa;
background-blend-mode: normal;
padding: 13px 0px;
margin: 0 auto;
}
.slick-arrow{
  position: absolute;
// left: 90px;
// top: 97px;
width: 60px;
height: 60px;
border-radius: 10px;
background: #fcfcfd;
background-blend-mode: normal;
box-shadow: 2px 5px 5px rgba(0,0,0,0.05);
z-index:1;

}
.slick-arrow.slick-prev{
top: 40px !important;
}
.slick-prev:hover, .slick-prev:focus, .slick-next:hover, .slick-next:focus{
background-color:#fcfcfd;
}
.slick-arrow:before{
background-repeat: no-repeat;
background-size: cover !important;
font-family:normal;
color: transparent !important;
opacity: 0.2;
font-size: 24px
}
.slick-next:before{
background-image: url(./assets/images/icons/next.png) !Important;
}
.slick-prev:before {
background-image: url(./assets/images/icons/back.png) !Important;
}
.slick-prev:hover:before, .slick-prev:focus:before, .slick-next:hover:before, .slick-next:focus:before{
opacity: 0.25;
}
`
