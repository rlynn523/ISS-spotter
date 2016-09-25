import React, { Component } from 'react';
import { MuiThemeProvider, Paper } from 'material-ui';
import ReactTooltip from 'react-tooltip'

export default class IssViewer extends Component {
    render() {
        return(
            <MuiThemeProvider className='streamStyle'>
                <Paper className='paperStream' data-tip='Double Click For Fullscreen' zDepth={2}>
                    <iframe className='videoStream' src='https://www.ustream.tv/embed/17074538?html5ui&autoplay=true&controls=false&allowfullscreen=true' frameBorder='0'></iframe>
                    <ReactTooltip place='bottom' />
                </Paper>
            </MuiThemeProvider>
        )
    }
}
