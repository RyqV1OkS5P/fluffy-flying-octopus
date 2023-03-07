import basicAuth from 'basic-auth';

const basicAuthMiddleware = (req, res, next) => {
    const user = basicAuth(req);
    
    if (user && user.name && user.pass) {

        const secret = 'SECRET_KEY';
        const encodedPass = Buffer.from(user.pass).toString('base64');
        
        if (encodedPass === secret) {
            next();
        } else {
            res.status(401).json({ error: 'Access denied' });
        }
    } else {
        res.status(401).json({ error: 'Access denied' });
    }
};

export { basicAuthMiddleware } 
