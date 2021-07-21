import React from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';

class AddressForm extends React.Component {

  constructor(){
    super()
    this.state = {
      address1: null,
      address2: null,
      firstName: null,
      lastName: null,
      city: null,
      state: null,
      zip: null,
      open: false
    }
  }

  handleChange(event,field) {
    let newState = {...this.state}
    newState[event.target.id]=event.target.value
    this.setState(newState)
  }

  handleClick(){
    if( !this.state.firstName ||
        !this.state.lastName ||
        !this.state.address1 ||
        !this.state.country ||
        !this.state.state ||
        !this.state.city ||
        !this.state.zip
    ) {
      this.setState({...this.state,open: true})
    } else {
      this.props.addUser(this.state)
    }
  }

  render(){
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          User Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              onChange={(e)=>this.handleChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              onChange={(e)=>this.handleChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              onChange={(e)=>this.handleChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              onChange={(e)=>this.handleChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              onChange={(e)=>this.handleChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField id="state" name="state" label="State/Province/Region" fullWidth onChange={(e)=>this.handleChange(e)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              onChange={(e)=>this.handleChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              onChange={(e)=>this.handleChange(e)}
            />
          </Grid>
          <div style={{width: '100%'}}>
            <Collapse in={this.state.open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      this.setState({...this.state,open: !this.state.open});
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Please enter all fields!
              </Alert>
            </Collapse>
          </div>
          <Grid item xs={12}>
            <Button
              onClick={(e)=>this.handleClick(e)}
            >Submit</Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch({ type: "ADD_USER", user}),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm)
