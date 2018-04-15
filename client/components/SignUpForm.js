import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../mutations/SignUp';
import query from '../queries/CurrentUser';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: []
        }
    }

    componentWillUpdate(nextProps) {
        if (!this.props.data.user && nextProps.data.user) {
            hashHistory.push('/dashboard');
        }
    }

    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        })
        .then(() => {

        })
        .catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors })
        })
    }

    render() {
        return (
            <div className="container">
                <h4>Sign Up</h4>
                <AuthForm onSubmit={this.onSubmit.bind(this)} errors={this.state.errors} />
            </div>
        )
    }
}

export default graphql(query)(
    graphql(mutation)(SignUpForm)
);
