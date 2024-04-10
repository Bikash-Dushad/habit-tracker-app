const Habit = require("../models/habits");

module.exports.addhabit = async function (req, res) {
try {
    var habitname = req.body.habitname;
    var userId = req.cookies.user_id;
  
    // Check if the habit with the same name and user ID already exists
    var habit = await Habit.findOne({
      habitname: req.body.habitname,
      user: req.cookies.user_id,
    }).populate();
  
    if (habit) {
      console.log("habit already exists");
      return res.redirect("back");
    } else {
      // Create the habit with today's date
      var newHabit = await Habit.create({
        habitname: habitname,
        user: userId,
        date: { date: await getTodayDate(), completed: "none" },
      });
      console.log(newHabit)
      return res.redirect("back");
    }
} catch (error) {
  console.log("Error in habit creation ", error)
}
}

async function getTodayDate() {
  let today = new Date();
  let date = today.getDate();

  let day = today.getDay();
  let dayName;

  switch (day) {
    case 0:
      dayName = "Sun";
      break;
    case 1:
      dayName = "Mon";
      break;
    case 2:
      dayName = "Tue";
      break;
    case 3:
      dayName = "Wed";
      break;
    case 4:
      dayName = "Thu";
      break;
    case 5:
      dayName = "Fri";
      break;
    case 6:
      dayName = "Sat";
      break;
    default:
      dayName = "Unknown";
  }
  let actualdate = date + " " + dayName;
  return actualdate;
}

module.exports.toggle = async function (req, res) {
  try {
    let id = req.query.id;
    let date = req.query.date;
    const habit = await Habit.findById(id);

    if (!habit) {
      console.log("Habit not present!");
      return res.redirect("back");
    }

    let dates = habit.date;
    let found = false;

    dates.find((item, index) => {
      if (item.date == date) {
        if (item.complete === "y") {
          item.complete = "n";
        } else if (item.complete === "n") {
          item.complete = "x";
        } else if (item.complete === "x") {
          item.complete = "y";
        }
        found = true;
      }
    });

    if (!found) {
      dates.push({ date: date, complete: "y" });
    }

    habit.date = dates;
    await habit.save();
    return res.redirect("back");
  } catch (error) {
    console.log("Error in habitController/toggle", error);
    return res.redirect("back");
  }
};



module.exports.deletehabit = async function(req, res){
try {
     var userId = req.cookies.user_id;
     var habitid = req.query.id;
     var deletedhabit = await Habit.findByIdAndDelete(habitid)
     console.log("deleted habt is ",deletedhabit)
     return res.redirect('back')
} catch (error) {
  console.log(error)
}
}


module.exports.showdaily = async function(req, res){
  
}