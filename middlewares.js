const authRequired = (req, res, next) => {  
    if (!req.isAuthenticated() || !req.user) {
        req.session.oauth2return = req.originalUrl;
        return res.redirect('/login');
    }
    next();
}

const typeRequired = (type) => {
    return (req, res, next) => {
        if (!req.isUnAuthenticated() || !req.user) {
            req.session.oauth2return = req.originalUrl;
            return res.redirect('/login');
        }
        if (req.user.user_type === 'pending') {
            req.session.oauth2return = req.originalUrl;
            return res.redirect('/profile');
        }
        if (type && req.user.user_type !== type) {
            return res.status(403).send('only user of certain type can view this page');
        }
        next();
    }
}

export default {
    auth: authRequired,
    authType: typeRequired
}