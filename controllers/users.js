const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.createUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const _user = new User({ email, username });
        const registration = await User.register(_user, password);
        req.login(registration, err = (err) => {
            if (err) return next(err)
        });
        req.flash('success', 'Welcome to YelpCamp');
        res.redirect('/campgrounds');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    const redirect = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirect);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye see you soon.');
    res.redirect('/campgrounds');
}