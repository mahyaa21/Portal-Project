import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

class UploadHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      homeworks: []  
    }

  }

  onChangeHandler = event => {
    
    console.log(event.target.files[0])
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })

  }

  

    onClickHandler = () => {

        const { selectedFile } = this.state;
        const data = new FormData();
        data.append('file', this.state.selectedFile)
        axios.post("/api/users/upload", data , {
            // receive two    parameter endpoint url ,form data 
                headers: {
                    fileName: selectedFile.name,
                  
                }    
        })
            .then(res => { // then print response status

                if (res.status === 'Ok'){
                    this.setState({
                        result: true
                    })
                }
                console.log(res.statusText)
                alert('upload successfully!');
            })

    }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      // this.props.history.push('/');
    } else {
      this.props.history.push('/');
      alert('not authenticated')

    }

  }

  componentWillMount(){

    axios.get('/api/users/showhomeworks').then(res => {
        this.setState({homeworks: [...res.data]})
    })
      
}

showHomeworks = () =>{
    const {homeworks} = this.state;
    return <>
         <table>
          <tbody>
                <tr>
                    <th>HomeWorks added</th>
                </tr>

                {homeworks.map(homework=>{
                    return <tr key={homework.id}>
                        <td>{homework.name}</td>
                    </tr>
                })}
                
          
          
          </tbody>
          </table>
    </>
}


 
  render() {
 
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', flexDirection: 'column' }}>

      <input type="file" style={{ width: '70%', }} name="file" onChange={this.onChangeHandler} />
      <button type="button" style={{ width: '70%', }} className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

      {this.showHomeworks()}

    </div>
  }
}




UploadHomework.propTypes = {
  //TeacherUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(UploadHomework))