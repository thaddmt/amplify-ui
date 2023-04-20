import { defineComponent } from 'vue';
import useAuthenticator from '../../composables/useAuthenticator';

const Authenticator = defineComponent({
  setup() {
    const facade = useAuthenticator();
    return { facade };
  },
  computed: {
    route() {
      return this.facade.route;
    },
  },
  mounted() {
    const { initializeMachine } = this.facade;
    console.log('[Authenticator] initializing machine...');
    initializeMachine({});
  },
  render() {
    return <div>{this.route}!</div>;
  },
});

export default Authenticator;
