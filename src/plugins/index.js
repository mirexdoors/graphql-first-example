import Vue from 'vue';
import JwtService from '@/services/jwt.service';
import {createApi} from "@/common/utils";

const plugins = {
    install(Vue) {
        Vue.mixin({
            computed: {
                $jwt: () => JwtService,
                $api: () => createApi(),
            }
        })
    }
}

Vue.use(plugins);
