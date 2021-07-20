import React from 'react';

class Weekly extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="weekly">
                <p>{this.props.data.date}</p>
                <p>{this.props.data.weekday}</p>
                <p><img src={`images/${this.props.data.weather}.png`} className="weekly__image" /></p>
                <p>{this.props.data.temprature}</p>
                <p>{this.props.data.weather}</p>
            </div>
        );
    }
}

export default Weekly;