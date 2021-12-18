const navigation = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  reset: jest.fn(),
  goBack: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  canGoBack: jest.fn(),
  isFocused: jest.fn(),
  setParams: jest.fn(),
  setOptions: jest.fn(),
  dangerouslyGetState: jest.fn().mockReturnValue({
    index: 0,
    routes: [
      {
        key: 'MockedScreen',
        name: 'MockedScreen',
      },
    ],
    type: 'tab',
  }),
  dangerouslyGetParent: jest
    .fn()
    .mockReturnValue({dangerouslyGetState: jest.fn(), setOptions: jest.fn()}),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  emit: jest.fn(),
  getState: jest.fn(),
  getParent: jest.fn(),
};

export default navigation;
