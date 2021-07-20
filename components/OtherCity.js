import React from 'react';

class OtherCity extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <tr>
                <td>{this.props.data.city}</td>
                <td>{this.props.data.temprature}</td>
                <td><img src={`images/${this.props.data.weather}.png`} className="container__others__left__city__image" /></td>
            </tr>
        );
    }
}

export default OtherCity;