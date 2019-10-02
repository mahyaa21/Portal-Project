import React from 'react';
import Helpers from './Helper'
//import './download.css';

class DownloadFile extends React.Component {

	/* constructor(props) {
		super(props);
	}
	
	downloadEmployeeData = () => {
		fetch('/api/users/download/:file(*)')
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = this.props.params;
					a.click();
				});
				//window.location.href = response.url;
		});
	}
	
	 */


    state = {
        loading: false, // to keep track of when form submitted
        errors: null, // for displaying errors
        file: '', // the file type the user chooses to download
    }

    handleSubmit = (event) => {
        this.setState({
            errors: null,
            loading: true,
        }, () => {
            // enter http request here 
            Helpers.httpRequest(
                `http://localhost:3000/api/users/download?file=${this.state.file}`,
                'get',
            )
                .then((response) => {
                    this.setState({
                        loading: false
                    });
                })
                .catch((error) => {
                    error.json().then((json) => {
                        this.setState({
                            errors: json,
                            loading: false
                        });
                    })
                });
        });

        // prevent form submit
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({
            // substring to is to limit to 3 characters
            file: event.currentTarget.value.substring(0, 3)
        });
    }

    render() {
        const { loading,errors, file } = this.state
        return (
            <div id="container">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">sample.</span>
                        </div>
                        <input disabled={loading} className="form-control" onChange={this.handleChange} value={file} type="text" name="file" placeholder="File type, ex csv, pdf, png, etc" autoComplete="off" />
                    </div>
                    {(errors)
                        ? (<div className="form-group">
                            <div className="alert alert-danger"><strong>Error!</strong> {errors.message || 'Something went wrong.'}</div>
                        </div>
                        )
                        : null
                    }
                    <div className="form-group">
                        <button className="btn btn-primary" disabled={loading}>{(loading) ? 'Downloading...' : 'Download'}</button>
                    </div>
                </form>


            </div>
        )
    }
}

export default DownloadFile;