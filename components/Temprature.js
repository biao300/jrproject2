import React from 'react';

class Temprature extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <p className="temprature">
                <span className="temprature__line1">{this.props.data.temprature}</span>
                <br/>
                <span className="temprature__line2">{this.props.data.weather}</span>
            </p>
        );
    }
}

export default Temprature;