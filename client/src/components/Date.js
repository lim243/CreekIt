import * as React from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            success: false
        };
    }
    render() {
        const today = new Date();
        const checkInValidationMessage = "Dates in the past are not valid Check-In dates.";
        const checkOutValidationMessage = "The Check-Out date is required.";

        return (
            <div className="row example-wrapper">
                <div className="col-xs-12 col-sm-6 offset-sm-3 example-col">
                    <div className="card">
                        <div className="card-block">
                            <form className="k-form" onSubmit={this.handleSubmit}>
                                <fieldset>
                                    <legend>Please select dates of your stay:</legend>
                                    <label className="k-form-field">
                                        <span>Check-In</span>
                                        <DatePicker
                                            width="100%"
                                            name="checkin"
                                            defaultValue={new Date(2018, 1, 20)}
                                            required={true}
                                            min={today}
                                            validationMessage={checkInValidationMessage}
                                        />
                                    </label>
                                    <label className="k-form-field">
                                        <span>Check-Out</span>
                                        <DatePicker
                                            width="100%"
                                            name="checkout"
                                            required={true}
                                            min={today}
                                            validationMessage={checkOutValidationMessage}
                                        />
                                    </label>
                                </fieldset>
                                <input type="submit" className="k-button k-primary" value="Search" />
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.success && (
                    <div
                        className="alert alert-success"
                        style={{ position: 'absolute' }}
                    >
                        Form submitted!
                    </div>)}
            </div>
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ success: true });
        setTimeout(() => { this.setState({ success: false }); }, 3000);
    }
}