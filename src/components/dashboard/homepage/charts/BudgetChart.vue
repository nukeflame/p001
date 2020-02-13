<template>
  <div class="card">
    <div class="card-title">
      <h4>
        <span class="ti-bar-chart-alt"></span> Budget Allocation and Absorption per Ministry
      </h4>
    </div>
    <div class="sales-chart">
      <canvas id="budget-chart" width="471" height="235"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      budget: [],
      ministries: []
    };
  },

  mounted() {
    this.barChart();
  },

  methods: {
    barChart() {
      axios
        .get("api/ministries")
        .then(response => {
          /* Data */
          this.budget = response.data.map(item => {
            return item.budget;
          });
          this.ministries = response.data.map(item => {
            return item.name;
          });

          var ctx = document.getElementById("budget-chart").getContext("2d");
          var myChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: this.ministries,
              datasets: [
                {
                  label: "Amount allocated",
                  data: this.budget,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)"
                  ],
                  borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)"
                  ],
                  borderWidth: 1
                }
              ]
            },
            options: {
              legend: { display: false },
              tooltips: {
                callbacks: {
                  label: function(tooltipItem, data) {
                    var value = data.datasets[0].data[tooltipItem.index];
                    value = value.toString();
                    value = value.split(/(?=(?:...)*$)/);
                    value = value.join(",");
                    return value;
                  }
                } // end callbacks:
              }, //end tooltips
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      userCallback: function(value, index, values) {
                        // Convert the number to a string and splite the string every 3 charaters from the end
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        value = value.join(",");
                        return value;
                      }
                    }
                  }
                ],
                xAxes: [
                  {
                    ticks: {}
                  }
                ]
              }
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
