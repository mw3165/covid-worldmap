<template>
    <div class='box'>
        <div v-if="country === null"> 
            <div class="title">Latest News of COVID-19</div>
            <div class="sub-title">No country selected yet</div>
        </div>
        <div v-else> 
            <div class='title'>Latest News of COVID-19</div>
            <div class="sub-title">{{country.name}} :: News Items</div>
            <div class='flex news-items'>
                <div 
                    class="card"
                    v-for="article in news"
                    v-bind:key="article.url"
                >
                    <div class="content">
                        <div class="top">
                            <div class="header">{{article.title}}</div>
                            <div class="meta">
                                <span>{{moment(article.publishedAt).fromNow()}}</span>
                                <a>{{article.author}}</a>
                            </div>
                        </div>
                        <img v-bind:src="article.urlToImage" />
                        <div class="description">
                            <p>{{article.content}}</p>
                        </div>
                        <a v-bind:href="article.url" target="_blank">View Full Article</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: mapState(['country', 'news']),
    methods: {
        moment: window.moment // binding global library
    }
}
</script>

<style scoped>
.box {
    background: #fafafa;
}
.news-items {
    margin-top:10px;
    width: 100%;
    overflow-x: scroll;
}
.top {
    height:90px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.card {
    height: 400px;
    background: #fff;
    margin-right: 10px;
    border-radius: 4px;
    padding: 12px 18px;
    border: 1px solid #efefef;
}
.card .description {
    overflow: hidden;
    text-overflow: ellipsis;
    height: 80px;
}
.card .header {
    font-weight: bold;
    font-size: 16px;
    margin: 4px 0;
}
.card .meta {
    color: #ccc;
    display: flex;
    justify-content: space-between;
    margin: 4px 0;
}
.card img {
    height: 160px;
    border-radius: 5px;
    margin: 4px 0;
}
</style>