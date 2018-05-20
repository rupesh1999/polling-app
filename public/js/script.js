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


fetch("http://localhost:3000/polls")
    .then(res => res.json())
    .then(data => {
        var x = [0, 0, 0, 0];
        console.log(data.votes);
        for (var i = 0; i < data.votes.length; i++) {
            if (data.votes[i].anime === 'Death Note') {
                x[0] += 1;
            }
            if (data.votes[i].anime === 'Code Geass') {
                x[1] += 1;
            }
            if (data.votes[i].anime === 'Naruto') {
                x[2] += 1;
            }
            if (data.votes[i].anime === 'Others') {
                x[3] += 1;
            }
        }
         
        console.log(x);
        let dataPoints = [
            { label: 'Death Note', y:   x[0] },
            { label: 'Code Geass', y:   x[1] },
            { label: 'Naruto', y:   x[2] },
            { label: 'Others', y:   x[3] }
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
                    if (x.label == data.anime) {
                        x.y += data.points;
                        return x;
                    } else {
                        return x;
                    }
                });
                chart.render();
            });
        }

    });
