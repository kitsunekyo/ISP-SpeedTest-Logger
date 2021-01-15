import { useAuth } from 'Auth/AuthProvider';

export const AuthDebugger: React.FC = () => {
    const { authState } = useAuth();

    return (
        <>
            <div style={{ marginLeft: '100px' }}>
                <p>
                    token: <code>{authState.token}</code>
                </p>
                <p>
                    expires at: <code>{authState.expiresAt}</code>
                </p>
                <p>
                    user info: <code>{JSON.stringify(authState.userInfo)}</code>
                </p>
            </div>
        </>
    );
};
