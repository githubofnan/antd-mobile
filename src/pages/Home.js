import { pushLoser, clearLoser } from '../store/actions/calendar';
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { YMD, monthList } from '../util/util';
import { connect } from 'react-redux';
import '../assets/style/Home.less';

var isAnimation = false;
var coordinate = { left: 0, top: 0, height: 0, dateString: '' }


function LoserImge(ref) {
  return (
    <img className="loser_img" ref={ref} src={require('../assets/image/loser.png')} alt="loser" />
  )
}

function WeekRow(props, data, showLoserImg) {
  const tapDate = (e, item) => {
    if (item.isMonth && !isAnimation){
      isAnimation = true;
      let ele = e.currentTarget;
      let top = ele.offsetTop;
      let left = ele.offsetLeft + ele.offsetWidth - ele.offsetHeight;
      showLoserImg(left, top, ele.offsetHeight, item.dateString)
    }
  }
  return (
    <ul className="row" key={data.index}>
      {
        data.item.map((item, index) => {
          let baseName = 'list_day';
          if (item.today) baseName += ' today_c';
          if (!item.isMonth) {
            baseName += ' c999';
            return (
              <li className={baseName} key={index}>{item.item}</li>
            )
          }if (props.calendar.includes(item.dateString)){
            baseName += ' loser';
            return (
              <li className={baseName} key={index}>{item.item}</li>
            )
          }
          return (
            <li className={baseName} key={index} onClick={(e) => tapDate(e, item)}>{item.item}</li>
          )
        })
      }
    </ul>
  )
}

function Calendar(props, year, month) {
  const monthDayList = monthList(year, month);
  const titleText = ['日','一','二','三','四','五','六'];
  const [showLoser, setShowLoser] = useState(0);
  const eleLoser = React.createRef();
  const showLoserImg = (left, top, height, dateString) => {
    coordinate.dateString = dateString;
    coordinate.height = height;
    coordinate.left = left;
    coordinate.top = top;
    setShowLoser(1)
  }
  useEffect(() => {
    if (showLoser === 1) {
      setTimeout(() => {
        eleLoser.current.style.height = coordinate.height + 'px';
        eleLoser.current.style.left = coordinate.left + 'px';
        eleLoser.current.style.top = coordinate.top + 'px';
      }, 200);
      setTimeout(() => {
        setShowLoser(0)
        isAnimation = false;
        props.pushLoser(coordinate.dateString);
      }, 1200);
    }
  }, [showLoser, eleLoser, props])
  return (
    <div className="calendar">
      <ul className="row">
        {
          titleText.map((item, index) => {
            return (<li className="list" key={index}>{item}</li>)
          })
        }
      </ul>
      {
        monthDayList.map((item, index) => {
          return WeekRow(props, { item, index }, showLoserImg)
        })
      }
      {
        showLoser ? LoserImge(eleLoser) : ''
      }
    </div>
  )
}


function Home(props) {
  const [year, setYear] = useState(YMD().y);
  const [month, setMonth] = useState(YMD().m);
  const today = `${year}年${month}月`;
  const baseBtn = 'base_btn_style', openBtn = 'open_btn_style';
  const baseMain = 'base_main_style', openMain = 'open_mian_style';
  const [btnStyle, setBtnStyle] = useState(openBtn)
  const [mainStyle, setMainStyle] = useState(openMain)
  const tapPreNext = state => {
    if (month + state >= 1 && month + state <= 12) {
      setMonth(month + state)
    } else {
      setYear(year + state)
      setMonth(state>0 ? 1 : 12)
    }
  }
  const tapNookBtn = () => {
    if (btnStyle === baseBtn) {
      setBtnStyle(openBtn)
      setMainStyle(openMain)
    } else {
      setBtnStyle(baseBtn)
      setMainStyle(baseMain)
    }
  }
  return (
    <div className="home_box">
      <div className="date_today"> 
        <img className="pre_next" src={require("../assets/image/arrow-left.png")} alt="left" onClick={ () => tapPreNext(-1) } />
        <span onClick={() => props.clearLoser()}>{today}</span> 
        <img className="pre_next" src={require("../assets/image/arrow-right.png")} alt="right" onClick={ () => tapPreNext(1) } />
      </div>
      { Calendar(props, year, month) }
      <div className="right_bottom">
        <div className={[mainStyle, 'right_bottom_main'].join(' ')}>
          <p class="main_nav_one fl">新增标记</p>
          <p class="main_nav_two fl">标记列表</p>
        </div>
        <div className={[btnStyle, 'list_button'].join(' ')} onClick={() => tapNookBtn()}></div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  calendar: state.calendar,
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ pushLoser, clearLoser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)