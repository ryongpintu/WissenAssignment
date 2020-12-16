import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {getUserData,getUsersList, getUserProfile} from '../../actions/userAction'
import Spinner from '../common/Spinner';

import AddUser from '../add-credentials/addUser';
import Moment from 'react-moment';
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      update:false,
      addform:false,
     
    };
  }
  componentDidMount() {
   
   this.props.getUserProfile(this.props.auth.user.id)
   if(this.props.auth.user.usertype=='admin'){
    this.props.getUsersList()
   }

  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
   

    if(Object.keys(nextProps.user.get_profile_data).length>0){

      let {first_name,last_name, address,ssn}= nextProps.user.get_profile_data
      if(first_name && last_name && address && ssn)
      this.setState({update:true})
    }
    
  }


  handleAddForm=(e)=>{
    e.preventDefault()
    this.setState({addform:true})
  }

 
  render() {

    const { user } = this.props.auth;
    const {loading,get_users,get_profile_data} = this.props.user
    
    let dashboardContent;

    const userData = get_users.map(user => (
      <tr key={user._id}>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.telephone_number}</td>
        <td>{user.address}</td>
        <td>{user.ssn}</td>

        </tr>
    ))
 
    

    if (loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (user.usertype=='admin') {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`#`}>{get_profile_data.usertype =="admin"? "Admin":""}</Link>
            </p>
            
            <h4 className="mb-4">Users List</h4>
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Telephone</th>
              <th>Address</th>
              <th>SSN</th>
              
              
              
            </tr>
            {userData}
          </thead>
        </table>

          </div>
        );



      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            

            {!this.state.update?
            <React.Fragment>
            <p>You have not yet updated user detail</p>
              
               
                <AddUser/>
               
              </React.Fragment>:
              <React.Fragment>
                
                <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">Welcome {get_profile_data.first_name}</h3>
            <p className="lead text-info">
            Name : {get_profile_data.first_name} {get_profile_data.last_name}
            
            </p>
            <p className="lead text-info">
             Telephone : {get_profile_data.telephone_number}
            
            </p>
            <p className="lead text-info">
             Address : {get_profile_data.address}
            
            </p>
            <p className="lead text-info">
            SSN : {get_profile_data.ssn}
            
            </p>

              </div></div>

              </React.Fragment>
              
              
              }

            
            
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
              
             
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
 
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
 
  auth: state.auth,
  user:state.user
});

export default connect(mapStateToProps, {getUserData ,getUsersList,getUserProfile })(
  Dashboard
);
