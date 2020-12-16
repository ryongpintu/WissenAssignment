import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUserDetail ,getUserProfile } from '../../actions/userAction';

import { toast } from 'react-toastify';
class AddUser extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      first_name:"",
      last_name:"",
      telephone_number:"",
      address:"",
      ssn:"",
     
      errors: {},
      
     
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if(nextProps.user.add_success_message.message != undefined)
    {

      this.notify(nextProps.user.add_success_message.message)
   
    }

    
    
  }

 notify = (data) => toast(data);

  componentDidMount(){
    this.props.getUserProfile(this.props.auth.user.id)
  }

  
  
 
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      first_name:this.state.first_name,
      last_name:this.state.last_name,
      telephone_number:this.state.telephone_number, 
      address:this.state.address, 
      ssn:this.state.ssn,

      userId:this.props.auth.user.id

    };
   
    this.props.addUserDetail(userData, this.props.history);
    
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

 

  render() {
    const { errors } = this.state;
   
    return (
      <div className="add-education">
        <div className="container">
        <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Enter User Detail</h1>
              <p className="lead text-center">
                store user data
              </p>
              <form noValidate onSubmit={this.onSubmit}>

             
                

              
                <TextFieldGroup
                  placeholder="First Name"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                  error={errors.first_name}
                />
                 <TextFieldGroup
                  placeholder="Last Name"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                  error={errors.last_name}
                />
                 <TextFieldGroup
                  placeholder="Telephone Number"
                  name="telephone_number"
                  value={this.state.telephone_number}
                  onChange={this.onChange}
                  error={errors.telephone_number}
                />
                <TextAreaFieldGroup
                  placeholder="Enter Full address"
                  name="address"
                  type="text"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                  
                />
                <TextFieldGroup
                  placeholder="Enter SSN"
                  name="ssn"
                  type="textt"
                  value={this.state.ssn}
                  onChange={this.onChange}
                  error={errors.ssn}
                />
               
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        
        </div>
      </div>
    );
  }
}

AddUser.propTypes = {
  addUserDetail : PropTypes.func.isRequired,
 
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth:state.auth,
  errors: state.errors,
  user:state.user
});

export default connect(mapStateToProps, { addUserDetail,getUserProfile })(
  withRouter(AddUser)
);
