import React, { Component, Suspense } from 'react';
import { Button, Input } from '../componentsLib/simpleUiComponents';
class Modal extends Component {
    constructor(props) {
        super(props);
        this.alert = this.alert.bind(this);
        this.state = {
            isOpen: false,
            type: "alert",
            subject: "",
            text: "",
            inserted: "",
            options: {},
        }
    }
    alert(subject, text, options = {}) {
        this.setState({ isOpen: true, type: "alert", subject, text, options });
        return new Promise((resolve) => {
            this.Success = () => {
                this.setState({ isOpen: false });
                resolve(true);
            };
        })
    }
    confirm(subject, text, options = {}) {
        this.setState({ isOpen: true, type: "confirm", subject, text, options });
        return new Promise((resolve) => {
            this.Cancel = () => {
                this.setState({ isOpen: false });
                resolve(false);
            };
            this.Success = () => {
                this.setState({ isOpen: false });
                resolve(true);
            };
        })
    }
    prompt(subject, text, options = {}) {
        this.setState({ isOpen: true, type: "prompt", subject, text, options });
        return new Promise((resolve) => {
            this.Cancel = () => {
                this.setState({ isOpen: false, inserted: '' });
                resolve(false);
            };
            this.Success = (input) => {
                this.setState({ isOpen: false, inserted: '' });
                resolve(input);
            };
        })
    }
    render() {
        const { isOpen, type, subject, text } = this.state;

        switch (type) {
            case "prompt":
                return (
                    <div className={`modal ${isOpen ? 'active' : ''}`}>
                        <div className="modal-content">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                this.Success(this.state.inserted)
                            }}>
                                <div className="modal-text">
                                    <h1>{subject}</h1>
                                    <p dangerouslySetInnerHTML={{ __html: text }} />
                                    <Input
                                        name='inserted'
                                        validation='^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$'
                                        value={this.state.inserted}
                                        errorMessage='incorect email'
                                        onChange={(name, value) => this.setState({ [name]: value })}
                                    />
                                </div>
                                <div className="modal-btn">
                                    <Suspense fallback='...' maxDuration={100}>
                                        <Button type='submit' uppercase >insert</Button>
                                        <Button uppercase onClick={() => this.Cancel()}>cencel</Button>
                                    </Suspense>
                                </div>
                            </form>
                        </div>
                    </div>
                );
            case "confirm":
                return (
                    <div className={`modal ${isOpen ? 'active' : ''}`}>
                        <div className="modal-content">
                            <div className="modal-text">
                                <h1>{subject}</h1>
                                <p dangerouslySetInnerHTML={{ __html: text }} />
                            </div>
                            <div className="modal-btn">
                                <Suspense fallback='...' maxDuration={100}>
                                    <Button uppercase onClick={() => this.Success()}>yes</Button>
                                    <Button uppercase onClick={() => this.Cancel()}>no</Button>
                                </Suspense>
                            </div>
                        </div>
                    </div>
                );
            case "alert":
                return (
                    <div className={`modal alert ${isOpen ? 'active' : ''}`}>
                        <div className="modal-content">
                            <div className="modal-text">
                                <h1>{subject}</h1>
                                <p>{text}</p>
                            </div>
                            <div className="modal-btn">
                                <Suspense fallback='...' maxDuration={100}>
                                    <Button uppercase onClick={() => this.Success()}>ok</Button>
                                </Suspense>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className={`modal ${isOpen ? 'active' : ''}`}>
                        <div className="modal-content">
                            <div className="modal-text">
                                <h1>{subject}</h1>
                                <p>{text}</p>
                            </div>
                            <div className="modal-btn">
                                <Suspense fallback='...' maxDuration={100}>
                                    <Button uppercase onClick={() => this.Success()}>ok</Button>
                                </Suspense>
                            </div>
                        </div>
                    </div>
                );
        }
    }
}
export default Modal;