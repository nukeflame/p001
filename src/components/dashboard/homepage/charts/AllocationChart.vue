<template>
  <div class="card">
    <div class="card-title">
      <h4>
        <span class="ti-bar-chart-alt"></span> Allocation per Financial year
      </h4>
    </div>
    <div class="sales-chart">
      <canvas id="allocation-chart" width="471" height="235"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allocation: [],
      financialYear: [
        { id: 1, year: "2014/15" },
        { id: 2, year: "2015/16" },
        { id: 3, year: "2016/17" },
        { id: 4, year: "2017/18" },
        { id: 5, year: "2018/19" },
        { id: 6, year: "2019/2020" }
      ]
    };
  },
  mounted() {
    this.lineChart();
  },
  methods: {
    lineChart() {
      axios.get("api/ministries").then(response => {
        this.allocation = response.data.map(item => {
          // return item.budget;
          if (item.financial_yr === "2014/15") {
            // this.allocation.push(item.budget);
          }

          if (item.financial_yr === "2015/16") {
            this.allocation.push(item.budget);
          }

          if (item.financial_yr === "2016/17") {
            this.allocation.push(item.budget);
          }

          if (item.financial_yr === "2017/18") {
            this.allocation.push(item.budget);
          }

          if (item.financial_yr === "2018/19") {
            this.allocation.push(item.budget);
          }

          if (item.financial_yr === "2019/20") {
            this.allocation.push(item.budget);
          }

          // console.log(item.budget);
        });
      });

      var ctx = document.getElementById("allocation-chart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "2014/15",
            "2015/16",
            "2016/17",
            "2017/18",
            "2018/19",
            "2019/20"
          ],
          datasets: [
            {
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
    }
  }
};
</script>
