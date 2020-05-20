import React from 'react';

export default function Form( props ) {
    const { onChangeHandler, onSubmitHandler, onCheckboxChange, formValues } = props;

    return (
        <div>
            <form onSubmit={onSubmitHandler} autoComplete="off">
                <label>
                    Name:&nbsp;
                    <input type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formValues.name}
                    onChange={onChangeHandler}
                    />
                </label>

                <label>
                    Email:&nbsp;
                    <input type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formValues.email}
                    onChange={onChangeHandler}
                    />
                </label>

                <label>
                    Password:&nbsp;
                    <input type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formValues.password}
                    onChange={onChangeHandler}
                    />
                </label>

                <label>
                    Do you accept our TOS:&nbsp;
                    <input type="checkbox"
                    name="consent"
                    checked={formValues.tos.consent}
                    onChange={onCheckboxChange}
                    />
                </label>

                <button>Submit</button>
            </form>
        </div>
    )
}