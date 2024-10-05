import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
    audience: 'http://localhost:4200',
    issuerBaseURL: 'https://dev-gdto7h6q6nlj4cey.us.auth0.com/',
    tokenSigningAlg: 'RS256',
});

export default jwtCheck;
