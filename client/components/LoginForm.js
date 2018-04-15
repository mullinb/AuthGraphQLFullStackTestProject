import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';

class LoginForm extends Component {
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
        .catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors })
        })
    }

    render() {
        return (
            <div className="container">
                <h4>Login</h4>
                <AuthForm onSubmit={this.onSubmit.bind(this)} errors={this.state.errors} />
            </div>
        )
    }
}

export default graphql(query)(
    graphql(mutation)(LoginForm)
);
