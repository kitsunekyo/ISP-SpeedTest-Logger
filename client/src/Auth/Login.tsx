import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useAuth } from './AuthProvider';
import Button from 'shared/components/Button';
import Card from 'shared/components/Card';

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

type LoginForm = { username: string; password: string };

export function Login() {
	const { token, login } = useAuth();
	const history = useHistory();

	const [formState, setFormState] = useState<LoginForm>({ username: 'admin', password: 'admin' });
	const [error, setError] = useState<string | null>(null);

	function handleFormFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFormState({ ...formState, [e.target.name]: e.target.value });
	}

	function handleLogin(e: React.FormEvent) {
		e.preventDefault();

		login(formState)
			.then(() => {
				history.push('/dashboard');
			})
			.catch((e) => {
				if (e.response.status === 401) {
					setError('Username or Password wrong');
				}
			});
	}

	if (token) return <Redirect to="/dashboard" />;

	return (
		<StyledLogin>
			<Card style={{ minWidth: '400px' }}>
				<h1>Network Dashboard</h1>
				<form onSubmit={handleLogin}>
					<FormGroup>
						<FormControl
							as="input"
							type="text"
							name="username"
							placeholder="Username"
							required
							value={formState.username}
							onChange={handleFormFieldChange}
						/>
					</FormGroup>
					<FormGroup>
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
