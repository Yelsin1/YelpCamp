const Campground = require('../models/campground');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new')
}

module.exports.showCampground = async (req, res, next) => {
    const campgrounds = await Campground.findById(req.params.id).populate({
        path: 'review',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campgrounds) {
        req.flash('error', 'we cannot find this campground at the moment');
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', campgrounds);
}

module.exports.renderEditForm = async (req, res) => {
    const campgrounds = await Campground.findById(req.params.id);
    if (!campgrounds) {
        req.flash('error', 'we cannot find this campground at the moment');
        res.redirect('/campgrounds');
    }

    res.render('campgrounds/edit', campgrounds)
}

module.exports.createCampground = async (req, res, next) => {
    // if (!req.body.campground) throw  new ExpressError("Invalid campground data", 400);
    const camp = await new Campground(req.body.campground);
    camp.author = req.user._id;
    camp.save();
    req.flash('success', 'Successfully created Campground');
    res.redirect(`/campgrounds/${camp._id}`);

}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campgrounds = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Successfully updated Campground');
    res.redirect(`/campgrounds/${id}`);
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const deleted = await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted Campground');
    res.redirect(`/campgrounds`);
}