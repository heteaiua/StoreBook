const checkRole = (role) => {
    return (req, res, next) => {
        const user = req.user;
        console.log('User role:', user.role);
        if (user && user.role === role) {
            next();
        } else {
            res.status(403).json({message: 'User does not have the required role'});
        }
    }
}
module.exports = checkRole;