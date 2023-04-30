function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(function(employee) {
    return createEmployeeRecord(employee);
  });
}

function createTimeInEvent(dateStamp) {
  let [date, hour] = dateStamp.split(' ');

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
  });

  return this;
}

function createTimeOutEvent(dateStamp) {
  let [date, hour] = dateStamp.split(' ');

  this.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10),
  });

  return this;
}

function hoursWorkedOnDate(date) {
  let timeIn = this.timeInEvents.find((event) => event.date === date);
  let timeOut = this.timeOutEvents.find((event) => event.date === date);

  if (timeIn && timeOut) {
    return (timeOut.hour - timeIn.hour) / 100;
  } else {
    return 0;
  }
}

function wagesEarnedOnDate(date) {
  let hoursWorked = hoursWorkedOnDate.call(this, date);
  let payRate = this.payPerHour;
  return hoursWorked * payRate;
}

function allWagesFor() {
  const datesWorked = this.timeInEvents.map(timeInEvent => timeInEvent.date);
  return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate.call(this, date), 0);
}

function allWagesFor() {
  let totalWages = 0
  this.timeInEvents.forEach(timeInEvent => {
    const date = timeInEvent.date
    totalWages += wagesEarnedOnDate.call(this, date)
  })
  return totalWages
}

function allWagesFor() {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date
  })

  let payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate.call(this, d)
  }.bind(this), 0)

  return payable
}

function createEmployeeRecords(arr) {
  return arr.map(function(employee) {
    return createEmployeeRecord(employee)
  })
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(function(employee) {
    return employee.firstName === firstName
  })
}

function calculatePayroll(employees, timesIn, timesOut) {
  let employeeTotalPay = {}
  
  employees.forEach(employee => {
    let employeeTimeIn = timesIn.find(timeIn => timeIn[0] === employee.firstName)
    let employeeTimeOut = timesOut.find(timeOut => timeOut[0] === employee.firstName)

    if (employeeTimeIn && employeeTimeOut) {
      let totalHoursWorked = employeeTimeIn[1].reduce((total, timeIn, index) => {
        let timeOut = employeeTimeOut[1][index]
        let timeInDate = new Date(timeIn)
        let timeOutDate = new Date(timeOut)
        let hoursWorked = (timeOutDate - timeInDate) / (1000 * 60 * 60)
        return total + hoursWorked
      }, 0)
      
      let employeePay = totalHoursWorked * employee.payPerHour
      if (employee.dependents.length > 0) {
        employeePay -= employee.dependents.length * 500
      }
      
      employeeTotalPay[employee.firstName] = employeePay
    }
  })

  let totalPay = Object.values(employeeTotalPay).reduce((total, pay) => total + pay, 0)
  return { employeeTotalPay, totalPay }
}

function calculatePayroll(employeeRecords) {
  let payroll = 0
  employeeRecords.forEach(function (rec) {
    payroll += allWagesFor.call(rec)
  })
  return payroll
}
