// external libraries used: highcharts/semantic-ui/moment
export default {
    mode: 'spa',
    head: {
        link: [
            {rel:"stylesheet", type:"text/css", href:"https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"}
        ],
        script: [
            {src: "https://code.highcharts.com/maps/highmaps.js"},
            {src: "https://code.highcharts.com/maps/modules/data.js"},
            {src: "https://code.highcharts.com/maps/modules/exporting.js"},
            {src: "https://code.highcharts.com/maps/modules/offline-exporting.js"},
            {src: "https://code.highcharts.com/mapdata/custom/world.js"},
            {src: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.25.3/moment.min.js"}
        ]
    },
}