import React, { Component } from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import download from 'downloadjs';
import Axios from 'axios';
import filedownload from 'js-file-download';
class DownloadHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //selectedFile: null,
      homeWorks: [],
    }

  }

  componentWillMount() {

    axios.get('/api/users/showhomeworks').then(res => this.setState({homeWorks: [...res.data]}))

  }

  GetImageFile = (address) => {
    const { images } = this.state;
    axios({
      url: `/api/users/showimage/${address}`,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const image = { name: window.URL.createObjectURL(new Blob([response.data])), address: address };
      this.setState({
        images: [...images, image]
      })

    });

  }
  OnCLickDownloader = (address) => {
    Axios.get(`/api/users/download/${address}`).then(res => {
      console.log('downloading');
    })
  }

  render() {
    const { homeWorks } = this.state;
    console.log(homeWorks);
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', flexDirection: 'column' }}>
      <table>
        <tbody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <tr>
            <th>home works</th>
          </tr>

          {homeWorks.map(homeWork => {
            return <tr key={homeWork.id}>

              <td style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <span>{homeWork.name}</span>
              <button
                type="button"
                onClick={async () => {
                  const res = await fetch('/api/users/download',{
                   headers: {
                      address:  homeWork.name,
                    }
                  });
                  const blob = await res.blob();
                  download(blob , homeWork.name );
                 // filedownload(blob,'test.rar')
                }}
              >Download</button></td>
                            
                        </tr>
      })}
                </tbody>
      </table>

    </div>
  }
}




DownloadHomework.propTypes = {
  //TeacherUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(DownloadHomework))