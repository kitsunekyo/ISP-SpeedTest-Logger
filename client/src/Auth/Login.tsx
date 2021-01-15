import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from './AuthProvider';
import Button from 'shared/components/Button';
import Card from 'shared/components/Card';
import { api } from 'shared/utils/api';

const StyledLogin = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 8%;
`;

const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

const FormControl = styled.div`
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

type LoginForm = { email: string; password: string };

export function Login() {
    const { setAuthState } = useAuth();
    const history = useHistory();

    const [formState, setFormState] = useState<LoginForm>({
        email: 'admin@test.com',
        password: 'admin',
    });
    const [error, setError] = useState<string | null>(null);

    function handleFormFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/token', formState);
            setAuthState(data);
            setTimeout(() => {
                history.push('/dashboard');
            }, 700);
        } catch (error) {
            if (!error.response) throw new Error(error);
            switch (error.response.status) {
                case 403:
                    setError('Incorrect login details');
                    break;
                default:
                    setError('Oops. Something went wrong');
                    break;
            }
        }
    };

    return (
        <StyledLogin>
            <Card style={{ minWidth: '400px' }}>
                <h1>Log in to your account</h1>
                <form onSubmit={handleLogin}>
                    <FormGroup>
                        <label htmlFor="email">Email</label>
                        <FormControl
                            as="input"
                            type="text"
                            name="email"
                            placeholder="Email"
                            required
                            value={formState.email}
                            onChange={handleFormFieldChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="password">Password</label>
                        <FormControl
                            as="input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={formState.password}
                            onChange={handleFormFieldChange}
                        />
                    </FormGroup>
                    <Button type="submit">Login</Button>
                </form>
                {error ? <p style={{ color: 'red' }}>{error}</p> : null}
            </Card>
        </StyledLogin>
    );
}
