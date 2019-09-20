import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';
import { bindActionCreators } from 'redux';
import { setUser, clearUser } from '../store/actions/user'

function Login(props) {

  const [mobile, setMobile] = useState('');

  const tapClick = () => {
    props.setUser({ id: 1, sex: 1, name: 'actions', mobile: '15505110135' })
  }

  const tapSignOut = () => {
    props.clearUser();
  }

  return (
    <div className="box">
      <input placeholder="Basic usage" value={mobile} onChange={(e) => setMobile(e.target.value)} />
      <Button type="primary" onClick={ tapClick }>login</Button>
      <Button type="primary" onClick={ tapSignOut }>sign out</Button>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setUser, clearUser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);