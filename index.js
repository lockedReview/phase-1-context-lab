/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

//
// Create an employee record from an array
const createEmployeeRecord = function(array){
    console.log("recordArray:", array)
    

    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []    
    }

    /*const employee = {};
    employee.firstName = array[0];
    employee.familyName = array[1];
    employee.title = array[2];
    employee.payPerHour = array[3];
    

    employee.timeInEvents= [];
    employee.timeOutEvents = [];     
    
    return employee */
}

const createEmployeeRecords = function(src) {
    /*let employeeRecords = [];

    src.forEach(function(empArray) {

      const employee = createEmployeeRecord(empArray);
      employeeRecords.push(employee);

    });
    return employeeRecords; */
    
    return src.map(createEmployeeRecord.bind(this));
    
}


const createTimeInEvent = function(stamp){

    const dateTimeString = stamp;
    const dateTimeArray = dateTimeString.split(" ");

    const employeeTimeInObj = {

        type: "TimeIn",
        hour: parseInt(dateTimeArray[1]),
        date: dateTimeArray[0]
    }   

    this.timeInEvents.push(employeeTimeInObj);
    return this
}

const createTimeOutEvent = function(stamp){
    const dateTimeString = stamp;
    const dateTimeArray = dateTimeString.split(" ");

    const employeeTimeOutObj = {

        type: "TimeOut",
        hour: parseInt(dateTimeArray[1]),
        date: dateTimeArray[0]

    }   

    this.timeOutEvents.push(employeeTimeOutObj);
    return this

}

const hoursWorkedOnDate = function(date){
    const timeInEvent = this.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = this.timeOutEvents.find((event) => event.date === date);

    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;

    const record = (timeOutHour - timeInHour)/100;

    return record;
}

const wagesEarnedOnDate = function(date){
    const employee = this
    const record = hoursWorkedOnDate.call(employee, date);
    const pay = employee.payPerHour;
    const wagesEarned = record * pay;
    return wagesEarned;
}

/*const findEmployeeByFirstName = function(srcArray, firstName) {

    const employees = srcArray;

    console.log("srcArray:", srcArray);


    console.log("firstName:", firstName);
    console.log(this)
  
    const employee = srcArray.find(emp => emp.firstName === firstName);

    console.log("employee:", employee);
    const familyName = employee ? employee.familyName : null;

    console.log(familyName)
    return familyName
}*/


function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

/*const findEmployeeByFirstName = function (srcArray, firstName) {
    console.log("Searching for employee with first name:", firstName);
    console.log("Debug Before forEach: " + this);
    const employee = srcArray.find(emp => {
        console.log(this); // `this` will be from `findEmployeeByFirstName`'s context
        return emp.firstName === firstName;
    });

    console.log("Found employee in context:", employee);
    console.log("find:", this)

    const familyName = employee ? employee.familyName : undefined;
    console.log("Family name:", familyName);   
    

    return employee.familyName ;
};*/



const calculatePayroll = function(array) {

    return array.reduce((total, emp) => {
        return total + allWagesFor.call(emp);
    }, 0); 

}