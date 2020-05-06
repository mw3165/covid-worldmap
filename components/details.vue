<template>
    <div class='ui box'>
        <div v-if="country === null"> 
            <div class="sub-title">No country selected yet</div>
        </div>
        <div v-else> 
            <div class="title">{{country.name}}</div>
            <div class="sub-title">Total Confirmed Cases: {{country.value}}</div>
            <table class="ui celled table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Cases</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                        v-for="entry in country.entries"
                        v-bind:key="entry.date"
                    >
                        <td data-label="Date">{{entry.date}}</td>
                        <td data-label="Cases">{{entry.cases}}</td>
                        <td data-label="Change" v-bind:style="entry.style">{{entry.change}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex'

// List only a few monthes given the dataset
const monthes = ["","Jan","Feb","Mar","Apr","May"];

// convert float to percentage to two decimal spaces
function toPercentage(float) {
    return float > 0 ? `+${(float*100).toFixed(2)}%` : `-${(float*100).toFixed(2)}%`
}

export default {
    computed: mapState({
        country: ({country, data}) => {
            if (country == null) return null;
            // pick five rows of data closest to the current date
            var startIndex = country.row.length-5
            var dates = data[0].row.slice(startIndex).map(date => `${date.substr(1,2)}-${monthes[parseInt(date.substr(0,1))]}`)
            var entries = country.row.slice(startIndex).map((entry, i) => {
                var percentage = parseInt(country.row[startIndex+i]) / parseInt(country.row[startIndex+i-1]) - 1; 
                return { 
                    date: dates[i], 
                    cases: entry, 
                    style: percentage > 0 ? "color: red" : "color: green",
                    change: toPercentage(percentage)
                }
            })
            entries.reverse();
            return { ...country, entries }
        }
    }),
}
</script>