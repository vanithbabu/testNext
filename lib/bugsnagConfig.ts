
import Bugsnag from '@bugsnag/js';

Bugsnag.start({
  apiKey: `${process.env.NEXT_PUBLIC_BUGSNAG_API_KEY}`,
});

export default Bugsnag;