const User = require('../models/user')
const Habit = require('../models/habits')


module.exports.homepage =async (req, res)=>{
    if(req.cookies.user_id){
        var user = await User.findById(req.cookies.user_id);
        var habits = await Habit.find({user: req.cookies.user_id})
        if(user){
                return res.render('homepage',{
                    user: user,
                    habits: habits,
                    weekdates: await nextSevenDays() 
                })
        }else{
            console.log("user not found or not authorized");
            // req.flash('error', "signin first")
            return res.redirect("/auth/signinpage")
        }
    }else{
        // req.flash('error', "signin first")
        return res.redirect("/auth/signinpage")
    }
}

async function nextSevenDays() {
    let currentDate = new Date();
    let options = { day: 'numeric', weekday: 'short' };
    let date = []
    for (let i = 0; i < 7; i++) {
        let dateString = currentDate.toLocaleDateString('en-US', options);
        date.push(dateString)
        // console.log(dateString);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return date;
}
