export const natsWrapper = {
  //the callback function will eventually be called by the client
  // publish: (subject: string, data: string, callback: () => void) => {
  //   callback();
  // },

  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
