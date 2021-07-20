import React from 'react';

class Weekly extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const {date, weekday, weather, temprature} = this.props.data;

        return (
            <div className="weekly">
                <p>{date}</p>
                <p>{weekday}</p>
                <p><img src={`images/${weather.toLowerCase()}.png`} className="weekly__image" /></p>
                <p>{temprature}</p>
                <p>{weather}</p>
            </div>
        );
    }
}

export default Weekly;