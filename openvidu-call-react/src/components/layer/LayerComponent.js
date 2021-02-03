import React, { Component } from 'react';
import './LayerComponent.css';
import OvVideoComponent from '../stream/OvVideo';
import ChromaComponent from '../chroma/ChromaComponent'

import Moveable from "react-moveable";




export default class LayerComponent extends Component {

    constructor(props) {
        super(props);
        this.state = { nickname: this.props.user.getNickname(), showForm: false, mutedSound: false, isFormValid: true };
        this.handleChange = this.handleChange.bind(this);
        this.handlePressKey = this.handlePressKey.bind(this);
        this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
        this.toggleSound = this.toggleSound.bind(this);
        this.myRef = React.createRef();
        

    }

    handleChange(event) {
        this.setState({ nickname: event.target.value });
        event.preventDefault();
    }

    toggleNicknameForm() {
        if (this.props.user.isLocal()) {
            this.setState({ showForm: !this.state.showForm });
        }
    }

    toggleSound() {
        this.setState({ mutedSound: !this.state.mutedSound });
    }

    handlePressKey(event) {
        // keyboard shortcuts?
        if (event.key === 'Enter') {
            console.log(this.state.nickname);
            if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
                this.props.handleNickname(this.state.nickname);
                this.toggleNicknameForm();
                this.setState({ isFormValid: true });
            } else {
                this.setState({ isFormValid: false });
            }
        }
    }
    

    render() {
        return (
            <div className="OT_widget-container">

                {this.props.user !== undefined && this.props.user.getStreamManager() !== undefined ? (
                    <div className="container">
                        <div className={this.props.user.getNickname()}>
                            <ChromaComponent user={this.props.user} mutedSound={this.state.mutedSound} width="320" height="240"/>
                        </div>
                        <Moveable
                            target={document.querySelector("."+this.props.user.getNickname())}
                            container={null}
                            origin={false}

                            /* Resize event edges */
                            edge={false}

                            /* draggable */
                            draggable={true}
                            throttleDrag={0.1}
                            onDragStart={({ target, clientX, clientY }) => {
                                console.log("onDragStart", target);
                            }}
                            onDrag={({
                                target,
                                beforeDelta, beforeDist,
                                left, top,
                                right, bottom,
                                delta, dist,
                                transform,
                                clientX, clientY,
                            }) => {
                                console.log("onDrag left, top", left, top);
                                // target!.style.left = `${left}px`;
                                // target!.style.top = `${top}px`;
                                console.log("onDrag translate", dist);
                                target.style.transform = transform;
                            }}
                            onDragEnd={({ target, isDrag, clientX, clientY }) => {
                                console.log("onDragEnd", target, isDrag);
                            }}

                            /* When resize or scale, keeps a ratio of the width, height. */
                            keepRatio={true}

                            /* scalable */
                            /* Only one of resizable, scalable, warpable can be used. */
                            scalable={true}
                            throttleScale={0}
                            onScaleStart={({ target, clientX, clientY }) => {
                                console.log("onScaleStart", target);
                            }}
                            onScale={({
                                target, scale, dist, delta, transform,
                                clientX, clientY,
                            }) => {
                                console.log("onScale scale", scale);
                                target.style.transform = transform;
                            }}
                            onScaleEnd={({ target, isDrag, clientX, clientY }) => {
                                console.log("onScaleEnd", target, isDrag);
                            }}

                        

                        />
                    </div>
                ) : null}
            </div>
        );
    }
}
