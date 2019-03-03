var chartForDestroy;
  $("#show-chart").click(function() { 
    $("#diagram").css("display", "block");
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
            data: [calculatePercent().male, calculatePercent().female],
            backgroundColor: ['#414146', '#7db7ed']
          }],
          labels: [
            'Male ' + calculatePercent().male + "%", 
            'Female ' + calculatePercent().female + "%"
          ]
        },
        options: {
          legend: {
            position: 'top',
            labels: {
              fontSize: 26
            }
          },
          responsive: true,
          animation: {
            animateScale: true,
            animateRotate: true
          },
          tooltips: {enabled: false}
        }
      });

    chartForDestroy = myChart;
  })