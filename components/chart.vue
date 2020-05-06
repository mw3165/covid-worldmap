<template>
    <div id="container">
        <div class="loading">
            <i class="icon-spinner icon-spin icon-large"></i>
            Loading data from Google Spreadsheets...
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { countries } from '~/data/countries'

export default {
    computed: mapState(['data']),
    methods: mapActions(['selectCountry']),
    mounted() {
        var data = this.data.map(x => Object.assign({}, x)) // preserve vuex store immutability
        Highcharts.mapChart('container', {
            // highcharts options mostly borrowed from highcharts' official demo
            chart: {
                map: 'custom/world',
                borderWidth: 1
            },
            colors: ['rgba(19,64,117,0.05)', 'rgba(19,64,117,0.2)', 'rgba(19,64,117,0.4)',
                'rgba(19,64,117,0.5)', 'rgba(19,64,117,0.6)', 'rgba(19,64,117,0.8)', 'rgba(19,64,117,1)'],
            title: {
                text: 'COVID-19 Cases by Country'
            },
            mapNavigation: {
                enabled: true
            },
            legend: {
                title: {
                    text: 'Number of Infected Individuals',
                    style: {
                        color: ( // theme
                            Highcharts.defaultOptions &&
                            Highcharts.defaultOptions.legend &&
                            Highcharts.defaultOptions.legend.title &&
                            Highcharts.defaultOptions.legend.title.style &&
                            Highcharts.defaultOptions.legend.title.style.color
                        ) || 'black'
                    }
                },
                align: 'left',
                verticalAlign: 'bottom',
                floating: true,
                layout: 'vertical',
                valueDecimals: 0,
                backgroundColor: ( // theme
                    Highcharts.defaultOptions &&
                    Highcharts.defaultOptions.legend &&
                    Highcharts.defaultOptions.legend.backgroundColor
                ) || 'rgba(255, 255, 255, 0.85)',
                symbolRadius: 0,
                symbolHeight: 14
            },
            colorAxis: {
                dataClasses: [
                    { to: 100 }, 
                    { from: 100, to: 500 },
                    { from: 500, to: 1000 }, 
                    { from: 1000, to: 5000 }, 
                    { from: 5000, to: 10000 },
                    { from: 10000, to: 50000 }, 
                    { from: 50000 }]
            },
            series: [{
                data: data,
                joinBy: ['iso-a2', 'code'], // using iso-a2 to match country code from csv
                animation: true,
                name: 'COVID-19 Cases',
                states: {
                    hover: {
                        color: '#a4edba'
                    },
                    select: {
                        color: "#a9ff42"
                    }
                },
                cursor: 'pointer',
                point: {
                    events: {
                        // custom onselect event to highlight country from map
                        select:  ({ target }) => {
                            this.selectCountry(target)
                        },
                    }
                },
                shadow: false,
                allowPointSelect: true
            }],
        });
    }
}
</script>

<style scoped>
#container {
    height: 320px; 
    min-width: 310px; 
    margin: 0 auto; 
}
.loading {
    margin-top: 10em;
    text-align: center;
    color: gray;
}
</style>