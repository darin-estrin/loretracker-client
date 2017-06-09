import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { addPlayer, addLore, addLocation, addNPC, getCampaignData } from '../../actions';

class Campaign extends Component {
  componentWillMount() {
    //console.log(this.props);
    // const { name, userType } = this.props.params;
    // console.log(name, userType);
    this.props.getCampaignData();
  }

  handleFormSubmit(formProps) {

  }

  renderFields(type) {
    if (type === 'PCs') {
      return (
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <fieldset className='form-group'>
            <label>* Player:</label>
            <input className='form-control' {...email} />
          </fieldset>
        </form>
      )
    }
  }

  render() {
    const { handleSubmit, fields : { name, email, phone, image, bio, description }} = this.props;
    return (
      <div>
        <div className='row'>
          <div className='col-lg-3 col-md-6 col-xs-12'>
            {!players ? "<div>No Players</div>" : ''}
            {this.renderFields('PCs')}
          </div>
          <div className='col-lg-3 col-md-6 col-xs-12'>
            
          </div>
          <div className='col-lg-3 col-md-6 col-xs-12'>
            
          </div>
          <div className='col-lg-3 col-md-6 col-xs-12'>
            
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {

  }
}

export default reduxForm({
  form: 'UpdateCampaign',
  fields: ['player', 'lore', 'npc', 'locations']
}, mapStateToProps, {
  addLore,
  addLocation,
  addNPC,
  addPlayer,
  getCampaignData
})(Campaign);