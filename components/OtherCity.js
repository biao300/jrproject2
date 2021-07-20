import React from 'react';

class OtherCity extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const {city, temprature, weather} = this.props.data;

        return (
            <tr>
                <td>{city}</td>
                <td>{temprature}</td>
                <td><img src={`images/${weather.toLowerCase()}.png`} className="container__others__left__city__image" /></td>
            </tr>
        );
    }
}

export default OtherCity;