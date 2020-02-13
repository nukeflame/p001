<template>
  <div class="card">
    <div class="card-title">
      <h4>
        <span class="ti-bar-chart-alt"></span> Projects Completed per Financial year
      </h4>
    </div>
    <div class="sales-chart">
      <canvas id="completed-chart" width="471" height="235"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectsData: [],
      financilaYr: [
        "2014/15",
        "2015/16",
        "2016/17",
        "2017/18",
        "2018/19",
        "2019/20"
      ]
    };
  },

  mounted() {
    this.lineChart();
  },

  methods: {
    lineChart() {
      axios
        .get("api/projects/")
        .then(response => {

          // this.projectsData = response.data.filter(project => {
          //   return project.finacial_yr === "2014/15";
          // });

          // console.log(this.projectsData);
          

          var ctx = document.getElementById("completed-chart").getContext("2d");
          new Chart(ctx, {
            type: "line",
            data: {
              labels: this.financilaYr,
              datasets: [
                {
                  label: "Projects Completed",
                  data: [12, 19, 3, 5, 2, 3],
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
