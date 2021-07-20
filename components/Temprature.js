import React from 'react';

class Temprature extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const {temprature,weather} = this.props.data;

        return (
            <p className="temprature">
                <span className="temprature__line1">{temprature}</span>
                <br/>
                <span className="temprature__line2">{weather}</span>
            </p>
        );
    }
}

export default Temprature;