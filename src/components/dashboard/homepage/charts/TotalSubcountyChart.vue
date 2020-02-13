<template>
  <div class="card">
    <div class="card-title">
      <h4>
        <span class="ti-bar-chart-alt"></span> Total Projects per Sub County
      </h4>
    </div>
    <div class="sales-chart">
      <canvas id="total-subcounty-chart" width="471" height="235"></canvas>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      projectsData: [],
      subCountyData: []
    };
  },

  mounted() {
    this.barChart();
  },

  methods: {
    barChart() {
      axios
        .get("api/subcounties")
        .then(response => {
          this.projectsData = response.data.map(item => {
            return item.projects.length;
          });

          this.subCountyData = response.data.map(item => {
            return item.name;
          });

          var ctx = document
            .getElementById("total-subcounty-chart")
            .getContext("2d");
          var myChart = new Chart(ctx, {
            type: "bar",
            data: {
              labels: this.subCountyData,
              datasets: [
                {
                  data: this.projectsData,
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
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
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
