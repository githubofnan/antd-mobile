import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../assets/style/Index.less';
import { Button } from 'antd-mobile';

function App(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `you clicked ${count} times`;
  }, [count])

  const tapRouter = () => {
    props.history.push('/login')
  }

  return (
    <div className="index_box">
      <p>Hello { props.user.name }, You clicked { count } times</p>
      <Button type="primary" onClick={ () => setCount(count+1) }>click</Button>
      <Button type="primary" onClick={ tapRouter }>click</Button>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
