import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';

export default class Datepicker extends Component {
    constructor() {
        super();
        this.state = {
            focusedInput: null,
            startDate: moment(),
            endDate: moment().add(this.props?.days || 1, 'days'),
            fullscreen: false,
            direction: 'left',
            dateFormat: 'MM/DD/YYYY',
            small: false,
            block: false,
            orientation: 'horizontal',
            numMonths: 2
            // minimumNights: 7
        };
        this.handleDatesChange = this.handleDatesChange.bind(this);
        this.handleFocusChange = this.handleFocusChange.bind(this);
        this.handleChangeFullscreen = this.handleChangeFullscreen.bind(this);
        this.handleChangeDirection = this.handleChangeDirection.bind(this);
        this.handleChangeDateFormat = this.handleChangeDateFormat.bind(this);
    }

    handleDatesChange({ startDate, endDate }) {
        this.setState({ startDate, endDate });
    }

    handleFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    handleChangeFullscreen() {
        this.setState({ fullscreen: !this.state.fullscreen });
    }

    handleChangeDirection(e) {
        this.setState({ direction: e.target.value });
    }

    handleChangeDateFormat(e) {
        this.setState({ dateFormat: e.target.value });
    }

    render() {
        return (
            <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={this.handleDatesChange} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={this.handleFocusChange} // PropTypes.func.isRequired,
                displayFormat={this.state.dateFormat}
                hideKeyboardShortcutsPanel={true}
                numberOfMonths={this.state.numMonths || 2}
                block={this.state.block}
                small={this.state.small}
                withFullScreenPortal={this.state.fullscreen}
                anchorDirection={this.state.direction}
                orientation={this.state.orientation}
                // minimumNights={this.state.minimumNights}
            />
        );
    }
}
