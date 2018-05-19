const form = document.getElementById('vote-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const choice = document.querySelector('input[name = anime]:checked').value;
    const data = {
        anime: choice
    }

    fetch("http://localhost:3000/polls", {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'content-type': 'application/json'
        })
    }).then(res => res.json()).then(data => console.log(data)).catch(e => console.log(e));

});

let dataPoints = [
    { label: 'Death Note', y: 0 },
    { label: 'Code Geass', y: 0 },
    { label: 'Naruto', y: 0 },
    { label: 'Others', y: 0 }
];
const chartContainer = document.getElementById('chartContainer');

if (chartContainer) {
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'Anime Poll Results'
        },
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();

    Pusher.logToConsole = true;

    var pusher = new Pusher('944b45bac1491aa7166f', {
        cluster: 'ap2',
        encrypted: true
    });

    var channel = pusher.subscribe('anime-poll');
    channel.bind('anime-vote', function (data) {
        dataPoints.map(x => {
            if(x.label == data.anime) {
                x.y += data.points;
                return x;
            } else {
                return x;
            }
        });
        chart.render();
    });
}