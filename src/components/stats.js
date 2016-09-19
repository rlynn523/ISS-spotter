let React = require('react');
let connect = require('react-redux').connect;
let actions = require('../actions/stats.js');
import RaisedButton from 'material-ui/RaisedButton';

const CurrentStats = React.createClass({
    componentDidMount: function() {
        this.props.dispatch(
            actions.fetchStats(this.props.velocity, this.props.visibility)
        );
    },
    updateStats: function() {
        this.props.dispatch(
            actions.fetchStats(this.props.velocity, this.props.visibility)
        );
    },
    render: function() {
        return(
            <div className='stats'>
                <h3>Current Stats</h3>
                <div className='velocity'>Velocity:   {this.props.velocity}km/h</div>
                <div className='visibility'>Visibility:  {this.props.visibility}</div>
                <RaisedButton className='statButton' label='Update Stats' onClick={this.updateStats} />
            </div>
        )
    }
})

let mapStateToProps = function(state, props) {
    return {
        velocity: state.StatsReducer.velocity,
        visibility: state.StatsReducer.visibility
    }
}

let Container = connect(mapStateToProps)(CurrentStats);
module.exports = Container;
// module.exports = CurrentStats;
