//var salary ;
const salaryOperations = {
  salary: 0,
  takeSalary(salary) {
    this.salary = parseFloat(salary);
  },
  hra() {
    return this.salary * 0.3;
  },
  da() {
    return this.salary * 0.2;
  },
  ta() {
    return this.salary * 0.1;
  },
  pf() {
    return this.salary * 0.05;
  },

  gs() {
    return this.salary + this.hra() + this.da() + this.ta() - this.pf();
  },
  tax() {
    return this.gs() * 0.1;
  },
  ns() {
    return this.gs() - this.tax();
  }
};
