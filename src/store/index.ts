const store = createPinia();
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
store.use(piniaPluginPersistedstate);
export default store;
