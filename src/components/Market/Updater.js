import { Keyframes } from "react-spring";
import delay from "delay";

const Updater = Keyframes.Spring({
  update: async (next, cancel, ownProps) => {
    await next({
      from: { color: ownProps.theme.lightGrey },
      to: { color: 'green' }
    });
    await delay(200);
    await next({
      from: { color: 'green' },
      to: { color: ownProps.theme.lightGrey }
    });
  }
});

export default Updater;
