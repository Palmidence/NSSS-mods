const createApp = Vue.createApp;

const resources = createApp({
    data: function () {
        return {
            request: null,
            labels: {},
            items: {}
        };
    },
    mounted: function () {
        this.run();
    },
    methods: {
        run: async function () {
            this.request = await axios.get("./data/resources.json");
            this.labels = this.request.data.labels;
            this.items = this.request.data.items;
            console.log(this.request);
        }
    },
    template: `
    <div class="col-lg-3 col-md-3 mb-2" v-for="resource of items"> 
        <div class="card card-home">
            <img :alt="resource.title" class="card-img-top" :src="resource.image">
            <div class="labels">
                <span v-for="label of resource.labels" 
                    class="badge" data-toggle="tooltip" data-placement="top" title="" :data-original-title="labels[label].display" 
                    :style="\`color: \` + labels[label].text_color + \`; background-color:\` + labels[label].label_color + \`;\`">
                    {{labels[label].display}}
                </span>
            </div>
            <div class="card-body">
                <h4 class="card-title">{{resource.title}}</h4>
                <p class="card-text">{{resource.text}}</p>
            </div>
            <div class="card-footer">
                <a class="btn btn-primary" :href="resource.url">» Link</a>
            </div>
        </div>
    </div>
`
});
resources.mount('#resources');
