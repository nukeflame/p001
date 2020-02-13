/**
 *
 * Main roles getters
 */

export default {
  fetchEmployeeParameter: state => row => {
    state.employees.find(item => {
      if (item.id === row.id) {
        return item;
      }
    });
  }
};
