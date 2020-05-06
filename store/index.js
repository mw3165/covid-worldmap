import { countries } from '~/data/countries'

export const state = () => ({
    data: null,
    country: null,
    news: []
});

export const mutations = {
    SET_DATA (state, data) {
        state.data = data
    },
    SET_COUNTRY (state, country) {
        state.country = country
    },
    SET_NEWS (state, news) {
        state.news = news
    },
};

export const actions = {
    async fetchNews({ commit }, name) {       
        var articles = await new Promise((resolve, reject) => {
            const newspapers = ['cnn','nytimes.com','theguardian.com', 'reuters.com'];
            Highcharts.ajax({  
                url: `http://newsapi.org/v2/everything?q=+${name}+"COVID-19"&language=en&domains=${newspapers.join(',')}&sortBy=publishedAt&pageSize=5&apiKey=b1eb35f8570f449c9a5760bf48ceb7f0`,  
                dataType: 'text',  
                success: function(data) {
                    data = JSON.parse(data);
                    resolve(data.articles);
                },  
            });
        });
        commit('SET_NEWS', articles);
    },
    async fetchWorldMap({ commit }) {
        var data = await new Promise((resolve, reject) => {
            Highcharts.ajax({  
                url: window.location.origin + '/dataset.csv',  
                dataType: 'text',  
                success: function(data) {
                    const lines = data.split('\n');
                    const ret = [];
                    Highcharts.each(lines, function (line, i) {
                        const items = line.split(',');
                        if (countries[items[0]] == undefined) console.log(items[0]);
                        ret.push({
                            code: countries[items[0]],
                            value: items[items.length-1],
                            name: items[0],
                            id: i,
                            row: items,
                        });
                    });
                    resolve(ret);
                },  
            });
        });
        commit('SET_DATA', data);
    },
    selectCountry({ commit, dispatch }, {name, id, value, row}) {
        commit('SET_COUNTRY', { name, id, value, row });
        dispatch("fetchNews", name)
    },
};
