import { AuthressClient } from '@authress/sdk';

const authMiddleware = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token missing or invalid' });
        }

        const token = authorizationHeader.split(' ')[1];
        const authressClient = new AuthressClient({ authressApiUrl: 'https://acc-73v9ampdhpp03.login.authress.io' }, process.env.CLIENT_SECRET_AUTH);
        const userIdentity = await authressClient.verifyToken(token);

        req.user = userIdentity;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
    }
};

export default authMiddleware;
