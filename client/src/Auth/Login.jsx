import React, { useState, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { AuthContext } from './AuthProvider';
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

export function Login() {
	const [formState, setFormState] = useState({ username: 'admin', password: 'admin' });
	const { token, login } = useContext(AuthContext);
	const history = useHistory();

	function handleFormFieldChange(e) {
		setFormState({ ...formState, [e.target.name]: e.target.value });
	}

	function handleLogin(e) {
		e.preventDefault();

		login(formState)
			.then(() => {
				console.log('redirect');
				history.push('/dashboard');
			})
			.catch(e => {
				if (e.response.status === 401) {
					console.log('login or password wrong');
				}
			});
	}

	if (token) return <Redirect to="/dashboard" />;

	return (
		<StyledLogin>
			<Card>
				<form>
					<FormGroup>
						<FormControl
							as="input"
							type="text"
							name="username"
							placeholder="username"
							value={formState.username}
							onChange={handleFormFieldChange}
						/>
					</FormGroup>
					<FormGroup>
						<FormControl
							as="input"
							type="password"
							name="password"
							placeholder="password"
							value={formState.password}
							onChange={handleFormFieldChange}
						/>
					</FormGroup>
					<Button type="submit" onClick={handleLogin}>
						Login
					</Button>
				</form>
			</Card>
		</StyledLogin>
	);
}
