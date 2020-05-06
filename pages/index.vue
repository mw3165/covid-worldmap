<template>
    <div>
        <div class="site-title">COVID-19 Global Map</div>
        <Chart v-once />
        <div class='flex'>
            <News />
            <Details />
        </div>
    </div>
</template>

<script>
import Chart from '~/components/chart'
import News from '~/components/news'
import Details from '~/components/details'

export default {
    head: {
        title: 'COVID-19 Global Map'
    },
    components: {
        Chart, News, Details
    },
    async asyncData({ store }) {
        await store.dispatch("fetchWorldMap")
    }
}
</script>

<style>
.site-title {
    color: #fff;
    background: #8694ff;
    font-size: 22px;
    padding: 16px;
    text-align: center;
}
.flex {
    display: flex;
}
.box {
    width: 50%;
    padding: 12px 18px;
}
.title {
    font-size: 20px;
    font-weight: bold;
    margin: 4px 0;
}
.sub-title {
    font-size: 16px;
    color: #aaa;
    margin: 4px 0;
}
</style>
