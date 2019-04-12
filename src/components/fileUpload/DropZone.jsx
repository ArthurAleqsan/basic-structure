import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FineUploaderTraditional from 'fine-uploader-wrappers'
import Dropzone from 'react-fine-uploader/dropzone';
import FileInput from 'react-fine-uploader/file-input'
import ProgressBar from 'react-fine-uploader/progress-bar';
import Filename from 'react-fine-uploader/filename'
import VideoBox from '../componentsLib/videoBox';
import { ImageBox } from '../componentsLib/ImageBox';


class D extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingFiles: [],
            uploadedFiles: [],
        };
        this.uploader = new FineUploaderTraditional({
            options: {
                allowMultipleItems: props.multiple,
                debug: false,
                request: {
                    endpoint: `/upload`
                },
            }
        });
    }

    componentDidMount() {
        this.uploader.on('submit', () => {
            //this.reset();
        });

        this.uploader.on('submitted', id => {
            const pendingFiles = this.state.pendingFiles;
            pendingFiles.push({id});
            this.setState({ pendingFiles });
            this.props.handleComplete(null, true);
        });

        this.uploader.on('complete', (id, b, data) => {
            const { uploadedFiles } = this.state;
            const newPendingFiles = this.removeFromPending(id);
            this.setState({ pendingFiles: newPendingFiles, uploadedFiles: [...uploadedFiles, {...data, id}] });
            const pending = !!newPendingFiles.length;
            this.props.handleComplete(data.url, pending)
        })
    }

    openUploader() {
        document.getElementById('uploadField').click();
    }
    
    removeFromPending(id) {
        const { pendingFiles } = this.state;
        return pendingFiles.filter(file => id !== file.id);
    }
    
    remove(url, id) {
        const { uploadedFiles } = this.state;
        const newPendingFiles = this.removeFromPending(id);
        this.setState({ newPendingFiles, uploadedFiles: uploadedFiles.filter(file => file.url !== url) });
        const pending = !!newPendingFiles.length;
        this.props.remove(url, pending);
    }

    render() {
        const { multiple, className } = this.props;
        return (<div className={className}>

            {this.state.uploadedFiles.map((file) => <div key={file.url} className='priview-item-container'>
                <Preview key={file.url} file={file} remove={() => this.remove(file.url)} />
            </div>)}
            <ProgressBar uploader={this.uploader} />

            <FileInput multiple={multiple} id='uploadField' uploader={this.uploader}
                className={'bg-secondary rounded-right'}>
                {/*{this.state.submittedFiles.map(id => (*/}
                {/*<Filename key={id} id={id} uploader={this.uploader}*/}
                {/*className="px-3 small align-middle"/>*/}
                {/*))}*/}
            </FileInput>
            <Dropzone uploader={this.uploader}>
                <div className="card bg-white h-100" onClick={() => this.openUploader()}>
                    <div className="card-body d-flex align-items-center justify-content-center">
                        <div className="card bg-white border-dashed p-5">
                            <div className="card-body text-center">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </Dropzone>
        </div>)
    }
}

D.propTypes = {
    multiple: PropTypes.bool,
    className: PropTypes.string,
    handleComplete: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    children: PropTypes.any
};

export default D;

function Preview({ file, remove }) {
    const videoExtensions = ['mp4', 'mov', 'wmv', 'avi'];
    return (
        <div className='create-post-preview-container'>
            {videoExtensions.indexOf(file.extention) > -1
                ? (<div className='uploaded-media-container'>
                    <div className='uploaded-media-item-remove' onClick={() => remove()}><img src={'/assets/images/icons/close.svg'} /></div>
                    <VideoBox url={file.url} className='create-post-video-preview' />
                </div>)
                : (<div className='uploaded-media-container'>
                    <div className='uploaded-media-item-remove' onClick={() => remove()}><img src={'/assets/images/icons/close.svg'} /></div>
                    <ImageBox image={file.url} className='create-post-image-preview' />
                </div>)
            }
            {/* <span onClick={() => remove()}>x</span>
            {file.extention === 'mp4' ? <video height={60} width={60} controls={false}>
                <source src={file.url} type="video/mp4" />
            </video> : <img  style={{height: 20, width: 20}} src={file.url}/>} */}
        </div>
    )

}