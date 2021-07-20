import React from 'react';

class Detail extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <p className="detail">
                <span className="">{this.props.data.line1}</span>
                <br/>
                <span className="">{this.props.data.line2}</span>
            </p>
        );
    }
}

export default Detail;