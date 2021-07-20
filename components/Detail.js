import React from 'react';

class Detail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {line1,line2} = this.props.data;
        
        return (
            <p className="detail">
                <span className="">{line1}</span>
                <br/>
                <span className="">{line2}</span>
            </p>
        );
    }
}

export default Detail;